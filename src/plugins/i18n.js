
import { createI18n } from 'vue-i18n'
import en from '../lang/translate/en.js';
import kh from '../lang/translate/kh.js';
const messages = {
       en,
       kh
  }
  // 2. Create i18n instance with options
  const i18n = createI18n({
    locale: 'en', 
    fallbackLocale: 'en', 
    messages, 
    legacy: false
  
  })

  export default i18n;