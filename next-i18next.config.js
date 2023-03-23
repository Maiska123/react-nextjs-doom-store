const Backend = require('i18next-http-backend/cjs')
const ChainedBackend= require('i18next-chained-backend').default
const LocalStorageBackend = require('i18next-localstorage-backend').default
// const i18n = require('i18next').default
// const initReactI18next = require('react-i18next').default
// const LanguageDetector = require('i18next-browser-languagedetector').default
const DateTime = require('luxon').default

module.exports = {
  backend: {
    backendOptions: [{ expirationTime: 60 * 60 * 1000 }, { /* loadPath: 'https:// somewhere else' */ }], // 1 hour
    backends: typeof window !== 'undefined' ? [LocalStorageBackend, Backend]: [],
  },
  // debug: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fi'],
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
    format: (value, format, lng) => {
      if (value instanceof Date) {
        return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime[format])
      }
      return value;
    }
  },
  serializeConfig: false,
  use: typeof window !== 'undefined' ? [ChainedBackend] : [],
}
