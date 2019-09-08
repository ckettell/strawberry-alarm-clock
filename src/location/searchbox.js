import React, { Component } from 'react';
import { Text, Platform } from 'react-native';
import { View, InputGroup, Input } from "native-base";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


import styles from "./searchBoxStyles.js";


export default class SearchBox extends Component {
constructor(props) {
  super(props);

  this.state = {
    searchFocused: false,
    locationALat: '',
    locationALong: '',
    locationB: '',
    travelTime: '',
  }
};


calculateDistance = () => {

  return fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=place_id:${this.state.locationA}&destinations=place_id:${this.state.locationB}&key=AIzaSyCoaWQAbcunCXBFbD79q2xCRYtGv8-sQWE`)
  .then( (response) => response.json() )
  .then( (responseJson) => {

    this.setState({
      travelTime: responseJson['rows'][0]['elements'][0]['duration']['value']

    })


  })


}

  setCurrentLocation = () => {

    this.setState({
       locationALat: this.props.location['latitude'],
       locationALong: this.props.location['longitude'],

    })

  }


  setLocation = data => {
    this.setState({
      locationB: data["place_id"]

    })

  }

  render() {

    console.log(this.props.location['latitude'])

    const { searchFocused } = this.state;
        const { onLocationSelected } = this.props;

  return(
  <View>
    <Text>
       {this.state.locationA}
   </Text>

    <GooglePlacesAutocomplete
       placeholder="Where do you want to go?"
       placeholderTextColor="#333"
       onPress={onLocationSelected}
       fetchDetails={true}
    renderDescription={row => row.description} // custom description render
    onPress={(data, details = null) => {
      { this.setLocation(data) }
      { this.setCurrentLocation()}
      { this.calculateDistance() }



    }} // 'details' is provided when fetchDetails = true

       query={{
         key: "AIzaSyCoaWQAbcunCXBFbD79q2xCRYtGv8-sQWE",
         language: "en"
       }}
       textInputProps={{
         onFocus: () => {
           this.setState({ searchFocused: true });
         },
         onBlur: () => {
           this.setState({ searchFocused: false });
         },
         autoCapitalize: "none",
         autoCorrect: false
       }}



       listViewDisplayed={searchFocused}
       fetchDetails
       enablePoweredByContainer={false}
       styles={{
         container: {
           position: "absolute",
           top: Platform.select({ ios: 60, android: 40 }),
           width: "100%"
         },
         textInputContainer: {
           flex: 1,
           backgroundColor: "transparent",
           height: 54,
           marginHorizontal: 20,
           borderTopWidth: 0,
           borderBottomWidth: 0
         },
         textInput: {
           height: 54,
           margin: 0,
           borderRadius: 0,
           paddingTop: 0,
           paddingBottom: 0,
           paddingLeft: 20,
           paddingRight: 20,
           marginTop: 0,
           marginLeft: 0,
           marginRight: 0,
           elevation: 5,
           shadowColor: "#000",
           shadowOpacity: 0.1,
           shadowOffset: { x: 0, y: 0 },
           shadowRadius: 15,
           borderWidth: 1,
           borderColor: "#DDD",
           fontSize: 18
         },
         listView: {
           borderWidth: 1,
           borderColor: "#DDD",
           backgroundColor: "#FFF",
           marginHorizontal: 20,
           elevation: 5,
           shadowColor: "#000",
           shadowOpacity: 0.1,
           shadowOffset: { x: 0, y: 0 },
           shadowRadius: 15,
           marginTop: 10
         },
         description: {
           fontSize: 16
         },
         row: {
           padding: 20,
           height: 58
         }
       }}
     />

     </View>

   );
 }
}
