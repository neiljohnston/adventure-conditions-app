<template>
    <v-dialog 
    id="placeSearchDialog"
    v-model="isDialogOpen" 
    fullscreen 
    hide-overlay
    transition="dialog-bottom-transition">
      <v-btn 
        flat
        solo
        slot="activator">
        <v-icon>search</v-icon>
      </v-btn>
      <v-card>
        <v-toolbar
          dark
          fixed
          color="#f3845a"
          >
          
          <v-text-field
            v-if="isDialogOpen"
            v-model="search"
            ref="placeSearchTextField"
            prepend-inner-icon="search"
            placeholder="Search for Places..."
            label="Solo"
            solo-inverted
            clearable
            autofocus
            color="#f3845a"
            :loading="isLoading"
          ></v-text-field>

          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="isDialogOpen = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list 
          two-line
          subheader>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Place Search</v-list-tile-title>
              <v-list-tile-sub-title
                v-if="items.length">
                  Select a result to navigate to.
                </v-list-tile-sub-title>
              <v-list-tile-sub-title
                v-else>
                  Enter a place name above.
                </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>

        </v-list>
        <v-list>
          <v-list-tile
            v-for="(item) in items"
            :key="item.magicKey"
          >
            <v-list-tile-content>
              <v-list-tile-title
              @click="selectLocation(item.magicKey)">
              {{item.Description}}
            </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-dialog>
</template>
<script>
import axios from 'axios';

export default {
  name: 'PlaceSearchView',

  data() {
    return {
      search: null,
      isDialogOpen: true,

      descriptionLimit: 60,
      suggestions: [],
      isLoading: false,
      geocoderAPI: 'https://plume-api.now.sh/proxy/https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?' +
                   'f=json&' +
                   'maxSuggestions=10&' +
                   'searchExtent={"xmin": -19580583.886643037,"ymin": 2723407.405924198,"xmax": -5824364.780216439,"ymax": 12761729.456559826,"spatialReference": {"wkid": 3857}}&' +
                   '&category=Address,Populated%20Place,Land%20Features,Parks%20and%20Outdoors&',
      //  'searchExtent={"xmin": -15781582.608539863,"ymin": 6077137.871205063,"xmax": -12342527.831933213,"ymax": 8586718.383863969,"spatialReference": {"wkid": 3857}}&', // BC      
      locationDetailsAPI: 'https://plume-api.now.sh/proxy/https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?' +
              'f=json&' +
              'outSR=102100&' +
              'magicKey=',
    };
  },

  computed: {
    items() {
      return this.suggestions.map((entry) => {
        const Description = entry.text.length > this.descriptionLimit
          ? entry.text.slice(0, this.descriptionLimit) + '...'
          : entry.text;
        return Object.assign({}, entry, { Description });
      });
    },
  },

  watch: {
    search(val) {
      console.log(val);
      if (!val) {
        this.suggestions = [];
        return;
      }

      if (val.length === 0) {
        this.suggestions = [];
        return;
      }

      if (val.length <= 3) {
        this.suggestions = [];
        return;
      }
      // debounce search
      // this.timer = setTimeout(() => {
      this.searchForSuggestions(val);
      // }, 500);
    },
  },

  methods: {
    searchForSuggestions(val) {
      // Items have already been requested
      if (this.isLoading) return;

      // set loading to true
      this.isLoading = true;

      axios.get(`${this.geocoderAPI}text=${encodeURI(val)}`)
        .then((res) => {
          const { suggestions } = res.data;
          this.suggestions = suggestions;
        })
        .catch((err) => {
          this.suggestions = [];
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    selectLocation(magicKey) {
      this.isLoading = true;
      axios.get(this.locationDetailsAPI + magicKey)
        .then((response) => {
          this.$bus.$emit('fly-to', response.data.candidates[0].location, response.data.candidates[0].extent);
        })
        .catch((e) => {
          this.errors.push(e);
        })
        .finally(() => {
          this.isDialogOpen = false;
          this.search = null;
          this.suggestions = [];
          this.isLoading = false;
        });
    },
  },
};

</script>

<style lang="scss">
  .v-dialog--fullscreen > .v-card {
    margin: 56px 0 0 0 !important;
  }

  .v-dialog--fullscreen .v-input__slot{
    margin: 0;
  }
</style>
