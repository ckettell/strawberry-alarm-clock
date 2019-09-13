import React, {Component} from "react";
import { Text, Button, Picker } from 'react-native';
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
      <Picker
      title='Prep Time (mins)'
      placeholder='Prep Time (mins)'
      style={{height: 50, width: 100}}
      onValueChange={(itemValue, itemIndex) =>
        this.setGetReadyTime(itemValue)
      }>
      <Picker.Item label="0" value='0' />
      <Picker.Item label="10" value='10' />
      <Picker.Item label="20" value='20' />
      <Picker.Item label="30" value='30' />
      <Picker.Item label="40" value='40' />
      <Picker.Item label="50" value='50' />
      <Picker.Item label="60" value='60' />
      </Picker>


      </View>
    )
  }

}
