import React, {Component} from "react";
import { Text, Button } from 'react-native'
import { View, InputGroup, Input } from "native-base";
import { createStackNavigator, createAppContainer } from 'react-navigation';

import SearchBox from './searchbox'
import SearchResults from './searchresults'
import styles from "./styles";

export default class Location extends Component {


      componentDidMount(){

        // const loc = SearchBox.props.locationA
        // console.log(loc + ' locTION HERE');

        return fetch('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyCoaWQAbcunCXBFbD79q2xCRYtGv8-sQWE')
        .then( (response) => response.json() )
        .then( (responseJson) => {
          console.log(responseJson)

        });
      }




  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
         <SearchBox/>
        <Button
        title="Next"
        onPress={() => this.props.navigation.navigate('Time')}
      />
      </View>
    );
  }
}
