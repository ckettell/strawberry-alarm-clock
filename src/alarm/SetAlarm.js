import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	StatusBar,
	DeviceEventEmitter,
	TouchableOpacity,
	ImageBackground,
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

export default class SetAlarm extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			date: moment().format("LL"),
			currentTime: new Date().toLocaleTimeString(),
			isDateTimePickerVisible: false,
			fireDate: 'hi',
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
		console.log(`alarm set: ${fireDate}`);
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

	retrieveAlarm = () => {
		var newDate = this.props.navigation.getParam('alarmDate', 'nothing sent')

		setTimeout(() => this.setState({
			fireDate: moment(newDate).format("DD-MM-YYYY HH:mm:ss")
		}), 2000)

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

					<Text style={styles.daysText}>
						{this.state.date}
					</Text>

					<StatusBar
						style={{backgroundColor: 'transparent'}}
					/>

					<TouchableOpacity onPress={this.showDateTimePicker}>
						<Text style={styles.button}>
							Set Arrival Time
						</Text>
					</TouchableOpacity>

					<Text style={styles.timeText}>
						{this.state.time}
					</Text>


					<TouchableOpacity onPress={this.stopAlarm}>
						<Text style={styles.stopButton}>
							Stop Alarm
						</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={this.showAlarmTime}>
						<Text style={styles.button}>
							show alarm time
						</Text>
					</TouchableOpacity>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#383838',
	},

  timeText:
  {
    fontSize: 50,
    color: '#e59400',
		borderColor: '#000000',
		fontFamily: 'digital-7',
  },

  daysText:
  {
    color: '#e59400',
    fontSize: 25,
		borderColor: '#000000'
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
		backgroundColor: 'red',
		borderColor: 'black',
		borderWidth: 2,
		borderRadius: 12,
		color: 'white',
		fontSize: 24,
		fontWeight: 'bold',
		overflow: 'hidden',
		padding: 12,
		textAlign:'center',
	},

})

// <ImageBackground source={require('/Users/student/Desktop/Projects/realfinalproject/strawberry-alarm-clock/assets/Strawberry.png')} style={{width: '80%', height: '80%', alignItems: 'center'}}>
