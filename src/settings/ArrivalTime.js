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
  this.setState({
    arrivalTime: time
  })
  this.setArrivalTime()
}


setArrivalTime = () => {
  this.props.updateArrivalTime(this.state.prepTime)
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
  this.setArrivalState(date)
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
