
import React, {Component} from "react";
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
} from "react-native";

import moment from "moment";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
		justifyContent: 'center',
		alignItems: 'center',
	},
	timeText: {
		color: '#999999',
		fontSize: 150,
	},
	dateText: {
		color: '#999999',
		fontSize: 40,
	}
})

export default class Clock extends Component {
		state = {
			time: moment().format("LTS"),
			date: moment().format("LL"),
			wakeUpTime: "",
			alarmGoneOff: "false",
			currentTime: ""

		};

	setCurrentTime() {
		this.setState({
			currentTime: new Date().toLocaleTimeString()
		})
	}

	setAlarm() {

	}

	componentDidMount() {

		this.interval = setInterval(() => { this.wakeUp() }, 1000)
		setInterval(() => { this.setCurrentTime() }, 1000)
	}

	wakeUp() {
		if(this.state.currentTime == "11:21:05"){
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
