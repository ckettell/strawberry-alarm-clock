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
		const { fireDate } = this.state;
		const details  = { ...alarmNotifData, fire_date: fireDate };
		ReactNativeAN.scheduleAlarm(details);
	};

	stopAlarm = () => {
		this.setState({ update: '' });
		ReactNativeAN.stopAlarm();
	};

	componentDidMount() {
		DeviceEventEmitter.addListener('OnNotificationDismissed', async function(e) {
			const obj = JSON.parse(e);
		});

		setInterval(() => { this.setCurrentTime() }, 200)

		DeviceEventEmitter.addListener('OnNotificationOpened', async function(e) {
			const obj = JSON.parse(e);
		});
	}

	componentWillUnmount() {
		DeviceEventEmitter.removeListener('OnNotificationDismissed');
		DeviceEventEmitter.removeListener('OnNotificationOpened');
	}

  handleDatePicked(date) {
    this.setState({
      fireDate: date
    });
    this.setAlarm()
  }

  render() {
		const { update, fireDate, futureFireDate } = this.state;
		const text = this.props.navigation.getParam('alarmDate', 'nothing sent');
		return (
				<View style={styles.container}>
          <Button
						onPress={this.stopAlarm}
						title="Stop Alarm"
						color="#ff0400"
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
})
