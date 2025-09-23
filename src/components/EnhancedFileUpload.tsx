'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageContent from '@/components/LanguageContent';

interface Employee {
  name: string;
  birthday: string;
  cakeType: string;
  cakeSize: string;
  dietaryRestrictions: string;
  specialNotes: string;
}

interface EnhancedFileUploadProps {
  onEmployeesAdded: (employees: Employee[]) => void;
  onError: (error: string) => void;
}

interface FileRow {
  rowNumber: number;
  data: string[];
  errors: string[];
  isValid: boolean;
}

export default function EnhancedFileUpload({ onEmployeesAdded, onError }: EnhancedFileUploadProps) {
  const { t } = useLanguage();
  const [fileData, setFileData] = useState<FileRow[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isClient, setIsClient] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Only render on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const validateDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    const today = new Date();
    return date < today && date > new Date('1900-01-01') && !isNaN(date.getTime());
  };

  const validateRow = (row: string[], rowNumber: number): FileRow => {
    const errors: string[] = [];
    
    // Check if we have enough columns
    if (row.length < 3) {
      errors.push(t('file.errors.insufficient_columns'));
      return { rowNumber, data: row, errors, isValid: false };
    }

    // Validate Employee Name (required)
    if (!row[0] || row[0].trim() === '') {
      errors.push(t('file.errors.name_required'));
    }

    // Validate Birthday (required)
    if (!row[1] || row[1].trim() === '') {
      errors.push(t('file.errors.birthday_required'));
    } else if (!validateDate(row[1].trim())) {
      errors.push(t('file.errors.invalid_birthday'));
    }

    // Validate Cake Type (required)
    if (!row[2] || row[2].trim() === '') {
      errors.push(t('file.errors.cake_type_required'));
    }

    return {
      rowNumber,
      data: row,
      errors,
      isValid: errors.length === 0
    };
  };

  const parseCSVFile = async (file: File): Promise<FileRow[]> => {
    try {
      // Parse CSV file
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          try {
            const text = e.target?.result as string;
            const lines = text.split('\n').filter(line => line.trim());
            const jsonData = lines.map(line => line.split(',').map(cell => cell.trim().replace(/^"|"$/g, '')));
            
            const rows: FileRow[] = [];
            
            // Skip header row
            jsonData.slice(1).forEach((row: unknown, index) => {
              const stringRow = (row as unknown[]).map(cell => String(cell || '').trim());
              rows.push(validateRow(stringRow, index + 2)); // +2 because we skip header and 0-indexed
            });
            
            resolve(rows);
          } catch (error) {
            reject(new Error(t('file.errors.excel_parse_error')));
          }
        };
        
        reader.onerror = () => {
          reject(new Error(t('file.errors.read_error')));
        };
        
        reader.readAsArrayBuffer(file);
      });
    } catch (error) {
      throw new Error(t('file.errors.excel_import_error'));
    }
  };


  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.toLowerCase().split('.').pop();
    const allowedExtensions = ['csv', 'xlsx', 'xls'];
    
    if (!allowedExtensions.includes(fileExtension || '')) {
      onError(t('file.errors.invalid_file_type'));
      return;
    }

    setIsProcessing(true);
    setFileName(file.name);

    try {
      const parsedData: FileRow[] = await parseCSVFile(file);
      
      setFileData(parsedData);
      setShowPreview(true);
    } catch (error) {
      onError(error instanceof Error ? error.message : t('file.errors.unknown_error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmUpload = () => {
    const validRows = fileData.filter(row => row.isValid);
    
    if (validRows.length === 0) {
      onError(t('file.errors.no_valid_rows'));
      return;
    }

    const employees: Employee[] = validRows.map(row => ({
      name: row.data[0].trim(),
      birthday: row.data[1].trim(),
      cakeType: row.data[2].trim(),
      cakeSize: row.data[3]?.trim() || '',
      dietaryRestrictions: row.data[4]?.trim() || '',
      specialNotes: row.data[5]?.trim() || ''
    }));

    onEmployeesAdded(employees);
    setFileData([]);
    setShowPreview(false);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCancel = () => {
    setFileData([]);
    setShowPreview(false);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadTemplate = async (format: 'csv' | 'xlsx') => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    try {
      const templateData = [
        ['Employee Name', 'Birthday (YYYY-MM-DD)', 'Cake Type', 'Cake Size', 'Dietary Restrictions', 'Special Notes'],
        ['John Doe', '1990-05-15', 'Chocolate', 'Medium', 'None', 'Extra chocolate frosting'],
        ['Jane Smith', '1985-12-03', 'Vanilla', 'Small', 'Lactose-free', 'Small size please'],
        ['Mike Johnson', '1992-08-22', 'Strawberry', 'Large', 'Gluten-free', 'Birthday celebration']
      ];

      if (format === 'csv') {
        const csvContent = templateData.map(row => 
          row.map(field => `"${field}"`).join(',')
        ).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'straxkaka_employee_template.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        // Generate CSV template
        const csvContent = templateData.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'straxkaka_employee_template.csv';
        link.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading template:', error);
      onError(t('file.errors.download_error'));
    }
  };

  const openGoogleSheets = () => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const templateUrl = 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing';
    window.open(templateUrl, '_blank');
  };

  // Don't render on server side
  if (!isClient) {
    return <div className="space-y-6"><div className="text-center py-8">Loading...</div></div>;
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-yellow-400 transition-colors">
        <div className="space-y-4">
          <div className="text-4xl">📊</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              <LanguageContent fallback="Hlaða upp skrá með starfsmönnum">
                {(t) => t('file.upload.title')}
              </LanguageContent>
            </h3>
            <p className="text-gray-600 mb-4">
              <LanguageContent fallback="Stuðningur við CSV og Google Sheets">
                {(t) => t('file.upload.subtitle')}
              </LanguageContent>
            </p>
            
            {/* Template Downloads */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <button
                onClick={() => downloadTemplate('csv')}
                className="text-yellow-600 hover:text-yellow-700 font-medium text-sm px-3 py-1 border border-yellow-300 rounded hover:bg-yellow-50"
              >
                <LanguageContent fallback="Sækja CSV sniðmát">
                  {(t) => t('file.upload.download_csv')}
                </LanguageContent>
              </button>
              <button
                onClick={() => downloadTemplate('csv')}
                className="text-yellow-600 hover:text-yellow-700 font-medium text-sm px-3 py-1 border border-yellow-300 rounded hover:bg-yellow-50"
              >
                <LanguageContent fallback="Sækja CSV sniðmát">
                  {(t) => t('file.upload.download_excel')}
                </LanguageContent>
              </button>
              <button
                onClick={openGoogleSheets}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm px-3 py-1 border border-blue-300 rounded hover:bg-blue-50"
              >
                <LanguageContent fallback="Opna Google Sheets">
                  {(t) => t('file.upload.open_google_sheets')}
                </LanguageContent>
              </button>
            </div>
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <LanguageContent fallback="Vinnur...">
                  {(t) => t('file.upload.processing')}
                </LanguageContent>
              ) : (
                <LanguageContent fallback="Velja skrá">
                  {(t) => t('file.upload.select_file')}
                </LanguageContent>
              )}
            </button>
            <p className="text-xs text-gray-500 mt-2">
              <LanguageContent fallback="CSV skrár">
                {(t) => t('file.upload.supported_formats')}
              </LanguageContent>
            </p>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      {showPreview && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                <LanguageContent fallback="Forskoðun skrárgögn">
                  {(t) => t('file.preview.title')}
                </LanguageContent>
              </h4>
              <p className="text-sm text-gray-600">{fileName}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleConfirmUpload}
                disabled={fileData.filter(row => row.isValid).length === 0}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LanguageContent fallback="Staðfesta">
                  {(t) => t('file.preview.confirm')}
                </LanguageContent>
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                <LanguageContent fallback="Hætta við">
                  {(t) => t('file.preview.cancel')}
                </LanguageContent>
              </button>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-100 rounded-full mr-2"></div>
                <span className="text-green-700">
                  <LanguageContent fallback="Gildir">
                    {(t) => t('file.preview.valid')}
                  </LanguageContent>: {fileData.filter(row => row.isValid).length}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-100 rounded-full mr-2"></div>
                <span className="text-red-700">
                  <LanguageContent fallback="Ógildir">
                    {(t) => t('file.preview.invalid')}
                  </LanguageContent>: {fileData.filter(row => !row.isValid).length}
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    <LanguageContent fallback="Röð">
                      {(t) => t('file.preview.row')}
                    </LanguageContent>
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    <LanguageContent fallback="Nafn">
                      {(t) => t('file.preview.name')}
                    </LanguageContent>
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    <LanguageContent fallback="Afmælisdagur">
                      {(t) => t('file.preview.birthday')}
                    </LanguageContent>
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    <LanguageContent fallback="Kökutegund">
                      {(t) => t('file.preview.cake_type')}
                    </LanguageContent>
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    <LanguageContent fallback="Staða">
                      {(t) => t('file.preview.status')}
                    </LanguageContent>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fileData.map((row, index) => (
                  <tr key={index} className={row.isValid ? 'bg-green-50' : 'bg-red-50'}>
                    <td className="px-4 py-2 text-sm text-gray-900">{row.rowNumber}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{row.data[0] || '-'}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{row.data[1] || '-'}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{row.data[2] || '-'}</td>
                    <td className="px-4 py-2 text-sm">
                      {row.isValid ? (
                        <span className="text-green-600 font-medium">
                          <LanguageContent fallback="Gildir">
                            {(t) => t('file.preview.valid')}
                          </LanguageContent>
                        </span>
                      ) : (
                        <div className="text-red-600">
                          <span className="font-medium">
                            <LanguageContent fallback="Ógildir">
                              {(t) => t('file.preview.invalid')}
                            </LanguageContent>
                          </span>
                          <div className="text-xs mt-1">
                            {row.errors.map((error, errorIndex) => (
                              <div key={errorIndex}>{error}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
