<template>
  <div class="text-xs-center">
    <v-bottom-sheet
      v-model="readerViewState"
      >
      <v-card>
        <v-toolbar
          dark
          absolute
          color="#f3845a">
          <span
            class=" subheading ml-3 mr-3 font-weight-light">
              News and Updates Reader
            </span>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click.native="closeReaderView">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container
          fluid
          style="min-height: 0;"
          grid-list-lg
        >
          <v-layout
            row>
            <v-flex xs12>
              <div ref="readerBody" id="information-body">
                <a class="twitter-timeline"
                  href="https://twitter.com/NeilJohnston/lists/bcwildfires?ref_src=twsrc%5Etfw">
                </a>
                <div ref="placeHolder"></div>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>

    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ReaderView',

  data() {
    return {
      error: false,
    };
  },

  computed: {
    ...mapState([
      'isReaderViewVisible',
    ]),

    readerViewState: {
      get() {
        return this.isReaderViewVisible;
      },
      set(value) {
        // set store
        this.setReaderViewVisible(value);
      },
    },
  },

  watch: {
    isReaderViewVisible(visible) {
      if (visible) {
        this.$nextTick(() => {
          const container = document.getElementsByClassName('v-dialog v-bottom-sheet v-dialog--active')[0];
          container.scrollTop = 0;
        });
      }
    },
  },

  mounted() {
    this.$nextTick(function () {
      let twitterScript = document.createElement('script');
      twitterScript.setAttribute('src',"https://platform.twitter.com/widgets.js");
      twitterScript.setAttribute('async', true);
      twitterScript.setAttribute('charset', 'utf-8');

      const placeHolder = this.$refs.placeHolder;
      const parent = this.$refs.readerBody;
      parent.insertBefore(twitterScript, placeHolder);
    });
  },

  methods: {
    ...mapActions([
      'setReaderViewVisible',
    ]),

    closeReaderView(){
      this.readerViewState = false;
    },
  },

};
</script>

<style lang="scss" scoped>
.v-dialog.v-bottom-sheet{
  /* make scrollable */
  overflow-y: auto;
}

.v-dialog:not(.v-dialog--fullscreen) {
    max-height: 50%;
}
</style>
