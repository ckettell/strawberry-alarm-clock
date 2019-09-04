
import React, {Component} from "react";
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	Button
} from "react-native";

import moment from "moment";

import DateTimePicker from "react-native-modal-datetime-picker";


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0000',
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
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
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
