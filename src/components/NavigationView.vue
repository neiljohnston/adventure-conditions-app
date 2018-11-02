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
          <span
            v-if="control.loadState === ''"
            v-html="control.icon"></span>
          <span
            v-if="control.loadState === 'loading'"
            v-html="loaderIcon">
          </span>
          <span
            v-if="control.loadState === 'error'"
            v-html="loaderErrorIcon">
          </span>
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
      loaderIcon: `
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd">
            <path d="M37.752 19.876C37.752 10.003 29.748 2 19.876 2 10.003 2 2 10.003 2 19.876c0 9.872 8.003 17.876 17.876 17.876a17.876 17.876 0 0 0 17.876-17.876" fill="#AC997C" fill-rule="nonzero"/>
            <path fill-opacity=".01" fill="#FFFFFF" d="M0 0h40v40H0z"/>
            <g transform="translate(4 16)" fill-rule="nonzero" fill="#FFFFFF">
              <circle cx="3.661" cy="3.661" r="3.661">
                <animate
                  attributeName="opacity"
                  dur="1s"
                  values="0;1;0"
                  repeatCount="indefinite"
                  begin="0.1"/> 
              </circle>
              <circle cx="15.863" cy="3.661" r="3.661">
                <animate
                  attributeName="opacity"
                  dur="1s"
                  values="0;1;0"
                  repeatCount="indefinite" 
                  begin="0.2"/>
              </circle>
              <circle cx="28.065" cy="3.661" r="3.661">
                <animate
                  attributeName="opacity"
                  dur="1s"
                  values="0;1;0"
                  repeatCount="indefinite" 
                  begin="0.3"/>
              </circle>
            </g>
          </g>
        </svg>`,
      loaderErrorIcon: `
      <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd">
          <path fill-opacity=".01" fill="#FFFFFF" d="M0 0h40v40H0z"/>
          <path d="M38 20.124c0-9.872-8.003-17.876-17.876-17.876-9.872 0-17.876 8.004-17.876 17.876C2.248 29.997 10.252 38 20.124 38A17.876 17.876 0 0 0 38 20.124" fill="#FFFFFF" fill-rule="nonzero"/>
          <path d="M15.607 2.824l.867 17.344c.042.824.722 1.471 1.546 1.471h4.28c.824 0 1.504-.647 1.545-1.47l.866-17.327C32.361 4.868 38 11.837 38 20.124A17.876 17.876 0 0 1 20.124 38c-9.872 0-17.876-8.003-17.876-17.876 0-8.312 5.674-15.3 13.36-17.3zm9.712 26.039a5.166 5.166 0 0 0-5.16-5.16A5.166 5.166 0 0 0 15 28.863a5.166 5.166 0 0 0 5.16 5.16 5.166 5.166 0 0 0 5.16-5.16z" fill="#D65353" fill-rule="nonzero"/>
        </g>
      </svg>`,
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
