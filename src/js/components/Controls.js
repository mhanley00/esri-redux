import React, { Component } from 'react';

const ANIMATION_OPTIONS = { duration: 300 };
const ZOOM_OUT_MARKUP = '<use xlink:href="#icon-zoom-out" />',
      ZOOM_IN_MARKUP = '<use xlink:href="#icon-zoom-in" />',
      LOCATE_MARKUP = '<use xlink:href="#icon-locate" />',
      SHARE_MARKUP = '<use xlink:href="#icon-share" />';

export default class Controls extends Component {
  displayName: 'Controls';

  constructor() {
    super()

    this.state = {
      latitude: '',
      longitude: '',
    }

    this.getMyLocation = this.getMyLocation.bind(this)
  }
  //Calling HTML5 geolocation after componentDidMount b/c can't call setState on unmounted component, leaking default lat/long
  componentDidMount() {
    this.getMyLocation()
  }

  getMyLocation() {
    const location = window.navigator && window.navigator.geolocation
    
    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      }, (error) => {
        this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
      })
    }

  }

  zoomIn = () => {
    const {view} = this.props;
    if (view) {
      view.goTo({ zoom: view.zoom + 1 }, ANIMATION_OPTIONS);
    }
  };

  zoomOut = () => {
    const {view} = this.props;
    if (view) {
      view.goTo({ zoom: view.zoom - 1 }, ANIMATION_OPTIONS);
    }
  };

  locate = () => {
    // this.props.toggleLocateModal();
    const {view} = this.props;
    if (view) {
      // view.goTo({ center: [-80.0369, 38.9072] }, ANIMATION_OPTIONS);
      view.goTo({ center: [this.state.longitude, this.state.latitude], zoom: 14 }, ANIMATION_OPTIONS);
    }
  };

  share = () => {
    this.props.toggleShareModal();
  };

  render () {
    return (
      <div className='map-controls shadow'>
        <ul className='map-controls__list'>
          <li className='map-controls__item pointer' onClick={this.zoomOut}>
            <svg
              role='img'
              aria-label='Zoom out'
              className='map-controls__item-icon'
              dangerouslySetInnerHTML={{ __html: ZOOM_OUT_MARKUP }} />
          </li>
          <li className='map-controls__item pointer' onClick={this.zoomIn}>
            <svg
              role='img'
              aria-label='Zoom in'
              className='map-controls__item-icon'
              dangerouslySetInnerHTML={{ __html: ZOOM_IN_MARKUP }} />
          </li>
          <li className='map-controls__item pointer' onClick={this.share}>
            <svg
              role='img'
              aria-label='Share a route'
              className='map-controls__item-icon'
              dangerouslySetInnerHTML={{ __html: SHARE_MARKUP }} />
          </li>
          <li className='map-controls__item pointer' onClick={this.locate}>
            <svg
              role='img'
              aria-label='Find my location'
              className='map-controls__item-icon'
              dangerouslySetInnerHTML={{ __html: LOCATE_MARKUP }} />
          </li>
        </ul>
      </div>
    );
  }
}
