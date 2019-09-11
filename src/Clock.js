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
			fireDate: '',
			update: '',
			futureFireDate: '0',
			travelTime: 0,
		};
		this.setAlarm = this.setAlarm.bind(this);
		this.stopAlarm = this.stopAlarm.bind(this);
	}

	setAlarm = () => {
		console.log('Alarm set')
		const { fireDate } = this.state;
		const details  = { ...alarmNotifData, fire_date: fireDate };
		console.log(`alarm set: ${this.state.fireDate}`);
		this.setState({ update: `alarm set: ${fireDate}` });
		console.log(details);
		ReactNativeAN.scheduleAlarm(details);
	};

	getScheduledAlarms = () => {
		var alarms = ReactNativeAN.getScheduledAlarms()
		console.log(alarms);
	}

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
	}

	componentWillUnmount() {
		DeviceEventEmitter.removeListener('OnNotificationDismissed');
		DeviceEventEmitter.removeListener('OnNotificationOpened');
	}

	showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({
		isDateTimePickerVisible: false
	});
  };

  // handleDatePicked = date => {
	// 	//convert date to unix timestamp (milliseconds)
	// 	const arrivalDate = new Date(date).getTime();
	//
	// 	//calculate new alarm date, given travel time (milliseconds)
	// 	const unixAlarmDate = arrivalDate - (this.state.travelTime * 1000);
	//
	// 	//new alarm date object
	// 	const newAlarmDate = new Date(unixAlarmDate);
	//
	// 	this.setState({
	// 		fireDate: moment(newAlarmDate).format("DD-MM-YYYY HH:mm:ss")
	// 	})
	// 	this.setAlarm();
  // };

	setCurrentTime() {
		this.setState({
			currentTime: new Date().toLocaleTimeString()
		})
	}

	retrieveAlarm = () => {
					var newDate = this.props.navigation.getParam('alarmDate', 'nothing sent')

					setTimeout(() => this.setState({
						fireDate: moment(newDate).format("DD-MM-YYYY HH:mm:ss")
					}), 2000)

	        setTimeout(() => this.setAlarm(), 4000)
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
						<Button title="see scheduled alarms" onPress={this.getScheduledAlarms} />

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
