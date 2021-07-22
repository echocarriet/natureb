import { createApp } from 'vue';

// ------- 載入 vue axios
import axios from 'axios';
import VueAxios from 'vue-axios';

// ------- 載入 Loading
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// ------- VeeValidate 表單驗證
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
// 匯入 vee-validate 相關規則
import rules from '@vee-validate/rules';
// 匯入 vee-validate 多國語系的功能
import { localize, setLocale } from '@vee-validate/i18n';
// 匯入 vee-validate 繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

// ------- 載入 Swiperjs
import SwiperCore, {
  Navigation, Autoplay, Pagination, Scrollbar, A11y,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

// ------- 載入vue-sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// ------- 時間戳&千分位逗號
import { date, currency } from './methods/filters';

import App from './App.vue';
import router from './router';

// vee-validate 定義驗證規則
Object.keys(rules).forEach((rule) => {
  defineRule(rule, rules[rule]);
});
// vee-validate 多國語系
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// vee-validate 設定預設語系 (如果上方設定很多語系，可以在此加入預設語系)
setLocale('zh_TW');

const app = createApp(App);

// 時間戳&千分位逗號_掛 Global (不建議太多方法掛在Global，請小心使用)
// 會不好找到此方法在哪，所以可於前方加$識別用。就知道此方法於全域這邊設定XD
app.config.globalProperties.$filters = {
  currency,
  date,
};

app.use(router);
// 註冊vue axios 全域元件
app.use(VueAxios, axios);

// 註冊Swiperjs 全域元件
SwiperCore.use([Navigation, Autoplay, Pagination, Scrollbar, A11y]);

// 註冊vue-sweetalert2 全域元件
app.use(VueSweetalert2);

// 註冊 Swiperjs 兩個全域元件
app.component('Swiper', Swiper);
app.component('SwiperSlide', SwiperSlide);

// 註冊Loading全域元件
app.component('Loading', Loading);

// 註冊 vee-validate 三個全域元件
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);

app.mount('#app');
