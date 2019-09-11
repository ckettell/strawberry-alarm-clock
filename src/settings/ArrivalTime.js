import React, {Component} from "react";
import {
  Text,
  Button,
  Picker,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { View, InputGroup, Input } from "native-base";

import moment from "moment";
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class ArrivalTime extends Component {
  state = {
    arrivalTime: 0,
    isDateTimePickerVisible: false,
  }


setArrivalState(time){
  this.setState({
    arrivalTime: time
  })
  this.setArrivalTime()
}


setArrivalTime = () => {
  this.props.updateArrivalTime(this.state.arrivalTime)
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
  const dateObject = new Date(date)
  this.setState({
    arrivalTime: moment(dateObject).format("DD-MM-YYYY HH:mm:ss")
  })
  this.setArrivalTime()
};


  render(){

    return(
      <View>
        <DateTimePicker
        mode={"time"}
        isVisible={this.state.isDateTimePickerVisible}
        onConfirm={this.handleDatePicked}
        onCancel={this.hideDateTimePicker}
        />
        <TouchableOpacity onPress={this.showDateTimePicker}>
          <Text style={arrivalTimeStyles.button}>
            Set Arrival Time
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

}

const arrivalTimeStyles = StyleSheet.create({
    button: {
    backgroundColor: '#add8e6',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
  },
})
