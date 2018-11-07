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
    <v-list
      class="rg-navigation-list">
      <v-list-tile
        v-if="siteMeta.hasReader"
        class="rg-list-tile"
        ripple
        value="true"
        @click="openReaderView()">
        <v-list-tile-action class="rg-loader-icon">
          <span
            class="rg-overlay"
            v-show="false">
          </span>
          <span class="rg-loaded-icon">
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill-opacity=".01" fill="#FFF" d="M0 0h40v40H0z"/><circle fill="#FFF" cx="20" cy="20" r="18"/><path d="M20 38c-9.941 0-18-8.059-18-18S10.059 2 20 2s18 8.059 18 18-8.059 18-18 18zm10.593-26.956c-2.284.13-6.822.601-9.624 2.316a.64.64 0 0 0-.303.549V29.07c0 .481.526.785.97.562 2.883-1.45 7.052-1.847 9.113-1.955.704-.037 1.25-.601 1.25-1.277V12.323c.001-.738-.639-1.323-1.406-1.28zM19.03 13.36c-2.8-1.715-7.34-2.186-9.623-2.316C8.64 11 8 11.585 8 12.323V26.4c0 .677.547 1.24 1.25 1.277 2.063.109 6.234.505 9.116 1.957.443.223.967-.081.967-.561V13.9c0-.22-.109-.422-.303-.541z" fill="#AC997C"/></g></svg>
          </span>
          <span class="rg-navigation-label">
            News Reader
          </span>
        </v-list-tile-action>
        <v-list-tile-content class="rg-tile-content">
          <v-list-tile-title class="rg-tile-title caption">Twitter News Updates from:</v-list-tile-title>
          <v-list-tile-sub-title class="rg-tile-sub-title caption">@EmergencyInfoBC, @BCGovFireInfo &amp; @DriveBC</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        class="rg-list-tile"
        v-for="(control, i) in navigation"
        v-if="control.navigation"
        v-model="control.active"
        :key="i"
        value="true"
        ripple
        @click="toggleControl(control)">

        <v-list-tile-action class="rg-loader-icon">
          <span
            class="rg-overlay"
            v-show="control.loadState === 'loading'"
            v-html="loadingOverlay">
          </span>
          <span
            class="rg-loaded-icon"
            v-if="control.loadState !== 'error'"
            v-html="control.icon"></span>
          <span
            v-if="control.loadState === 'error'"
            v-html="loaderErrorIcon">
          </span>
          <span class="rg-navigation-label">
            {{ control.label }}
          </span>
        </v-list-tile-action>

        <v-list-tile-content class="rg-tile-content">
          <v-list-tile-title class="rg-tile-title caption">{{control.legendText}}</v-list-tile-title>
          <v-list-tile-sub-title class="rg-tile-sub-title" v-html="control.legendContent"></v-list-tile-sub-title>
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
      loadingOverlay: `
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd">
            <path fill-opacity=".01" fill="#FFFFFF" d="M0 0h40v40H0z"/>
            <path d="M36 20.035c0-8.835-6.941-16-15.5-16-8.559 0-15.5 7.165-15.5 16m2.628 0c0-7.304 5.729-13.287 12.872-13.287s12.872 5.983 12.872 13.287" fill="#FFFFFF" fill-rule="nonzero">
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
      'siteMeta',
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

    openReaderView() {
      this.setReaderViewVisible(true);
    },
  },

};
</script>

<style lang="less">
.rg-tile {
  display: flex;
  flex-direction: column;
}
.rg-loader-icon{
  position: relative;
  flex: 0 0 80px;
  display: flex;
  flex-direction: column;
  white-space: normal;
  justify-content: center;
  align-items: center;
}
.rg-overlay{
  position: absolute;
  z-index: 2;
  top: 8px;
}
.rg-loaded-icon{
  /* position: absolute; */
  z-index: 1;
  flex: 0 0 40px;
  width: 40px;
}

.rg-navigation-list {
  display: flex;
  flex-direction: column;
}

.rg-list-tile {
  flex: 1 1 80px;

  .v-list__tile {
    height: auto;
    max-height: 80px;
    padding: 0;
  }
}

.rg-navigation-label {
  flex: 0 0 20px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin-top: 4px;
  max-width: 100%;
  font-size: 10px;
  line-height: 10px;
  text-align: center;
  hyphens: auto;
  margin: 0;
  padding: 0 2px;
}

.rg-tile-content {
    padding: 8px;
    flex: 0 1 100%;

    .rg-tile-title {
      flex: 0 1 24px;
    }

    .rg-tile-sub-title {
      flex: 0 0 56px;
      white-space: normal;
      font-size: 12px !important;
      font-weight: 400;
    }
}
</style>
