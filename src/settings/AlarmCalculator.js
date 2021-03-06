import React, {Component} from "react";
import {
  Text,
  Button,
  Picker,
  DeviceEventEmitter,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { View, InputGroup, Input } from "native-base";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Geolocation from '@react-native-community/geolocation';
import moment from "moment";
import BackgroundTimer from 'react-native-background-timer';
import ReactNativeAN from 'react-native-alarm-notification';
import { Dropdown } from 'react-native-material-dropdown';
import {
	getRelevantForecast,
	getWeather,
	setWeatherForecast,
	reportWeather
} from './weather'


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
  sound_name: null,
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
			fireDate: '',
			update: '',
			ready: false,
			Latitude: 0,
      Longitude: 0,
      forecast: '',
      error: null,
      travelMode: '',
      travelTime: '',
      prepTime: 0,
      arrivalTime: '',
      alarmTime: '',
			travelModeVisible: false,
			prepTimeVisible: false,
			estimateAlarmVisible: false,
			setAlarmVisible: false,
			goToClockVisible: false,
			buttonsAreVisible: false,
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
		this.setState({goToClockVisible: true})
	};

	stopAlarm = () => {
		this.setState({ update: '' });
		ReactNativeAN.stopAlarm();
		this.setState({goToCockVisible: true})
	};
	sendNotification = () => {
		const details = { ...alarmNotifData, id: 45, data: { content: "my notification id is 45" },
  };
		console.log(details);
		ReactNativeAN.sendNotification(details);
	};


  setWeatherForecast = (weather) => {
      this.setState({
        forecast: weather
      })
      console.log(this.state.forecast);
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
		this.setState({travelModeVisible: true})
	}

	setPrepTime = (time) => {
		this.setState({
			prepTime: time
		})
		this.setState({estimateAlarmVisible: true})

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
		this.setState({prepTimeVisible: true})
	}

	setAlarmMusic = (forecast) => {
		console.log('Here!')
		var forecast_string = forecast.toString();
		if (forecast_string === 'Clouds') {
			alarmNotifData.sound_name = 'mr_blue_sky.m4a'
		} else if (forecast_string === 'Clear') {
			alarmNotifData.sound_name = 'mr_blue_sky.m4a'
		}
		else if (forecast_string === 'Rain') {
			alarmNotifData.sound_name = 'raindrops.m4a'
		}
		else if (forecast_string === 'Thunderstorm') {
			alarmNotifData.sound_name = 'riders_on_the_storm.m4a'
		}
		else {

		}
	}


    calculateAlarm = () => {

			const formattedArrivalTime = moment(this.state.arrivalTime).format("ddd, DD MMM YYYY HH:mm:ss ZZ");
      const arrivalDate = (new Date(formattedArrivalTime).getTime());

      const prepAndTravelTime = (this.state.prepTime + this.state.travelTime) * 1000;
      console.log(prepAndTravelTime);

      const wakeUpTime = (arrivalDate - prepAndTravelTime);


      const wakeUpTimeObject = new Date(wakeUpTime);

			getWeatherForecast = (weather) => {
				this.setState({forecast: weather.toString()})
			}


      this.setState({
        fireDate:  moment(wakeUpTimeObject).format("DD-MM-YYYY HH:mm:ss")
      });
			setTimeout(() => {console.log(this.state.fireDate)},100)
			const formattedDate = moment(this.state.arrivalTime).format("ddd, DD MMM YYYY HH:mm:ss ZZ");
			setTimeout(() => {reportWeather(this.state.Latitude,this.state.Longitude, formattedDate)}, 100)
			setTimeout(() => {this.setAlarmMusic(this.state.forecast)}, 500)
    }

    sendTimeToAlarm = () => {
      this.calculateAlarm();
      this.navToTime();


		componentWillUnmount() {
			DeviceEventEmitter.removeListener('OnNotificationDismissed');
			DeviceEventEmitter.removeListener('OnNotificationOpened');
		}


    const wakeUpTimeObject = new Date(wakeUpTime)

    this.setState({
      fireDate:  moment(wakeUpTimeObject).format("DD-MM-YYYY HH:mm:ss")
    })

    setInterval(() => { console.log(this.state.fireDate) }, 2000)
  }

		renderTravelMode(isValid){
			if(isValid){
				return(
					<View>
					<TravelMode
	        updateTravelMode={this.setTravelMode.bind(this)}
	        />
					</View>
				);
			}
			return null;
		}

		renderPrepTime(isValid){
			if(isValid){
				return(
					<View>
					<PrepTime
	        updatePrepTime={this.setPrepTime.bind(this)}
	        />
					</View>
				)
			}
			return null;
		}

		renderEstimateAlarm(isValid){
			if(isValid){
				return(
					<Button color = '#0753a9'
 				 title="Estimate alarm"
 				 onPress={() => {
					 {this.calculateAlarm()}
					 {this.setState({setAlarmVisible: true})}
				 }}
 					/>
				)
			}
			return null;
		}

		renderSetAlarm(isValid){
			if(isValid){
				return(
					<Button color='#0753a9'
 					title="Set alarm"
 					onPress={this.setAlarm}/>
				)
			}
			return null;
		}

		renderGoToClock(isValid){
			if(isValid){
				return(
					<Button color='#0753a9'
					title="Go to clock"
					onPress={() => this.props.navigation.navigate('Clock', { calcTravelTime: this.state.travelTime})}
				/>
				)
			}
			return null;
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

			<View>
      <View >

        <ArrivalTime
         updateArrivalTime={this.setArrivalTime.bind(this)}
        />
        <SearchBox
         location={currentLocation}
         travelMode= {this.state.travelMode}
         updateTravelTime={this.setTravelTime.bind(this)}

         />
			</View>
			<View style={{position: 'relative', top: 80}}>
				{this.renderTravelMode(this.state.travelModeVisible)}
 				{this.renderPrepTime(this.state.prepTimeVisible)}
				{this.renderEstimateAlarm(this.state.estimateAlarmVisible)}
				{this.renderSetAlarm(this.state.setAlarmVisible)}
				{this.renderGoToClock(this.state.goToClockVisible)}

      </View>
			<View style={{position: 'relative', top: 130, marginLeft: 30}}>
			<Text style={{fontSize: 16}}>
				Arrival Time: {moment(this.state.arrivalTime).format("DD-MM-YYYY HH:mm:ss")} {"\n"}{"\n"}
				Estimated Alarm Time: {this.state.fireDate} {"\n"}{"\n"}
				Estimated Journey Time: {(this.state.travelTime)/60} mins {"\n"}{"\n"}
				Weather Forecast: Clear Skies
			</Text>
			</View>
			</View>
    );
  }
}

  const alarmCalcStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383838',
  },
  button: {
    backgroundColor: '#696969',
    borderColor: '#ff7f50',
    borderWidth: 2,
    borderRadius: 12,
    color: '#e59400',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 5,
    textAlign:'center',
    alignItems: 'center',
    fontFamily: 'digital-7'
  },
  forecast: {
    color: '#ff7f50',
    fontSize: 25,
    fontFamily: 'AntDesign',
  }
})
