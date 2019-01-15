import MapView from 'js/components/MapView';
import Header from 'js/components/Header';
import React, { Component } from 'react';
import { TEXT } from 'js/config';
import SearchForm from './SearchForm';
import Card from './Card';

export default class App extends Component {
  displayName: 'App';

  render () {
    return (
      <div className='root'>
        <Header title={TEXT.title} subtitle={TEXT.subtitle} />
        <Card heading=".  .">
        <SearchForm
        // defaultValue={this.state.search}
        handleInputChange={this.handleInputChange}
        handleFormSubmit={this.handleFormSubmit}
        />
        </Card>
        <MapView />
      </div>
    );
  }

}
