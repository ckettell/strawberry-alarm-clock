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
import Adapter from 'enzyme-adapter-react-16';
import { render } from 'react-native-testing-library';
import renderer from 'react-test-renderer';
import Clock from '../src/Clock'
import moment from 'moment';
import StopAlarm from '../src/StopAlarm';

it('renders correctly', () => {
  const clock = renderer.create(
    <Clock />
  ).toJSON();
  expect(clock).toMatchSnapshot();
});

it('shows current time', () => {
  const current_time = moment().format("LTS");
  const { getByTestId } = render(<Clock />);
  const displayed_time = (getByTestId('clock_time').props.children);
  expect(displayed_time).toEqual(current_time);
});

describe("Alarm Set Button", () => {
  test("renders", () => {
    const wrapper = shallow(<Button title="When would you like to wakeup?" />);
    expect(wrapper.exists()).toBe(true);
  });
});

it("has stop alarm button", () => {
  const wrapper = shallow(<StopAlarm />);
  expect(wrapper.exists()).toBe(true);
});

// describe("Time Selection", () => {
//   it("schedules alarm for correct time", () => {
//     const wrapper = shallow(<Clock/>);
//     wrapper.handleDatePicked('Fri Sep 06 2019 14:25:00 GMT+0100 (British Summer Time)')
//   })
// })
