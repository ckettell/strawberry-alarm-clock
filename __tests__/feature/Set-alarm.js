import 'react-native';
import React from 'react';

import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	Button,
	Alert
} from "react-native";

import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { render } from 'react-native-testing-library';
import renderer from 'react-test-renderer';
import Clock from '../../src/Clock';
import ReactNativeAN from 'react-native-alarm-notification';


describe('Set Alarm', () => {
  it('should schedule an alarm for the correct time, accounting for travel time', () => {
  const wrapper = shallow(<Clock />);
  const instance = wrapper.instance();
	instance.updateTravelTime(1800);
  instance.handleDatePicked('Fri Sep 06 2019 14:25:00 GMT+0100 (British Summer Time)')
	expect(instance.state.alarm).toEqual('13:55:00')
  });
});
