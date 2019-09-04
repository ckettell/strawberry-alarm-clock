
import React, {Component} from "react";
import {
	Image,
	View,
	Text,
	TextInput,
	StyleSheet,
	StatusBar,
} from "react-native";

import SetAlarm from './components/FetchLocation';
import FetchLocation from './components/FetchLocation';
import moment from "moment";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f8ff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	timeText: {
		color: '#000000',
		fontSize: 80,
	},
	dateText: {
		color: '#000000',
		fontSize: 40,
	},
	input: {
		paddingLeft: 20,
		borderRadius: 50,
		height: 50,
		fontSize: 25,
		backgroundColor: 'white',
		borderColor: '#1abc9c',
		borderWidth: 1,
		marginBottom: 20,
		color: '#34495e',
	}
})

export default class App extends Component {

	state = {
		time: moment().format("LTS"),
		date: moment().format("LL")
	};

	getUserLocationHandler = () => {
	   navigator.geolocation.getCurrentPosition(position => {
	     console.log(position);
	     }, err => console.log(err));
	  }

  render() {
		let pic = {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5BfYgpnnYejMON6mOje7Wh-OhoMFBNEuDtJt41-wPsvzc6fz8'
    };
    setTimeout(() => {
			this.setState({
				time: moment().format("LTS"),
				date: moment().format("LL"),
			});
		}, 1000);

		return (
			<View style={styles.container}>
				<StatusBar style={{backgroundColor: 'transparent'}} />
				<Image source={pic} style={{width: 250, height: 200}}/>
				<Text style={styles.timeText}>
					{this.state.time}
				</Text>
				<Text style={styles.dateText}>
					{this.state.date}
				</Text>
					<FetchLocation onGetLocation={this.getUserLocationHandler} />
					<TextInput style={styles.input}
					placeholder = "Enter time"
					returnKeyType = "next"
					/>
			</View>

		);
	}
}
