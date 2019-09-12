import moment from "moment";

export function getRelevantForecast(forecasts, alarmDate) {
  for (let forecast of forecasts) {
      var forecastDate = moment(forecast.dt_txt).format("ddd, DD MMM YYYY HH:mm:ss ZZ");
      var lowerTimeBound = moment(forecastDate).subtract('1.5', 'hours').format("ddd, DD MMM YYYY HH:mm:ss ZZ");
      var upperTimeBound = moment(forecastDate).add('1.5', 'hours').format("ddd, DD MMM YYYY HH:mm:ss ZZ");
      if (moment(alarmDate).isBetween(lowerTimeBound, upperTimeBound)) {
      return forecast
    }
  }
}

export function getWeather(forecast) {
  return forecast.weather[0].description
}

export function reportWeather(latitude, longitude, alarmDate) {
  return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&&APPID=0fd818ea25024ad2f4461e80460c8d1a`)
  .then( (response) => response.json() )
  .then( (responseJson) => responseJson.list)
  .then( (threeHourlyForecasts) => getRelevantForecast(threeHourlyForecasts, alarmDate) )
  .then( (relevantForecast) => getWeather(relevantForecast))
  .then( (weather) => getWeatherForecast(weather))
}
