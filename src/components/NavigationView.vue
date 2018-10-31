<template>
  <v-navigation-drawer
    :mini-variant="!isDrawerOpen"
    v-model="drawer"
    right
    permanent
    clipped
    app
    fixed
    touchless
    stateless
    scrollable
    class="grey lighten-4">

    <v-list>
      <v-list-tile
        v-for="(control, i) in navigation"
        v-if="control.navigation"
        v-model="control.active"
        :key="i"
        value="true"
        ripple
        @click="toggleControl(control)">
        <v-list-tile-action>
          <span v-html="control.icon"></span>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ control.label }}</v-list-tile-title>
          <v-list-tile-sub-title>legend text</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
  name: 'MapView',

  props: {
    isDrawerOpen: {
      type: Boolean,
      default: false,
      required: false,
    },
  },

  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: this.isDrawerOpen,
      right: true,
      status: false,
      stateless: true,
    };
  },

  computed: {
    ...mapState([
      'uiState',
    ]),
    ...mapGetters([
      'getNavigationControlById',
    ]),
    navigation() {
      return this.uiState.navigation;
    },
  },

  mounted() {
    this.miniVariant = this.$vuetify.breakpoint.smAndDown;
    this.onResize();
  },

  methods: {
    ...mapActions([
      'setNavigationActive',
    ]),

    linkto(pathname) {
      this.$router.push({ path: pathname });
    },

    toggleControl(control) {
      const active = !control.active;
      this.setNavigationActive({ id: control.id, active: active });
      // this.setMapLayerVisibility(id, active);
      this.$bus.$emit('layer-visibility', control.id, active);

      if (control.isGroupControl) {
        this.navigation.forEach((navControl) => {
          if (navControl.groupControlId === control.id) {
            // this.setLayerVisibility(navControl.id, control.active);
            this.setNavigationActive({ id: navControl.id, active: active });
            this.$bus.$emit('layer-visibility', navControl.id, active);
          }
        });
      }
    },

    onResize() {
      this.$bus.$emit('map-resize');
    },
  },

};
</script>

<style>

</style>
