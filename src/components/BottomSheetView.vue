<template>
  <div class="text-xs-center">
    <v-bottom-sheet
      v-model="bottomSheetState">
      <!-- <v-list three-line>
        <v-subheader>Open in</v-subheader>
        <v-list-tile
          v-for="tile in tilesArray"
          :key="tile.title"
        >
          <v-list-tile-avatar>
            <v-avatar
              size="32px"
              tile>
              <img
                :src="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`"
                :alt="tile.title"
              >
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list> -->

      <v-card>
        <v-container
          fluid
          style="min-height: 0;"
          grid-list-lg
        >
          <v-layout row wrap>
            <v-flex
              v-for="tile in tilesArray"
              :key="tile.key"
              xs12>
              <v-card color="cyan darken-2" class="white--text">
                <v-container fluid grid-list-lg>
                  <v-layout row>
                    <v-flex xs7>
                      <div>
                        <div class="headline">{{ tile.headline }}</div>
                        <div class="title">{{ tile.title }}</div>
                        <!-- <div>Foster the People</div> -->
                      </div>
                      <v-divider></v-divider>
                      <v-flex
                        xs12>
                        <v-card>
                          <v-list
                            v-for="field in tile.fields"
                            :key="field.key"
                            dense >
                            <v-list-tile>
                              <v-list-tile-content>{{ field.fieldName }}</v-list-tile-content>
                              <v-list-tile-content class="align-end"> {{ field.fieldValue }} </v-list-tile-content>
                            </v-list-tile>
                          </v-list>
                        </v-card>
                      </v-flex>
                    </v-flex>
                    <v-flex xs5>
                      <v-card-media
                        v-if="tile.img"
                        :src="tile.img"
                        height="125px"
                        contain
                      ></v-card-media>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
            <!-- <v-flex xs12>
              <v-card color="purple" class="white--text">
                <v-container fluid grid-list-lg>
                  <v-layout row>
                    <v-flex xs7>
                      <div>
                        <div class="headline">Halycon Days</div>
                        <div>Ellie Goulding</div>
                      </div>
                    </v-flex>
                    <v-flex xs5>
                      <v-card-media
                        src="/static/doc-images/cards/halcyon.png"
                        height="125px"
                        contain
                      ></v-card-media>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex> -->
          </v-layout>
        </v-container>
      </v-card>

    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'BottomSheetView',

  data() {
    return {
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

  mounted() {
  },

  methods: {
    ...mapActions([
      'setSheetVisible',
    ]),
  },

};
</script>

<style>
.dialog.bottom-sheet{
  /* make scrollable */
  overflow-y: auto;
}
.dialog:not(.dialog--fullscreen) {
    max-height: 60%;
}
</style>
