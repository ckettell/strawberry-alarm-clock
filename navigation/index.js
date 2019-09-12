import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';


import Clock from '../src/alarm/Clock'
import AlarmCalculator from '../src/settings/AlarmCalculator'




 const AppNavigator = createStackNavigator({
  Home: {
    screen: AlarmCalculator,
  },
  Clock: {
    screen: Clock,
  },
}, {
    initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);
