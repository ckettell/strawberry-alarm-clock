import React, {Component} from "react";
import {
  Text,
  Button,
  Picker,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { View, InputGroup, Input } from "native-base";

export default class PrepTime extends Component {
  state = {
  prepTime: 0,
}


setGetReadyTime(time){
  this.setState({
    prepTime: parseInt(time)
  })
  this.setPrepTime()
}


setPrepTime = () => {
  this.props.updatePrepTime(this.state.prepTime)
}

logPrepTime = () => {
  console.log(this.state.prepTime);
}

  render(){

    return(
      <View>
        <TouchableOpacity onPress={this.logPrepTime}>
          <Text style={prepTimeStyles.button}>
            Set log prep time
          </Text>
        </TouchableOpacity>

        <Picker
          title='Get Ready Time'
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setGetReadyTime(itemValue)
        }>
        <Picker.Item label="1" value='1' />
        <Picker.Item label="2" value='2' />
        <Picker.Item label="2" value='3' />
        <Picker.Item label="4" value='4' />
        </Picker>
      </View>
    )
  }
}

const prepTimeStyles = StyleSheet.create({
  button: {
    backgroundColor: '#696969',
    borderColor: '#ff7f50',
    borderWidth: 2,
    borderRadius: 6,
    color: '#e59400',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 5,
    textAlign:'center',
  },
})
