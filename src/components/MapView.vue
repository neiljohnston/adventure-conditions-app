<template>
  <div
    id="map"
    class="map"></div>
</template>
<script>
import 'ol/ol.css';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

import {
  defaults as defaultControls,
  ScaleLine,
} from 'ol/control';

const scaleLineControl = new ScaleLine();

export default {
  name: 'MapView',

  data() {
    return {
      map: null,
      mapView: null,
    };
  },

  created() {
    this.$bus.$on('map-resize', this.mapResizeHandler);
  },

  beforeDestroy() {
    this.$bus.$off('map-resize');
  },

  mounted() {
    this.map = new Map({
      target: 'map',
      controls: defaultControls({
        attributionOptions: {
          collapsible: false,
        },
      }).extend([
        scaleLineControl,
      ]),
      loadTilesWhileAnimating: true,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        }),
      ],
    });

    this.mapView = new View({
      center: [0, 0],
      zoom: 2,
    });

    this.map.setView(this.mapView);
    this.mapResizeHandler();
  },

  methods: {
    mapResizeHandler() {
      console.log('mapResizeHandler');
      this.$nextTick(() => {
        this.map.updateSize();
      });
    },
  },
};
</script>

<style scoped>
.map {
  height: 100vh;
  width: 100%;
}
</style>
