import ReactNativeAN from 'react-native-alarm-notification';
import React, {Component} from "react";
import BackgroundTimer from 'react-native-background-timer';

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

const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 10000));     // set the fire date for 1 second from now


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

		startTimer() {

    let seconds = 60*10
    

    // https://github.com/ocetnik/react-native-background-timer
    BackgroundTimer.runBackgroundTimer(() => {

    let secondHand = currSeconds % 60
    secondHand = (secondHand === 0) ? '00' : secondHand
    secondHand = (secondHand !== '00' && secondHand < 10) ? `0${secondHand}` : secondHand
    let displayTimer = `${Math.floor(currSeconds/60)}:${secondHand}`

		if (currSeconds === 0) {
        this.stopSession()
        this.playTone()
      }
			currSeconds--
    }, 1000)
	}


  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({
		isDateTimePickerVisible: false
	});
  };

  handleDatePicked = date => {
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
