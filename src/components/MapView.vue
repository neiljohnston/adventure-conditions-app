<template>
  <div
    id="map"
    class="map">
  </div>
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
  Circle as CircleStyle,
  Icon,
  Fill,
  Stroke,
  Style,
  Text
} from 'ol/style';

import {
  defaults as defaultControls,
  ScaleLine,
} from 'ol/control';

import { mapGetters, mapState } from 'vuex';


import {
  layerDefinitions,
} from '../assets/js/layers';

const style = [];


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

  computed: {
    ...mapState([
      'title',
    ]),
    ...mapGetters([
      'getNavigationControlById',
    ]),
    // Other properties
  },

  created() {
    this.$bus.$on('map-resize', this.mapResizeHandler);
    this.$bus.$on('layer-visibility', this.layerVisibilityHandler);
  },

  beforeDestroy() {
    this.$bus.$off('map-resize');
    this.$bus.$off('layer-visibility');
  },

  mounted() {
    map = this.initializeMap();
    mapView = this.updateMapView(this.center, this.zoom);

    map.setView(mapView);
    this.mapResizeHandler();

    // initialize layers and navigation as reactive
    this.layers = layerDefinitions;

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

    layerVisibilityHandler(id, active) {
      const layer = this.getLayerById(this.layers, id);
      console.log(layer.id);
      if (layer) this.setLayerVisibility(layer, active);
    },

    initializeLayers(layers) {
      layers.forEach((layer, index) => {
        const zindex = layers.length - index;

        // Set initial visibility here to match navigation
        const control = this.getNavigationControlById(layer.id);
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
            style: this.styleFunction,
            zIndex: zindex,
          });

          this.$set(layer, 'layer', newLayer);

          layer.source.on('addfeature', (event) => {
            event.feature.set('layerId', layer.id);
          });

          map.addLayer(layer.layer);
        }
      });
    },

    // eslint-disable-next-line no-unused-vars
    styleFunction(feature, resolution) {
      const layer = this.getLayerById(this.layers, feature.getProperties().layerId);
      const geomName = feature.getGeometry().getType();

      let returnStyle = null;

      if (layer.style && style[layer.style] && style[layer.style][geomName]) {
        returnStyle = style[layer.style][geomName](feature, resolution);
      } else {
        returnStyle = this.defaultStyles(layer, feature, resolution);
      }

      if (layer.label) {
        // let labelText = '';

        // if (resolution < 612) {
        //   labelText += layerMap.labelPrefix || '';
        //   labelText += feature.getProperties()[layerLabel] || '';
        // }

        // const textStyle = new Text({
        //   text: labelText,
        //   font: '12px Arial',
        //   align: 'center',
        //   baseline: 'middle',
        //   fill: new Fill({
        //     color: '#003D6B'
        //   }),
        // });

        // if (returnStyle) {
        //   returnStyle.setText(textStyle);
        // }
      }
      return returnStyle;
    },

    // eslint-disable-next-line no-unused-vars
    defaultStyles(layer, feature, resolution) {
      const geometryStyles = [];

      const stroke =  layer.oStroke ? layer.oStroke : false ||
                    (typeof feature.getProperties().stroke !== 'undefined') ? { color: `${feature.getProperties().stroke}`, width: 3 } : false ||
                    (typeof feature.getProperties()['marker-color'] !== 'undefined') ? { color: `${feature.getProperties()['marker-color']}`, width: 3 } : false ||
                    { color: [0, 0, 0, 1], width: 3};

      const fill =  layer.oFill ? layer.oFill : false ||
                  (typeof feature.getProperties()['marker-color'] !== 'undefined') ? { color: `${feature.getProperties()['marker-color']}` } : { color: [255, 255, 255, 1] };


      if (layer.oImageOptions) {
        geometryStyles.Point = new Style({
          image: new Icon(/** @type {module:ol/style/Icon~Options} */ (layer.oImageOptions)),
        });
      } else {
        geometryStyles.Point = new Style({
          stroke: new Stroke(stroke),
          image: new CircleStyle({
            fill: new Fill(fill),
            radius: 5,
          }),
        });
      }

      geometryStyles.LineString = new Style({
        stroke: new Stroke(stroke),
        fill: new Fill(fill),
      });
      geometryStyles.Polygon = new Style({
        stroke: new Stroke(stroke),
        fill: new Fill(fill),
      });
      geometryStyles.MultiPolygon = new Style({
        stroke: new Stroke(stroke),
        fill: new Fill(fill),
      });
      return geometryStyles[feature.getGeometry().getType()];
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
          this.setLayerVisibility(layer, false);
          // eslint-disable-next-line no-console
          console.log('Load Error: ', e);
        });
    },

    getLayerById(layers, id) {
      return layers.filter((layer) => { return layer.id === id; })[0];
    },

    setLayerVisibility(layer, visibility) {
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
