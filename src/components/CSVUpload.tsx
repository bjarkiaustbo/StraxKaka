'use client';

import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageContent from '@/components/LanguageContent';

interface Employee {
  name: string;
  birthday: string;
  cakeType: string;
  dietaryRestrictions: string;
  specialNotes: string;
}

interface CSVUploadProps {
  onEmployeesAdded: (employees: Employee[]) => void;
  onError: (error: string) => void;
}

interface CSVRow {
  rowNumber: number;
  data: string[];
  errors: string[];
  isValid: boolean;
}

export default function CSVUpload({ onEmployeesAdded, onError }: CSVUploadProps) {
  const { t } = useLanguage();
  const [csvData, setCsvData] = useState<CSVRow[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    const today = new Date();
    return date < today && date > new Date('1900-01-01') && !isNaN(date.getTime());
  };

  const validateRow = (row: string[], rowNumber: number): CSVRow => {
    const errors: string[] = [];
    
    // Check if we have enough columns
    if (row.length < 3) {
      errors.push(t('csv.errors.insufficient_columns'));
      return { rowNumber, data: row, errors, isValid: false };
    }

    // Validate Employee Name (required)
    if (!row[0] || row[0].trim() === '') {
      errors.push(t('csv.errors.name_required'));
    }

    // Validate Birthday (required)
    if (!row[1] || row[1].trim() === '') {
      errors.push(t('csv.errors.birthday_required'));
    } else if (!validateDate(row[1].trim())) {
      errors.push(t('csv.errors.invalid_birthday'));
    }

    // Validate Cake Type (required)
    if (!row[2] || row[2].trim() === '') {
      errors.push(t('csv.errors.cake_type_required'));
    }

    return {
      rowNumber,
      data: row,
      errors,
      isValid: errors.length === 0
    };
  };

  const parseCSV = (csvText: string): CSVRow[] => {
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    const rows: CSVRow[] = [];

    lines.forEach((line, index) => {
      // Skip header row
      if (index === 0) return;

      // Simple CSV parsing (handles quoted fields)
      const row = line.split(',').map(field => 
        field.trim().replace(/^"(.*)"$/, '$1')
      );

      rows.push(validateRow(row, index + 1));
    });

    return rows;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      onError(t('csv.errors.invalid_file_type'));
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;
        const parsedData = parseCSV(csvText);
        setCsvData(parsedData);
        setShowPreview(true);
      } catch {
        onError(t('csv.errors.parse_error'));
      } finally {
        setIsProcessing(false);
      }
    };

    reader.onerror = () => {
      onError(t('csv.errors.read_error'));
      setIsProcessing(false);
    };

    reader.readAsText(file);
  };

  const handleConfirmUpload = () => {
    const validRows = csvData.filter(row => row.isValid);
    
    if (validRows.length === 0) {
      onError(t('csv.errors.no_valid_rows'));
      return;
    }

    const employees: Employee[] = validRows.map(row => ({
      name: row.data[0].trim(),
      birthday: row.data[1].trim(),
      cakeType: row.data[2].trim(),
      dietaryRestrictions: row.data[3]?.trim() || '',
      specialNotes: row.data[4]?.trim() || ''
    }));

    onEmployeesAdded(employees);
    setCsvData([]);
    setShowPreview(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCancel = () => {
    setCsvData([]);
    setShowPreview(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadTemplate = () => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const template = 'Employee Name,Birthday (YYYY-MM-DD),Cake Type,Cake Size,Dietary Restrictions,Special Notes\nJohn Doe,1990-05-15,Chocolate,Medium,None,Extra chocolate frosting\nJane Smith,1985-12-03,Vanilla,Small,Lactose-free,Small size please';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'straxkaka_employee_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-yellow-400 transition-colors">
        <div className="space-y-4">
          <div className="text-4xl">📄</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              <LanguageContent fallback="Hlaða upp CSV skrá">
                {(t) => t('csv.upload.title')}
              </LanguageContent>
            </h3>
            <p className="text-gray-600 mb-4">
              <LanguageContent fallback="Hlaða upp CSV skrá með starfsmönnum fyrir fljótlega skráningu">
                {(t) => t('csv.upload.subtitle')}
              </LanguageContent>
            </p>
            <div className="space-y-2">
              <button
                onClick={downloadTemplate}
                className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
              >
                <LanguageContent fallback="Sækja sniðmát">
                  {(t) => t('csv.upload.download_template')}
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
                  {(t) => t('csv.upload.processing')}
                </LanguageContent>
              ) : (
                <LanguageContent fallback="Velja CSV skrá">
                  {(t) => t('csv.upload.select_file')}
                </LanguageContent>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      {showPreview && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-gray-900">
              <LanguageContent fallback="Forskoðun CSV gögn">
                {(t) => t('csv.preview.title')}
              </LanguageContent>
            </h4>
            <div className="flex space-x-2">
              <button
                onClick={handleConfirmUpload}
                disabled={csvData.filter(row => row.isValid).length === 0}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LanguageContent fallback="Staðfesta">
                  {(t) => t('csv.preview.confirm')}
                </LanguageContent>
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                <LanguageContent fallback="Hætta við">
                  {(t) => t('csv.preview.cancel')}
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
                    {(t) => t('csv.preview.valid')}
                  </LanguageContent>: {csvData.filter(row => row.isValid).length}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-100 rounded-full mr-2"></div>
                <span className="text-red-700">
                  <LanguageContent fallback="Ógildir">
                    {(t) => t('csv.preview.invalid')}
                  </LanguageContent>: {csvData.filter(row => !row.isValid).length}
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
                      {(t) => t('csv.preview.row')}
                    </LanguageContent>
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    <LanguageContent fallback="Nafn">
                      {(t) => t('csv.preview.name')}
                    </LanguageContent>
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    <LanguageContent fallback="Afmælisdagur">
                      {(t) => t('csv.preview.birthday')}
                    </LanguageContent>
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    <LanguageContent fallback="Kökutegund">
                      {(t) => t('csv.preview.cake_type')}
                    </LanguageContent>
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    <LanguageContent fallback="Staða">
                      {(t) => t('csv.preview.status')}
                    </LanguageContent>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {csvData.map((row, index) => (
                  <tr key={index} className={row.isValid ? 'bg-green-50' : 'bg-red-50'}>
                    <td className="px-4 py-2 text-sm text-gray-900">{row.rowNumber}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{row.data[0] || '-'}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{row.data[1] || '-'}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{row.data[2] || '-'}</td>
                    <td className="px-4 py-2 text-sm">
                      {row.isValid ? (
                        <span className="text-green-600 font-medium">
                          <LanguageContent fallback="Gildir">
                            {(t) => t('csv.preview.valid')}
                          </LanguageContent>
                        </span>
                      ) : (
                        <div className="text-red-600">
                          <span className="font-medium">
                            <LanguageContent fallback="Ógildir">
                              {(t) => t('csv.preview.invalid')}
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
