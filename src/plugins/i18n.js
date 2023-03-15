
import { createI18n } from 'vue-i18n'
import En from '../lang/translate/en.js';
import Kh from '../lang/translate/kh.js';
const messages = {
       En,
       Kh
  }
  // 2. Create i18n instance with options
  const i18n = createI18n({
    locale: 'En', 
    fallbackLocale: 'En', 
    messages, 
    legacy: false
  
  })

  export default i18n;