import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { View } from "native-base";
import moment from "moment";

export default class Weather extends Component {
constructor(props) {
  super(props);
  this.state = {
    apiKey: '0fd818ea25024ad2f4461e80460c8d1a',
    forecast: '',
    forecastTime: '',
  }
};

  getRelevantForecast = (forecasts, alarmDate) => {
    console.log(alarmDate);
    for (let forecast of forecasts) {
        var forecastDate = moment(forecast.dt_txt).format("DD-MM-YYYY HH:mm:ss");
        var lowerTimeBound = moment(forecastDate).subtract('1.5', 'hours').format("DD-MM-YYYY HH:mm:ss");
        var upperTimeBound = moment(forecastDate).add('1.5', 'hours').format("DD-MM-YYYY HH:mm:ss");
        if (moment(alarmDate).isBetween(lowerTimeBound, upperTimeBound)) {
        return forecast
      }
    }
  }

  getWeather = (forecast) => {
    return forecast.weather[0].description
  }

  setWeatherForecast = (weather) => {
    this.props.updateWeatherForecast(weather);
  }

  reportWeather = () => {
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.props.location.latitude}&lon=${this.props.location.longitude}&&APPID=${this.state.apiKey}`)
    .then( (response) => response.json() )
    .then( (responseJson) => responseJson.list)
    .then( (threeHourlyForecasts) => this.getRelevantForecast(threeHourlyForecasts, this.props.alarmTime) )
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
