'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSubscription, SubscriptionTier, SubscriptionStatus, CAKE_TYPES } from '@/contexts/SubscriptionContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import LanguageContent from '@/components/LanguageContent';
import EnhancedFileUpload from '@/components/EnhancedFileUpload';
import PricingTable from '@/components/PricingTable';
import Navigation from '@/components/Navigation';
import MobileBottomNav from '@/components/MobileBottomNav';
import BirthdayPicker from '@/components/BirthdayPicker';

interface Employee {
  name: string;
  birthday: string;
  cakeType: string;
  dietaryRestrictions: string;
  specialNotes: string;
}

interface CompanyData {
  companyName: string;
  contactPersonName: string;
  contactEmail: string;
  contactPhone: string;
  deliveryAddress: string;
}

export default function Subscription() {
  const { t, language } = useLanguage();
  const { 
    calculateSubscriptionCost, 
    isHydrated 
  } = useSubscription();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [companyData, setCompanyData] = useState<CompanyData>({
    companyName: '',
    contactPersonName: '',
    contactEmail: '',
    contactPhone: '',
    deliveryAddress: ''
  });
  
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [savedEmployees, setSavedEmployees] = useState<Set<number>>(new Set());
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>('small');
  const [paymentMethod, setPaymentMethod] = useState<'aur' | 'bank_transfer'>('aur');
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [bankDetails, setBankDetails] = useState<{
    aurNumber?: string;
    bankName?: string;
    accountNumber?: string;
    reference?: string;
    orderId?: string;
    amount?: number;
  } | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,}$/;
    return phoneRegex.test(phone);
  };

  const validateBirthday = (birthday: string) => {
    const date = new Date(birthday);
    const today = new Date();
    return date < today && date > new Date('1900-01-01');
  };

  const addEmployee = () => {
    setEmployees(prev => [...prev,     {
      name: '',
      birthday: '',
      cakeType: '',
      dietaryRestrictions: '',
      specialNotes: ''
    }]);
  };

  const removeEmployee = (index: number) => {
    setEmployees(prev => prev.filter((_, i) => i !== index));
  };

  const updateEmployee = (index: number, field: keyof Employee, value: string) => {
    setEmployees(prev => prev.map((emp, i) => 
      i === index ? { ...emp, [field]: value } : emp
    ));
    // Remove from saved employees when editing
    if (savedEmployees.has(index)) {
      setSavedEmployees(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }
  };

  const saveEmployee = (index: number) => {
    const employee = employees[index];
    if (employee.name && employee.birthday && employee.cakeType) {
      setSavedEmployees(prev => new Set(prev).add(index));
    }
  };

  const editEmployee = (index: number) => {
    setSavedEmployees(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  const updateCompanyData = (field: keyof CompanyData, value: string) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileEmployeesAdded = (newEmployees: Employee[]) => {
    setEmployees(prev => [...prev, ...newEmployees]);
    setSuccess(`${newEmployees.length} ${t('subscription.success.employees_added')}`);
    setShowFileUpload(false);
    setError('');
  };

  const handleFileError = (errorMessage: string) => {
    setError(errorMessage);
    setSuccess('');
  };

  const validateStep1 = () => {
    if (!companyData.companyName.trim()) {
      setError(t('subscription.errors.company_name_required'));
      return false;
    }
    if (!validateEmail(companyData.contactEmail)) {
      setError(t('subscription.errors.invalid_email'));
      return false;
    }
    if (!validatePhone(companyData.contactPhone)) {
      setError(t('subscription.errors.invalid_phone'));
      return false;
    }
    if (!companyData.deliveryAddress.trim()) {
      setError(t('subscription.errors.address_required'));
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (employees.length === 0) {
      setError(t('subscription.errors.no_employees'));
      return false;
    }
    
    for (const employee of employees) {
      if (!employee.name.trim()) {
        setError(t('subscription.errors.employee_name_required'));
        return false;
      }
      if (!employee.birthday) {
        setError(t('subscription.errors.birthday_required'));
        return false;
      }
      if (!validateBirthday(employee.birthday)) {
        setError(t('subscription.errors.invalid_birthday'));
        return false;
      }
      if (!employee.cakeType.trim()) {
        setError(t('subscription.errors.cake_type_required'));
        return false;
      }
    }
    return true;
  };

  const validateStep3 = () => {
    if (!selectedTier) {
      setError(t('subscription.errors.tier_required'));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError('');
    setSuccess('');
    
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    } else if (currentStep === 3 && validateStep3()) {
      setCurrentStep(4);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async () => {
    if (!validateStep1() || !validateStep2() || !validateStep3()) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Get the selected tier pricing
      const { cost } = calculateSubscriptionCost(employees.length);
      
      // Generate mock order ID
      const orderId = `STRAX-${Date.now()}`;
      
      // Save subscription data to localStorage for admin page
      const subscriptionData = {
        id: orderId,
        companyName: companyData.companyName,
        contactPersonName: companyData.contactPersonName,
        contactEmail: companyData.contactEmail,
        contactPhone: companyData.contactPhone,
        deliveryAddress: companyData.deliveryAddress,
        employees: employees,
        subscriptionTier: selectedTier,
        monthlyCost: cost,
        paymentMethod: paymentMethod,
        status: 'pending_payment',
        dateCreated: new Date().toISOString(),
        orderId: orderId
      };

      // Save to localStorage
      const existingSubscriptions = JSON.parse(localStorage.getItem('straxkaka_subscriptions') || '[]');
      existingSubscriptions.push(subscriptionData);
      localStorage.setItem('straxkaka_subscriptions', JSON.stringify(existingSubscriptions));

      // Send email notification
      try {
        const emailResponse = await fetch('/api/subscription/notify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subscriptionData),
        });

        if (!emailResponse.ok) {
          console.warn('Email notification failed, but subscription was saved');
        }
      } catch (emailError) {
        console.warn('Email notification error:', emailError);
        // Don't fail the submission if email fails
      }
      
      if (paymentMethod === 'aur') {
        setSuccess(t('subscription.payment.success_message'));
        setBankDetails({
          aurNumber: '+354 790 4777',
          orderId: orderId,
          amount: cost
        });
      } else {
        setSuccess(t('subscription.payment.bank_transfer.success_message'));
        setBankDetails({
          bankName: '',
          accountNumber: '2200-26-790477',
          reference: orderId,
          amount: cost
        });
      }
      setIsSubmitted(true);
      
    } catch (err) {
      setError(t('subscription.errors.submission_failed'));
      console.error('Payment error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <LanguageContent fallback="Hleð gögnum...">
            {(t) => <p className="text-gray-600">{t('subscription.loading')}</p>}
          </LanguageContent>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navigation currentPage="subscription" />

        {/* Success Message */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            {paymentMethod === 'aur' ? (
              <>
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📱</span>
                </div>
                <LanguageContent fallback={
                  <>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Greiðslubeiðni send!</h1>
                    <p className="text-xl text-gray-600 mb-8">
                      Við höfum sent greiðslubeiðni á símanúmerið þitt. Vinsamlegast ljúktu greiðslunni til að virkja áskriftina.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                      <p className="text-yellow-800 font-medium">
                        Símanúmer: <strong>{companyData.contactPhone}</strong>
                      </p>
                      <p className="text-yellow-700 text-sm mt-1">
                        Þú færð SMS með hlekk til að ljúka greiðslunni
                      </p>
                    </div>
                  </>
                }>
                  {(t) => (
                    <>
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('subscription.payment.success_title')}</h1>
                      <p className="text-xl text-gray-600 mb-8">
                        {t('subscription.payment.success_message')}
                      </p>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                        <p className="text-yellow-800 font-medium">
                          AUR númer: <strong>{bankDetails?.aurNumber || companyData.contactPhone}</strong>
                        </p>
                        <p className="text-yellow-700 text-sm mt-1">
                          Sendu greiðsluna á þetta AUR númer með viðmiðunarnúmeri: <strong>{bankDetails?.orderId}</strong>
                        </p>
                        <p className="text-yellow-700 text-sm mt-1">
                          Upphæð: <strong>{bankDetails?.amount?.toLocaleString('is-IS') || '0'} ISK</strong>
                        </p>
                      </div>
                    </>
                  )}
                </LanguageContent>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🏦</span>
                </div>
                <LanguageContent fallback={
                  <>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Bankaupplýsingar búnar til!</h1>
                    <p className="text-xl text-gray-600 mb-8">
                      Vinsamlegast ljúktu bankagreiðslunni til að virkja áskriftina.
                    </p>
                    {bankDetails && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
                        <h3 className="text-lg font-semibold text-blue-900 mb-4">Bankagreiðsluupplýsingar</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-blue-700 font-medium">Reikningsnúmer:</span>
                            <span className="text-blue-900 font-mono">{bankDetails.accountNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700 font-medium">Viðmiðunarnúmer:</span>
                            <span className="text-blue-900 font-mono">{bankDetails.reference}</span>
                          </div>
                          <div className="flex justify-between text-lg font-semibold border-t pt-2">
                            <span className="text-blue-700">Upphæð:</span>
                            <span className="text-blue-900">{bankDetails.amount?.toLocaleString('is-IS') || '0'} ISK</span>
                          </div>
                        </div>
                        <p className="text-blue-600 text-sm mt-4 text-center">
                          Vinsamlegast ljúktu bankagreiðslunni. Áskriftin verður virkjuð þegar greiðslan er staðfest.
                        </p>
                      </div>
                    )}
                  </>
                }>
                  {(t) => (
                    <>
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('subscription.payment.bank_transfer.success_title')}</h1>
                      <p className="text-xl text-gray-600 mb-8">
                        {t('subscription.payment.bank_transfer.success_message')}
                      </p>
                      {bankDetails && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
                          <h3 className="text-lg font-semibold text-blue-900 mb-4">{t('subscription.payment.bank_transfer.instructions')}</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-blue-700 font-medium">{t('subscription.payment.bank_transfer.account_number')}:</span>
                              <span className="text-blue-900 font-mono">{bankDetails.accountNumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-700 font-medium">{t('subscription.payment.bank_transfer.reference')}:</span>
                              <span className="text-blue-900 font-mono">{bankDetails.reference}</span>
                            </div>
                            <div className="flex justify-between text-lg font-semibold border-t pt-2">
                              <span className="text-blue-700">{t('subscription.payment.bank_transfer.amount')}:</span>
                              <span className="text-blue-900">{bankDetails.amount?.toLocaleString('is-IS') || '0'} ISK</span>
                            </div>
                          </div>
                          <p className="text-blue-600 text-sm mt-4 text-center">
                            {t('subscription.payment.bank_transfer.note')}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </LanguageContent>
              </>
            )}
            <div className="space-y-4">
              <Link href="/" className="bg-yellow-500 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-colors inline-block">
                <LanguageContent fallback="Til baka á heimasíðuna">
                  {(t) => t('subscription.success.back_home')}
                </LanguageContent>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20 md:pb-0">
      <Navigation currentPage="subscription" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Service Overview */}
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-8 mb-8 border border-yellow-200">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <LanguageContent fallback="Byrjaðu áskrift á StraxKaka">
                {(t) => t('subscription.hero.title')}
              </LanguageContent>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              <LanguageContent fallback="Aldrei gleymdu afmæli aftur - við sjáum um það fyrir þig">
                {(t) => t('subscription.hero.subtitle')}
              </LanguageContent>
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  <LanguageContent fallback="Sjálfvirk áminning">
                    {(t) => t('subscription.features.automatic')}
                  </LanguageContent>
                </h3>
                <p className="text-sm text-gray-600">
                  <LanguageContent fallback="Við muna öll afmæli fyrir þig">
                    {(t) => t('subscription.features.automatic_desc')}
                  </LanguageContent>
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  <LanguageContent fallback="Áfhending">
                    {(t) => t('subscription.features.delivery')}
                  </LanguageContent>
                </h3>
                <p className="text-sm text-gray-600">
                  <LanguageContent fallback="Kökur koma beint á vinnustaðinn">
                    {(t) => t('subscription.features.delivery_desc')}
                  </LanguageContent>
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  <LanguageContent fallback="Einfalt">
                    {(t) => t('subscription.features.simple')}
                  </LanguageContent>
                </h3>
                <p className="text-sm text-gray-600">
                  <LanguageContent fallback="Engin flækja - bara fínn þjónusta">
                    {(t) => t('subscription.features.simple_desc')}
                  </LanguageContent>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[
              { step: 1, icon: '🏢', label: 'Fyrirtæki' },
              { step: 2, icon: '👥', label: 'Starfsmenn' },
              { step: 3, icon: '📋', label: 'Áskrift' },
              { step: 4, icon: '💳', label: 'Greiðsla' }
            ].map(({ step, icon }) => (
              <div key={step} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-300 ${
                  currentStep >= step 
                    ? 'bg-yellow-500 text-black shadow-lg' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {currentStep >= step ? icon : step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                    currentStep > step ? 'bg-yellow-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-16">
            <LanguageContent fallback="Fyrirtækisupplýsingar">
              {(t) => <span className={`text-sm font-medium ${currentStep === 1 ? 'text-yellow-600' : 'text-gray-500'}`}>{t('subscription.steps.company')}</span>}
            </LanguageContent>
            <LanguageContent fallback="Starfsmenn">
              {(t) => <span className={`text-sm font-medium ${currentStep === 2 ? 'text-yellow-600' : 'text-gray-500'}`}>{t('subscription.steps.employees')}</span>}
            </LanguageContent>
            <LanguageContent fallback="Áskrift">
              {(t) => <span className={`text-sm font-medium ${currentStep === 3 ? 'text-yellow-600' : 'text-gray-500'}`}>{t('subscription.steps.subscription')}</span>}
            </LanguageContent>
            <LanguageContent fallback="Greiðsla">
              {(t) => <span className={`text-sm font-medium ${currentStep === 4 ? 'text-yellow-600' : 'text-gray-500'}`}>{t('subscription.steps.payment')}</span>}
            </LanguageContent>
          </div>
        </div>

        {/* Step 1: Company Information */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <LanguageContent fallback={
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Fyrirtækisupplýsingar</h2>
            }>
              {(t) => <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('subscription.company.title')}</h2>}
            </LanguageContent>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <LanguageContent fallback={
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fyrirtækisheiti *</label>
                }>
                  {(t) => <label className="block text-sm font-medium text-gray-700 mb-2">{t('subscription.company.name')} *</label>}
                </LanguageContent>
                <input
                  type="text"
                  required
                  value={companyData.companyName}
                  onChange={(e) => updateCompanyData('companyName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <LanguageContent fallback={
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nafn tengiliðs *</label>
                }>
                  {(t) => <label className="block text-sm font-medium text-gray-700 mb-2">{t('subscription.company.contact_name')} *</label>}
                </LanguageContent>
                <input
                  type="text"
                  required
                  value={companyData.contactPersonName}
                  onChange={(e) => updateCompanyData('contactPersonName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <LanguageContent fallback={
                  <label className="block text-sm font-medium text-gray-700 mb-2">Netfang *</label>
                }>
                  {(t) => <label className="block text-sm font-medium text-gray-700 mb-2">{t('subscription.company.email')} *</label>}
                </LanguageContent>
                <input
                  type="email"
                  required
                  value={companyData.contactEmail}
                  onChange={(e) => updateCompanyData('contactEmail', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <LanguageContent fallback={
                  <label className="block text-sm font-medium text-gray-700 mb-2">Símanúmer *</label>
                }>
                  {(t) => <label className="block text-sm font-medium text-gray-700 mb-2">{t('subscription.company.phone')} *</label>}
                </LanguageContent>
                <input
                  type="tel"
                  required
                  value={companyData.contactPhone}
                  onChange={(e) => updateCompanyData('contactPhone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <LanguageContent fallback={
                <label className="block text-sm font-medium text-gray-700 mb-2">Afhendingarheimilisfang *</label>
              }>
                {(t) => <label className="block text-sm font-medium text-gray-700 mb-2">{t('subscription.company.address')} *</label>}
              </LanguageContent>
              <textarea
                required
                rows={3}
                value={companyData.deliveryAddress}
                onChange={(e) => updateCompanyData('deliveryAddress', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Step 2: Employees */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <LanguageContent fallback={
                <h2 className="text-2xl font-bold text-gray-900">Starfsmenn</h2>
              }>
                {(t) => <h2 className="text-2xl font-bold text-gray-900">{t('subscription.employees.title')}</h2>}
              </LanguageContent>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setShowFileUpload(!showFileUpload)}
                  className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
                >
                  <LanguageContent fallback="Hlaða upp skrá">
                    {(t) => t('subscription.employees.file_upload')}
                  </LanguageContent>
                </button>
                <button
                  type="button"
                  onClick={addEmployee}
                  className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
                >
                  <LanguageContent fallback="Bæta við starfsmanni">
                    {(t) => t('subscription.employees.add')}
                  </LanguageContent>
                </button>
              </div>
            </div>

            {/* File Upload Section */}
            {showFileUpload && (
              <div className="mb-6">
                <EnhancedFileUpload
                  onEmployeesAdded={handleFileEmployeesAdded}
                  onError={handleFileError}
                />
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <span className="text-green-600 text-xl mr-2">✅</span>
                  <p className="text-green-700 font-medium">{success}</p>
                </div>
              </div>
            )}

            {/* Employee Forms */}
            {employees.map((employee, index) => {
              const isSaved = savedEmployees.has(index);
              const isValid = employee.name && employee.birthday && employee.cakeType;
              
              return (
                <div key={index} className={`border rounded-lg mb-4 transition-all duration-300 ${
                  isSaved 
                    ? 'border-yellow-300 bg-yellow-50 p-4' 
                    : 'border-gray-200 bg-white p-6'
                }`}>
                  {isSaved ? (
                    // Compact saved view
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-600 text-lg">✅</span>
                          <span className="font-medium text-gray-900">{employee.name}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <span className="text-yellow-600">🎂</span>
                            <span>{new Date(employee.birthday).toLocaleDateString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span className="text-yellow-600">🍰</span>
                            <span>{CAKE_TYPES.find(cake => cake.id === employee.cakeType)?.nameIcelandic || employee.cakeType}</span>
                          </span>
                          {employee.dietaryRestrictions && (
                            <span className="flex items-center space-x-1 text-red-600">
                              <span>⚠️</span>
                              <span>{employee.dietaryRestrictions}</span>
                            </span>
                          )}
                          {employee.specialNotes && (
                            <span className="flex items-center space-x-1 text-gray-500">
                              <span>📝</span>
                              <span>{employee.specialNotes}</span>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => editEmployee(index)}
                          className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors font-medium"
                        >
                          ✏️ <LanguageContent fallback="Breyta">
                            {(t) => t('subscription.employees.edit')}
                          </LanguageContent>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeEmployee(index)}
                          className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors font-medium"
                        >
                          🗑️ <LanguageContent fallback="Fjarlægja">
                            {(t) => t('subscription.employees.remove')}
                          </LanguageContent>
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Full form view
                    <>
                <div className="flex justify-between items-center mb-4">
                  <LanguageContent fallback={
                    <h3 className="text-lg font-semibold text-gray-900">Starfsmaður {index + 1}</h3>
                  }>
                    {(t) => <h3 className="text-lg font-semibold text-gray-900">{t('subscription.employees.employee')} {index + 1}</h3>}
                  </LanguageContent>
                  <button
                    type="button"
                    onClick={() => removeEmployee(index)}
                          className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors font-medium"
                  >
                          🗑️ <LanguageContent fallback="Fjarlægja">
                      {(t) => t('subscription.employees.remove')}
                    </LanguageContent>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <LanguageContent fallback={
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nafn *</label>
                    }>
                      {(t) => <label className="block text-sm font-medium text-gray-700 mb-2">{t('subscription.employees.name')} *</label>}
                    </LanguageContent>
                    <input
                      type="text"
                      required
                      value={employee.name}
                      onChange={(e) => updateEmployee(index, 'name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <LanguageContent fallback={
                      <label className="block text-sm font-medium text-gray-700 mb-2">Afmælisdagur *</label>
                    }>
                      {(t) => <label className="block text-sm font-medium text-gray-700 mb-2">{t('subscription.employees.birthday')} *</label>}
                    </LanguageContent>
                    <BirthdayPicker
                      value={employee.birthday}
                      onChange={(value) => updateEmployee(index, 'birthday', value)}
                      placeholder="Veldu afmælisdag"
                      className="text-gray-700"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      <LanguageContent fallback="Smelltu á reitinn til að velja dagsetningu">
                        {(t) => t('subscription.employees.birthday_hint')}
                      </LanguageContent>
                    </p>
                  </div>

                  <div>
                    <LanguageContent fallback={
                      <label className="block text-sm font-medium text-gray-700 mb-2">Kökutegund *</label>
                    }>
                      {(t) => <label className="block text-sm font-medium text-gray-700 mb-2">{t('subscription.employees.cake_type')} *</label>}
                    </LanguageContent>
                    <select
                      required
                      value={employee.cakeType}
                      onChange={(e) => updateEmployee(index, 'cakeType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="">Veldu kökutegund</option>
                      {CAKE_TYPES.map((cake) => (
                        <option key={cake.id} value={cake.id}>
                          {language === 'is' ? cake.nameIcelandic : cake.nameEnglish} - {cake.price.toLocaleString('is-IS')} ISK
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <LanguageContent fallback={
                      <label className="block text-sm font-medium text-gray-700 mb-2">Matarheftir</label>
                    }>
                      {(t) => <label className="block text-sm font-medium text-gray-700 mb-2">{t('subscription.employees.dietary')}</label>}
                    </LanguageContent>
                    <input
                      type="text"
                      value={employee.dietaryRestrictions}
                      onChange={(e) => updateEmployee(index, 'dietaryRestrictions', e.target.value)}
                      placeholder="T.d. vegan, laktósa, nóta..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <LanguageContent fallback={
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sérstakar athugasemdir</label>
                    }>
                      {(t) => <label className="block text-sm font-medium text-gray-700 mb-2">{t('subscription.employees.notes')}</label>}
                    </LanguageContent>
                    <input
                      type="text"
                      value={employee.specialNotes}
                      onChange={(e) => updateEmployee(index, 'specialNotes', e.target.value)}
                      placeholder="T.d. sérstök ósk um dekór..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                </div>
                      
                      {/* Save Button at Bottom Left */}
                      {isValid && (
                        <div className="mt-4 flex justify-start">
                          <button
                            type="button"
                            onClick={() => saveEmployee(index)}
                            className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors font-medium shadow-md"
                          >
                            💾 <LanguageContent fallback="Vista">
                              {(t) => t('subscription.employees.save')}
                            </LanguageContent>
                          </button>
              </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Step 3: Subscription - Same as Home Page */}
        {currentStep === 3 && (
          <div className="space-y-8">
            {/* Pricing Section - Same as Home Page */}
            <section className="py-20 bg-black rounded-2xl">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    <LanguageContent fallback="Einfalt verð">
                      {(t) => t('pricing.simple.title')}
                    </LanguageContent>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    <LanguageContent fallback="Veldu réttan áætlun fyrir stærð fyrirtækisins þíns">
                      {(t) => t('pricing.simple.subtitle')}
                    </LanguageContent>
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {/* Little Company */}
                  <div 
                    className={`bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl p-8 text-black relative cursor-pointer transition-all duration-300 ${
                      selectedTier === 'small' ? 'ring-4 ring-yellow-300 shadow-2xl' : 'hover:shadow-xl'
                    }`}
                    onClick={() => setSelectedTier('small')}
                  >
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-4">
                        <LanguageContent fallback="Lítil fyrirtæki">
                          {(t) => t('pricing.little.title')}
                        </LanguageContent>
                      </h3>
                      <div className="text-4xl font-bold mb-2">
                        <LanguageContent fallback="15.000 ISK">
                          {(t) => t('pricing.little.price')}
                        </LanguageContent>
                      </div>
                      <div className="text-lg mb-6">
                        <LanguageContent fallback="á mánuði + kökugjöld">
                          {(t) => t('pricing.little.billing')}
                        </LanguageContent>
                      </div>
                      <div className="text-sm mb-8">
                        <LanguageContent fallback="Hentar fyrir 1-25 starfsmenn">
                          {(t) => t('pricing.little.description')}
                        </LanguageContent>
                      </div>
                      {selectedTier === 'small' && (
                        <div className="text-lg font-bold text-black">
                          <LanguageContent fallback="Valið">
                            {(t) => t('pricing.selected')}
                          </LanguageContent>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Medium Company */}
                  <div 
                    className={`bg-gray-800 rounded-2xl p-8 text-white relative border-2 border-yellow-500 cursor-pointer transition-all duration-300 ${
                      selectedTier === 'medium' ? 'ring-4 ring-yellow-300 shadow-2xl' : 'hover:shadow-xl'
                    }`}
                    onClick={() => setSelectedTier('medium')}
                  >
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-medium">
                        <LanguageContent fallback="Mælt með">
                          {(t) => t('pricing.recommended')}
                        </LanguageContent>
                      </span>
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-4">
                        <LanguageContent fallback="Meðalstór fyrirtæki">
                          {(t) => t('pricing.medium.title')}
                        </LanguageContent>
                      </h3>
                      <div className="text-4xl font-bold mb-2 text-yellow-500">
                        <LanguageContent fallback="Hafa samband">
                          {(t) => t('pricing.contact_for_pricing')}
                        </LanguageContent>
                      </div>
                      <div className="text-lg mb-6">
                        <LanguageContent fallback="fyrir verð">
                          {(t) => t('pricing.for_pricing')}
                        </LanguageContent>
                      </div>
                      <div className="text-sm mb-8">
                        <LanguageContent fallback="Hentar fyrir 26-50 starfsmenn">
                          {(t) => t('pricing.medium.description')}
                        </LanguageContent>
                      </div>
                      {selectedTier === 'medium' && (
                        <div className="text-lg font-bold text-yellow-500">
                          <LanguageContent fallback="Valið">
                            {(t) => t('pricing.selected')}
                          </LanguageContent>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Large Company */}
                  <div 
                    className={`bg-gray-800 rounded-2xl p-8 text-white cursor-pointer transition-all duration-300 ${
                      selectedTier === 'large' ? 'ring-4 ring-yellow-300 shadow-2xl' : 'hover:shadow-xl'
                    }`}
                    onClick={() => setSelectedTier('large')}
                  >
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-4">
                        <LanguageContent fallback="Stór fyrirtæki">
                          {(t) => t('pricing.large.title')}
                        </LanguageContent>
                      </h3>
                      <div className="text-4xl font-bold mb-2 text-yellow-500">
                        <LanguageContent fallback="Hafa samband">
                          {(t) => t('pricing.contact_for_pricing')}
                        </LanguageContent>
                      </div>
                      <div className="text-lg mb-6">
                        <LanguageContent fallback="fyrir verð">
                          {(t) => t('pricing.for_pricing')}
                        </LanguageContent>
                      </div>
                      <div className="text-sm mb-8">
                        <LanguageContent fallback="Hentar fyrir 51+ starfsmenn">
                          {(t) => t('pricing.large.description')}
                        </LanguageContent>
                      </div>
                      {selectedTier === 'large' && (
                        <div className="text-lg font-bold text-yellow-500">
                          <LanguageContent fallback="Valið">
                            {(t) => t('pricing.selected')}
                          </LanguageContent>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Step 4: Payment */}
        {currentStep === 4 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <LanguageContent fallback={
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Greiðsla</h2>
            }>
              {(t) => <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('subscription.payment.title')}</h2>}
            </LanguageContent>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <LanguageContent fallback={
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pöntunaryfirlit</h3>
              }>
                {(t) => <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('subscription.payment.summary')}</h3>}
              </LanguageContent>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <LanguageContent fallback={<span className="text-gray-600">Fyrirtæki:</span>}>
                    {(t) => <span className="text-gray-600">{t('subscription.payment.company')}:</span>}
                  </LanguageContent>
                  <span className="font-medium">{companyData.companyName}</span>
                </div>
                
                <div className="flex justify-between">
                  <LanguageContent fallback={<span className="text-gray-600">Áskriftarstig:</span>}>
                    {(t) => <span className="text-gray-600">{t('subscription.payment.tier')}:</span>}
                  </LanguageContent>
                  <span className="font-medium">{selectedTier?.charAt(0).toUpperCase() + selectedTier?.slice(1)}</span>
                </div>
                
                <div className="flex justify-between">
                  <LanguageContent fallback={<span className="text-gray-600">Fjöldi starfsmanna:</span>}>
                    {(t) => <span className="text-gray-600">{t('subscription.payment.employee_count')}:</span>}
                  </LanguageContent>
                  <span className="font-medium">{employees.length}</span>
                </div>
                
                <div className="flex justify-between text-lg font-semibold border-t pt-3">
                  <LanguageContent fallback={<span className="text-gray-900">Mánaðargjald:</span>}>
                    {(t) => <span className="text-gray-900">{t('subscription.payment.monthly_cost')}:</span>}
                  </LanguageContent>
                  <span className="text-yellow-600">{calculateSubscriptionCost(employees.length).cost.toLocaleString('is-IS')} ISK</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-8">
              <LanguageContent fallback={
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Greiðslumáti</h3>
              }>
                {(t) => <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('subscription.payment.method')}</h3>}
              </LanguageContent>
              
              <div className="space-y-4">
                {/* Aur Payment Option */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'aur' 
                      ? 'border-yellow-500 bg-yellow-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setPaymentMethod('aur')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="aur-payment"
                      name="payment-method"
                      value="aur"
                      checked={paymentMethod === 'aur'}
                      onChange={() => setPaymentMethod('aur')}
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                    />
                    <label htmlFor="aur-payment" className="ml-3 flex items-center">
                      <span className="text-2xl mr-3">📱</span>
                      <div>
                        <LanguageContent fallback={
                          <>
                            <h4 className="text-sm font-medium text-gray-900">Aur greiðsla</h4>
                            <p className="text-sm text-gray-600">
                              Greiðsla verður send á símanúmerið þitt: <strong>{companyData.contactPhone}</strong>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Þú færð SMS með hlekk til að ljúka greiðslunni
                            </p>
                          </>
                        }>
                          {(t) => (
                            <>
                              <h4 className="text-sm font-medium text-gray-900">{t('subscription.payment.aur.title')}</h4>
                              <p className="text-sm text-gray-600">
                                {t('subscription.payment.aur.description').replace('{phone}', companyData.contactPhone)}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {t('subscription.payment.aur.sms_note')}
                              </p>
                            </>
                          )}
                        </LanguageContent>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Bank Transfer Option */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'bank_transfer' 
                      ? 'border-yellow-500 bg-yellow-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setPaymentMethod('bank_transfer')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="bank-transfer"
                      name="payment-method"
                      value="bank_transfer"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                    />
                    <label htmlFor="bank-transfer" className="ml-3 flex items-center">
                      <span className="text-2xl mr-3">🏦</span>
                      <div>
                        <LanguageContent fallback={
                          <>
                            <h4 className="text-sm font-medium text-gray-900">Bankagreiðsla</h4>
                            <p className="text-sm text-gray-600">
                              Fáðu bankaupplýsingar og einstakt viðmiðunarnúmer fyrir greiðslu
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Áskriftin verður virkjuð þegar greiðslan er staðfest
                            </p>
                          </>
                        }>
                          {(t) => (
                            <>
                              <h4 className="text-sm font-medium text-gray-900">{t('subscription.payment.bank_transfer.title')}</h4>
                              <p className="text-sm text-gray-600">
                                {t('subscription.payment.bank_transfer.description')}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {t('subscription.payment.bank_transfer.activation_note')}
                              </p>
                            </>
                          )}
                        </LanguageContent>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-8">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  <LanguageContent fallback={
                    "Ég samþykki að greiða mánaðarlega greiðslu fyrir StraxKaka þjónustuna og skil að hægt er að hætta hvenær sem er."
                  }>
                    {(t) => t('subscription.payment.terms')}
                  </LanguageContent>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LanguageContent fallback="Til baka">
              {(t) => t('subscription.navigation.back')}
            </LanguageContent>
          </button>
          
          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
            >
              <LanguageContent fallback="Áfram">
                {(t) => t('subscription.navigation.next')}
              </LanguageContent>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <LanguageContent fallback="Greiði...">
                  {(t) => t('subscription.navigation.processing')}
                </LanguageContent>
              ) : (
                <LanguageContent fallback="Greiða núna">
                  {(t) => t('subscription.navigation.pay_now')}
                </LanguageContent>
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav currentPage="subscription" />
    </div>
  );
}
