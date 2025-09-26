'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import LanguageContent from '@/components/LanguageContent';

export default function Privacy() {
  const { t } = useLanguage();
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
                  <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.home')}</Link>
                  <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.about')}</Link>
                  <Link href="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.services')}</Link>
                  <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.contact')}</Link>
                </div>
                <div className="flex items-center space-x-4">
                  <LanguageSwitcher />
                  <Link href="/contact" className="bg-yellow-500 text-black px-6 py-2 rounded-full hover:bg-yellow-400 transition-colors font-semibold">
                    {t('nav.start_now')}
                  </Link>
                </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            <LanguageContent fallback="PRIVACY POLICY">
              {(t) => t('privacy.title')}
            </LanguageContent>
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <LanguageContent fallback={<strong>Last updated:</strong>}>
                {(t) => <strong>{t('privacy.last_updated')}:</strong>}
              </LanguageContent>
              <LanguageContent fallback="September 26, 2025">
                {(t) => t('privacy.date')}
              </LanguageContent>
            </p>

            <p className="text-gray-700 mb-6">
              <LanguageContent fallback="This Privacy Notice for StraxLife (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), describes how and why we might access, collect, store, use, and/or share (&ldquo;process&rdquo;) your personal information when you use our services (&ldquo;Services&rdquo;), including when you:">
                {(t) => t('privacy.intro')}
              </LanguageContent>
            </p>
            
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>
                <LanguageContent fallback="Visit our website at straxkaka.is or any website of ours that links to this Privacy Notice">
                  {(t) => t('privacy.website')}
                </LanguageContent>
              </li>
              <li>
                <LanguageContent fallback="Use StraxKaka. A cake automation service, that delivers cakes to companies on birthdays">
                  {(t) => t('privacy.service')}
                </LanguageContent>
              </li>
              <li>
                <LanguageContent fallback="Engage with us in other related ways, including any sales, marketing, or events">
                  {(t) => t('privacy.engage')}
                </LanguageContent>
              </li>
            </ul>
            
            <p className="text-gray-700 mb-6">
              <LanguageContent fallback={<strong>Questions or concerns?</strong>}>
                {(t) => <strong>{t('privacy.questions_title')}</strong>}
              </LanguageContent>
              <LanguageContent fallback="Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at orders.straxkaka@outlook.com.">
                {(t) => t('privacy.questions_text')}
              </LanguageContent>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              <LanguageContent fallback="2. What information do we collect">
                {(t) => `2. ${t('privacy.what_collect_title')}`}
              </LanguageContent>
            </h2>
            <p className="text-gray-700 mb-4">
              <LanguageContent fallback="We collect the following types of personal information:">
                {(t) => t('privacy.what_collect_text')}
              </LanguageContent>
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>
                <LanguageContent fallback="Company information:">
                  {(t) => <strong>{t('privacy.company_info')}</strong>}
                </LanguageContent>
                <LanguageContent fallback="Company name, address, phone number, email">
                  {(t) => ` ${t('privacy.company_info_text')}`}
                </LanguageContent>
              </li>
              <li>
                <LanguageContent fallback="Employee information:">
                  {(t) => <strong>{t('privacy.employee_info')}</strong>}
                </LanguageContent>
                <LanguageContent fallback="Name, birthday, job title, department">
                  {(t) => ` ${t('privacy.employee_info_text')}`}
                </LanguageContent>
              </li>
              <li>
                <LanguageContent fallback="HR system information:">
                  {(t) => <strong>{t('privacy.hr_info')}</strong>}
                </LanguageContent>
                <LanguageContent fallback="Databases containing birthday information">
                  {(t) => ` ${t('privacy.hr_info_text')}`}
                </LanguageContent>
              </li>
              <li>
                <LanguageContent fallback="Cookies:">
                  {(t) => <strong>{t('privacy.cookies_info')}</strong>}
                </LanguageContent>
                <LanguageContent fallback="Information about your browser and website usage">
                  {(t) => ` ${t('privacy.cookies_info_text')}`}
                </LanguageContent>
              </li>
              <li>
                <LanguageContent fallback="Communication information:">
                  {(t) => <strong>{t('privacy.communication_info')}</strong>}
                </LanguageContent>
                <LanguageContent fallback="Messages you send us through contact forms">
                  {(t) => ` ${t('privacy.communication_info_text')}`}
                </LanguageContent>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              <LanguageContent fallback="3. Purpose of processing">
                {(t) => `3. ${t('privacy.purpose_title')}`}
              </LanguageContent>
            </h2>
            <p className="text-gray-700 mb-4">
              <LanguageContent fallback="We process personal information for the following purposes:">
                {(t) => t('privacy.purpose_text')}
              </LanguageContent>
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>
                <LanguageContent fallback="Birthday registration and cake ordering for company employees">
                  {(t) => t('privacy.birthday_registration')}
                </LanguageContent>
              </li>
              <li>
                <LanguageContent fallback="AI automation for birthday cakes">
                  {(t) => t('privacy.ai_automation')}
                </LanguageContent>
              </li>
              <li>
                <LanguageContent fallback="Communication with customers">
                  {(t) => t('privacy.customer_communication')}
                </LanguageContent>
              </li>
              <li>
                <LanguageContent fallback="Service development and quality management">
                  {(t) => t('privacy.service_development')}
                </LanguageContent>
              </li>
              <li>
                <LanguageContent fallback="Legal obligations and compliance">
                  {(t) => t('privacy.legal_obligations')}
                </LanguageContent>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              <LanguageContent fallback="4. Legal basis for processing">
                {(t) => `4. ${t('privacy.legal_basis_title')}`}
              </LanguageContent>
            </h2>
            <p className="text-gray-700 mb-6">
              <LanguageContent fallback="We process personal information based on consent, contract, legitimate interest, and legal obligations in accordance with Article 6 of GDPR.">
                {(t) => t('privacy.legal_basis_text')}
              </LanguageContent>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              <LanguageContent fallback="5. How long we keep the information">
                {(t) => `5. ${t('privacy.retention_title')}`}
              </LanguageContent>
            </h2>
            <p className="text-gray-700 mb-6">
              <LanguageContent fallback="We keep personal information as long as necessary for the purpose of processing or as long as required by law. Birthday information is kept until the employee leaves the company or the service agreement ends.">
                {(t) => t('privacy.retention_text')}
              </LanguageContent>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              <LanguageContent fallback="6. Information sharing">
                {(t) => `6. ${t('privacy.sharing_title')}`}
              </LanguageContent>
            </h2>
            <p className="text-gray-700 mb-6">
              <LanguageContent fallback="We only share personal information with third parties who are necessary for the service, such as bakeries for delivery. All third parties are bound by data protection agreements.">
                {(t) => t('privacy.sharing_text')}
              </LanguageContent>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              <LanguageContent fallback="7. Your rights">
                {(t) => `7. ${t('privacy.rights_title')}`}
              </LanguageContent>
            </h2>
            <p className="text-gray-700 mb-4">
              <LanguageContent fallback="You have the following rights:">
                {(t) => t('privacy.rights_text')}
              </LanguageContent>
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>
                <LanguageContent fallback="Right to information:">
                  {(t) => <strong>{t('privacy.right_info')}</strong>}
                </LanguageContent>
                <LanguageContent fallback="To receive information about the processing of personal information">
                  {(t) => ` ${t('privacy.right_info_text')}`}
                </LanguageContent>
              </li>
              <li>
                <LanguageContent fallback="Right to correction:">
                  {(t) => <strong>{t('privacy.right_correction')}</strong>}
                </LanguageContent>
                <LanguageContent fallback="To have incorrect information corrected">
                  {(t) => ` ${t('privacy.right_correction_text')}`}
                </LanguageContent>
              </li>
              <li>
                <LanguageContent fallback="Right to deletion:">
                  {(t) => <strong>{t('privacy.right_deletion')}</strong>}
                </LanguageContent>
                <LanguageContent fallback="To have personal information deleted">
                  {(t) => ` ${t('privacy.right_deletion_text')}`}
                </LanguageContent>
              </li>
              <li>
                <LanguageContent fallback="Right to restriction:">
                  {(t) => <strong>{t('privacy.right_restriction')}</strong>}
                </LanguageContent>
                <LanguageContent fallback="To restrict the processing of personal information">
                  {(t) => ` ${t('privacy.right_restriction_text')}`}
                </LanguageContent>
              </li>
              <li>
                <LanguageContent fallback="Right to data portability:">
                  {(t) => <strong>{t('privacy.right_portability')}</strong>}
                </LanguageContent>
                <LanguageContent fallback="To receive personal information in electronic format">
                  {(t) => ` ${t('privacy.right_portability_text')}`}
                </LanguageContent>
              </li>
              <li>
                <LanguageContent fallback="Right to object:">
                  {(t) => <strong>{t('privacy.right_objection')}</strong>}
                </LanguageContent>
                <LanguageContent fallback="To object to the processing of personal information">
                  {(t) => ` ${t('privacy.right_objection_text')}`}
                </LanguageContent>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              <LanguageContent fallback="8. Security">
                {(t) => `8. ${t('privacy.security_title')}`}
              </LanguageContent>
            </h2>
            <p className="text-gray-700 mb-6">
              <LanguageContent fallback="We use appropriate technical and organizational security measures to protect personal information against unauthorized processing, loss, destruction, or damage.">
                {(t) => t('privacy.security_text')}
              </LanguageContent>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              <LanguageContent fallback="9. Cookies">
                {(t) => `9. ${t('privacy.cookies_title')}`}
              </LanguageContent>
            </h2>
            <p className="text-gray-700 mb-6">
              <LanguageContent fallback="The website uses cookies to improve user experience. You can set your browser to reject cookies, but this may affect the functionality of the website.">
                {(t) => t('privacy.cookies_text')}
              </LanguageContent>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              <LanguageContent fallback="10. Changes to this policy">
                {(t) => `10. ${t('privacy.changes_title')}`}
              </LanguageContent>
            </h2>
            <p className="text-gray-700 mb-6">
              <LanguageContent fallback="We may change this privacy policy. Changes will be published on the website and you will be notified of significant changes.">
                {(t) => t('privacy.changes_text')}
              </LanguageContent>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              <LanguageContent fallback="11. Contact us">
                {(t) => `11. ${t('privacy.contact_title')}`}
              </LanguageContent>
            </h2>
            <p className="text-gray-700 mb-4">
              <LanguageContent fallback="If you have questions about this privacy policy or want to exercise your rights, contact us:">
                {(t) => t('privacy.contact_text')}
              </LanguageContent>
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700">
                <LanguageContent fallback="StraxLife ehf.">
                  {(t) => t('privacy.contact')}
                </LanguageContent>
              </p>
              <p className="text-gray-700">
                <LanguageContent fallback="Email: orders.straxkaka@outlook.com">
                  {(t) => t('privacy.email')}
                </LanguageContent>
              </p>
              <p className="text-gray-700">
                <LanguageContent fallback="Phone: +354 790 4777">
                  {(t) => t('privacy.phone')}
                </LanguageContent>
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              <LanguageContent fallback="12. Complaint">
                {(t) => `12. ${t('privacy.complaint_title')}`}
              </LanguageContent>
            </h2>
            <p className="text-gray-700 mb-6">
              <LanguageContent fallback="You can complain to the Data Protection Authority about the processing of personal information. Information about the complaint process can be found on the Data Protection Authority website.">
                {(t) => t('privacy.complaint_text')}
              </LanguageContent>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-500">StraxKaka</h3>
              <p className="text-gray-400">
                AI sjálfvirkni fyrir afmæliskökur fyrir íslensk fyrirtæki.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">Þjónusta</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Afmælisdagaskráning</li>
                <li>AI sjálfvirkni</li>
                <li>Kökupöntun</li>
                <li>Afhending</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">Fyrirtæki</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Um okkur</li>
                <li>Hafa samband</li>
                <li>Verðskrá</li>
                <li><a href="/blog/workplace-celebrations" className="hover:text-yellow-400">Blogg</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">Löglegar síður</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacy" className="hover:text-yellow-400">Persónuverndarstefna</a></li>
                <li><a href="/terms" className="hover:text-yellow-400">Skilmálar</a></li>
                <li><a href="/cookies" className="hover:text-yellow-400">Vafrakökur</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 StraxKaka. Allur réttur áskilinn.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
