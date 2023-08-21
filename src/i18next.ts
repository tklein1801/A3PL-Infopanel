import i18next from 'i18next';
import de from '@/locales/de.json';
import en from '@/locales/en.json';

i18next.init({
  lng: window.navigator.language,
  resources: {
    de: { translation: de },
    en: { translation: en },
  },
});

export default i18next;
