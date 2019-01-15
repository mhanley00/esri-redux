export const INITIAL_STATE = {
  locateModalVisible: false,
  shareModalVisible: false,
  viewReady: false,
  itemInfo: {}
};

export const TEXT = {
  title: 'Trail Finder',
  subtitle: 'Search the best running routes in the District'
};

export const MAP_OPTIONS = {
  // basemap: 'streets-vector'
  basemap: 'gray-vector'
};

export const VIEW_OPTIONS = {
  ui: { components: ['logo', 'attribution'] },
  center: [-77.0369, 38.9072], //Similar to Leaflet/Mapbox API, lat/long in reverse
  // center: [-82.4423, 35.6111], //Similar to Leaflet/Mapbox API, lat/long in reverse, FOR EXAMPLE LOAD
  zoom: 15
};

export const URLS = {
  itemInfo: appid => `//www.arcgis.com/sharing/rest/content/items/${appid}/data`
};
