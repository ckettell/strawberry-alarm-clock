import BackgroundTimer from 'react-native-background-timer';

import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	StatusBar,
	DeviceEventEmitter
} from 'react-native';

import ReactNativeAN from 'react-native-alarm-notification';
import moment from "moment";


export default class Clock extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			date: moment().format("LL"),
			currentTime: new Date().toLocaleTimeString(),
		};
	}

	componentDidMount() {
		setInterval(() => { this.setCurrentTime() }, 200)
	}

	setCurrentTime() {
		this.setState({
			currentTime: new Date().toLocaleTimeString()
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.timeText}>
					{this.state.currentTime}
				</Text>
				<Text style={styles.dateText}>
					{this.state.date}
				</Text>
				<Text style={styles.timeText}>
					{this.state.time}
				</Text>
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
	timeText: {
		color: '#999999',
		fontSize: 90,
	},
	dateText: {
		color: '#999999',
		fontSize: 40,
	},
})
