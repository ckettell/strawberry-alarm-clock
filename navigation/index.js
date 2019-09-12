import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';


import Clock from '../src/Clock'
import AlarmCalculator from '../src/settings/AlarmCalculator'
import SetAlarm from '../src/alarm/SetAlarm'



 const AppNavigator = createStackNavigator({
  Home: {
    screen: AlarmCalculator,
  },
  SetAlarm: {
    screen: SetAlarm,
  },
  Clock: {
    screen: Clock,
  },
}, {
    initialRouteName: 'SetAlarm',
});

export default createAppContainer(AppNavigator);
