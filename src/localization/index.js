import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './lang/en';
import ja from './lang/ja';

Vue.use(VueI18n);

const messages = {
  en: en,
  ja: ja,
};

let availableLangs = [];
for (let key of Object.keys(messages)) {
  availableLangs.push({
    val: key,
    label: messages[key].localeLabel,
  });
}

const i18n = new VueI18n({
  locale: 'ja', // set locale
  messages, // set locale messages
});

export default i18n;

export { availableLangs };
