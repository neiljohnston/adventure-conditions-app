<template>
  <div
    id="map"
    class="map"></div>
</template>
<script>
import 'ol/ol.css';
import axios from 'axios';

import Map from 'ol/Map';
import View from 'ol/View';
import {
  GeoJSON,
} from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import {
  Tile as TileLayer,
  Image as ImageLayer,
} from 'ol/layer';

import {
  ImageArcGISRest,
  ImageWMS,
  OSM,
  XYZ,
} from 'ol/source';

import {
  defaults as defaultControls,
  ScaleLine,
} from 'ol/control';

import {
  layerDefinitions,
  navigationDefinitions,
} from '../assets/js/layers';


const scaleLineControl = new ScaleLine();

let map;
let mapView;

export default {
  name: 'MapView',

  data() {
    return {
      name: 'Adventure Conditions', // process.env.name,
      tagline: 'Finding Safe and Healthy Stoke', // process.env.tagline,
      hasLegends: true, // process.env.hasLegends
      hasReader: false, // process.env.hasReader,
      siteId: 'adventureconditions', // process.env.siteId,
      description: 'Adventure conditions unifies evacuation orders and alerts, road closures, air quality data, smoke conditions and weather to help navigate BC Wildfires', // process.env.description,
      keywords: 'California, fires, BC, British Columbia, Wildfires, Evacuations, Road Conditions, Smoke, Air Quality, Health', // process.env.keywords,
      center: [-14173186.261234362, 7196206.431941464],
      zoom: 5,

      layers: [],
      navigation: [],
    };
  },

  created() {
    this.$bus.$on('map-resize', this.mapResizeHandler);
  },

  beforeDestroy() {
    this.$bus.$off('map-resize');
  },

  mounted() {
    map = this.initializeMap();
    mapView = this.updateMapView(this.center, this.zoom);

    map.setView(mapView);
    this.mapResizeHandler();

    // initialize layers and navigation as reactive
    this.layers = layerDefinitions;
    this.navigation = navigationDefinitions;

    this.initializeLayers(this.layers);
  },

  methods: {
    initializeMap() {
      return new Map({
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
    },

    updateMapView(center, zoom) {
      return new View({
        center: center,
        zoom: zoom,
      });
    },

    mapResizeHandler() {
      this.$nextTick(() => {
        map.updateSize();
      });
    },

    initializeLayers(layers) {
      layers.forEach((layer, index) => {
        const zindex = layers.length - index;

        // Set initial visibility here to match navigation
        const control = this.getNavigationControlById(this.navigation, layer.id);
        if (control) this.$set(layer, 'visible', control.active);

        if (layer.type === 'geojson') {
          if (layer.visible) {
            this.$set(layer, 'loadState', 'loading');
          }
          const newSource = new VectorSource({
            format: new GeoJSON(),
            loader: this.geoJsonLoader(layer),
          });

          this.$set(layer, 'source', newSource);

          const newLayer = new VectorLayer({
            source: layer.source,
            visible: layer.visible,
            opacity: layer.opacity,
            // style: styleFunction,
            zIndex: zindex,
          });

          this.$set(layer, 'layer', newLayer);

          layer.source.on('addfeature', (event) => {
            event.feature.set('layerMapId', layer.id);
          });

          map.addLayer(layer.layer);
        }
      });
    },

    geoJsonLoader(layer) {
      axios.get(layer.endpoint, { timeout: 45000 })
        .then((response) => {
          this.$set(layer, 'loadState', '');
          const projectionsConversion = (layer.dataProjection) ? { dataProjection: layer.dataProjection, featureProjection: 'EPSG:3857' } : {};
          layer.source.addFeatures(
            layer.source.getFormat().readFeatures(response.data, projectionsConversion),
          );
        })
        .catch((e) => {
          this.$set(layer, 'loadState', 'error');
          this.setVisibility(layer, false);
          // eslint-disable-next-line no-console
          console.log('Load Error: ', e);
        });
    },

    getNavigationControlById(navigation, id) {
      return navigation.filter((control) => { return control.id === id; })[0];
    },

    getLayerById(layers, id) {
      return layers.filter((layer) => { return layer.id === id; })[0];
    },

    setVisibility(layer, visibility) {
      layer.layer.setVisible(visibility);

      if (layer.type === 'geojson' && layer.loadState === 'error' && layer.visible) {
        this.$set(layer, 'loadState', 'loading');
        layer.source.setLoader(this.geoJsonLoader(layer));
      }
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
