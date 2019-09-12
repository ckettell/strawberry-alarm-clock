import React, {Component} from "react";
import { Text, Button, Picker } from 'react-native';
import { View, InputGroup, Input } from "native-base";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Geolocation from '@react-native-community/geolocation';
import moment from "moment";
import BackgroundTimer from 'react-native-background-timer';
import ReactNativeAN from 'react-native-alarm-notification';


import Weather from './weather'
import SearchBox from './searchbox';
import SearchResults from './searchresults';
import PrepTime from './PrepTime';
import TravelMode from './travelMode';
import ArrivalTime from './ArrivalTime';
import styles from "./styles";


const alarmNotifData = {
	id: "22",
	title: "Wake Up!",
	message: "Your destiny awaits...",
	vibrate: true,
	vibration: 100,
	play_sound: true,
	schedule_once: true,
	color: "green",
	channel: "wakeup",
	data: { content: "my notification id is 22" },
};

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
     prepTime: 0,
     arrivalTime: 'hi',
     alarmTime: '',
     currentTime: new Date().toLocaleTimeString(),
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

    BackgroundTimer.setInterval(() => {
			this.wakeUp()
		}, 501)

		BackgroundTimer.setInterval(() => { this.setCurrentTime() }, 500)

    BackgroundTimer.setInterval(() => { this.calculateAlarm() }, 30000)


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


      const wakeUpTimeObject = new Date(wakeUpTime)

      this.setState({
        alarmTime:  moment(wakeUpTimeObject).format("HH:mm:ss")
      })
      setInterval(() => { console.log(this.state.alarmTime) }, 2000)
    }

    // navToTime = () => {
    //   this.props.navigation.navigate('SetAlarm', { alarmDate: this.state.alarmTime });
    // }

    sendTimeToAlarm = () => {
      this.calculateAlarm();
      this.navToTime();

    }
    showAlarm = () => {
      console.log(this.state.alarmTime);
    }





    wakeUp = () => {
          if (this.state.currentTime === this.state.alarmTime){

              ReactNativeAN.sendNotification(alarmNotifData);
          }

      }

    setCurrentTime() {
        this.setState({
          currentTime: new Date().toLocaleTimeString()
        })
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
         title="Go to clock"
         onPress={() => this.props.navigation.navigate('SetAlarm')}
       />

      </View>
    );
  }
}
