import ReactNativeAN from 'react-native-alarm-notification';
import React, {Component} from "react";
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	Button,
	Alert
} from "react-native";

import moment from "moment";

import DateTimePicker from "react-native-modal-datetime-picker";

const alarmNotifData = {
	id: "12345",                                  // Required
	title: "Wake Up!",               // Required
	message: "Your destiny awaits...",           // Required
	channel: "my_channel_id",                     // Required. Same id as specified in MainApplication's onCreate method
	ticker: "My Notification Ticker",
	auto_cancel: false,                            // default: true
	vibrate: true,
	vibration: 100,                               // default: 100, no vibration if vibrate: false
	small_icon: "ic_launcher",                    // Required
	large_icon: "ic_launcher",
	play_sound: true,
	sound_name: null,                             // Plays custom notification ringtone if sound_name: null
	color: "red",
	schedule_once: true,                          // Works with ReactNativeAN.scheduleAlarm so alarm fires once
	tag: 'some_tag',

	// You can add any additional data that is important for the notification
	// It will be added to the PendingIntent along with the rest of the bundle.
	// e.g.
  	data: { foo: "bar" },
};


export default class Clock extends Component {
		state = {
			date: moment().format("LL"),
			alarmGoneOff: "false",
			currentTime: new Date().toLocaleTimeString(),
			alarm: "",
			travelTime: "",
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
		this.setState({
			alarm: moment(date).format("HH:mm:SS")
		})
  };

	updateTravelTime = duration => {
		this.setState({
			travelTime: duration
		})
	};

	setCurrentTime() {
		this.setState({
			currentTime: new Date().toLocaleTimeString()
		})
	}

	componentDidMount() {

		setInterval(() => { this.wakeUp() }, 200)
		setInterval(() => { this.setCurrentTime() }, 200)
	}

	wakeUp() {
		if(this.state.currentTime == this.state.alarm){
			this.setState({ alarmGoneOff: "true" })
			ReactNativeAN.sendNotification(alarmNotifData)
		}
	};


  render() {

		return (
			<View style={styles.container}>

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
				<Text testID="clock_time" style={styles.dateText}>
					{this.state.currentTime}
				</Text>
			</View>
		)
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
