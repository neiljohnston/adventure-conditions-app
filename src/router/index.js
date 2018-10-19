import Vue from 'vue';
import Router from 'vue-router';
import MapView from '../components/MapView';
import AboutView from '../components/AboutView';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'map',
    component: MapView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  ],
});
