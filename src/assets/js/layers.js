import moment from 'moment';
// import essReceptionCentersURL from 'static/eSSReceptionCenters.geojson';

import firePointURL from '../images/fire-point.svg';
// const essReceptionCentersURL = require('./../../static/eSSReceptionCenters.geojson');

const plumeURL = 'https://api.emergencymap.ca/';

export const navigationDefinitions = [
  {
    isGroupControl: true,
    id: 'bc-evacuation-orders',
    active: true,
    icon: '<img src="static/evacuation-order-icon.svg" />',
    label: 'Evacuation Order',
    loadState: '',
    navigation: true,
    legendText: 'Evacuation Orders',
    legendContent: '<img src="static/evacuation-order-legend.svg" />',
  },
  {
    isGroupControl: true,
    id: 'bc-evacuation-alerts',
    active: true,
    icon: '<img src="static/evacuation-alert-icon.svg" />',
    label: 'Evacuation Alert',
    loadState: '',
    navigation: true,
    legendText: 'Evacuation Alerts',
    legendContent: '<img src="static/evacuation-alert-legend.svg" />',
  },
  {
    isGroupControl: true,
    id: 'bc-evacuation-all-clear',
    active: true,
    icon: '<img src="static/evacuation-all-clear-icon.svg" />',
    label: 'Evacuation All Clear',
    loadState: '',
    navigation: true,
    legendText: 'Areas Safe to Repopulate',
    legendContent: '<img src="static/evacuation-all-clear-legend.svg" />',
  },
  // {
  //   isGroupControl: true,
  //   id: 'bc-shelters',
  //   active: false,
  //   icon: shelterIcon,
  //   label: 'ESS Reception Centers',
  //   loadState: '',
  //   navigation: true,
  // legendText: '',
  // legendContent: '',
  // },
  {
    isGroupControl: true,
    id: 'drive-bc-traffic-conditions',
    active: true,
    icon: '<img src="static/drivebc-icon.svg" />',
    label: 'DriveBC Traffic',
    loadState: '',
    navigation: true,
    legendText: 'Drive BC Traffic Incidents',
    legendContent: '<img src="static/drivebc-legend.svg" />',
  },
  {
    isGroupControl: true,
    id: 'fire-perimeters',
    active: true,
    icon: '<img src="static/all-fire-perimeters-icon.svg" />',
    label: 'All Fire Perimiters',
    loadState: '',
    navigation: true,
    legendText: 'Toggle All Fire Perimiters',
    legendContent: '',
  },
  {
    isGroupControl: false,
    id: 'bc-active-fire-perimeters',
    groupControlId: 'fire-perimeters',
    active: true,
    opacity: 1,
    icon: '<img src="static/fire-perimeter-icon.svg" />',
    label: 'BC Fire Perimeters',
    loadState: '',
    navigation: true,
    legendText: 'BC Wildfire Perimeters',
    legendContent: '<img src="static/wildfire-perimeter-legend.svg" />',
  },
  {
    isGroupControl: false,
    id: 'us-active-fire-perimeters',
    groupControlId: 'fire-perimeters',
    active: true,
    opacity: 1,
    icon: '<img src="static/fire-perimeter-icon.svg" />',
    label: 'US Fire Perimeters',
    loadState: '',
    navigation: true,
    legendText: 'US Wildfire Perimeters',
    legendContent: '<img src="static/wildfire-perimeter-legend.svg" />',
  },
  {
    isGroupControl: true,
    id: 'fire-points',
    active: true,
    icon: '<img src="static/all-fire-points-icon.svg" />',
    label: 'All Fire Points',
    loadState: '',
    navigation: true,
    legendText: 'Toggle All Fire Points',
    legendContent: '',
  },
  {
    isGroupControl: false,
    id: 'bc-active-fire-points',
    groupControlId: 'fire-points',
    active: true,
    opacity: 1,
    icon: '<img src="static/fire-point-icon.svg" />',
    label: 'BC Fire Points',
    loadState: '',
    navigation: true,
    legendText: 'BC Active Wildfire Points',
    legendContent: '',
  },
  {
    isGroupControl: false,
    id: 'ab-active-fire-points',
    groupControlId: 'fire-points',
    active: true,
    opacity: 1,
    icon: '<img src="static/fire-point-icon.svg" />',
    label: 'AB Fire Points',
    loadState: '',
    navigation: true,
    legendText: 'Albertan Wildfire Points',
    legendContent: '',
  },
  {
    isGroupControl: false,
    id: 'us-large-fire-points',
    groupControlId: 'fire-points',
    active: true,
    opacity: 1,
    icon: '<img src="static/fire-point-icon.svg" />',
    label: 'US Fire Points',
    loadState: '',
    navigation: true,
    legendText: 'US Large Forest Fire Points',
    legendContent: '',
  },
  {
    isGroupControl: false,
    id: 'modis-satellite',
    groupControlId: 'fire-points',
    active: false,
    opacity: 1,
    icon: '<img src="static/modis-icon.svg" />',
    label: 'Satellite Fire Sensor',
    loadState: '',
    navigation: true,
    legendText: 'NASA MODIS Satellite Fire Sensors',
    legendContent: '<img src="static/modis-legend.svg" />',
  },
  {
    isGroupControl: false,
    id: 'ospo-noaa-smoke',
    active: false,
    opacity: 1,
    icon: '<img src="static/smoke-icon.svg" />',
    label: 'Live Smoke',
    loadState: '',
    navigation: true,
    legendText: 'NOAA OSPO Live Smoke Layer',
    legendContent: '<img src="static/ospo-noaa-smoke.svg" />',
  },
  {
    isGroupControl: false,
    id: 'nws-experimental-smoke',
    active: true,
    opacity: 0.5,
    icon: '<img src="static/smoke-forecast-icon.svg" />',
    label: 'Smoke Forecast',
    loadState: '',
    navigation: true,
    legendText: 'National Weather Service Smoke Forecast (NDGD)',
    legendContent: '<img src="static/nws-smoke-forecast.svg" />',
  },
  {
    isGroupControl: false,
    id: 'world-air-quality',
    active: false,
    opacity: 1,
    icon: '<img src="static/air-quality-icon.svg" />',
    label: 'Air Quality Points',
    loadState: '',
    navigation: true,
    legendText: "World's Air Pollution: Real-time Air Quality Index",
    legendContent: '<img src="static/air-quality-legend.svg" />',
  },
  {
    isGroupControl: false,
    id: 'berkley-earth-air-quality',
    active: true,
    opacity: 0.25,
    icon: '<img src="static/air-quality-icon.svg" />',
    label: 'Air Quality Map',
    loadState: '',
    navigation: true,
    legendText: 'Berkley Earth Realtime Air Quality',
    legendContent: '<img src="static/air-quality-legend.svg" />',
  },
  {
    isGroupControl: false,
    id: 'cdn-current-weather',
    active: false,
    opacity: 1,
    icon: '<img src="static/current-weather-icon.svg" />',
    label: 'Canadian Weather',
    loadState: '',
    navigation: true,
    legendText: 'Current Canadian Weather',
    legendContent: '',
  },
  {
    isGroupControl: false,
    id: 'bc-traffic-cameras',
    active: true,
    opacity: 1,
    icon: '<img src="static/camera-icon.svg" />',
    label: 'BC Cameras',
    loadState: '',
    navigation: true,
    legendText: '',
    legendContent: 'DriveBC Highway Cameras',
  },
  {
    isGroupControl: false,
    id: 'ab-traffic-cameras',
    active: true,
    opacity: 1,
    icon: '<img src="static/camera-icon.svg" />',
    label: 'Alberta Cameras',
    loadState: '',
    navigation: true,
    legendText: '',
    legendContent: '511 Alberta Highway Cameras',
  },
  {
    isGroupControl: true,
    id: 'traffic-cameras',
    active: false,
    icon: '<img src="static/all-cameras-icon.svg" />',
    label: 'All Traffic Cameras',
    loadState: '',
    navigation: true,
    legendText: 'Toggle All Highway Cameras',
    legendContent: '',
  },
  {
    isGroupControl: false,
    id: 'idt-cameras',
    groupControlId: 'traffic-cameras',
    active: false,
    opacity: 1,
    icon: '<img src="static/camera-icon.svg" />',
    label: 'Idaho Cameras',
    loadState: '',
    navigation: false,
    legendText: '',
    legendContent: 'Idaho Highway Cameras',
  },
  {
    isGroupControl: false,
    id: 'wsdot-cameras',
    groupControlId: 'traffic-cameras',
    active: false,
    opacity: 1,
    icon: '<img src="static/camera-icon.svg" />',
    label: 'Washington Cameras',
    loadState: '',
    navigation: false,
    legendText: '',
    legendContent: 'Washington Highway Cameras',
  },
  // {
  //   isGroupControl: false,
  //   id: 'odot-cameras',
  //   groupControlId: 'traffic-cameras',
  //   active: false,
  //   opacity: 1,
  //   icon: '<img src="static/camera-icon.svg" />',
  //   label: 'Oregon Cameras',
  //   loadState: '',
  //   navigation: false,
  //   legendText: 'Oregon Highway Cameras',
  //   legendContent: '',
  // },
  {
    isGroupControl: false,
    id: 'caltrans-cameras',
    groupControlId: 'traffic-cameras',
    active: false,
    style: 'highwaycams',
    opacity: 1,
    icon: '<img src="static/camera-icon.svg" />',
    label: 'California Cameras',
    loadState: '',
    navigation: false,
    legendText: 'California Highway Cameras',
    legendContent: '',
  },
  {
    isGroupControl: false,
    id: 'canadian-fire-danger',
    serverType: 'geoserver',
    active: false,
    opacity: 0.25,
    icon: '<img src="static/fire-danger-icon.svg" />',
    label: 'CAN Fire Danger',
    loadState: '',
    navigation: true,
    legendText: 'CWFIS Fire Danger',
    legendContent: '<img src="static/canadian-fire-danger-legend.svg" />',

  },
  {
    isGroupControl: false,
    id: 'us-fire-danger',
    active: false,
    opacity: 0.25,
    icon: '<img src="static/fire-danger-icon.svg" />',
    label: 'US Fire Danger',
    loadState: '',
    navigation: true,
    legendText: 'USGS Fire Danger Forcast',
    legendContent: '<img src="static/us-fire-danger-legend.svg" />',
  },
  {
    isGroupControl: false,
    id: 'noaa-radar',
    active: false,
    opacity: 0.75,
    icon: '<img src="static/radar-icon.svg" />',
    label: 'Weather Radar',
    loadState: '',
    navigation: true,
    legendText: 'NOAA Weather Radar',
    legendContent: '<img src="static/noaa-radar-legend.svg" />',
  },
  {
    isGroupControl: false,
    id: 'emulated-lightning-density',
    active: false,
    opacity: 1,
    icon: '<img src="static/lightning-icon.svg" />',
    label: 'Lightning',
    loadState: '',
    navigation: true,
    legendText: 'NOAA Emulated Lightning Strike Density',
    legendContent: '<img src="static/lightning-strike-density-legend.svg" />',
  },
  {
    isGroupControl: false,
    id: 'wind-conditions',
    active: false,
    opacity: 0.75,
    icon: '<img src="static/wind-conditions-icon.svg" />',    
    label: 'Wind Speed & Direction',
    loadState: '',
    navigation: true,
    legendText: 'Meteorological Service of Canada Wind Speed and Driection',
    legendContent: '<img src="static/wind-conditions-legend.svg" />',
  },
  {
    isGroupControl: false,
    id: 'here-live-traffic',
    active: true,
    opacity: 1,
    icon: '<img src="static/live-traffic-icon.svg" />',
    label: 'Live Traffic',
    loadState: '',
    navigation: true,
    legendText: 'HERE Technologies Live Traffic',
    legendContent: '<img src="static/traffic-legend.svg" />',
  },
];

export const layerDefinitions = [
  {
    siteTags: ['bcfiremap', 'adventureconditions', 'crisisconditions'],
    id: 'bc-evacuation-orders',
    type: 'geojson',
    endpoint: 'https://maps.gov.bc.ca/arcgis/rest/services/mpcm/bcgw/MapServer/dynamicLayer/query?layer=%7B%22drawingInfo%22%3A%20null%2C%20%22definitionExpression%22%3A%20null%2C%20%22maxScale%22%3A%200%2C%20%22source%22%3A%20%7B%22type%22%3A%20%22dataLayer%22%2C%20%22dataSource%22%3A%20%7B%22type%22%3A%20%22table%22%2C%20%22workspaceId%22%3A%20%22MPCM_ALL_PUB%22%2C%20%22dataSourceName%22%3A%20%22WHSE_HUMAN_CULTURAL_ECONOMIC.EMRG_ORDER_AND_ALERT_AREAS_SP%22%2C%20%22gdbVersion%22%3A%20%22%22%7D%7D%2C%20%22minScale%22%3A%2037500000%2C%20%22id%22%3A%20null%7D&f=geojson&where=(EVENT_TYPE%20%3D%20%27Fire%27)%20AND%20(ORDER_ALERT_STATUS%20%3D%20%27Order%27)&returnGeometry=true&spatialRel=esriSpatialRelIntersects&maxAllowableOffset=2445&outFields=*&orderByFields=START_ORDER_DATE%20desc&outSR=102100&resultOffset=0',
    oStroke: {
      color: [122, 1, 119, 1],
      width: 2,
    },
    oFill: {
      color: [122, 1, 119, 0.7],
    },
    visible: true,
    opacity: 1,
    label: 'EVENT_NAME',
    labelPrefix: 'EVACUATION Order: \n',
    popup: {
      title: 'Evacuation Order',
      fields: {
        'Event Name': 'EVENT_NAME',
        'Event Number': 'EVENT_NUMBER',
        'Event Type': 'EVENT_TYPE',
        'Start Date': 'ALERT_START_DATE',
        'Status': 'ORDER_ALERT_STATUS',
        'Issuer': 'ISSUING_AGENCY',
        'Regional District': 'REGIONAL_DISTRICT',
        'Municipality': 'MUNICIPALITY',
        'First Nation': 'INDIAN_BAND_NAME',
      },
    },
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions', 'crisisconditions'],
    id: 'bc-evacuation-alerts',
    type: 'geojson',
    endpoint: 'https://maps.gov.bc.ca/arcgis/rest/services/mpcm/bcgw/MapServer/dynamicLayer/query?layer=%7B%22drawingInfo%22%3A%20null%2C%20%22definitionExpression%22%3A%20null%2C%20%22maxScale%22%3A%200%2C%20%22source%22%3A%20%7B%22type%22%3A%20%22dataLayer%22%2C%20%22dataSource%22%3A%20%7B%22type%22%3A%20%22table%22%2C%20%22workspaceId%22%3A%20%22MPCM_ALL_PUB%22%2C%20%22dataSourceName%22%3A%20%22WHSE_HUMAN_CULTURAL_ECONOMIC.EMRG_ORDER_AND_ALERT_AREAS_SP%22%2C%20%22gdbVersion%22%3A%20%22%22%7D%7D%2C%20%22minScale%22%3A%2037500000%2C%20%22id%22%3A%20null%7D&f=geojson&where=(EVENT_TYPE%20%3D%20%27Fire%27)%20AND%20(ORDER_ALERT_STATUS%20%3D%20%27Alert%27)&returnGeometry=true&spatialRel=esriSpatialRelIntersects&maxAllowableOffset=2445&outFields=*&orderByFields=START_ALERT_DATE%20desc&outSR=102100&resultOffset=0&resultRecordCount=50',
    oStroke: {
      color: [226, 0, 147, 1],
      width: 2,
    },
    oFill: {
      color: [226, 0, 147, 0.7],
    },
    visible: true,
    opacity: 1,
    label: 'EVENT_NAME',
    labelPrefix: 'EVACUATION ALERT: \n',
    popup: {
      title: 'Evacuation Alert',
      fields: {
        'Event Name': 'EVENT_NAME',
        'Event Number': 'EVENT_NUMBER',
        'Event Type': 'EVENT_TYPE',
        'Start Date': 'ALERT_START_DATE',
        'Status': 'ORDER_ALERT_STATUS',
        'Issuer': 'ISSUING_AGENCY',
        'Regional District': 'REGIONAL_DISTRICT',
        'Municipality': 'MUNICIPALITY',
        'First Nation': 'INDIAN_BAND_NAME',
      },
    },
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions', 'crisisconditions'],
    id: 'bc-evacuation-all-clear',
    type: 'geojson',
    endpoint: 'https://maps.gov.bc.ca/arcgis/rest/services/mpcm/bcgw/MapServer/dynamicLayer/query?layer=%7B%22drawingInfo%22%3A%20null%2C%20%22definitionExpression%22%3A%20null%2C%20%22maxScale%22%3A%200%2C%20%22source%22%3A%20%7B%22type%22%3A%20%22dataLayer%22%2C%20%22dataSource%22%3A%20%7B%22type%22%3A%20%22table%22%2C%20%22workspaceId%22%3A%20%22MPCM_ALL_PUB%22%2C%20%22dataSourceName%22%3A%20%22WHSE_HUMAN_CULTURAL_ECONOMIC.EMRG_ORDER_AND_ALERT_AREAS_SP%22%2C%20%22gdbVersion%22%3A%20%22%22%7D%7D%2C%20%22minScale%22%3A%2037500000%2C%20%22id%22%3A%20null%7D&f=geojson&where=(EVENT_TYPE%20%3D%20%27Fire%27)%20AND%20(ORDER_ALERT_STATUS%20%3D%20%27All%20Clear%27)&returnGeometry=true&spatialRel=esriSpatialRelIntersects&maxAllowableOffset=2445&outFields=*&orderByFields=START_ALERT_DATE%20desc&outSR=102100&resultOffset=0&resultRecordCount=50',
    oStroke: {
      color: [247, 104, 161, 1],
      width: 2,
    },
    oFill: {
      color: [247, 104, 161, 0.7],
    },
    visible: true,
    opacity: 1,
    label: 'EVENT_NAME',
    labelPrefix: 'ALL-CLEAR: \n',
    popup: {
      title: 'Evacuation All Clear',
      fields: {
        'Event Name': 'EVENT_NAME',
        'Event Number': 'EVENT_NUMBER',
        'Event Type': 'EVENT_TYPE',
        'Start Date': 'ALERT_START_DATE',
        'Status': 'ORDER_ALERT_STATUS',
        'Issuer': 'ISSUING_AGENCY',
        'Regional District': 'REGIONAL_DISTRICT',
        'Municipality': 'MUNICIPALITY',
        'First Nation': 'INDIAN_BAND_NAME',
      },
    },
  },
  // {
  //   siteTags: ['bcfiremap', 'adventureconditions', 'crisisconditions'],
  //   id: 'bc-shelters',
  //   type: 'geojson',
  //   endpoint: essReceptionCentersURL,
  //   // style: 'firepoint',
  //   oImageOptions: {
  //     anchor: [0.5, 17],
  //     anchorXUnits: 'fraction',
  //     anchorYUnits: 'pixels',
  //     src: shelterPointURL,
  //   },
  //   visible: false,
  //   opacity: 1,
  //   label: 'Title',
  //   popup: {
  //     title: 'ESS Reception Center',
  //     note: 'Emergency Social Services Receptions Centers provide support for evacuees, ' +
  //           'view more details on <a href="https://www.emergencyinfobc.gov.bc.ca/home/information-for-affected-residents-and-evacuees/what-are-emergency-social-services/" target="_blank">' +
  //           'EmergencyInfoBC</a>',
  //     map: 'map',
  //     fields: {
  //       'Title': 'Title',
  //       'Address': 'Address',
  //       'Phone': 'Phone',
  //     },
  //   },
  // },
  {
    siteTags: ['bcfiremap', 'adventureconditions', 'crisisconditions'],
    id: 'drive-bc-traffic-conditions',
    type: 'geojson',
    dataProjection: 'EPSG:4326',
    endpoint: `${plumeURL}drive511proxy`,
    visible: true,
    opacity: 1,
    labelPrefix: 'DriveBC: \n',
    label: 'title',
    popup: {
      title: 'DriveBC Incident',
      fields: {
        'Title': 'title',
        'Headline': 'headline',
        'Severity': 'severity',
        'Status': 'status',
        'Description': 'description',
      },
    },
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions'],
    id: 'cdn-current-weather',
    type: 'imagewms',
    endpoint: 'http://geo.weather.gc.ca/geomet?VERSION=1.3.0',
    params: {
      'SERVICE': 'WMS',
      'VERSION': '1.3.0',
      'LAYERS': 'CURRENT_CONDITIONS',
      'FORMAT': 'image/png',
      'TRANSPARENT': 'TRUE',
      'CRS': 'EPSG:3857',
    },
    ratio: 1,
    visible: false,
    opacity: 1,
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions', 'crisisconditions'],
    id: 'bc-active-fire-perimeters',
    type: 'geojson',
    endpoint: `${plumeURL}simplifygeojson/https://services6.arcgis.com/ubm4tcTYICKBpist/arcgis/rest/services/BCWS_FirePerimeters_PublicView/FeatureServer/0/query?where=FIRE_STATUS+%3C%3E+%27Not+Active%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=geojson&tolerance=250`,
    oStroke: {
      color: [255, 0, 0, 1],
      width: 2,
    },
    oFill: {
      color: [255, 165, 0, 0.7],
    },
    visible: true,
    opacity: 1,
    labelPrefix: 'Fire Perimeter: \n',
    label: 'FIRE_OF_NOTE_NAME',
    popup: {
      title: 'Active Fire Perimeter',
      fields: {
        'Fire of Note Name': 'FIRE_OF_NOTE_NAME',
        'Geographic Discription': 'GEOGRAPHIC_DESCRIPTION',
        'Fire Status': 'FIRE_STATUS',
        'Fire Number': 'FIRE_NUMBER',
        'Current Size': 'CURRENT_SIZE',
        'Fire Size (Hectares)': 'FIRE_SIZE_HECTARES',
        'Track Date': 'TRACK_DATE',
        'Load Date': 'LOAD_DATE',
      },
    },
  },
  {
    siteTags: ['adventureconditions', 'crisisconditions'],
    id: 'us-active-fire-perimeters',
    type: 'geojson',
    endpoint: `${plumeURL}simplifygeojson/https://rmgsc-haws2.cr.usgs.gov/arcgis/rest/services/geomac_fires/MapServer/2/query?where=active+%3D+%27Y%27&text=&objectIds=&time=&geometry=-18631848.101007503%252C725135.0462942608%252C-5345258.096368558%252C11888610.153284714&geometryType=esriGeometryEnvelope&inSR=102100&spatialRel=esriSpatialRelContains&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=102100&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson&tolerance=50`,
    oStroke: {
      color: [255, 0, 0, 1],
      width: 2,
    },
    oFill: {
      color: [255, 165, 0, 0.7],
    },
    visible: true,
    opacity: 1,
    label: 'incidentname',
    popup: {
      title: 'Active Fire Perimeter',
      fields: {
        'Incident Name': 'incidentname',
        'Fire ID': 'uniquefireidentifier',
        'Complex Name': 'complexname',
        'Mapping Method': 'mapmethod',
        'Acres Size': 'gisacres',
        'State': 'state',
      },
    },
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions', 'crisisconditions'],
    id: 'bc-active-fire-points',
    type: 'geojson',
    endpoint: 'https://services6.arcgis.com/ubm4tcTYICKBpist/arcgis/rest/services/BCWS_ActiveFires_PublicView/FeatureServer/0/query?where=FIRE_STATUS+%3C%3E+%27Not+Active%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelEnvelopeIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=',
    // style: 'firepoint',
    oImageOptions: {
      anchor: [0.5, 17],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: firePointURL,
    },
    visible: true,
    opacity: 1,
    label: 'GEOGRAPHIC_DESCRIPTION',
    popup: {
      title: 'Active Fire Point',
      fields: {
        'Fire Name': 'FIRE_OF_NOTE_NAME',
        'Geographic Discription': 'GEOGRAPHIC_DESCRIPTION',
        'Fire Status': 'FIRE_STATUS',
        'Fire Cause': 'FIRE_CAUSE',
        'Ignition Date': 'IGNITION_DATE',
        'Fire Identifier': 'FIRE_NUMBER',
        'Current Size (hectares)': 'CURRENT_SIZE',
      },
    },
  },
  {
    siteTags: ['adventureconditions', 'crisisconditions'],
    id: 'ab-active-fire-points',
    type: 'esrijson',
    endpoint: 'https://maps.alberta.ca/genesis/rest/services/Wildfire_Status_Web_Map/Latest/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=102100&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson',
    // style: 'firepoint',
    oImageOptions: {
      anchor: [0.5, 17],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: firePointURL,
    },
    visible: true,
    opacity: 1,
    label: 'GEOGRAPHIC_DESCRIPTION',
    popup: {
      title: 'Active Fire Point',
      fields: {
        'Fire Identifier': 'FIRE_NUMBER',
        'Geographic Discription': 'GEOGRAPHIC_DESCRIPTION',
        'Fire Status': 'FIRE_STATUS',
        'Fire Cause': 'GENERAL_CAUSE',
        'Ignition Date': 'IGNITION_DATE',
        'Current Size (hectares)': 'AREA_ESTIMATE',
      },
    },
  },
  {
    siteTags: ['adventureconditions', 'crisisconditions'],
    id: 'us-large-fire-points',
    type: 'geojson',
    endpoint: 'https://rmgsc-haws2.cr.usgs.gov/arcgis/rest/services/geomac_fires/MapServer/1/query?where=&text=&objectIds=&time=&geometry=-18631848.101007503%252C725135.0462942608%252C-5345258.096368558%252C11888610.153284714&geometryType=esriGeometryEnvelope&inSR=102100&spatialRel=esriSpatialRelContains&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=102100&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson',
    // style: 'firepoint',
    oImageOptions: {
      anchor: [0.5, 17],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: firePointURL,
    },
    visible: true,
    opacity: 1,
    label: 'GEOGRAPHIC_DESCRIPTION',
    popup: {
      title: 'US Large Fire Point',
      fields: {
        'Fire Name': 'incidentname',
        'Percentage Contained': 'percentcontained',
        'Fire Cause': 'firecause',
        'Fire Identifier': 'uniquefireidentifier',
        'Current Size (acres)': 'acres',
      },
    },
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions', 'crisisconditions'],
    id: 'modis-satellite',
    type: 'geojson',
    endpoint: 'https://wildfire.cr.usgs.gov/arcgis/rest/services/geomac_fires/MapServer/3/query?where=load_stat%3D%27Active+Burning%27++OR+load_stat%3D%27Last+12-24+hrs%27+OR+load_stat%3D%27Last+24-48+hrs%27&text=&objectIds=&time=&geometry=-15464286.158429246%2C5897585.730705328%2C-12589206.644992914%2C8575781.652083585&geometryType=esriGeometryEnvelope&inSR=102100&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=102100&returnIdsOnly=false&returnCountOnly=false&orderByFields=load_stat&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson',
    style: 'modis',
    visible: false,
    opacity: 1,
    popup: {
      title: 'MODIS NASA/NOAA Satellite Hotspot Detection',
      note: 'A ~1km hotspot has been detected at this location. Multiple overlapping hotspots are joined, and may indicate the leading edge of a fire.',
      fields: {
        'Status': 'load_stat',
      },
    },
  },
  // source url: https://www.ospo.noaa.gov/Products/land/hms.html
  {
    siteTags: ['bcfiremap', 'adventureconditions'],
    id: 'ospo-noaa-smoke',
    type: 'geojson',
    dataProjection: 'EPSG:4326',
    endpoint: `${plumeURL}kmltogeojson/https://www.ospo.noaa.gov/data/land/fire/smoke.kml`,
    visible: false,
    style: 'ospoNoaaSmoke',
    opacity: 1,
    popup: {
      title: 'OSPO NOAA Smoke',
      note: 'Created and updated by a satellite analyst between 8am and 10am Eastern Time. After 10am, the analysis is fine-tuned as time permits as additional satellite data becomes available.',
      fields: {
        'Description': 'description',
      },
    },
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions'],
    id: 'nws-experimental-smoke',
    type: 'arcgisrestmapeserver',
    endpoint: 'https://utility.arcgis.com/usrsvcs/servers/668c6a41fd184984a49caee8f759654d/rest/services/LiveFeeds/NDGD_SmokeForecast/MapServer/',
    params: {
      'layers': 'show:0',
      'dpi': 96,
      'transparent': true,
      'format': 'png32',
      'time': `${(Math.floor(moment() / 3600000)) * 3600000},${(Math.floor(moment().add('4','h') / 3600000)) * 3600000}`,
      'imageSR': '102100',
    },
    ratio: 1.5,
    visible: true,
    opacity: 0.5,
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions'],
    id: 'world-air-quality',
    type: 'xyz',
    endpoint: 'https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?' +
              'token=814c13027adaacd8f20999baebc56c07eeda183e',
    visible: false,
    opacity: 1,
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions'],
    id: 'bc-traffic-cameras',
    type: 'geojson',
    endpoint: 'https://services5.arcgis.com/DMpNrZXwcnMmkWrW/arcgis/rest/services/BC_HighwayCams/FeatureServer/0/query?where=&objectIds=&time=&geometry=-14709312.23546%2C+6171605.41945905%2C+-12789524.9063483%2C+8399302.6434706&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=',
    style: 'highwaycams',
    visible: true,
    opacity: 1,
    popup: {
      title: 'BC Highway Camera',
      image: 'links_imageDisplay',
      link: 'links_bchighwaycam',
      fields: {
        'Caption': 'caption',
        'Name': 'camName',
        'Highway': 'highway_number',
        'Description': 'highway_locationDescription',
      },
    },
  },
  {
    siteTags: ['bcfiremap', 'abfiremap', 'adventureconditions'],
    id: 'ab-traffic-cameras',
    dataProjection: 'EPSG:4326',
    type: 'geojson',
    endpoint: `${plumeURL}ab511proxy/https://511.alberta.ca/api/v2/get/cameras?format=json`,
    style: 'highwaycams',
    visible: true,
    opacity: 1,
    popup: {
      title: 'AB Highway Camera',
      image: 'Url',
      // link: 'links_bchighwaycam',
      fields: {
        'Name': 'Name',
        'Highway': 'RoadwayName',
        'Description': 'RoadwayName',
      },
    },
  },
  {
    siteTags: ['adventureconditions'],
    id: 'idt-cameras',
    type: 'esrijson',
    endpoint: 'https://navigator.state.or.us/arcgis/rest/services/Projects/Prep_TransCams/MapServer/3/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=102100&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&returnTrueCurves=false&resultOffset=&resultRecordCount=&f=json',
    visible: false,
    style: 'highwaycams',
    opacity: 1,
    popup: {
      title: 'Idaho Department of Transport Camera',
      image: 'url',
      fields: {
        'Title': 'device_name',
        'Description': 'name',
        'Route': 'route_designator',
      },
      // html: 'description',
    },
  },
  {
    siteTags: ['adventureconditions'],
    id: 'wsdot-cameras',
    type: 'esrijson',
    endpoint: 'https://navigator.state.or.us/arcgis/rest/services/Projects/Prep_TransCams/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=102100&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&returnTrueCurves=false&resultOffset=&resultRecordCount=&f=json',
    visible: false,
    style: 'highwaycams',
    opacity: 1,
    popup: {
      title: 'Washington Highway Camera',
      image: 'cctv_url',
      fields: {
        'Title': 'Name',
      },
      // html: 'description',
    },
  },
  // {
  //   siteTags: ['adventureconditions'],
  //   id: 'odot-cameras',
  //   type: 'esrijson',
  //   endpoint: `${plumeURL}proxy/https://tripcheck.com/Scripts/map/data/cctvinventory.js?dt=1535581365754`,
  //   visible: false,
  //   style: 'highwaycams',
  //   opacity: 1,
  //   popup: {
  //     title: 'ODOT Camera',
  //     image: 'filename',
  //     fields: {
  //       'Title': 'title',
  //       'Route': 'route',
  //     },
  //     // html: 'description',
  //   },
  // },
  {
    siteTags: ['adventureconditions'],
    id: 'caltrans-cameras',
    type: 'geojson',
    endpoint: `${plumeURL}kmltogeojson/http://quickmap.dot.ca.gov/data/cctv.kml`,
    dataProjection: 'EPSG:4326',
    visible: false,
    style: 'highwaycams',
    opacity: 1,
    popup: {
      title: 'Caltrans Camera',
      html: 'description', // TODO: fix
    },
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions'],
    id: 'berkley-earth-air-quality',
    type: 'xyz',
    endpoint: `http://berkeleyearth.lbl.gov/air-quality/maps/hour/${moment().format('YYYYMM')}/${moment().startOf('h').add('6', 'h').format('YYYYMMDDHH')}/tiles/health/{z}/{x}/{y}.png`,
    visible: true,
    opacity: 0.25,
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions'],
    id: 'canadian-fire-danger',
    type: 'imagewms',
    endpoint: 'http://cwfis.cfs.nrcan.gc.ca/geoserver/public/wms?VERSION=1.3.0&SERVICE=WMS',
    params: {
      'LAYERS': `public:fdr${moment().format('YYYYMMDD')}sf`,
      'FORMAT': 'image/png',
      'TRANSPARENT': 'TRUE',
    },
    ratio: 1,
    serverType: 'geoserver',
    visible: false,
    opacity: 0.25,
    navigation: true,
  },
  {
    siteTags: ['adventureconditions'],
    id: 'us-fire-danger',
    type: 'arcgisrestmapeserver',
    endpoint: 'https://firedanger.cr.usgs.gov/arcgis/rest/services/Greenness/USGS_Greenness/MapServer',
    params: {
      LAYERS: 'show:29',
      'dpi': 96,
      'transparent': true,
      'format': 'png8',
      'imageSR': '102100',
    },
    ratio: 1.5,
    visible: false,
    opacity: 0.25,
  },
  {
    siteTags: ['adventureconditions', 'hurricaneconditions'],
    id: 'noaa-radar',
    type: 'arcgisrestmapeserver',
    endpoint: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/radar_base_reflectivity/MapServer/',
    params: {
      'layers': 'show:3',
      'dpi': 96,
      'transparent': true,
      'format': 'png32',
      'imageSR': '102100',
    },
    ratio: 1.5,
    visible: false,
    opacity: 0.75,
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions', 'hurricaneconditions'],
    id: 'wind-conditions',
    type: 'imagewms',
    endpoint: 'http://geo.weather.gc.ca/geomet?VERSION=1.3.0',
    params: {
      'SERVICE': 'WMS',
      'LAYERS': 'GDPS.ETA_UU',
      'FORMAT': 'image/png',
      'TRANSPARENT': 'TRUE',
      'CRS': 'EPSG:3857',
    },
    ratio: 1,
    visible: false,
    opacity: 0.75,
    icon: '<span class="fa-stack fa-lg">' +
          '<i class="fas fa-cloud fa-fw fa-stack-2x 2x"></i>' +
          '<i class="fas fa-arrow-right fa-fw fa-stack-1x" style="color: #ffffff"></i>' +
          '</span>',
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions', 'hurricaneconditions'],
    id: 'emulated-lightning-density',
    type: 'arcgisrestmapeserver',
    endpoint: 'https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/sat_meteo_emulated_imagery_lightningstrikedensity_goes_time/MapServer',
    params: {
      LAYERS: 'show:3',
    },
    ratio: 1.5,
    visible: false,
    opacity: 1,
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions', 'hurricaneconditions'],
    id: 'here-live-traffic',
    type: 'xyz',
    endpoint: 'https://{1-4}.traffic.maps.api.here.com' +
    '/maptile/2.1/flowtile/newest/normal.traffic.day/{z}/{x}/{y}/256/png' +
    '?app_id=GSPhia0Z9VPsKdCPYnHG&app_code=E6tKhHYbjg9MaObtpABhVQ',
    visible: true,
    opacity: 1,
  },
];
