import React, {Component} from "react";
import { Text, Button, Picker } from 'react-native';
import { View, InputGroup, Input } from "native-base";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Geolocation from '@react-native-community/geolocation';
import moment from "moment";

import Weather from './weather'
import SearchBox from './searchbox';
import SearchResults from './searchresults';

import PrepTime from './PrepTime';
import TravelMode from './travelMode';
import ArrivalTime from './ArrivalTime';
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
     forecast: '',
     prepTime: 0,
     arrivalTime: 'hi',
     alarmTime: '',
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


    setPrepTime = (time) => {
      this.setState({
        prepTime: time
      })
    }

    setArrivalTime = (time) => {
      this.setState({
        arrivalTime: time
      })
    }

    setTravelMode = (mode) => {
      this.setState({
        travelMode: mode,
      })
    }

    calculateAlarm = () => {

      const arrivalDate = (new Date(this.state.arrivalTime).getTime());

      const prepAndTravelTime = (this.state.prepTime + this.state.travelTime) * 1000;
      console.log(prepAndTravelTime);

      const wakeUpTime = (arrivalDate - prepAndTravelTime)
      console.log(new Date(wakeUpTime));

      const wakeUpTimeObject = new Date(wakeUpTime)
      console.log(wakeUpTimeObject);
      this.setState({
        alarmTime:  moment(wakeUpTimeObject).format("DD-MM-YYYY HH:mm:ss")

      })
    }

    navToTime = () => {
      this.props.navigation.navigate('SetAlarm', { alarmDate: this.state.alarmTime });
      console.log(this.state.alarmTime);
    }

    sendTimeToAlarm = () => {
      this.calculateAlarm();
      this.navToTime();

    }
    showAlarm = () => {
      console.log(this.state.alarmTime);
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
        <ArrivalTime
        updateArrivalTime={this.setArrivalTime.bind(this)}
        />
        <SearchBox
         location={currentLocation}
         travelMode= {this.state.travelMode}
         updateTravelTime={this.setTravelTime.bind(this)}
         />
        <Weather
        location={currentLocation}
        alarmTime={this.state.alarmTime}
        updateWeatherForecast={this.setWeatherForecast.bind(this)}
         />
         <Text>
         Forecast: {this.state.forecast}
        </Text>
        <TravelMode
        updateTravelMode={this.setTravelMode.bind(this)}
        />
        <PrepTime
        updatePrepTime={this.setPrepTime.bind(this)}
        />
        <Button
        title="save alarm"
        onPress={this.calculateAlarm}
         />

        <Button
        title="send alarm"
        onPress={() => this.navToTime()}
        />
      </View>
    );
  }
}
