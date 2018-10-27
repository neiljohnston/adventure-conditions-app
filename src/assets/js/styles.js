import {
  Fill,
  Stroke,
  Style,
  Icon,
  Circle as CircleStyle
} from 'ol/style';

import cameraPointURL from '../images/video-solid.png';

export const style = [];


style.highwaycams = {
  // eslint-disable-next-line no-unused-vars
  Point(feature, resolution) {
    let cameraRotationRad = 0;
    if (typeof feature.getProperties().orientation !== 'undefined') {
      cameraRotationRad = (feature.getProperties().orientation - 90) * Math.PI / 180;
    }

    return new Style({
      image: new Icon(/** @type {module:ol/style/Icon~Options} */ ({
        anchor: [0.5, 10],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: cameraPointURL,
        rotation: cameraRotationRad,
        rotateWithView: true,
        angle: 0,
      })),
    });
  },
};

style.modis = {
  // eslint-disable-next-line no-unused-vars
  Polygon(feature, resolution) {
    const fillColors = [];
    fillColors['Active Burning'] = '#f03b20';
    fillColors['Last 12-24 hrs'] = '#fd8d3c';
    fillColors['Last 24-48 hrs'] = '#fecc5c';
    // load_stat='Active Burning'  OR load_stat='Last 12-24 hrs' OR load_stat='Last 24-48 hrs'
    const fillColor = fillColors[feature.getProperties().load_stat] || '#ffffb2';

    return new Style({
      stroke: new Stroke({
        color: '#bd0026',
        width: 2,
      }),
      fill: new Fill({
        color: fillColor,
      }),
    });
  },
};

style.ospoNoaaSmoke = {
  // eslint-disable-next-line no-unused-vars
  Polygon(feature, resolution) {
    let d = 15;
    try {
      d = feature.getProperties().description;
      d = d.replace('Smoke Attributes:\n', '');
      d = d.trim();
      d = d.split('\n          ');
      d = d[2].split(':');
      d = d[1].trim();
    } catch (err) {
      d = 15;
    }

    return new Style({
      stroke: new Stroke({
        color: [153, 52, 4, 0.5],
        width: 2,
      }),
      fill: new Fill({
        color: [153, 52, 4, (d / 100 * 2)],
      }),
    });
  },
};
