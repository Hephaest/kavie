import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from 'vee-validate';
import {
  required,
  min,
  min_value as minVal,
  max,
  max_value as maxVal,
  email,
  confirmed,
  alpha_spaces as alphaSpaces,
  alpha_dash as alphaDash,
} from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import en from '@vee-validate/i18n/dist/locale/en.json';
import ko from '@vee-validate/i18n/dist/locale/ko.json';
import ja from '@vee-validate/i18n/dist/locale/ja.json';
import zh from '@vee-validate/i18n/dist/locale/zh_CN.json';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('min_value', minVal);
    defineRule('max_value', maxVal);
    defineRule('email', email);
    defineRule('password_confirmed', confirmed);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('alpha_dash', alphaDash);

    configure({
      generateMessage: localize({
        en,
        ko,
        ja,
        zh,
      }),
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
