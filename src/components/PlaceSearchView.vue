<template>
  <!-- <v-text-field
    solo-inverted
    flat
    hide-details
    label="Place"
    prepend-inner-icon="search">
  </v-text-field> -->

  <v-autocomplete
    v-model="select"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    @change="change"
    editable
    color="#cccccc"
    dark
    solo-inverted
    hide-details
    hide-no-data
    hide-selected
    item-text="Description"
    item-value="magicKey"
    placeholder="Start typing to Search"
    prepend-icon="search"
    return-object
    clearable
    clearable-icon="close-circle"
    append-icon="">
  </v-autocomplete>
</template>
<script>
import axios from 'axios';

export default {
  name: 'PlaceSearchView',

  data() {
    return {
      timer: 0,
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      select: null,
      search: null,
      geocoderAPI: 'https://plume-api.now.sh/proxy/https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?' +
                   'f=json&' +
                   'searchExtent={"xmin": -19580583.886643037,"ymin": 2723407.405924198,"xmax": -5824364.780216439,"ymax": 12761729.456559826,"spatialReference": {"wkid": 3857}}&',
      //  'searchExtent={"xmin": -15781582.608539863,"ymin": 6077137.871205063,"xmax": -12342527.831933213,"ymax": 8586718.383863969,"spatialReference": {"wkid": 3857}}&', // BC      
      locationDetailsAPI: 'https://plume-api.now.sh/proxy/https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?' +
              'f=json&' +
              'outSR=102100&' +
              'magicKey=',
    };
  },

  computed: {
    fields() {
      if (!this.model) return [];
      return Object.keys(this.model).map((key) => {
        return {
          key: key,
          value: this.model[key] || 'n/a',
        };
      });
    },
    items() {
      return this.entries.map((entry) => {
        const Description = entry.text.length > this.descriptionLimit
          ? entry.text.slice(0, this.descriptionLimit) + '...'
          : entry.text;
        return Object.assign({}, entry, { Description });
      });
    },
  },

  watch: {
    model() {
      console.log(this.model);
    },
    search(val) {
      if (val.length === 0) {
        console.log ('val === 0: reset');
        this.entries = [];
      }

      if (val &&
        val.length >= 3 &&
        val !== this.select) {
        this.searchForSuggestions(val);
      }
    },
  },

  methods: {
    searchForSuggestions(val) {
      console.log('searchForSuggestions', val);
      clearTimeout(this.timer);

      this.time = setTimeout(() => {
        // Items have already been loaded
        if (this.items.length > 0) return;

        // Items have already been requested
        if (this.isLoading) return;

        this.isLoading = true;

        axios.get(`${this.geocoderAPI}text=${encodeURI(val)}`)
          .then((res) => {
            const { count, suggestions } = res.data;
            this.count = count;
            this.entries = suggestions;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => (this.isLoading = false));
      }, 500);
    },

    change() {
      console.log('foo');
    },
  },
};

</script>

<style scoped>
</style>
