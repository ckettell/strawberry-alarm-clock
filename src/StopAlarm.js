import React from 'react';
import { Button } from 'react-native';

const stopAlarm = props => {
  return (
    <Button title="Stop Alarm" onPress={ props.onStopAlarm } />
  );
};

export default stopAlarm;
