// Import Vue
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import store from './store/store';


// Import App Custom Styles
import AppStyles from './assets/less/app.less';

import App from './App';

Vue.use(Vuetify);

Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue();

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  components: { App },
  template: '<App/>',
  render: h => h(App),
});
