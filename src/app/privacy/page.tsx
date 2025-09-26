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
          <style>
            {`
              [data-custom-class='body'], [data-custom-class='body'] * {
                background: transparent !important;
              }
              [data-custom-class='title'], [data-custom-class='title'] * {
                font-family: Arial !important;
                font-size: 26px !important;
                color: #000000 !important;
              }
              [data-custom-class='subtitle'], [data-custom-class='subtitle'] * {
                font-family: Arial !important;
                color: #595959 !important;
                font-size: 14px !important;
              }
              [data-custom-class='heading_1'], [data-custom-class='heading_1'] * {
                font-family: Arial !important;
                font-size: 19px !important;
                color: #000000 !important;
              }
              [data-custom-class='heading_2'], [data-custom-class='heading_2'] * {
                font-family: Arial !important;
                font-size: 17px !important;
                color: #000000 !important;
              }
              [data-custom-class='body_text'], [data-custom-class='body_text'] * {
                color: #595959 !important;
                font-size: 14px !important;
                font-family: Arial !important;
              }
              [data-custom-class='link'], [data-custom-class='link'] * {
                color: #3030F1 !important;
                font-size: 14px !important;
                font-family: Arial !important;
                word-break: break-word !important;
              }
            `}
          </style>
          
          <span style={{display: 'block', margin: '0 auto 3.125rem', width: '11.125rem', height: '2.375rem', background: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNzgiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCAxNzggMzgiPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBmaWxsPSIjRDFEMUQxIiBkPSJNNC4yODMgMjQuMTA3Yy0uNzA1IDAtMS4yNTgtLjI1Ni0xLjY2LS43NjhoLS4wODVjLjA1Ny41MDIuMDg2Ljc5Mi4wODYuODd2Mi40MzRILjk4NXYtOC42NDhoMS4zMzJsLjIzMS43NzloLjA3NmMuMzgzLS41OTQuOTUtLjg5MiAxLjcwMi0uODkyLjcxIDAgMS4yNjQuMjc0IDEuNjY1LjgyMi40MDEuNTQ4LjYwMiAxLjMwOS42MDIgMi4yODMgMCAuNjQtLjA5NCAxLjE5OC0uMjgyIDEuNjctLjE4OC40NzMtLjQ1Ni44MzMtLjgwMyAxLjA4LS4zNDcuMjQ3LS43NTYuMzctMS4yMjUuMzd6TTMuOCAxOS4xOTNjLS40MDUgMC0uNy4xMjQtLjg4Ni4zNzMtLjE4Ny4yNDktLjI4My42Ni0uMjkgMS4yMzN2LjE3N2MwIC42NDUuMDk1IDEuMTA3LjI4NyAxLjM4Ni4xOTIuMjguNDk1LjQxOS45MS40MTkuNzM0IDAgMS4xMDEtLjYwNSAxLjEwMS0xLjgxNiAwLS41OS0uMDktMS4wMzQtLjI3LTEuMzI5LS4xODItLjI5NS0uNDY1LS40NDMtLjg1Mi0uNDQzem01LjU3IDEuNzk0YzAgLjU5NC4wOTggMS4wNDQuMjkzIDEuMzQ4LjE5Ni4zMDQuNTEzLjQ1Ny45NTQuNDU3LjQzNyAwIC43NS0uMTUyLjk0Mi0uNDU0LjE5Mi0uMzAzLjI4OC0uNzUzLjI4OC0xLjM1MSAwLS41OTUtLjA5Ny0xLjA0LS4yOS0xLjMzOC0uMTk0LS4yOTctLjUxLS40NDUtLjk1LS40NDUtLjQzOCAwLS43NTMuMTQ3LS45NDYuNDQzLS4xOTQuMjk1LS4yOS43NDItLjI5IDEuMzR6bTQuMTUzIDBjMCAuOTc3LS4yNTggMS43NDItLjc3NCAyLjI5My0uNTE1LjU1Mi0xLjIzMy44MjctMi4xNTQuODI3LS41NzYgMC0xLjA4NS0uMTI2LTEuNTI1LS4zNzhhMi41MiAyLjUyIDAgMCAxLTEuMDE1LTEuMDg4Yy0uMjM3LS40NzMtLjM1NS0xLjAyNC0uMzU1LTEuNjU0IDAtLjk4MS4yNTYtMS43NDQuNzY4LTIuMjg4LjUxMi0uNTQ1IDEuMjMyLS44MTcgMi4xNi0uODE3LjU3NiAwIDEuMDg1LjEyNiAxLjUyNS4zNzYuNDQuMjUxLjc3OS42MSAxLjAxNSAxLjA4LjIzNi40NjkuMzU1IDEuMDE5LjM1NSAxLjY0OXpNMTkuNzEgMjRsLS40NjItMi4xLS42MjMtMi42NTNoLS4wMzdMMTcuNDkzIDI0SDE1LjczbC0xLjcwOC02LjAwNWgxLjYzM2wuNjkzIDIuNjU5Yy4xMS40NzYuMjI0IDEuMTMzLjMzOCAxLjk3MWguMDMyYy4wMTUtLjI3Mi4wNzctLjcwNC4xODgtMS4yOTRsLjA4Ni0uNDU3Ljc0Mi0yLjg3OWgxLjgwNGwuNzA0IDIuODc5Yy4wMTQuMDc5LjAzNy4xOTUuMDY3LjM1YTIwLjk5OCAyMC45OTggMCAwIDEgLjE2NyAxLjAwMmMuMDIzLjE2NS4wMzYuMjk5LjA0LjM5OWguMDMyYy4wMzItLjI1OC4wOS0uNjExLjE3Mi0xLjA2LjA4Mi0uNDUuMTQxLS43NTQuMTc3LS45MTFsLjcyLTIuNjU5aDEuNjA2TDIxLjQ5NCAyNGgtMS43ODN6bTcuMDg2LTQuOTUyYy0uMzQ4IDAtLjYyLjExLS44MTcuMzMtLjE5Ny4yMi0uMzEuNTMzLS4zMzguOTM3aDIuMjk5Yy0uMDA4LS40MDQtLjExMy0uNzE3LS4zMTctLjkzNy0uMjA0LS4yMi0uNDgtLjMzLS44MjctLjMzem0uMjMgNS4wNmMtLjk2NiAwLTEuNzIyLS4yNjctMi4yNjYtLjgtLjU0NC0uNTM0LS44MTYtMS4yOS0uODE2LTIuMjY3IDAtMS4wMDcuMjUxLTEuNzg1Ljc1NC0yLjMzNC41MDMtLjU1IDEuMTk5LS44MjUgMi4wODctLjgyNS44NDggMCAxLjUxLjI0MiAxLjk4Mi43MjUuNDcyLjQ4NC43MDkgMS4xNTIuNzA5IDIuMDA0di43OTVoLTMuODczYy4wMTguNDY1LjE1Ni44MjkuNDE0IDEuMDkuMjU4LjI2MS42Mi4zOTIgMS4wODUuMzkyLjM2MSAwIC43MDMtLjAzNyAxLjAyNi0uMTEzYTUuMTMzIDUuMTMzIDAgMCAwIDEuMDEtLjM2djEuMjY4Yy0uMjg3LjE0My0uNTkzLjI1LS45Mi4zMmE1Ljc5IDUuNzkgMCAwIDEtMS4xOTEuMTA0em03LjI1My02LjIyNmMuMjIyIDAgLjQwNi4wMTYuNTUzLjA0OWwtLjEyNCAxLjUzNmExLjg3NyAxLjg3NyAwIDAgMC0uNDgzLS4wNTRjLS41MjMgMC0uOTMuMTM0LTEuMjIyLjQwMy0uMjkyLjI2OC0uNDM4LjY0NC0uNDM4IDEuMTI4VjI0aC0xLjYzOHYtNi4wMDVoMS4yNGwuMjQyIDEuMDFoLjA4Yy4xODctLjMzNy40MzktLjYwOC43NTYtLjgxNGExLjg2IDEuODYgMCAwIDEgMS4wMzQtLjMwOXptNC4wMjkgMS4xNjZjLS4zNDcgMC0uNjIuMTEtLjgxNy4zMy0uMTk3LjIyLS4zMS41MzMtLjMzOC45MzdoMi4yOTljLS4wMDctLjQwNC0uMTEzLS43MTctLjMxNy0uOTM3LS4yMDQtLjIyLS40OC0uMzMtLjgyNy0uMzN6bS4yMyA1LjA2Yy0uOTY2IDAtMS43MjItLjI2Ny0yLjI2Ni0uOC0uNTQ0LS41MzQtLjgxNi0xLjI5LS44MTYtMi4yNjcgMC0xLjAwNy4yNTEtMS43ODUuNzU0LTIuMzM0LjUwNC0uNTUgMS4yLS44MjUgMi4wODctLjgyNS44NDkgMCAxLjUxLjI0MiAxLjk4Mi43MjUuNDczLjQ4NC43MDkgMS4xNTIuNzA5IDIuMDA0di43OTVoLTMuODczYy4wMTguNDY1LjE1Ni44MjkuNDE0IDEuMDkuMjU4LjI2MS42Mi4zOTIgMS4wODUuMzkyLjM2MiAwIC43MDQtLjAzNyAxLjAyNi0uMTEzYTUuMTMzIDUuMTMzIDAgMCAwIDEuMDEtLjM2djEuMjY4Yy0uMjg3LjE0My0uNTkzLjI1LS45MTkuMzJhNS43OSA1Ljc5IDAgMCAxLTEuMTkyLjEwNHptNS44MDMgMGMtLjcwNiAwLTEuMjYtLjI3NS0xLjY2My0uODIyLS40MDMtLjU0OC0uNjA0LTEuMzA3LS42MDQtMi4yNzggMC0uOTg0LjIwNS0xLjc1Mi42MTUtMi4zMDEuNDEtLjU1Ljk3NS0uODI1IDEuNjk1LS44MjUuNzU1IDAgMS4zMzIuMjk0IDEuNzI5Ljg4MWguMDU0YTYuNjk3IDYuNjk3IDAgMCAxLS4xMjQtMS4xOTh2LTEuOTIyaDEuNjQ0VjI0SDQ2LjQzbC0uMzE3LS43NzloLS4wN2MtLjM3Mi41OTEtLjk0Ljg4Ni0xLjcwMi44ODZ6bS41NzQtMS4zMDZjLjQyIDAgLjcyNi0uMTIxLjkyMS0uMzY1LjE5Ni0uMjQzLjMwMi0uNjU3LjMyLTEuMjR2LS4xNzhjMC0uNjQ0LS4xLTEuMTA2LS4yOTgtMS4zODYtLjE5OS0uMjc5LS41MjItLjQxOS0uOTctLjQxOWEuOTYyLjk2MiAwIDAgMC0uODUuNDY1Yy0uMjAzLjMxLS4zMDQuNzYtLjMwNCAxLjM1IDAgLjU5Mi4xMDIgMS4wMzUuMzA2IDEuMzMuMjA0LjI5Ni40OTYuNDQzLjg3NS40NDN6bTEwLjkyMi00LjkyYy43MDkgMCAxLjI2NC4yNzcgMS42NjUuODMuNC41NTMuNjAxIDEuMzEyLjYwMSAyLjI3NSAwIC45OTItLjIwNiAxLjc2LS42MiAyLjMwNC0uNDE0LjU0NC0uOTc3LjgxNi0xLjY5LjgxNi0uNzA1IDAtMS4yNTgtLjI1Ni0xLjY1OS0uNzY4aC0uMTEzbC0uMjc0LjY2MWgtMS4yNTF2LTguMzU3aDEuNjM4djEuOTQ0YzAtLjI0Ny0uMDIxLjY0My0uMDY0IDEuMTg3aC4wNjRjLjM4My0uNTk0Ljk1LS44OTIgMS43MDMtLjg5MnptLS41MjcgMS4zMWMtLjQwNCAwLS43LjEyNS0uODg2LjM3NC0uMTg2LjI0OS0uMjgzLjY2LS4yOSAxLjIzM3YuMTc3YzAgLjY0NS4wOTYgMS4xMDcuMjg3IDEuMzg2LjE5Mi4yOC40OTUuNDE5LjkxLjQxOS4zMzcgMCAuNjA1LS4xNTUuODA0LS40NjUuMTk5LS4zMS4yOTgtLjc2LjI5OC0xLjM1IDAtLjU5MS0uMS0xLjAzNS0uMy0xLjMzYS45NDMuOTQzIDAgMCAwLS44MjMtLjQ0M3ptMy4xODYtMS4xOTdoMS43OTRsMS4xMzQgMy4zNzljLjA5Ni4yOTMuMTYzLjY0LjE5OCAxLjA0MmguMDMzYy4wMzktLjM3LjExNi0uNzE3LjIzLTEuMDQybDEuMTEyLTMuMzc5aDEuNzU3bC0yLjU0IDYuNzczYy0uMjM0LjYyNy0uNTY2IDEuMDk2LS45OTcgMS40MDctLjQzMi4zMTItLjkzNi40NjgtMS41MTIuNDY4LS4yODMgMC0uNTYtLjAzLS44MzMtLjA5MnYtMS4zYTIuOCAyLjggMCAwIDAgLjY0NS4wN2MuMjkgMCAuNTQzLS4wODguNzYtLjI2Ni4yMTctLjE3Ny4zODYtLjQ0NC41MDgtLjgwM2wuMDk2LS4yOTUtMi4zODUtNS45NjJ6Ii8+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzMpIj4KICAgICAgICAgICAgPGNpcmNsZSBjeD0iMTkiIGN5PSIxOSIgcj0iMTkiIGZpbGw9IiNFMEUwRTAiLz4KICAgICAgICAgICAgPHBhdGggZmlsbD0iI0ZGRiIgZD0iTTIyLjQ3NCAxNS40NDNoNS4xNjJMMTIuNDM2IDMwLjRWMTAuMzYzaDE1LjJsLTUuMTYyIDUuMDh6Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxwYXRoIGZpbGw9IiNEMkQyRDIiIGQ9Ik0xMjEuNTQ0IDE0LjU2di0xLjcyOGg4LjI3MnYxLjcyOGgtMy4wMjRWMjRoLTIuMjR2LTkuNDRoLTMuMDA4em0xMy43NDQgOS41NjhjLTEuMjkgMC0yLjM0MS0uNDE5LTMuMTUyLTEuMjU2LS44MS0uODM3LTEuMjE2LTEuOTQ0LTEuMjE2LTMuMzJzLjQwOC0yLjQ3NyAxLjIyNC0zLjMwNGMuODE2LS44MjcgMS44NzItMS4yNCAzLjE2OC0xLjI0czIuMzYuNDAzIDMuMTkyIDEuMjA4Yy44MzIuODA1IDEuMjQ4IDEuODggMS4yNDggMy4yMjQgMCAuMzEtLjAyMS41OTctLjA2NC44NjRoLTYuNDY0Yy4wNTMuNTc2LjI2NyAxLjA0LjY0IDEuMzkyLjM3My4zNTIuODQ4LjUyOCAxLjQyNC41MjguNzc5IDAgMS4zNTUtLjMyIDEuNzI4LS45NmgyLjQzMmEzLjg5MSAzLjg5MSAwIDAgMS0xLjQ4OCAyLjA2NGMtLjczNi41MzMtMS42MjcuOC0yLjY3Mi44em0xLjQ4LTYuNjg4Yy0uNC0uMzUyLS44ODMtLjUyOC0xLjQ0OC0uNTI4cy0xLjAzNy4xNzYtMS40MTYuNTI4Yy0uMzc5LjM1Mi0uNjA1LjgyMS0uNjggMS40MDhoNC4xOTJjLS4wMzItLjU4Ny0uMjQ4LTEuMDU2LS42NDgtMS40MDh6bTcuMDE2LTIuMzA0djEuNTY4Yy41OTctMS4xMyAxLjQ2MS0xLjY5NiAyLjU5Mi0xLjY5NnYyLjMwNGgtLjU2Yy0uNjcyIDAtMS4xNzkuMTY4LTEuNTIuNTA0LS4zNDEuMzM2LS41MTIuOTE1LS41MTIgMS43MzZWMjRoLTIuMjU2di04Ljg2NGgyLjI1NnptNi40NDggMHYxLjMyOGMuNTY1LS45NyAxLjQ4My0xLjQ1NiAyLjc1Mi0xLjQ1Ni42NzIgMCAxLjI3Mi4xNTUgMS44LjQ2NC41MjguMzEuOTM2Ljc1MiAxLjIyNCAxLjMyOC4zMS0uNTU1LjczMy0uOTkyIDEuMjcyLTEuMzEyYTMuNDg4IDMuNDg4IDAgMCAxIDEuODE2LS40OGMxLjA1NiAwIDEuOTA3LjMzIDIuNTUyLjk5Mi42NDUuNjYxLjk2OCAxLjU5Ljk2OCAyLjc4NFYyNGgtMi4yNHYtNC44OTZjMC0uNjkzLS4xNzYtMS4yMjQtLjUyOC0xLjU5Mi0uMzUyLS4zNjgtLjgzMi0uNTUyLTEuNDQtLjU1MnMtMS4wOS4xODQtMS40NDguNTUyYy0uMzU3LjM2OC0uNTM2Ljg5OS0uNTM2IDEuNTkyVjI0aC0yLjI0di00Ljg5NmMwLS42OTMtLjE3Ni0xLjIyNC0uNTI4LTEuNTkyLS4zNTItLjM2OC0uODMyLS41NTItMS40NC0uNTUycy0xLjA5LjE4NC0xLjQ0OC41NTJjLS4zNTcuMzY4LS41MzYuODk5LS41MzYgMS41OTJWMjRoLTIuMjU2di04Ljg2NGgyLjI1NnpNMTY0LjkzNiAyNFYxMi4xNmgyLjI1NlYyNGgtMi4yNTZ6bTcuMDQtLjE2bC0zLjQ3Mi04LjcwNGgyLjUyOGwyLjI1NiA2LjMwNCAyLjM4NC02LjMwNGgyLjM1MmwtNS41MzYgMTMuMDU2aC0yLjM1MmwxLjg0LTQuMzUyeiIvPgogICAgPC9nPgo8L3N2Zz4K) center no-repeat'}}></span>
          
          <div data-custom-class="body">
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
