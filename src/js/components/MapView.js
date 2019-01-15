import { MAP_OPTIONS, VIEW_OPTIONS } from 'js/config';
import LocateModal from 'js/components/modals/Locate';
import ShareModal from 'js/components/modals/Share';
import Spinner from 'js/components/shared/Spinner';
import Controls from 'js/components/Controls';
import MapView from 'esri/views/MapView';
import FeatureLayer from 'esri/layers/FeatureLayer';
import React, { Component } from 'react';
import EsriMap from 'esri/Map';

export default class Map extends Component {
  displayName: 'Map';

  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      shareModalVisible: false,
      locateModalVisible: false,
      view: {},
      latitude: '',
      longitude: ''
    };
  }

  componentDidMount() {
    const map = new EsriMap(MAP_OPTIONS);

    // Create our map view
    const promise = new MapView({
      container: this.refs.mapView,
      map: map,
      ...VIEW_OPTIONS
    });

    promise.then(view => {
      this.setState({
        view: view
      });

    });
    // Now that we have created our Map and Mapview, here is where we would add some layers!
    // see https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=layers-featurelayer for an example!

  // const arlingtonloop = new FeatureLayer ({
  //     portalItem: {
  //       id: "1a08d221e31843a093267ae8ed005f23"
  //     }
  //   });
  //   // arlingtonloop.then(function(arlingtonloop){
  //   map.add(arlingtonloop);
  //   // });

//THIS WORKS BUT NOT SURE HOW TO GET DATA IN HERE
    // const featureLayer = new FeatureLayer({
    //   url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0"
    // });

    // map.add(featureLayer);
    const featureLayer = new FeatureLayer({
      url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/DC_Crime_2011/FeatureServer"
      //ArcGIS REST Services Directory: https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services
    });

    map.add(featureLayer);

  }





  toggleLocateModal = () => {
    this.setState({locateModalVisible: !this.state.locateModalVisible});
  }

  toggleShareModal = () => {
    this.setState({shareModalVisible: !this.state.shareModalVisible});
  }

  render () {
    const {shareModalVisible, locateModalVisible, view} = this.state;

    return (
      <div ref='mapView' className='map-view'>
        <ShareModal visible={shareModalVisible} toggleShareModal={this.toggleShareModal} />
        <LocateModal visible={locateModalVisible} toggleLocateModal={this.toggleLocateModal} />
        <Controls view={view} toggleShareModal={this.toggleShareModal} toggleLocateModal={this.toggleLocateModal} />
        <Spinner active={!view.ready} />
      </div>
    );
  }
}
