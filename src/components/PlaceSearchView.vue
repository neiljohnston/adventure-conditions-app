<template>
  <v-autocomplete
    v-model="select"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    class="toolbar-autocomplete"
    editable
    color="#cccccc"
    dark
    solo-inverted
    hide-details
    hide-no-data
    hide-selected
    item-text="Description"
    item-value="magicKey"
    placeholder="Search Places"
    return-object
    clearable
    clearable-icon="close-circle"
    prepend-inner-icon="search"
    append-icon=""
    justify-end>
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
      suggestions: [],
      isLoading: false,
      select: null,
      search: null,
      previousValue: '',
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
      return this.suggestions.map((entry) => {
        const Description = entry.text.length > this.descriptionLimit
          ? entry.text.slice(0, this.descriptionLimit) + '...'
          : entry.text;
        return Object.assign({}, entry, { Description });
      });
    },
  },

  watch: {
    select() {
      if (!this.select) return;
      this.selectLocation(this.select.magicKey);
    },
    search(val) {
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
          // this.suggestions = [];
          const { suggestions } = res.data;
          this.suggestions = suggestions;
        })
        .catch((err) => {
          this.suggestions = [];
        })
        .finally(() => {
          this.isLoading = false;
          // clearTimeout(this.timer);
        });
    },

    selectLocation(magicKey) {
      axios.get(this.locationDetailsAPI + magicKey)
        .then((response) => {
          this.$bus.$emit('fly-to', response.data.candidates[0].location, response.data.candidates[0].extent);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};

</script>

<style lang="scss">
</style>
