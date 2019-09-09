import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';


import Clock from '../src/Clock'
import Location from '../src/location/index'
import Time from '../src/time/index'


 const AppNavigator = createStackNavigator({
  Home: {
    screen: Location,
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
