import React, {Component} from "react";
import { View, Text, Button } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';


export default class Time extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Time</Text>
        <Button
        title="Go to clock"
        onPress={() => this.props.navigation.navigate('Clock')}
      />
      </View>
    );
  }
}
