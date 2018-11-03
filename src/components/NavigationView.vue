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
        ripple
        @click="openReaderView()">
        <v-list-tile-action>
          <v-icon>library_books</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Update Reader</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        v-for="(control, i) in navigation"
        v-if="control.navigation"
        v-model="control.active"
        :key="i"
        value="true"
        ripple
        @click="toggleControl(control)">
        <v-list-tile-action class="loaderIcon">
          <span
            class="loaderOverlay"
            v-show="control.loadState === 'loading'"
            v-html="loaderIcon">
          </span>
          <span
            class="loadedIcon"
            v-if="control.loadState !== 'error'"
            v-html="control.icon"></span>
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
            <path fill-opacity=".01" fill="#D8D8D8" d="M0 0h40v40H0z"/>
            <path d="M36 20.035c0-8.835-6.941-16-15.5-16-8.559 0-15.5 7.165-15.5 16m2.628 0c0-7.304 5.729-13.287 12.872-13.287s12.872 5.983 12.872 13.287" fill="#CCCCCC" fill-rule="nonzero">
              <animateTransform 
                attributeName="transform" 
                attributeType="XML" 
                type="rotate"
                dur="1s" 
                from="0 20 20"
                to="360 20 20" 
                repeatCount="indefinite" />
            </path>
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
      'isReaderViewAvailable',
      'isReaderViewVisible',
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
      'setReaderViewVisible',
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

    openReaderView(){
      this.setReaderViewVisible(true);
    },
  },

};
</script>

<style>
.loaderIcon{
  position: relative;
}
.loaderOverlay{
  position: absolute;
  z-index: 2;
}
.loadedIcon{
  position: absolute;
  z-index: 1;
}
</style>
