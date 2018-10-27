import {
  Fill,
  Stroke,
  Style,
  Icon,
  Circle as CircleStyle
} from 'ol/style';

import cameraPointURL from '../images/video-solid.png';

export const style = [];

style.modis = {
  // eslint-disable-next-line no-unused-vars
  'Polygon': function (feature, resolution) {
    let fillColors = [];
    fillColors['Active Burning'] = '#f03b20';
    fillColors['Last 12-24 hrs'] = '#fd8d3c';
    fillColors['Last 24-48 hrs'] = '#fecc5c';
    // load_stat='Active Burning'  OR load_stat='Last 12-24 hrs' OR load_stat='Last 24-48 hrs'
    let fillColor = fillColors[feature.getProperties().load_stat] || '#ffffb2';

    return new Style({
      stroke: new Stroke({
        color: '#bd0026',
        width: 2
      }),
      fill: new Fill({
        color: fillColor
      })
    });
  }
};
