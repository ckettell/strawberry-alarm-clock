import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';


import Alarm from '../src/alarm/index'
import Location from '../src/location/index'
import Time from '../src/time/index'

 const AppNavigator = createStackNavigator({
  Home: {
    screen: Location,
  },
  Time: {
    screen: Time,
  },
  Alarm: {
    screen: Alarm,
  },
}, {
    initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);
