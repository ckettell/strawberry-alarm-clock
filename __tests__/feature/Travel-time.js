import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { render } from 'react-native-testing-library';
import renderer from 'react-test-renderer';
import Clock from '../../src/Clock';

describe('Set travel time', () => {
  it('should record the travel time for a journey', () => {
  const wrapper = shallow(<Clock />);
  const instance = wrapper.instance();
  instance.updateTravelTime(1800);
  expect(instance.state.travelTime).toEqual(1800);
  });
});
