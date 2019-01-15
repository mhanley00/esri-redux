import { MAP_OPTIONS, VIEW_OPTIONS } from 'js/config';
import LocateModal from 'js/components/modals/Locate';
import ShareModal from 'js/components/modals/Share';
import Spinner from 'js/components/shared/Spinner';
import Controls from 'js/components/Controls';
import MapView from 'esri/views/MapView';
import FeatureLayer from 'esri/layers/FeatureLayer';
import React, { Component } from 'react';
import EsriMap from 'esri/Map';
import arlingtonLoop from '../arlingtonLoop.json';
import geometryEngine from 'esri/geometry/geometryEngine';

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
      longitude: '',
      definitionExpression: "offence:''"
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
    const measureThisAction = {
      title: "Measure Length",
      id: "measure-this",
      // image: "Measure_Distance16.png"
    };
    const template = { // autocasts as new PopupTemplate()
      title: "DC Crime Data",
      content: "{name}",
      actions: [measureThisAction]
    };

    const featureLayer = new FeatureLayer({
      url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/DC_Crime_2011/FeatureServer",
      //ArcGIS REST Services Directory: https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services
      // definitionExpression: `offence:${this.state.props}` // dots do not show up when defEx is like this
      definitionExpression: this.state.props,
      outFields: ["*"],
      popupTemplate: template
    });

    function measureThis() {
      let geom = view.popup.selectedFeature.geometry;
      let distance = geometryEngine.geodesicLength(geom, "miles");
      distance = parseFloat(Math.round(distance * 100) / 100).toFixed(2);
      view.popup.content = view.popup.selectedFeature.attributes.name +
        "<div style='background-color:DarkGray;color:white'>" + distance +
        " miles.</div>";
    }
    promise.popup.on("trigger-action", function(event) {
      // Execute the measureThis() function if the measure-this action is clicked
      if (event.action.id === "measure-this") {
        measureThis();
      }
    });

    map.add(featureLayer);

    const runningLayer = new FeatureLayer({
      url: '../arlingtonLoop.json',
      data: arlingtonLoop,
      title: "Arlington Trail Loop",
      outline:
    {
      color: [152,230,0,255],
      width: 5
    }
      // popupTemplate: {
      //   title: "{features.properties.name}",
      //   content: "{expression/per_ancestry}% of the {states.POP2007} people in {states.STATE_NAME} have "
      //     + "Norwegian ancestry.",
      //   expressionInfos: [{
      //     name: "per_ancestry",
      //     expression: "Round( ( $feature['ancestry.norwegian'] / $feature['states.POP2007'] ) * 100, 1)"
      //   }],
      //   fieldInfos: [{
      //     fieldName: "states.POP2007",
      //     format: {
      //       digitSeparator: true,
      //       places: 0
      //     }
      //   }]
      // },

    });
    map.add(runningLayer);

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
