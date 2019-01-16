import MapView from 'js/components/MapView';
import Header from 'js/components/Header';
import React, { Component } from 'react';
import { TEXT } from 'js/config';
import SearchForm from './SearchForm';
import Card from './Card';

export default class App extends Component {
  displayName: 'App';

  constructor(props) {
      super(props);
      this.state = {
        dummy: "cat",
        definitionExpression: "OFFENSE='THEFT'"

      }};

  
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     counter: 0,
  //     shareModalVisible: false,
  //     locateModalVisible: false,
  //     view: {},
  //     latitude: '',
  //     longitude: '',
  //     definitionExpression: "OFFENSE='THEFT'"
  //   };
    
  // }

  handleInputChange = event => { 
    const value = event.target.value;
    // const name = event.target.name;
    this.setState({
      definitionExpression: value //don't need brackets b/c not a var
    });
  };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   this.searchArtists(this.state.search);
  //   // console.log(`collectionName:${results.collectionName}`);
  // };

  render () {
    console.log(this.state);
    // console.log(this.state);
    return (
      <div className='root'>
        <Header title={TEXT.title} subtitle={TEXT.subtitle} />
        <Card heading=".  .">
        
        <SearchForm
        // defaultValue={this.state.search}
        handleInputChange={this.handleInputChange}
        // handleFormSubmit={this.handleFormSubmit}
        />
        </Card>
        <MapView
        definitionExpression={this.state.definitionExpression}
        />
      </div>
    );
  }

}
