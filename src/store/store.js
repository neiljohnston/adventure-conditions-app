import moment from 'moment';
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import {
  navigationDefinitions,
} from '../assets/js/layers';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: process.env.SITE_ID, // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  reducer: state => ({
    uiState: state.uiState,
    siteMeta: state.siteMeta,
    versions: state.versions,
  }),
  // Function that passes a mutation and lets you decide if it should
  // update the state in localStorage.
  // filter: mutation => (true)
});

export default new Vuex.Store({
  state: {
    siteId: process.env.SITE_ID,
    siteMeta: {
      logo: '<img src="static/rg-logo.svg"/>',
      url: process.env.SITE_URL || 'AdventureConditions.com',
      name: process.env.SITE_NAME || 'Adventure Conditions',
      tagline: process.env.SITE_TAGLINE || 'Finding Safe and Healthy Stoke',
      hasLegends: (process.env.HAS_LEGENDS === 'true'),
      hasReader: (process.env.HAS_READER === 'true'),
      description: process.env.DESCRIPTION || 'Adventure conditions unifies evacuation orders and alerts, road closures, air quality data, smoke conditions and weather to help navigate BC Wildfires',
      keywords: process.env.KEYWORDS || 'California, fires, BC, British Columbia, Wildfires, Evacuations, Road Conditions, Smoke, Air Quality, Health',
      readerListKey: '',
    },
    uiState: {
      mapViewState: {
        // TODO: Initialize Map Center from DB
        center: [-14173186.261234362, 7196206.431941464],
        zoom: process.env.MAP_ZOOM || 5,
      },
      navigation: navigationDefinitions,
    },
    versions: {
      app: 0.0,
      navigation: 0.0,
      layers: 0.0,
    },

    // bottom sheet data
    tilesArray: [],
    isDetailsViewVisible: false,
    isReaderViewAvailable: false,
    isReaderViewVisible: false,
  },
  plugins: [vuexLocalStorage.plugin],

  getters: {
    getNavigationControlById: state => (id) => {
      return state.uiState.navigation.find(control => control.id === id);
    },

    getTiles: state => state.tiles,
    getIsDetailsViewVisible: state => state.isDetailsViewVisible,
    getIsReaderViewVisible: state => state.isReaderViewVisible,
  },

  mutations: {
    INITALIZE_STORE(state) {
      // Check if the ID exists
      console.log('INITIALIZE_STORE: versions', state.versions);
    },
    SET_NAVIGATION_LOAD_STATE: ({ state }, { control, loadState }) => {
      control.loadState = loadState;
    },
    SET_NAVIGATION_ACTIVE: ({ state }, { control, active }) => {
      control.active = active;
    },
    SET_TILES_ARRAY(state, tileArray) {
      state.tilesArray = tileArray;
    },
    PUSH_TO_TILES_ARRAY(state, tile) {
      state.tilesArray.push(tile);
    },
    SET_DETAIL_VIEW_VISIBLE(state, visible) {
      state.isDetailsViewVisible = visible;
    },
    SET_READER_VIEW_VISIBLE(state, visible) {
      state.isReaderViewVisible = visible;
    },
    SET_MAP_VIEW_STATE_CENTER(state, center) {
      state.uiState.mapViewState.center = center;
    },
    SET_MAP_VIEW_STATE_ZOOM(state, zoom) {
      state.uiState.mapViewState.zoom = zoom;
    },
    SET_SITE_META(state, siteMeta) {
      state.siteMeta = siteMeta;
    },
  },

  actions: {
    setNavigationLoadState: ({ getters, commit }, { id, loadState }) => {
      const control = getters.getNavigationControlById(id);
      commit('SET_NAVIGATION_LOAD_STATE', { control: control, loadState: loadState });
    },
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
    setDetailViewVisible: ({ commit }, visible) => {
      commit('SET_DETAIL_VIEW_VISIBLE', visible);
    },
    setReaderViewVisible: ({ commit }, visible) => {
      commit('SET_READER_VIEW_VISIBLE', visible);
    },
    setMapViewStateCenter: ({ commit }, center) => {
      commit('SET_MAP_VIEW_STATE_CENTER', center);
    },
    setMapViewStateZoom: ({ commit }, zoom) => {
      commit('SET_MAP_VIEW_STATE_ZOOM', zoom);
    },
    setSiteMeta: ({ commit }, siteMeta) => {
      commit('SET_SITE_META', siteMeta);
    },
  },
});
