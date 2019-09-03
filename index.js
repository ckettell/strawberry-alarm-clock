import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import App from "./App";

class clock extends Component {
  render() {
    return (
      <App />
    );
  }
}
AppRegistry.registerComponent('strawberry_alarm_clock_react', () => clock);
