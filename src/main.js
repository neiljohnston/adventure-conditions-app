// Import Vue
import Vue from 'vue';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';

// Import App Custom Styles
import AppStyles from './assets/sass/app.scss';

import App from './App';
import router from './router';

Vue.use(Vuetify);

Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue();


/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  template: '<App/>',
  // components: { App },
  render: h => h(App),
}).$mount('#app');
