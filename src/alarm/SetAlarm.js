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
import DateTimePicker from 'react-native-modal-datetime-picker';

const alarmNotifData = {
	id: "22",
	title: "Wake Up!",
	message: "Your destiny awaits...",
	vibrate: true,
	vibration: 100,
	play_sound: true,
	sound_name: '',
	schedule_once: true,
	color: "green",
	channel: "wakeup",
	data: { content: "my notification id is 22" },
};

export default class Clock extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			date: moment().format("LL"),
			currentTime: new Date().toLocaleTimeString(),
			isDateTimePickerVisible: false,
			fireDate: 'hi',
			forecast: '',
			update: '',
			futureFireDate: '0',
			travelTime: 0,
		};
		this.setAlarm = this.setAlarm.bind(this);
		this.stopAlarm = this.stopAlarm.bind(this);
	}

	setAlarm = () => {
		console.log('Alarm set!!!')
		const { fireDate } = this.state;
		const details  = { ...alarmNotifData, fire_date: fireDate };
		console.log(`alarm set: ${fireDate}`);
		console.log(moment(this.state.alarmTime));
		this.setState({ update: `alarm set: ${fireDate}` });
		ReactNativeAN.scheduleAlarm(details);
	};

	setFutureAlarm = () => {
		const { futureFireDate } = this.state;
		const fire_date = ReactNativeAN.parseDate(new Date(Date.now() + parseInt(futureFireDate)));
		const details  = { ...alarmNotifData, fire_date };
		console.log(`alarm set: ${fire_date}`);
		this.setState({ update: `alarm set: ${fire_date}` });
		ReactNativeAN.scheduleAlarm(details);
	};

	stopAlarm = () => {
		this.setState({ update: '' });
		ReactNativeAN.stopAlarm();
	};

	sendNotification = () => {
		const details = { ...alarmNotifData, id: 45, data: { content: "my notification id is 45" }, };
		console.log(details);
		ReactNativeAN.sendNotification(details);
	};

	componentDidMount() {
		DeviceEventEmitter.addListener('OnNotificationDismissed', async function(e) {
			const obj = JSON.parse(e);
			console.log(`Notification ${obj.id} dismissed`);
		});

		setInterval(() => { this.setCurrentTime() }, 200)

		DeviceEventEmitter.addListener('OnNotificationOpened', async function(e) {
			const obj = JSON.parse(e);
			console.log(obj);
		});


		this.retrieveAlarm()

		this.updateAlarmSound(this.state.forecast)

	}



	componentWillUnmount() {
		DeviceEventEmitter.removeListener('OnNotificationDismissed');
		DeviceEventEmitter.removeListener('OnNotificationOpened');
	}

	updateAlarmSound = (forecast) => {

	}

	const musicHash = {
	 "storm": ['heavy intensity rain', 'very heavy rain', 'extreme rain', 'heavy intensity shower rain'],
	 "clear": ["clear sky"],
	 "rain": ["light rain", "moderate rain", "light intensity shower rain", "shower rain"],
	 "lightcloud": ["few clouds", "scattered clouds"],
	 "cloudy": ["broken clouds", "overcast clouds"],
	};

	setCurrentTime() {
		this.setState({
			currentTime: new Date().toLocaleTimeString()
			})
		}


	retrieveAlarm = () => {
		this.setState({
			fireDate: this.props.navigation.getParam('alarmDate', 'nothing sent')
		})
		setTimeout(() => this.setAlarm(), 4000)

	}

	showAlarmTime = () => {
			console.log(this.state.fireDate);
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
					<StatusBar style={{backgroundColor: 'transparent'}} />
					<Button title="Set Arrival Time" onPress={this.showDateTimePicker} />

					<Text style={styles.timeText}>
					{this.state.time}
					</Text>
					<View>
						<Button
							onPress={this.stopAlarm}
							title="Stop Alarm"
							color="#ff0400"
						/>
						<Button
							onPress={this.setAlarm}
							title="Set Alarm"
							color="#ff0400"
						/>
						<Button
							onPress={this.sendNotification}
							title="Trigger Alarm"
							color="#ff0400"
						/>
						<Button title="show alarm time" onPress={this.showAlarmTime} />

					</View>
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
