import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	StatusBar,
	DeviceEventEmitter,
	ImageBackground,
	TouchableOpacity,
	Image
} from 'react-native';

import BackgroundTimer from 'react-native-background-timer';

import ReactNativeAN from 'react-native-alarm-notification';
import moment from "moment";
import AlarmCalculator from '../settings/AlarmCalculator'


export default class Clock extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			date: moment().format("LL"),
			currentTime: new Date().toLocaleTimeString(),
			update: '',
		};
		this.stopAlarm = this.stopAlarm.bind(this);
	}

	stopAlarm = () => {
		this.setState({ update: '' });
		ReactNativeAN.stopAlarm();
	};

	componentDidMount() {
		BackgroundTimer.setInterval(() => { this.setCurrentTime() }, 200)
	}

	setCurrentTime() {
		this.setState({
			currentTime: new Date().toLocaleTimeString()
		})
	}

	render() {
		const { update, fireDate, futureFireDate } = this.state;

		return (
			<View style={styles.container}>

			<ImageBackground source={require('/Users/student/Desktop/Projects/realfinalproject/strawberry-alarm-clock/assets/20989632.jpg')} style={{width: '100%', height: '80%', alignItems: 'center'}}>
			<StatusBar style={{backgroundColor: 'transparent'}}/>

				<Text style={styles.timeText}>
					{this.state.currentTime}
				</Text>

				<Text style={styles.timeText}>
					{this.state.time}
				</Text>

				<TouchableOpacity onPress={this.stopAlarm}>
					<Text style={styles.stopButton}>
						Stop Alarm
					</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
					<Text style={styles.button}>
						Settings
					</Text>
				</TouchableOpacity>

				<Image source={require('/Users/student/Desktop/Projects/realfinalproject/strawberry-alarm-clock/assets/9e5c6603038b46625396f0177a9e305e.jpg')} style={{width: '50%', height: '20%', alignItems: 'center'}} />

			</ImageBackground>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
	},

  timeText: {
    fontSize: 125,
    color: 'deepskyblue',
		borderColor: '#000000',
		fontFamily: 'digital-7',
  },

  daysText: {
    color: 'limegreen',
    fontSize: 40,
		borderColor: '#000000',
		fontFamily: 'digital-7',
  },

	button: {
    backgroundColor: 'black',
    borderColor: 'deepskyblue',
    borderWidth: 2,
    borderRadius: 6,
    color: 'deepskyblue',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 5,
    textAlign:'center',
  },
	stopButton: {
		backgroundColor: 'black',
		borderColor: 'red',
		borderWidth: 2,
		borderRadius: 12,
		color: 'red',
		fontSize: 24,
		fontWeight: 'bold',
		overflow: 'hidden',
		padding: 7,
		textAlign:'center',
	},
})
