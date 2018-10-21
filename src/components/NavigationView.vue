<template>
  <v-navigation-drawer
    :permanent="stateless"
    :right="right"
    :mini-variant="miniVariant"
    :clipped="clipped"
    v-model="drawer"
    app
    fixed
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
        :key="i"
        value="true">
        <v-list-tile-action>
          <v-icon v-html="control.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ control.label }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

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
      'items',
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

<style>

</style>
