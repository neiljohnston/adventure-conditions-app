<template>
  <div class="text-xs-center">
    <v-bottom-sheet
      v-model="bottomSheetState"
      lazy>
      <v-card>
        <v-container
          fluid
          style="min-height: 0;"
          grid-list-lg
        >
          <v-layout
            v-for="tile in tilesArray"
            :key="tile.key"
            row>
            <v-flex xs12>
              <v-card class="elevation-3">
                <v-flex
                  row
                  xs12>
                  <v-card-title primary-title>
                    <div class="headline">{{ tile.headline }}</div>
                    <div>{{ tile.note }}</div>
                  </v-card-title>
                </v-flex>
                <v-layout
                  :class="[$vuetify.breakpoint.name === 'xs' ? 'column reverse' : 'row']">
                  <v-flex
                    :class="[tile.img ? 'xs12' : 'xs12']"
                    md7>
                    <v-card-text xs12>
                      <v-data-table
                        :items="tile.displayFields"
                        class="elevation-1"
                        hide-actions
                        hide-headers>
                        <template
                          slot="items"
                          slot-scope="props">
                          <td class="text-xs-left align-start justify-start">
                            {{ props.item.fieldName }}
                          </td>
                          <td class="text-xs-right">{{ props.item.fieldValue }}</td>
                        </template>
                      </v-data-table>
                    </v-card-text>
                  </v-flex>
                  <v-flex
                    v-if="tile.img"
                    xs12
                    md5>
                    <v-img
                      :src="getImageUrl(tile)"
                      :aspect-ratio="16/9"
                      contain
                      @error="onImageError(tile)">
                      <v-layout
                        slot="placeholder"
                        fill-height
                        align-center
                        justify-center
                        ma-0>
                        <v-progress-circular
                          v-if="!tile.imgLoadError"
                          indeterminate
                          color="grey lighten-5">
                        </v-progress-circular>
                        <div
                          v-else
                          class="error--text">Image Unavailable</div>
                      </v-layout>
                    </v-img>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-actions class="pa-3">
                  Actions
                  <v-spacer></v-spacer>
                  <v-btn
                    v-if="tile.directions"
                    :href="tile.directions"
                    target="_blank"
                    flat
                    icon
                    color="orange">
                    <v-icon>directions</v-icon>
                  </v-btn>
                  <v-btn
                    v-if="tile.link"
                    :href="tile.link"
                    target="_blank"
                    flat
                    icon
                    color="orange">
                    <v-icon>open_in_new</v-icon>
                  </v-btn>

                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>

    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import loaderImageURL from '../assets/images/loader.gif';

export default {
  name: 'BottomSheetView',

  data() {
    return {
      loaderImage: loaderImageURL,
      error: false,
      imageLoadErrors: [],
    };
  },

  computed: {
    ...mapState([
      'tilesArray', 'isSheetVisible',
    ]),

    bottomSheetState: {
      get() {
        return this.isSheetVisible;
      },
      set(value) {
        // set store
        this.setSheetVisible(value);
      },
    },
  },

  watch: {
    isSheetVisible(visible) {
      if (visible) {
        this.$nextTick(() => {
          const container = document.getElementsByClassName('v-dialog v-bottom-sheet v-dialog--active')[0];
          container.scrollTop = 0;
        });
      }
    },
  },

  methods: {
    ...mapActions([
      'setSheetVisible',
    ]),

    getImageUrl(tile) {
      this.$set(tile, 'imgLoadError', false);
      return tile.img;
    },

    onImageError(tile) {
      this.$set(tile, 'imgLoadError', true);

      // this.imgLoadErrors[key] = true;
      console.log('Image Load Error');
      // tile.img = 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif';
    },
  },

};
</script>

<style>
.v-dialog.v-bottom-sheet{
  /* make scrollable */
  overflow-y: auto;
}

.v-dialog:not(.v-dialog--fullscreen) {
    max-height: 50%;
}
</style>
