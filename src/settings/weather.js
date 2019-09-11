import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { View } from "native-base";

const times = {
  "03:00:00": ["01:30:00", "04:30:00"],
  "06:00:00": ["04:30:00", "07:30:00"],
  "09:00:00": ["07:30:00", "10:30:00"],
  "12:00:00": ["10:30:00", "13:30:00"],
  "15:00:00": ["13:30:00", "16:30:00"],
  "18:00:00": ["16:30:00", "19:30:00"],
  "21:00:00": ["19:30:00", "22:30:00"],
  "00:00:00": ["22:30:00", "01:30:00"],
};

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
    return (this.getTimeSlot(times, alarmTime));
  }


  isBetween = (time, lowerbound, upperbound) => {
    if (time >= lowerbound && time < upperbound) {
      return true
    }
  }

  getTimeSlot = (object, value) => {
  return Object.keys(object).find(key => this.isBetween(value, object[key][0], object[key][1]));
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
    console.log('revtime', relevantForecastTime)
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
