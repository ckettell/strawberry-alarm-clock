import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	StatusBar,
	DeviceEventEmitter
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
		backgroundColor: '#0001',
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		borderColor: '#CCCCCC',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		height: 50,
		fontSize: 25,
		paddingLeft: 20,
		paddingRight: 20
	},
	timeText: {
		color: '#999999',
		fontSize: 90,
	},
	dateText: {
		color: '#999999',
		fontSize: 40,
	},
	helloText: {
		color: '#999999',
		fontSize: 20,
	}
})
