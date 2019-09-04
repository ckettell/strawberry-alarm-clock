
import React, {Component} from "react";
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	TextInput
} from "react-native";

import moment from "moment";

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
			currentTime: "",
			time: '10:00'

		};

	setCurrentTime() {
		this.setState({
			currentTime: new Date().toLocaleTimeString()
		})
	}

	setAlarm() {

	}

	onChange = time = this.setState({ time })

	componentDidMount() {

		setInterval(() => { this.wakeUp() }, 1000)
		setInterval(() => { this.setCurrentTime() }, 1000)
	}

	wakeUp() {
		if(this.state.currentTime == "12:52:59"){
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

				<TimePicker
					onChange={this.onChange}
					value={this.state.time}
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
					{this.state.currentTime}
				</Text>


			</View>
		)
	}
}
