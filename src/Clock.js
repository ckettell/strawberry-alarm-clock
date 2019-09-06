import ReactNativeAN from 'react-native-alarm-notification';
import React, {Component} from "react";
import {
	ImageBackground,
	View,
	Text,
	StyleSheet,
	StatusBar,
	Button,
	Alert
} from "react-native";

import moment from "moment";

import DateTimePicker from "react-native-modal-datetime-picker";

const fireDate = ""

const alarmNotifData = {
	id: "12345",                                  // Required
	title: "My Notification Title",               // Required
	message: "My Notification Message",           // Required
	channel: "my_channel_id",                     // Required. Same id as specified in MainApplication's onCreate method
	ticker: "My Notification Ticker",
	auto_cancel: true,                            // default: true
	vibrate: true,
	vibration: 100,                               // default: 100, no vibration if vibrate: false
	small_icon: "ic_launcher",                    // Required
	large_icon: "ic_launcher",
	play_sound: true,
	sound_name: null,                             // Plays custom notification ringtone if sound_name: null
	color: "red",
	schedule_once: true,                          // Works with ReactNativeAN.scheduleAlarm so alarm fires once
	tag: 'some_tag',
	fire_date: fireDate,                          // Date for firing alarm, Required for ReactNativeAN.scheduleAlarm.

	// You can add any additional data that is important for the notification
	// It will be added to the PendingIntent along with the rest of the bundle.
	// e.g.
  	data: { foo: "bar" },
};


export default class Clock extends Component {
		state = {
			time: moment().format("LTS"),
			date: moment().format("LL"),
			wakeUpTime: "",
			alarmGoneOff: "false",
			currentTime: new Date().toLocaleTimeString(),
			alarm: "",
			isDateTimePickerVisible: false
		};


  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({
		isDateTimePickerVisible: false
	});
  };

  handleDatePicked = date => {
		const fireDate = ReactNativeAN.parseDate(new Date(date));
		ReactNativeAN.scheduleAlarm(alarmNotifData);
		this.setState({
			alarm: moment(date).format("HH:mm:SS")
		})
  };

	setCurrentTime() {
		this.setState({
			currentTime: new Date().toLocaleTimeString()
		})
	}

	setAlarm(alarmSet) {
		this.setState({
			alarm: alarmSet
		})
	}

	componentDidMount() {

		setInterval(() => { this.wakeUp() }, 1000)
		setInterval(() => { this.setCurrentTime() }, 1000)
	}

	wakeUp() {
		if(this.state.currentTime == this.state.alarm){
			this.setState({ alarmGoneOff: "true" })
		}
	};


  render() {
    setTimeout(() => {
			this.setState({
				time: moment().format("LTS"),
				date: moment().format("LL"),
			});

		}, 1000);

	// wakeUp();

		return (
			<View style={styles.container}>
			<ImageBackground source={require('../assets/Strawberry.png')} style={{width: '100%', height: '100%'}}>
				<StatusBar style={{backgroundColor: 'transparent'}} />

				<Button title="When would you like to wakeup?" onPress={this.showDateTimePicker} />

				<DateTimePicker
					mode={"time"}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />

				<Text style={styles.timeText}>
					{this.state.time}
				</Text>
				<Text style={styles.dateText}>
					{this.state.date}
				</Text>
				<Text style={styles.dateText}>
					{this.state.alarmGoneOff}
				</Text>
				<Text style={styles.dateText}>
					{this.state.alarm}
				</Text>
				<Text style={styles.dateText}>
					{this.state.currentTime}
				</Text>
				</ImageBackground>

			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f8ff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	timeText: {
		color: '#000000',
		fontSize: 100,
	},
	dateText: {
		color: '#000000',
		fontSize: 40,
	},
	helloText: {
		color: '#999999',
		fontSize: 20,
	}
})
