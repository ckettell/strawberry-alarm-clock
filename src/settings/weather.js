import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { View } from "native-base";

export default class Weather extends Component {
constructor(props) {
  super(props);
  this.state = {
    apiKey: '0fd818ea25024ad2f4461e80460c8d1a',
    forecast: '',
    forecastTime: '',
  }
};

  getRelevantForecastTime = () => {
    const alarmDate = this.props.alarmTime; '11-09-2019 08:39:23'
    var alarmTime = alarmDate.substr(11, 15);
    var forecastTime;
      if (alarmTime >= "01:30:00" && alarmTime < "04:30:00") {
        forecastTime = "03:00:00";
      } else if (alarmTime >= "04:30:00" && alarmTime < "07:30:00") {
        forecastTime = "06:00:00";
      } else if (alarmTime >= "07:30:00" && alarmTime < "10:30:00") {
        forecastTime = "09:00:00";
      } else if (alarmTime >= "10:30:00" && alarmTime < "13:30:00") {
        forecastTime = "12:00:00";
      } else if (alarmTime >= "13:30:00" && alarmTime < "16:30:00") {
        forecastTime = "15:00:00";
      } else if (alarmTime >= "16:30:00" && alarmTime < "19:30:00") {
        forecastTime = "18:00:00";
      } else if (alarmTime >= "19:30:00" && alarmTime < "22:30:00") {
        forecastTime = "21:00:00";
      } else {
        forecastTime = "00:00:00";
      }


  }

  isBetween = (time, lowerbound, upperbound) => {
    if (time >= lowerbound && time < upperbound) {
      return true
    }
  }

  getRelevantForecast = (forecasts, relevantForecastTime) => {
    for (let forecast of forecasts) {
        if (forecast.dt_txt.substr(11,15) == relevantForecastTime) {break;}
        return forecast
      }
  }

  getWeather = (forecast) => {
    return forecast.weather[0].description
  }

  setWeatherForecast = (weather) => {
    this.props.updateWeatherForecast(weather);
  }

  reportWeather = () => {
    var relevantForecastTime = this.getRelevantForecastTime()
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.props.location.latitude}&lon=${this.props.location.longitude}&&APPID=${this.state.apiKey}`)
    .then( (response) => response.json() )
    .then( (responseJson) => responseJson.list)
    .then( (threeHourlyForecasts) => this.getRelevantForecast(threeHourlyForecasts, relevantForecastTime) )
    .then( (relevantForecast) => this.getWeather(relevantForecast))
    .then( (weather) => this.setWeatherForecast(weather))

  }

  // need the following functions to run consecutively
  componentDidMount() {
    this.reportWeather()
  }



  render() {
    return(
      <View>
      </View>
    )

  }}
