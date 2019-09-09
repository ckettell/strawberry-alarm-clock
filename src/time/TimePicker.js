import React, {Component} from "react";
import Time from 'index'

import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	Button,
	Alert,
} from "react-native";

import { withNavigation } from 'react-navigation';

import moment from "moment";

import DateTimePicker from "react-native-modal-datetime-picker";

export default class TimePicker extends Component {
  state = {
    isDateTimePickerVisible: false,
    alarmTime: "non set",
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
    alarmTime: moment(date).format("HH:mm:SS")
	})
	this.onChangeTime()
  };


	onChangeTime() {
		this.props.updateTime(this.state.alarmTime)
	}

  render() {

		const chosenTime = {
			timePicked: this.state.alarmTime
		}

    return(
			<View>
			<Button title="Set Arrival Time" onPress={this.showDateTimePicker} />
      <DateTimePicker
        mode={"time"}
        isVisible={this.state.isDateTimePickerVisible}
        onConfirm={this.handleDatePicked}
        onCancel={this.hideDateTimePicker}
      />
			</View>
    )
  }
}
