'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import LanguageContent from '@/components/LanguageContent';
import { SUBSCRIPTION_PRICING, SubscriptionTier } from '@/contexts/SubscriptionContext';

interface PricingTableProps {
  selectedTier?: SubscriptionTier;
  onTierSelect?: (tier: SubscriptionTier) => void;
  employeeCount?: number;
  showSelection?: boolean;
}

export default function PricingTable({ 
  selectedTier, 
  onTierSelect, 
  employeeCount = 0,
  showSelection = false 
}: PricingTableProps) {
  const { t } = useLanguage();

  const getTierForEmployeeCount = (count: number) => {
    return SUBSCRIPTION_PRICING.find(p => 
      count >= p.minEmployees && count <= p.maxEmployees
    ) || SUBSCRIPTION_PRICING[3]; // Default to enterprise
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('is-IS', {
      style: 'currency',
      currency: 'ISK',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <LanguageContent fallback={
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Verðskrá</h2>
        }>
          {(t) => <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('pricing.title')}</h2>}
        </LanguageContent>
        <LanguageContent fallback={
          <p className="text-gray-600">Veldu þá áskriftarstig sem hentar fyrirtækinu þínu</p>
        }>
          {(t) => <p className="text-gray-600">{t('pricing.subtitle')}</p>}
        </LanguageContent>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SUBSCRIPTION_PRICING.map((pricing) => {
          const isSelected = selectedTier === pricing.tier;
          const isRecommended = pricing.tier === 'small';
          const isEnterprise = pricing.tier === 'enterprise';
          const isApplicable = employeeCount >= pricing.minEmployees && employeeCount <= pricing.maxEmployees;

          return (
            <div
              key={pricing.tier}
              className={`relative rounded-xl border-2 p-6 transition-all duration-200 ${
                isSelected 
                  ? 'border-yellow-500 bg-yellow-50' 
                  : isRecommended 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
              } ${showSelection ? 'cursor-pointer' : ''}`}
              onClick={() => showSelection && onTierSelect?.(pricing.tier)}
            >
              {isRecommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    <LanguageContent fallback="Mælt með">
                      {(t) => t('pricing.recommended')}
                    </LanguageContent>
                  </span>
                </div>
              )}

              {isSelected && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                    ✓
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  <LanguageContent fallback={pricing.name}>
                    {(t) => t(`pricing.tiers.${pricing.tier}.name`)}
                  </LanguageContent>
                </h3>
                
                <div className="mb-4">
                  {pricing.basePrice === 0 ? (
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        <LanguageContent fallback="Hafa samband fyrir verð">
                          {(t) => t('pricing.contact_for_pricing')}
                        </LanguageContent>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-3xl font-bold text-gray-900">
                        {formatPrice(pricing.basePrice)}
                      </div>
                      <div className="text-sm text-gray-600">
                        <LanguageContent fallback="á mánuði + kökugjöld">
                          {(t) => `${t('pricing.per_month')} + cake costs`}
                        </LanguageContent>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  <LanguageContent fallback={`${pricing.minEmployees}-${pricing.maxEmployees === 999 ? '∞' : pricing.maxEmployees} starfsmenn`}>
                    {(t) => `${pricing.minEmployees}-${pricing.maxEmployees === 999 ? '∞' : pricing.maxEmployees} ${t('pricing.employees')}`}
                  </LanguageContent>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  <LanguageContent fallback={pricing.description}>
                    {(t) => t(`pricing.tiers.${pricing.tier}.description`)}
                  </LanguageContent>
                </p>

                {employeeCount > 0 && (
                  <div className={`text-sm font-medium p-2 rounded ${
                    isApplicable 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {isApplicable ? (
                      <LanguageContent fallback="Hentar fyrir fyrirtækið þitt">
                        {(t) => t('pricing.suitable')}
                      </LanguageContent>
                    ) : (
                      <LanguageContent fallback="Ekki hentar fyrir fyrirtækið þitt">
                        {(t) => t('pricing.not_suitable')}
                      </LanguageContent>
                    )}
                  </div>
                )}

                {showSelection && (
                  <button
                    className={`w-full mt-4 py-2 px-4 rounded-lg font-medium transition-colors ${
                      isSelected
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {isSelected ? (
                      <LanguageContent fallback="Valið">
                        {(t) => t('pricing.selected')}
                      </LanguageContent>
                    ) : (
                      <LanguageContent fallback="Velja">
                        {(t) => t('pricing.select')}
                      </LanguageContent>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {employeeCount > 0 && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              <LanguageContent fallback="Fyrir fyrirtækið þitt">
                {(t) => t('pricing.for_your_company')}
              </LanguageContent>
            </h3>
            <div className="text-2xl font-bold text-yellow-600 mb-2">
              {(() => {
                const tier = getTierForEmployeeCount(employeeCount);
                return tier.tier === 'enterprise' 
                  ? t('pricing.tiers.enterprise.price')
                  : formatPrice(tier.basePrice);
              })()}
            </div>
            <p className="text-gray-600">
              <LanguageContent fallback={`Fyrir ${employeeCount} starfsmenn`}>
                {(t) => `${t('pricing.for')} ${employeeCount} ${t('pricing.employees')}`}
              </LanguageContent>
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <LanguageContent fallback={
          <p className="text-sm text-gray-600">
            Allar verðir eru með 24% VSK. Engin uppsetningargjald. Hægt að hætta hvenær sem er.
          </p>
        }>
          {(t) => (
            <p className="text-sm text-gray-600">
              {t('pricing.disclaimer')}
            </p>
          )}
        </LanguageContent>
      </div>
    </div>
  );
}

