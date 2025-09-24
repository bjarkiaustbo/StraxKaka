'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import LanguageContent from '@/components/LanguageContent';

export default function Subscribe() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    companyName: '',
    companyEmail: '',
    phone: '',
    employees: ''
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\d{7}$/.test(phone);
  };

  const parseEmployees = (employeesText: string) => {
    if (!employeesText.trim()) return [];
    
    const lines = employeesText.split('\n').filter(line => line.trim());
    const employees = [];
    
    for (const line of lines) {
      const parts = line.split(',').map(part => part.trim());
      if (parts.length >= 3) {
        employees.push({
          name: parts[0],
          birthday: parts[1],
          cakeType: parts[2],
          cakeSize: parts[3] || 'medium',
          dietaryRestrictions: parts[4] || '',
          specialNotes: parts[5] || ''
        });
      }
    }
    
    return employees;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    // Validation
    if (!formData.companyName.trim()) {
      setError(t('subscribe.errors.company_name_required'));
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(formData.companyEmail)) {
      setError(t('subscribe.errors.invalid_email'));
      setIsSubmitting(false);
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError(t('subscribe.errors.invalid_phone'));
      setIsSubmitting(false);
      return;
    }

    const employees = parseEmployees(formData.employees);
    if (employees.length === 0) {
      setError(t('subscribe.errors.no_employees'));
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          employees: employees
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(t('subscribe.success.message'));
        setIsSubmitted(true);
        setFormData({
          companyName: '',
          companyEmail: '',
          phone: '',
          employees: ''
        });
      } else {
        setError(result.error || t('subscribe.errors.submission_failed'));
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setError(t('subscribe.errors.network_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Navigation */}
        <nav className="bg-black shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-yellow-500">StraxKaka</Link>
              </div>
              <div className="flex items-center space-x-4">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </nav>

        {/* Success Message */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🎉</span>
            </div>
            <LanguageContent fallback={
              <>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Takk fyrir skráninguna!</h1>
                <p className="text-xl text-gray-600 mb-8">
                  Við höfum móttekið áskriftarbeiðni fyrir fyrirtækið þitt. Við höfum sent greiðslubeiðni á símanúmerið þitt.
                </p>
                <div className="space-y-4">
                  <Link href="/" className="bg-yellow-500 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-colors inline-block">
                    Til baka á heimasíðuna
                  </Link>
                  <br />
                  <Link href="/dashboard" className="text-yellow-600 hover:text-yellow-700 font-medium">
                    Skoða áskriftir
                  </Link>
                </div>
              </>
            }>
              {(t) => (
                <>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('subscribe.success.title')}</h1>
                  <p className="text-xl text-gray-600 mb-8">
                    {t('subscribe.success.message')}
                  </p>
                  <div className="space-y-4">
                    <Link href="/" className="bg-yellow-500 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-colors inline-block">
                      {t('subscribe.success.back_home')}
                    </Link>
                    <br />
                    <Link href="/dashboard" className="text-yellow-600 hover:text-yellow-700 font-medium">
                      {t('subscribe.success.view_dashboard')}
                    </Link>
                  </div>
                </>
              )}
            </LanguageContent>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-black shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-yellow-500">StraxKaka</Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <LanguageContent fallback={<Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors">Heim</Link>}>
                {(t) => <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.home')}</Link>}
              </LanguageContent>
              <LanguageContent fallback={<Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">Um okkur</Link>}>
                {(t) => <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.about')}</Link>}
              </LanguageContent>
              <LanguageContent fallback={<Link href="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">Þjónusta</Link>}>
                {(t) => <Link href="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.services')}</Link>}
              </LanguageContent>
              <LanguageContent fallback={<Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">Hafa samband</Link>}>
                {(t) => <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.contact')}</Link>}
              </LanguageContent>
              <LanguageContent fallback={<Link href="/subscription" className="text-yellow-500 font-semibold">Áskrift</Link>}>
                {(t) => <Link href="/subscription" className="text-yellow-500 font-semibold">{t('nav.subscription')}</Link>}
              </LanguageContent>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <LanguageContent fallback={
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Skráðu fyrirtækið þitt
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Byrjaðu að nota StraxKaka í dag og gleymdu aldrei afmælisdögum starfsmanna
              </p>
            </>
          }>
            {(t) => (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {t('subscribe.hero.title')}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  {t('subscribe.hero.subtitle')}
                </p>
              </>
            )}
          </LanguageContent>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <LanguageContent fallback={
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fyrirtækisheiti *</label>
                }>
                  {(t) => <label className="block text-sm font-medium text-gray-700 mb-2">{t('subscribe.form.company_name')} *</label>}
                </LanguageContent>
                <input
                  type="text"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="T.d. StraxKaka ehf."
                />
              </div>
              
              <div>
                <LanguageContent fallback={
                  <label className="block text-sm font-medium text-gray-700 mb-2">Netfang fyrirtækis *</label>
                }>
                  {(t) => <label className="block text-sm font-medium text-gray-700 mb-2">{t('subscribe.form.company_email')} *</label>}
                </LanguageContent>
                <input
                  type="email"
                  name="companyEmail"
                  required
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="orders@straxkaka.is"
                />
              </div>
              
              <div>
                <LanguageContent fallback={
                  <label className="block text-sm font-medium text-gray-700 mb-2">Símanúmer (7 tölustafir) *</label>
                }>
                  {(t) => <label className="block text-sm font-medium text-gray-700 mb-2">{t('subscribe.form.phone')} *</label>}
                </LanguageContent>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="1234567"
                  maxLength={7}
                />
                <p className="text-sm text-gray-500 mt-1">
                  <LanguageContent fallback="Fyrir Aur greiðslur">
                    {(t) => t('subscribe.form.phone_help')}
                  </LanguageContent>
                </p>
              </div>
            </div>

            {/* Employees Section */}
            <div>
              <LanguageContent fallback={
                <label className="block text-sm font-medium text-gray-700 mb-2">Starfsmenn (CSV format) *</label>
              }>
                {(t) => <label className="block text-sm font-medium text-gray-700 mb-2">{t('subscribe.form.employees')} *</label>}
              </LanguageContent>
              <textarea
                name="employees"
                required
                rows={8}
                value={formData.employees}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Nafn,Afmælisdagur,Kökutegund,Stærð,Matarheftir,Athugasemdir&#10;Jón Jónsson,1990-05-15,Súkkulaði,Meðalstór,Engar,Extra súkkulaði&#10;Anna Anna,1985-12-03,Vanillu,Stór,Laktósa,Ókeypis"
              />
              <div className="mt-2 text-sm text-gray-600">
                <LanguageContent fallback={
                  <>
                    <p><strong>Snið:</strong> Nafn,Afmælisdagur,Kökutegund,Stærð,Matarheftir,Athugasemdir</p>
                    <p><strong>Stærðir:</strong> small, medium, large, extra-large</p>
                    <p><strong>Dagsetning:</strong> YYYY-MM-DD</p>
                  </>
                }>
                  {(t) => (
                    <>
                      <p><strong>{t('subscribe.form.format')}:</strong> {t('subscribe.form.format_example')}</p>
                      <p><strong>{t('subscribe.form.date_format')}:</strong> YYYY-MM-DD</p>
                    </>
                  )}
                </LanguageContent>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-700">{success}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-yellow-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <LanguageContent fallback="Skrái...">
                    {(t) => t('subscribe.form.submitting')}
                  </LanguageContent>
                ) : (
                  <LanguageContent fallback="Skrá áskrift">
                    {(t) => t('subscribe.form.submit')}
                  </LanguageContent>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}