import React, {Component} from "react";
import { View, Text, Button } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import AlarmSetter from './AlarmSetter'
import Clock from './Clock'

export default class Alarm extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Time</Text>
        <AlarmSetter />
        <Clock />
        <Button
  			title="Go to clock"
  			onPress={() => this.props.navigation.navigate('Clock', { alarmDate: this.state.destinationTime })}
  			/>
      </View>
    );
  }
}
