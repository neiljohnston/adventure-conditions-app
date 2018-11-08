<template>
  <v-app
    v-resize="onResize"
    id="app"
    light>
    <navigation-view
      :is-drawer-open="isDrawerOpen"
    ></navigation-view>
    <v-toolbar
      color="#f3845a"
      app
      absolute
      clipped-right>
      <span v-html="siteMeta.logo"></span>
      <span
        class="rg-toolbar-title subheading ml-3 mr-3 font-weight-light">{{ siteMeta.name }}</span>
      <span
        class="hidden-sm-and-down caption font-weight-light">{{ siteMeta.tagline }}</span>
      <v-spacer></v-spacer>
      <place-search-view></place-search-view>

      <v-toolbar-side-icon
        class="toolbar-side-icon"
        @click.native="toggleDrawer">
      </v-toolbar-side-icon>

    </v-toolbar>
    <v-content>
      <v-container
        fluid
        fill-height
        pa-0>
        <map-view></map-view>
      </v-container>
    </v-content>
    <details-view
      id="rg-details">
    </details-view>
    <reader-view
      v-if="siteMeta.hasReader"
      id="rg-reader">
    </reader-view>
  </v-app>
</template>
<script>
import { mapState } from 'vuex';

import MapView from './components/MapView';
import DetailsView from './components/DetailsView';
import ReaderView from './components/ReaderView';
import NavigationView from './components/NavigationView';
import AboutView from './components/AboutView';
import PlaceSearchView from './components/PlaceSearchView';

export default {
  components: {
    MapView, NavigationView, AboutView, DetailsView, PlaceSearchView, ReaderView,
  },

  data() {
    return {
      isDrawerOpen: false,
    };
  },

  computed: {
    ...mapState([
      'siteMeta',
      'uiState',
    ]),
  },

  beforeCreate() {
    this.$store.commit('INITALIZE_STORE');
	},

  mounted() {
    this.isDrawerOpen = !this.$vuetify.breakpoint.smAndDown;
    this.onResize();
  },

  methods: {
    linkto(pathname) {
      this.$router.push({ path: pathname });
    },

    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
      this.onResize();
    },

    onResize() {
      this.$bus.$emit('map-resize');
    },
  },
};

</script>
