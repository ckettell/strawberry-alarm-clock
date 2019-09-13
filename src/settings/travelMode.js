import React, {Component} from "react";
import { Text, Button, Picker } from 'react-native';
import { View, InputGroup, Input } from "native-base";
import { Dropdown } from 'react-native-material-dropdown';

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
    let data = [{
      label: 'Walking',
      value: 'walking',
      }, {
      label: 'Bicycling',
      value: 'bicycling',
      }, {
      label: 'Transit',
      value: 'transit',
      }, {
      label: 'Driving',
      value: 'driving',
    }];

    return(
      <View>
        <Dropdown
          label='Transport?'
          data={data}
          onChangeText={(transportMode) => this.setTransportMode(transportMode)}/>
      </View>
    )
  }

}
