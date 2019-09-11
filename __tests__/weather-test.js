import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { render } from 'react-native-testing-library';
import renderer from 'react-test-renderer';
import App from '../src/settings/weather';

it('calculates relevant forecast time', () => {
  const wrapper = shallow (<Weather alarmTime={'09-09-2019 08:30:00'}/>);
  const instance = wrapper.instance();
  var time = instance.getRelevantForecastTime();
  expect(time).toEqual('09:00:00');
});
