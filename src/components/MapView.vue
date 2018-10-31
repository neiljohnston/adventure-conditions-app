<template>
  <div
    id="map"
    class="map">
  </div>
</template>
<script>
import 'ol/ol.css';
import axios from 'axios';
import moment from 'moment';

import Map from 'ol/Map';
import View from 'ol/View';
import {
  GeoJSON,
  EsriJSON,
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

import { mapGetters, mapState, mapActions } from 'vuex';


import {
  layerDefinitions,
} from '../assets/js/layers';

import {style} from '../assets/js/styles';


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
      layers: [],
      labelBreakpoint: 612,
    };
  },

  computed: {
    ...mapState([
      'title',
      'uiState',
    ]),
    ...mapGetters([
      'getNavigationControlById',
      'getIsSheetVisible',
    ]),
    mapViewState() {
      return this.uiState.mapViewState;
    },
  },

  created() {
    this.$bus.$on('map-resize', this.mapResizeHandler);
    this.$bus.$on('layer-visibility', this.layerVisibilityHandler);
    this.$bus.$on('fly-to', this.flyToHandler);
  },

  beforeDestroy() {
    this.$bus.$off('map-resize');
    this.$bus.$off('layer-visibility');
    this.$bus.$off('fly-to');
  },

  mounted() {
    map = this.initializeMap();
    mapView = this.updateMapView(
      this.mapViewState.center,
      this.mapViewState.zoom,
    );

    map.setView(mapView);
    this.mapResizeHandler();

    // initialize layers as reactive
    this.layers = layerDefinitions;

    this.initializeLayers(this.layers);

    map.on('singleclick', (evt) => this.featuresInformationDisplay(evt));

    map.on('moveend', (evt) => this.mapMoveEndHandler(evt));
  },

  methods: {
    // import actions from store
    ...mapActions([
      'setTilesArray',
      'setSheetVisible',
      'pushToTilesArray',
      'setMapViewStateCenter',
      'setMapViewStateZoom',
    ]),

    featuresInformationDisplay(evt) {
      const tilesArray = [];
      // clear the store
      this.setTilesArray(tilesArray);
      // eslint-disable-next-line no-unused-vars
      map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
        const layerId = feature.getProperties().layerId;
        const layerMap = this.getLayerById(this.layers, layerId);
        const featureProperties = feature.getProperties();

        const popup = layerMap.popup;

        if (popup) {
          const displayeFields = [];

          const featureValues = [];
          Object.keys(featureProperties).forEach((key) => {
            console.log(key, `${featureProperties[key]}`);
          });

          Object.keys(popup.fields).forEach((fieldKey) => {
            let fieldValue = featureProperties[popup.fields[fieldKey]];

            if (fieldValue && (fieldValue != null) && (typeof fieldValue !== 'undefined')) {

              // detect and convert unix dates
              if (Number.isInteger(fieldValue)
                && fieldValue.toString().length === 13
                && moment(fieldValue, ['x', 'X'], true).isValid()) {
                // Convert to human readable date
                fieldValue = moment(fieldValue).format('dddd, MM Do YYYY, h:mm a');
              }

              // handle newlines as html
              if (typeof fieldValue === 'string') {
                fieldValue = fieldValue.replace(/(?:\r\n|\r|\n)/g, '<br>');
              }

              displayeFields.push({
                key: `${feature.getId()}-${fieldKey}`,
                fieldName: fieldKey,
                fieldValue: fieldValue,
              });
            }
          });

          const tile = {
            key: feature.getId(),
            headline: popup.title,
            note: popup.note,
            img: featureProperties[popup.image] || false,
            link: featureProperties[popup.link] || false,
            directions: featureProperties[popup.map] || false,
            displayFields: displayeFields,
            imgLoadError: false,
          };

          // better to push to the store so results stream in
          if (!this.getIsSheetVisible) {
            this.setSheetVisible(true);
          }
          this.pushToTilesArray(tile);
        }
      }, {
        hitTolerance: 10,
      });
    },

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

    animateMapCenter(newMapCenter, minZoom) {
      mapView.animate({
        center: newMapCenter,
        duration: 500,
        zoom: (mapView.getZoom() < minZoom) ? minZoom : mapView.getZoom(),
      });
    },

    mapResizeHandler() {
      this.$nextTick(() => {
        map.updateSize();
      });
    },

    layerVisibilityHandler(id, active) {
      const layer = this.getLayerById(this.layers, id);
      if (layer) this.setLayerVisibility(layer, active);
    },

    flyToHandler(location, extent) {
      const newMapCenter = [location.x, location.y];
      this.animateMapCenter(newMapCenter, 10);
    },

    mapMoveEndHandler() {
      this.setMapViewStateCenter(mapView.getCenter());
      this.setMapViewStateZoom(mapView.getZoom());
    },

    initializeLayers(layers) {
      layers.forEach((layer, index) => {
        this.$set(layer, 'zIndex', (layers.length - index));

        // Set initial visibility here to match navigation
        const control = this.getNavigationControlById(layer.id);
        if (control) this.$set(layer, 'visible', control.active);
        if (layer.visible) {
          this.$set(layer, 'loadState', 'loading');
        }

        if (layer.type === 'geojson') {
          const newSource = new VectorSource({
            format: new GeoJSON(),
            loader: this.geoJsonLoader(layer),
          });

          this.$set(layer, 'source', newSource);

          const newLayer = new VectorLayer(this.getLayerOptions(layer));
          newLayer.setStyle(this.styleFunction);

          layer.source.on('addfeature', (event) => {
            event.feature.set('layerId', layer.id);
          });

          this.addMapLayer(layer, newLayer);
        }

        if (layer.type === 'esrijson') {
          const newSource = new VectorSource({
            format: new EsriJSON(),
            loader: this.geoJsonLoader(layer),
          });

          this.$set(layer, 'source', newSource);

          const newLayer = new VectorLayer(this.getLayerOptions(layer));
          newLayer.setStyle(this.styleFunction);

          layer.source.on('addfeature', (event) => {
            event.feature.set('layerId', layer.id);
          });

          this.addMapLayer(layer, newLayer);
        }


        if (layer.type === 'arcgisrestmapeserver') {
          const newSource = new ImageArcGISRest({
            ratio: layer.ratio,
            params: layer.params,
            url: layer.endpoint,
            crossOrigin: 'Anonymous',
          });
          this.$set(layer, 'source', newSource);

          const newLayer = new ImageLayer(this.getLayerOptions(layer));

          this.imageLoadEventing(layer);
          this.addMapLayer(layer, newLayer);
        }

        if (layer.type === 'imagewms') {
          const newSource = new ImageWMS({
            ratio: layer.ratio,
            params: layer.params,
            url: layer.endpoint,
            // crossOrigin: 'anonymous'
          });
          this.$set(layer, 'source', newSource);

          const newLayer = new ImageLayer(this.getLayerOptions(layer));

          this.imageLoadEventing(layer);
          this.addMapLayer(layer, newLayer);
        }

        if (layer.type === 'xyz') {
          const newSource = new XYZ({
            url: layer.endpoint,
          });
          this.$set(layer, 'source', newSource);

          const newLayer = new TileLayer(this.getLayerOptions(layer));
          newLayer.setPreload(Infinity);

          this.imageLoadEventing(layer);
          this.addMapLayer(layer, newLayer);
        }
      });
    },

    addMapLayer(layer, newLayer) {
      this.$set(layer, 'layer', newLayer);
      map.addLayer(layer.layer);
    },

    getLayerOptions(layer) {
      return {
        source: layer.source,
        visible: layer.visible,
        opacity: layer.opacity,
        zIndex: layer.zIndex,
      };
    },

    imageLoadEventing(layer) {
      layer.source.on('imageloadstart', () => {
        this.$set(layer, 'loadState', 'loading');
      });

      layer.source.on('imageloaderror', () => {
        console.log('imageloaderror', layer.id);
        this.$set(layer, 'loadState', 'error');
      });

      layer.source.on('imageloadend', () => {
        this.$set(layer, 'loadState', 'loaing');
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
      const textStyle = this.getTextStyle(layer, feature, resolution);
      if (returnStyle && textStyle) {
        returnStyle.setText(textStyle);
      }

      return returnStyle;
    },

    getTextStyle(layer, feature, resolution) {
      let textStyle = null;
      if (layer.label) {
        let labelText = '';

        if (resolution < this.labelBreakpoint) {
          if (feature.getProperties()[layer.label] && feature.getProperties()[layer.label].length > 0) labelText += layer.labelPrefix || '';
          labelText += feature.getProperties()[layer.label] || '';
        }

        textStyle = new Text({
          text: labelText,
          font: '12px Arial',
          align: 'center',
          baseline: 'middle',
          fill: new Fill({
            color: '#003D6B',
          }),
        });
      }
      return textStyle;
    },

    // eslint-disable-next-line no-unused-vars
    defaultStyles(layer, feature, resolution) {
      const geometryStyles = [];

      const stroke = layer.oStroke ? layer.oStroke : false ||
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
