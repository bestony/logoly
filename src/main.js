import './assets/iconfont/iconfont.css';
import './style.css';
import '@mdi/font/css/materialdesignicons.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueGtag from 'vue-gtag';
// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import {
  VBtn,
  VCheckboxBtn,
  VColorPicker,
  VExpansionPanel,
  VExpansionPanels,
  VIcon,
  VList,
  VListItem,
  VMenu,
  VSelect,
  VSlider,
  VTooltip
} from 'vuetify/components';
import { Ripple } from 'vuetify/directives';

import App from './App.vue';
import router from './router';

const app = createApp(App);

const vuetify = createVuetify({
  components: {
    VBtn,
    VCheckboxBtn,
    VColorPicker,
    VExpansionPanel,
    VExpansionPanels,
    VIcon,
    VList,
    VListItem,
    VMenu,
    VSelect,
    VSlider,
    VTooltip
  },
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
