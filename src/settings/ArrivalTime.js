import React, {Component} from "react";
import { Text, Button, Picker } from 'react-native';
import { View, InputGroup, Input } from "native-base";

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
  console.log('setArrivalTime 23 :' + this.state.arrivalTime)
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
    arrivalTime: moment(dateObject).format("ddd, DD MMM YYYY HH:mm:ss ZZ")
  })
  this.setArrivalTime()
};


  render(){

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
