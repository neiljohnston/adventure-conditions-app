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
      fixed
      clipped-right>
      <!-- <span class="title ml-3 mr-5 font-weight-light">AdventureConditions</span> -->

      <place-search-view></place-search-view>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon
        @click.native="toggleDrawer"
      ></v-toolbar-side-icon>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height pa-0>
      <map-view></map-view>
      </v-container>
    </v-content>
    <bottom-sheet-view></bottom-sheet-view>
  </v-app>
</template>
<script>
import { mapState } from 'vuex';

import MapView from './components/MapView';
import BottomSheetView from './components/BottomSheetView';
import NavigationView from './components/NavigationView';
import AboutView from './components/AboutView';
import PlaceSearchView from './components/PlaceSearchView';

export default {
  components: {
    MapView, NavigationView, AboutView, BottomSheetView, PlaceSearchView,
  },

  data() {
    return {
      title: 'AdventureConditions.com',
      isDrawerOpen: false,
    };
  },

  computed: {
    ...mapState([
    ]),
    // Other properties
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
