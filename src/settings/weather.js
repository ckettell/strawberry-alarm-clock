import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { View } from "native-base";

export default class Weather extends Component {
constructor(props) {
  super(props);
  this.state = {
    apiKey: '0fd818ea25024ad2f4461e80460c8d1a',
    weather: '',
  }
};

  reportWeather = () => {
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.props.location.latitude}&lon=${this.props.location.longitude}&&APPID=${this.state.apiKey}`)
    .then( (response) => response.json() )
    .then( (responseJson) => {
      this.setState({
        weather: responseJson.list[0].weather[0].description

      })
      
    })
  }


  render() {
    const weather = this.state.weather;

  return(
  <View>
    <Button title='Weather'
      onPress={() => {

        {this.reportWeather()}

      }}
    />
    <Text>
      The weather today is: {this.state.weather}
    </Text>
  </View>
  );
}}