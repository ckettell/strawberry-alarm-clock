import React, {Component} from "react";
import { View, Text, Button } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import TimePicker from './TimePicker'

export default class Time extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Time</Text>
        <TimePicker />
      </View>
    );
  }
}
