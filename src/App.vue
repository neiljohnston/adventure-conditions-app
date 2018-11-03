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
    <details-view></details-view>
  </v-app>
</template>
<script>
import { mapState } from 'vuex';

import MapView from './components/MapView';
import DetailsView from './components/DetailsView';
import NavigationView from './components/NavigationView';
import AboutView from './components/AboutView';
import PlaceSearchView from './components/PlaceSearchView';

export default {
  components: {
    MapView, NavigationView, AboutView, DetailsView, PlaceSearchView,
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

  mounted() {
    this.isDrawerOpen = !this.$vuetify.breakpoint.smAndDown;
    this.onResize();
    console.log(process.env);
    console.log(this.siteMeta);
    console.log(this.uiState.mapViewState);
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
