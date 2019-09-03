import React from 'react';
import { Button } from 'react-native';

const setAlarm = props => {
  return (
    <Button title="Set Alarm" onPress={props.onSetAlarm} />
  );
};

export default setAlarm;
