export const INITIAL_STATE = {
  locateModalVisible: false,
  shareModalVisible: false,
  viewReady: false,
  itemInfo: {}
};

export const TEXT = {
  title: 'Esri Example',
  subtitle: 'Example with React, Esri, Sass, and more.'
};

export const MAP_OPTIONS = {
  basemap: 'streets-vector'
};

export const VIEW_OPTIONS = {
  ui: { components: ['logo', 'attribution'] },
  center: [-77.0369, 38.9072], //Similar to Leaflet/Mapbox API, lat/long in reverse
  zoom: 12
};

export const URLS = {
  itemInfo: appid => `//www.arcgis.com/sharing/rest/content/items/${appid}/data`
};
