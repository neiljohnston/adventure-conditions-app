import Vue from 'vue';
import Vuex from 'vuex';

import {
  navigationDefinitions,
} from '../assets/js/layers';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: 'Advneture Conditions',
    name: 'Adventure Conditions', // process.env.name,
    tagline: 'Finding Safe and Healthy Stoke', // process.env.tagline,
    hasLegends: true, // process.env.hasLegends
    hasReader: false, // process.env.hasReader,
    siteId: 'adventureconditions', // process.env.siteId,
    description: 'Adventure conditions unifies evacuation orders and alerts, road closures, air quality data, smoke conditions and weather to help navigate BC Wildfires', // process.env.description,
    keywords: 'California, fires, BC, British Columbia, Wildfires, Evacuations, Road Conditions, Smoke, Air Quality, Health', // process.env.keywords,
    center: [-14173186.261234362, 7196206.431941464],
    zoom: 5,

    items: [
      { icon: 'map', title: 'Map', linkpath: '/' },
      { icon: 'info', title: 'About', linkpath: '/about' },
    ],

    navigation: navigationDefinitions,
  },

  getters: {
    getNavigationControlById: (state) => (id) => {
      return state.navigation.find(control => control.id === id);
    },
  },

  mutations: {
    setNavigationActive(state, id, active) {
      const control = this.getNavigationControlById(id);
      control.visibility = active;
    }
  },

  actions: {
  },
});
