<template>
  <v-navigation-drawer
    :permanent="stateless"
    :right="right"
    :mini-variant="miniVariant"
    :clipped="clipped"
    v-model="drawer"
    app
    fixed
    scrollable
    touchless
    stateless>
    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-btn
            icon
            @click.stop="toggleVariant">
            <v-icon v-html="miniVariant ? 'chevron_left' : 'chevron_right'"></v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ legend }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <!-- <v-list-tile
        v-for="(item, i) in items"
        :key="i"
        value="true"
        @click="linkto(item.linkpath)">
        <v-list-tile-action>
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile> -->

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

  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: true,
      right: true,
      status: false,
      stateless: true,
      legend: 'Legend',
    };
  },

  computed: {
    ...mapState([
      'navigation',
    ]),
    ...mapGetters([
      'getNavigationControlById',
    ]),
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

<style>

</style>
