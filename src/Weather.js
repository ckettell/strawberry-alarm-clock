import React, { Component } from 'react';

export default class Weather extends Component {
constructor(props) {
  super(props);
  this.state = {
    lat: '51.523350',
    lon: '-0.077440',
    apiKey: '0fd818ea25024ad2f4461e80460c8d1a',
    weather: '',
  }
};

reportWeather = () => {

    return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.state.lat}&lon=${this.state.lon}&&APPID=${this.state.apiKey}`)
      .then( (response) => response.json() )
      .then( (responseJson) => {

        this.setState({
          weather: responseJson['list'][0]['main']['weather'][0]['main']

        })


})


  render() {

    const { searchFocused } = this.state;
        const { onLocationSelected } = this.props;

  return(
  <View>
    <Text>
       'Today it will be'{this.state.weather}
   </Text>
// 
//
//     }} // 'details' is provided when fetchDetails = true
//
//        query={{
//          key: "AIzaSyCoaWQAbcunCXBFbD79q2xCRYtGv8-sQWE",
//          language: "en"
//        }}
//        textInputProps={{
//          onFocus: () => {
//            this.setState({ searchFocused: true });
//          },
//          onBlur: () => {
//            this.setState({ searchFocused: false });
//          },
//          autoCapitalize: "none",
//          autoCorrect: false
//        }}
//
//
//
//        listViewDisplayed={searchFocused}
//        fetchDetails
//        enablePoweredByContainer={false}
//        styles={{
//          container: {
//            position: "absolute",
//            top: Platform.select({ ios: 60, android: 40 }),
//            width: "100%"
//          },
//          textInputContainer: {
//            flex: 1,
//            backgroundColor: "transparent",
//            height: 54,
//            marginHorizontal: 20,
//            borderTopWidth: 0,
//            borderBottomWidth: 0
//          },
//          textInput: {
//            height: 54,
//            margin: 0,
//            borderRadius: 0,
//            paddingTop: 0,
//            paddingBottom: 0,
//            paddingLeft: 20,
//            paddingRight: 20,
//            marginTop: 0,
//            marginLeft: 0,
//            marginRight: 0,
//            elevation: 5,
//            shadowColor: "#000",
//            shadowOpacity: 0.1,
//            shadowOffset: { x: 0, y: 0 },
//            shadowRadius: 15,
//            borderWidth: 1,
//            borderColor: "#DDD",
//            fontSize: 18
//          },
//          listView: {
//            borderWidth: 1,
//            borderColor: "#DDD",
//            backgroundColor: "#FFF",
//            marginHorizontal: 20,
//            elevation: 5,
//            shadowColor: "#000",
//            shadowOpacity: 0.1,
//            shadowOffset: { x: 0, y: 0 },
//            shadowRadius: 15,
//            marginTop: 10
//          },
//          description: {
//            fontSize: 16
//          },
//          row: {
//            padding: 20,
//            height: 58
//          }
//        }}
//      />
//
//      </View>
//
//    );
//  }
// }
