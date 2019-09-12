import React, {Component} from "react";
import {
  Text,
  Button,
  Picker,
  DeviceEventEmitter,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import { View, InputGroup, Input } from "native-base";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Geolocation from '@react-native-community/geolocation';
import moment from "moment";
import BackgroundTimer from 'react-native-background-timer';
import ReactNativeAN from 'react-native-alarm-notification';


import Weather from './weather'
import SearchBox from './searchbox';

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

  constructor(props, context) {
    super(props);
    this.state = {
	   date: moment().format("LL"),
		 fireDate: 'hi',
		 update: '',
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
	 };
		this.setAlarm = this.setAlarm.bind(this);
		this.stopAlarm = this.stopAlarm.bind(this);
  }

	setAlarm = () => {
		console.log('Alarm set')
		const { fireDate } = this.state;
		const details  = { ...alarmNotifData, fire_date: fireDate };
		console.log(`alarm set: ${fireDate}`);
		this.setState({ update: `alarm set: ${fireDate}` });
		ReactNativeAN.scheduleAlarm(details);
	};

	stopAlarm = () => {
		this.setState({ update: '' });
		ReactNativeAN.stopAlarm();
	};
	sendNotification = () => {
		const details = { ...alarmNotifData, id: 45, data: { content: "my notification id is 45" },
  };
		console.log(details);
		ReactNativeAN.sendNotification(details);
	};

  componentDidMount(){

		DeviceEventEmitter.addListener('OnNotificationDismissed', async function(e) {
			const obj = JSON.parse(e);
			console.log(`Notification ${obj.id} dismissed`);
		});

    console.log('mount')
      let geoOptions = {
        enableHighAccuracy: true,
        timeOut: 20000,
        maximumAge: 60 * 60 * 24
    };
      this.setState({ready:false, error: null});
      Geolocation.getCurrentPosition( this.geoSuccess, this.geofailure, geoOptions);

      BackgroundTimer.setInterval(() => { this.setCurrentTime() }, 500)

      BackgroundTimer.setInterval(() => { this.calculateAlarm() }, 30000)

  		DeviceEventEmitter.addListener('OnNotificationOpened', async function(e) {
		const obj = JSON.parse(e);
		console.log(obj);
	});
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

		const formattedArrivalTime = moment(this.state.arrivalTime).format("DD-MM-YYYY HH:mm:ss");

    const arrivalDate = (new Date(formattedArrivalTime).getTime());

    const prepAndTravelTime = (this.state.prepTime + this.state.travelTime) * 1000;
    console.log(prepAndTravelTime);

    const wakeUpTime = (arrivalDate - prepAndTravelTime)


    const wakeUpTimeObject = new Date(wakeUpTime)

    this.setState({
      fireDate:  moment(wakeUpTimeObject).format("DD-MM-YYYY HH:mm:ss")
    })

    setInterval(() => { console.log(this.state.fireDate) }, 2000)
  }

  sendTimeToAlarm = () => {
    this.calculateAlarm();
    this.navToTime();
  }

  showAlarm = () => {
    console.log(this.state.alarmTime);
  }

	componentWillUnmount() {
		DeviceEventEmitter.removeListener('OnNotificationDismissed');
		DeviceEventEmitter.removeListener('OnNotificationOpened');
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
       <View style={alarmCalcStyles.container}>
       <ImageBackground source={require('/Users/student/Desktop/Projects/realfinalproject/strawberry-alarm-clock/assets/LED_Strawberry_Floor_2000x.jpg')} style={alarmCalcStyles.imgBackground}>
        <Text style={alarmCalcStyles.text}>
          SETTINGS:
        </Text>

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

        <ArrivalTime
          updateArrivalTime={this.setArrivalTime.bind(this)}
        />

        <TouchableOpacity onPress={this.calculateAlarm}>
          <Text style={alarmCalcStyles.button}>
            Estimate alarm
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.setAlarm}>
          <Text style={alarmCalcStyles.button}>
            Set alarm
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Clock')}>
          <Text style={alarmCalcStyles.button}>
            GO TO STRAWBERRY CLOCK
          </Text>
        </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

  const alarmCalcStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  button: {
    backgroundColor: 'black',
    borderColor: 'deepskyblue',
    borderWidth: 2,
    borderRadius: 12,
    color: 'deepskyblue',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 5,
    textAlign:'center',
    alignItems: 'center',
    fontFamily: 'digital-7'
  },
  text: {
    color: 'red',
    textAlign:'center',
    fontSize: 40,
    borderColor: 'limegreen',
    borderWidth: 5,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center'
  }
})
