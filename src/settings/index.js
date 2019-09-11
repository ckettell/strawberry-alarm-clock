import React, {Component} from "react";
import { Text, Button, Picker } from 'react-native';
import { View, InputGroup, Input } from "native-base";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Geolocation from '@react-native-community/geolocation';

import Weather from './weather'
import SearchBox from './searchbox';
import SearchResults from './searchresults';
import styles from "./styles";

export default class AlarmCalculator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
     Latitude: 0,
     Longitude: 0,
     error: null,
     travelMode: '',
     travelTime: '',
     alarmTime: "11-10-2019 13:30:00",
     forecast: '0',
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
     console.log(position.coords.longitude)
     this.setState({
       ready:true,
       Latitude: position.coords.latitude,
       Longitude: position.coords.longitude
       })

   }
    geoFailure = (err) => {
   this.setState({error: err.message});

    }

    setTransportMode = (mode) => {
      this.setState({travelMode: mode});
    }

    setTravelTime = (time) => {
      this.setState({
        travelTime: time
        })
        console.log(this.state.travelTime)
    }

    setWeatherForecast = (weather) => {
      this.setState({
        forecast: weather
      })
      console.log(this.state.forecast)
    }

    getForecast = () => {
      console.log(this.state.forecast)
    }

  render() {

    const currentLocation = {
        latitude: this.state.Latitude,
        longitude: this.state.Longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    }


    return (
      <View>

        <SearchBox location={currentLocation} travelMode= {this.state.travelMode} updateTravelTime={this.setTravelTime.bind(this)}/>
        <Button
          title="Next"
          onPress={() => this.props.navigation.navigate('Time')}
        />
        <Picker
          selectedValue={this.state.travelMode}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setTransportMode(itemValue)
          }>
          <Picker.Item label="Walking" value="walking" />
          <Picker.Item label="Cycling" value="bicycling" />
          <Picker.Item label="Public Transport" value="transit" />
          <Picker.Item label="Driving" value="driving" />
        </Picker>
        <Weather location={currentLocation} alarmTime={this.state.alarmTime} updateWeatherForecast={this.setWeatherForecast.bind(this)}/>
        <Text>
          Forecast: {this.state.forecast}
        </Text>
        <Button title='test'
          onPress={() => {

          { this.getForecast() }

        }}>
        </Button>
      </View>
    );
  }
}