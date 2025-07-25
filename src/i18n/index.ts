import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation resources
import commonNL from './locales/nl/common.json'
import commonEN from './locales/en/common.json'
import commonDE from './locales/de/common.json'
import commonES from './locales/es/common.json'

import decksNL from './locales/nl/decks.json'
import decksEN from './locales/en/decks.json'
import decksDE from './locales/de/decks.json'
import decksES from './locales/es/decks.json'

// Configure i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'nl', // Default to Dutch
    supportedLngs: ['nl', 'en', 'de', 'es'],

    // Resources loaded inline for simplicity
    resources: {
      nl: {
        common: commonNL,
        decks: decksNL,
      },
      en: {
        common: commonEN,
        decks: decksEN,
      },
      de: {
        common: commonDE,
        decks: decksDE,
      },
      es: {
        common: commonES,
        decks: decksES,
      },
    },

    interpolation: {
      escapeValue: false, // React already escapes
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18n
