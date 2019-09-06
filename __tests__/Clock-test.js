import 'react-native';
import React from 'react';

import { render } from 'react-native-testing-library';
import renderer from 'react-test-renderer';
import Clock from '../src/Clock'
import moment from 'moment';

it('renders correctly', () => {
  const time = renderer.create(
    <Clock />
  ).toJSON();
  expect(time).toMatchSnapshot();
});

it('shows current time', () => {
  const current_time = moment().format("LTS");
  const { getByTestId } = render(<Clock />);
  const displayed_time = (getByTestId('clock_time').props.children);
  expect(displayed_time).toEqual(current_time);
});
