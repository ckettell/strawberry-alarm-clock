import React, {Component} from "react";
import { Text, Button, Picker } from 'react-native';
import { View, InputGroup, Input } from "native-base";

export default class PrepTime extends Component {
  state = {
    prepTime: 0,
  }


setGetReadyTime(time){
  this.setState({
    prepTime: time
  })
  this.setPrepTime()
}


setPrepTime = () => {
  this.props.updatePrepTime(this.state.prepTime)
}

  render(){

    return(
      <View>
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
