import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { View } from "native-base";

export default class Weather extends Component {
constructor(props) {
  super(props);
  this.state = {
    apiKey: '0fd818ea25024ad2f4461e80460c8d1a',
    weather: '',
    forecastTime: '',
  }
};

  weatherTime = () => {
    const alarmTime = this.props.alarmTime;
    var alarmHour = alarmTime.substr(11, 15);
    var forecastTime;
      if (alarmHour >= "01:30:00" && alarmHour < "04:30:00") {
        forecastTime = "03:00:00";
      } else if (alarmHour >= "04:30:00" && alarmHour < "07:30:00") {
        forecastTime = "06:00:00";
      } else if (alarmHour >= "07:30:00" && alarmHour < "10:30:00") {
        forecastTime = "09:00:00";
      } else if (alarmHour >= "10:30:00" && alarmHour < "13:30:00") {
        forecastTime = "12:00:00";
      } else if (alarmHour >= "13:30:00" && alarmHour < "16:30:00") {
        forecastTime = "15:00:00";
      } else if (alarmHour >= "16:30:00" && alarmHour < "19:30:00") {
        forecastTime = "18:00:00";
      } else if (alarmHour >= "19:30:00" && alarmHour < "22:30:00") {
        forecastTime = "21:00:00";
      } else if (alarmHour >= "22:30:00" && alarmHour < "01:30:00") {
        forecastTime = "00:00:00";
      } else {
          console.log('error')
    }
    this.setState({forecastTime: forecastTime})
  }

  reportWeather = () => {
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.props.location.latitude}&lon=${this.props.location.longitude}&&APPID=${this.state.apiKey}`)
    .then( (response) => response.json() )
    .then( (responseJson) => {
      const forecastArray = responseJson.list;

      for (let forecast of forecastArray) {
        if (forecast.dt_txt.substr(11,15) == this.state.forecastTime) {break;}
        this.setState({weather: forecast.weather[0].description})
      }
    })
  }


  render() {
  const weather = this.state.weather;

    return(
    <View>
      <Button title='Weather'
        onPress={() => {
          {this.reportWeather()}
          {this.weatherTime()}
        }}
      />
      <Text>
        The weather today is: {this.state.weather}
      </Text>
    </View>
    );
  }}
