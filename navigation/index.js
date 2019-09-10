import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';


import Clock from '../src/Clock'
import AlarmCalculator from '../src/settings/AlarmCalculator'
import Time from '../src/Time'

 const AppNavigator = createStackNavigator({
  Home: {
    screen: AlarmCalculator,
  },
  Time: {
    screen: Time,
  },
  Clock: {
    screen: Clock,
  },
}, {
    initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);
