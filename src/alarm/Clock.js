import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	StatusBar,
	DeviceEventEmitter,
	ImageBackground,
	TouchableOpacity
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

			<Text style={styles.timeText}>
			{this.state.currentTime}
			</Text>
			<Text style={styles.dateText}>
			{this.state.date}
			</Text>
			<StatusBar
			style={{backgroundColor: 'transparent'}}
			/>
			<Text style={styles.timeText}>
			{this.state.time}
			</Text>
			<Text>
				{this.state.travelTime}
			</Text>
			<View>
			<Button
			onPress={this.stopAlarm}
			title="Stop Alarm"
			color="#ff0400"
			/>
			</View>
			<Button
			title="Settings"
			onPress={() => this.props.navigation.navigate('Home')}
		/>

			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#383838',
	},

  timeText: {
    fontSize: 90,
    color: '#e59400',
		borderColor: '#000000',
		fontFamily: 'digital-7',
  },

  daysText: {
    color: '#e59400',
    fontSize: 30,
		borderColor: '#000000',
		fontFamily: 'digital-7',
  },

	button: {
    backgroundColor: '#696969',
    borderColor: '#ff7f50',
    borderWidth: 2,
    borderRadius: 6,
    color: '#e59400',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 5,
    textAlign:'center',
  },
	stopButton: {
		backgroundColor: 'darkolivegreen',
		borderColor: 'black',
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
