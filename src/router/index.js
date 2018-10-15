import Vue from 'vue';
import Router from 'vue-router';
import Map from '../components/Map';
import About from '../components/About';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      name: 'map',
      component: Map
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
});
