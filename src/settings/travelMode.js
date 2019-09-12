import React, {Component} from "react";
import { Text, Button, Picker } from 'react-native';
import { View, InputGroup, Input } from "native-base";

export default class TravelMode extends Component {
  state = {
    travelMode: '',
  }

  setTransportMode = (mode) => {
    this.setState({
      travelMode: mode,
    })

    setInterval(() => { this.setModeInCalc() }, 1000)
  }

  setModeInCalc = () => {
    console.log(this.props);
    console.log(this.state.travelMode);
    this.props.updateTravelMode(this.state.travelMode)
  }




  render(){

    return(
      <View>
      <Picker
        selectedValue={this.state.travelMode}
        style={{height: 50, width: 100}}
        onValueChange={(itemValue, itemIndex) =>

          this.setTransportMode(itemValue)
        }>
        <Picker.Item label="Walking" value="walking" />
        <Picker.Item label="Cycling" value="bicycling" />
        <Picker.Item label="Public Transport" value="transit" />
        <Picker.Item label="Driving" value="driving" />
      </Picker>


      </View>
    )
  }

}
