import React, {Component} from "react";
import { Text, Button, Picker, TextInput } from 'react-native';
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
    let data = [{
      value: '1',
      }, {
      value: '2',
      }, {
      value: '3',
      }, {
      value: '4',
    }];

    return(
      <View>
        <TextInput
          placeholder="How Long Do You Get Ready"
          keyboardType={'numeric'}
        />

      </View>
    )
  }
}
