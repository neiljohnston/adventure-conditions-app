import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import {
  navigationDefinitions,
} from '../assets/js/layers';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersistence({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  reducer: (state) => ({ navigation: state.navigation }),
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
});

export default new Vuex.Store({
  state: {
    title: 'Adventure Conditions',
    name: 'Adventure Conditions', // process.env.name,
    tagline: 'Finding Safe and Healthy Stoke', // process.env.tagline,
    hasLegends: true, // process.env.hasLegends
    hasReader: false, // process.env.hasReader,
    siteId: 'adventureconditions', // process.env.siteId,
    description: 'Adventure conditions unifies evacuation orders and alerts, road closures, air quality data, smoke conditions and weather to help navigate BC Wildfires', // process.env.description,
    keywords: 'California, fires, BC, British Columbia, Wildfires, Evacuations, Road Conditions, Smoke, Air Quality, Health', // process.env.keywords,
    center: [-14173186.261234362, 7196206.431941464],
    zoom: 5,

    navigation: navigationDefinitions,

    // bottom sheet data
    tilesArray: [],
    isSheetVisible: false,
  },
  plugins: [vuexLocalStorage.plugin],

  getters: {
    getNavigationControlById: state => (id) => {
      return state.navigation.find(control => control.id === id);
    },

    getTiles: state => state.tiles,
    getIsSheetVisible: state => state.isSheetVisible,
  },

  mutations: {
    SET_NAVIGATION_ACTIVE: ({ state }, { control, active }) => {
      control.active = active;
    },
    SET_TILES_ARRAY(state, tileArray) {
      state.tilesArray = tileArray;
    },
    PUSH_TO_TILES_ARRAY(state, tile) {
      state.tilesArray.push(tile);
    },
    SET_SHEET_VISIBLE(state, visible) {
      state.isSheetVisible = visible;
    },
  },

  actions: {
    setNavigationActive: ({ getters, commit }, { id, active }) => {
      const control = getters.getNavigationControlById(id);
      commit('SET_NAVIGATION_ACTIVE', { control: control, active: active });
    },
    setTilesArray: ({ commit }, tilesArray) => {
      commit('SET_TILES_ARRAY', tilesArray);
    },
    pushToTilesArray: ({ commit }, tile) => {
      commit('PUSH_TO_TILES_ARRAY', tile);
    },
    setSheetVisible: ({ commit }, visible) => {
      commit('SET_SHEET_VISIBLE', visible);
    },
  },
});
