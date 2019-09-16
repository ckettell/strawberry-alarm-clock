import React, {Component} from "react";
import {
  Text,
  Button,
  Picker,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import {
  View,
  InputGroup,
  Input
} from "native-base";

import moment from "moment";
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class ArrivalTime extends Component {
  state = {
    arrivalTime: 0,
    isDateTimePickerVisible: false,
  }



setArrivalState(time){
  var formattedTime = moment(time).format("ddd, DD MMM YYYY HH:mm:ss ZZ")
  this.setState({
    arrivalTime: formattedTime
  })
  this.setArrivalTime()
}


setArrivalTime = () => {
  this.props.updateArrivalTime(this.state.arrivalTime)
  console.log(this.state.arrivalTime)
}


  setArrivalTime = () => {
    this.props.updateArrivalTime(this.state.arrivalTime)
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };


handleDatePicked = date => {
  const dateObject = new Date(date)
  this.setState({
    arrivalTime: moment(dateObject).format("ddd, DD MMM YYYY HH:mm:ss ZZ")
  })
  this.setArrivalTime()
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

      <Button title="Set Arrival Time" color='#0c5600'
      onPress={this.showDateTimePicker} />

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

const arrivalTimeStyles = StyleSheet.create({
  button: {
    backgroundColor: '#696969',
    borderColor: '#ff7f50',
    borderWidth: 2,
    borderRadius: 6,
    color: '#e59400',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 5,
    textAlign:'center',
  },
})
