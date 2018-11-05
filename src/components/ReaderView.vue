<template>
  <div id="rg-reader-view-holder" class="text-xs-center">
    <v-bottom-sheet
      id="rg-bottom-sheet"
      v-model="readerViewState">
      <v-card
        id="rg-reader-card">
        <v-toolbar
            id="rg-reader-toolbar"
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
          
              <div
                id="reader-body"
                ref="readerBody">
                
                <a
                  class="twitter-timeline"
                  href="https://twitter.com/NeilJohnston/lists/bcwildfires?ref_src=twsrc%5Etfw">
                </a>
                <div ref="placeHolder"></div>
              </div>
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

    closeReaderView() {
      this.readerViewState = false;
    },
  },

};
</script>

<style lang="less">
div#rg-reader-card {
    height: 100vh;
    width: 100%;
    position: relative;
    overflow: hidden;
}

div#reader-body {
    overflow-y: auto;
    height: 100%;
    margin-top: 64px;
}
</style>
