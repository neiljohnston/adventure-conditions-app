<template>
  <v-app v-resize="onResize">
    <navigation-view></navigation-view>
    <v-content>
      <map-view></map-view>
    </v-content>
  </v-app>
</template>
<script>
import { mapState } from 'vuex';

import MapView from './components/MapView';
import NavigationView from './components/NavigationView';
import AboutView from './components/AboutView';

export default {
  components: {
    MapView, NavigationView, AboutView,
  },

  data() {
    return {
      title: 'AdventureConditions.com',
    };
  },

  computed: {
    ...mapState([
    ]),
    // Other properties
  },

  mounted() {
    this.miniVariant = this.$vuetify.breakpoint.smAndDown;
    this.onResize();
  },

  methods: {
    linkto(pathname) {
      this.$router.push({ path: pathname });
    },

    toggleVariant() {
      this.miniVariant = !this.miniVariant;
      this.onResize();
    },

    onResize() {
      this.$bus.$emit('map-resize');
    },
  },
};

</script>
