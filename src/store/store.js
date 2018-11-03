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
  }),
  // Function that passes a mutation and lets you decide if it should
  // update the state in localStorage.
  // filter: mutation => (true)
});

const defaultLogoSVG = `
<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
    <path fill-opacity=".01" fill="#A29999" d="M0 0h40v40H0z"/>
    <path d="M37.752 19.876C37.752 10.003 29.748 2 19.876 2 10.003 2 2 10.003 2 19.876c0 9.872 8.003 17.876 17.876 17.876a17.876 17.876 0 0 0 17.876-17.876" fill="#FFFFFF" fill-rule="nonzero"/>
    <path d="M19.037 37c3.05-8.136-1.336-7.556-1.336-13.914S30.396 16.203 17.764 3C21.07 14.848 7 13.179 7 20.81 7 28.44 15.377 27.168 19.042 37" fill="#F4805E" fill-rule="nonzero"/>
    <path d="M24.394 29.73c2.154.373 4.987.156 5.943-3.421.956-3.577-2.125-5.707 2.427-12.113-4.124 1.62-11.734 4.31-12.693 7.884-.959 3.575 1.001 7.083 4.323 7.65" fill="#72B1C7" fill-rule="nonzero"/>
  </g>
</svg>`;

export default new Vuex.Store({
  state: {
    siteId: process.env.SITE_ID,
    siteMeta: {
      logo: defaultLogoSVG,
      url: process.env.SITE_URL || 'AdventureConditions.com',
      name: process.env.SITE_NAME || 'Adventure Conditions',
      tagline: process.env.SITE_TAGLINE || 'Finding Safe and Healthy Stoke',
      hasLegends: process.env.HAS_LEGENDS || true,
      hasReader: process.env.HAS_READER || true,
      description: process.env.DESCRIPTION || 'Adventure conditions unifies evacuation orders and alerts, road closures, air quality data, smoke conditions and weather to help navigate BC Wildfires',
      keywords: process.env.KEYWORDS || 'California, fires, BC, British Columbia, Wildfires, Evacuations, Road Conditions, Smoke, Air Quality, Health',
    },
    uiState: {
      mapViewState: {
        // TODO: Initialize Map Center from DB
        center: process.env.MAP_CENTER.split(' ') || [-14173186.261234362, 7196206.431941464],
        zoom: process.env.MAP_ZOOM || 5,
      },
      navigation: navigationDefinitions,
    },

    // bottom sheet data
    tilesArray: [],
    isDetailsViewVisible: false,
  },
  plugins: [vuexLocalStorage.plugin],

  getters: {
    getNavigationControlById: state => (id) => {
      return state.uiState.navigation.find(control => control.id === id);
    },

    getTiles: state => state.tiles,
    getIsSheetVisible: state => state.isDetailsViewVisible,
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
      state.isDetailsViewVisible = visible;
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
