import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import sv from './locales/sv';
import en from './locales/en';

export type Language = 'sv' | 'en';

const savedLang = localStorage.getItem('vw-lt-lang') as Language | null;

i18n
    .use(initReactI18next)
    .init({
        resources: {
            sv,
            en,
        },
        lng: savedLang ?? 'sv',
        fallbackLng: 'sv',
        interpolation: {
            escapeValue: false, // React already escapes
        },
    });

export default i18n;
