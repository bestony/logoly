import './assets/iconfont/iconfont.css';
import './style.css';
import '@mdi/font/css/materialdesignicons.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueGtag from 'vue-gtag';
// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { Ripple } from 'vuetify/directives';

import App from './App.vue';
import router from './router';

const app = createApp(App);

const vuetify = createVuetify({
  directives: {
    Ripple
  },
  theme: {
    defaultTheme: 'dark'
  }
});

app.use(vuetify);
app.use(createPinia());
app.use(
  VueGtag,
  {
    appName: 'Logoly',
    pageTrackerScreenviewEnabled: true,
    config: {
      id: 'G-YX7X8HWGB1'
    }
  },
  router
);
app.use(router);

app.mount('#app');
