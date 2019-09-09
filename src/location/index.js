import React, {Component} from "react";
import { Text, Button } from 'react-native'
import { View, InputGroup, Input } from "native-base";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Geolocation from '@react-native-community/geolocation';

import SearchBox from './searchbox'
import SearchResults from './searchresults'
import styles from "./styles";

export default class Location extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
     Latitude: 0,
     Longitude: 0,
     error: null
    }
  };

  componentDidMount(){

      console.log('mount')
     let geoOptions = {
        enableHighAccuracy: true,
        timeOut: 20000,
      maximumAge: 60 * 60 * 24
    };
    this.setState({ready:false, error: null});
    Geolocation.getCurrentPosition( this.geoSuccess, this.geofailure, geoOptions);

   }
   geoSuccess = (position) => {
     console.log(position.coords.latitude)
     this.setState({
       ready:true,
       Latitude: position.coords.latitude,
       Longitude: position.coords.longitude
       })

   }
    geoFailure = (err) => {
   this.setState({error: err.message});

    }



  render() {

    const currentLocation = {
        latitude: this.state.Latitude,
           longitude: this.state.Longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }


    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

         <SearchBox location={currentLocation}/>
        <Button
        title="Next"
        onPress={() => this.props.navigation.navigate('Time')}
      />
      </View>
    );
  }
}
