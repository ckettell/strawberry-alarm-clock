import React, {Component} from "react";

import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	Button,
	Alert,
} from "react-native";

import DateTimePicker from "react-native-modal-datetime-picker";

export default class TimePicker extends Component {
  state = {
    isDateTimePickerVisible: false,
    date: "",
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
    alarm: moment(date).format("HH:mm:SS")
  };

  render() {
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
