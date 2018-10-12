import Vue from 'vue';
import Router from 'vue-router';
import Map from '../components/Map';
import HelloWorld from '../components/HelloWorld';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      name: 'map',
      component: Map
    },
    {
      path: '/helloworld',
      name: 'helloworld',
      component: HelloWorld
    }
  ]
});
