import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';
import Clock from '../src/Clock'

it('renders correctly', () => {
  const time = renderer.create(
    <Clock />
  ).toJSON();
  expect(time).toMatchSnapshot();
});
