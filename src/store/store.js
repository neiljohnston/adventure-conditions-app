import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import {
  navigationDefinitions,
} from '../assets/js/layers';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'adventure-conditons', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  reducer: state => ({
    uiState: state.uiState,
    siteMeta: state.siteMeta,
  }),
  // Function that passes a mutation and lets you decide if it should
  // update the state in localStorage.
  // filter: mutation => (true)
});

export default new Vuex.Store({
  state: {
    siteId: process.env.SITE_ID,
    siteMeta: {
      logo: process.env.SITE_LOGO,
      url: process.env.SITE_URL,
      name: process.env.SITE_NAME,
      tagline: process.env.SITE_TAGLINE,
      hasLegends: process.env.SITE_HAS_LEGENDS,
      hasReader: process.env.SITE_HAS_READER,
      description: process.env.SITE_DESCRIPTION,
      keywords: process.env.SITE_KEYWORDS,
    },
    uiState: {
      mapViewState: {
        center: process.env.SITE_MAP_CENTER,
        zoom: process.env.SITE_MAP_ZOOM,
      },
      navigation: navigationDefinitions,
    },

    // bottom sheet data
    tilesArray: [],
    isSheetVisible: false,
  },
  plugins: [vuexLocalStorage.plugin],

  getters: {
    getNavigationControlById: state => (id) => {
      return state.uiState.navigation.find(control => control.id === id);
    },

    getTiles: state => state.tiles,
    getIsSheetVisible: state => state.isSheetVisible,
  },

  mutations: {
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
    SET_SHEET_VISIBLE(state, visible) {
      state.isSheetVisible = visible;
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
    setSheetVisible: ({ commit }, visible) => {
      commit('SET_SHEET_VISIBLE', visible);
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
