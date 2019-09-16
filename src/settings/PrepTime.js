import React, {Component} from "react";
import { Text, Button, Picker } from 'react-native';
import { View, InputGroup, Input } from "native-base";
import { Dropdown } from 'react-native-material-dropdown';
export default class PrepTime extends Component {
  state = {
    prepTime: 0,
  }


setGetReadyTime(time){
  this.setState({
    prepTime: parseInt(time)
  })
  this.setPrepTime()
  console.log(this.state.prepTime);
}


setPrepTime = () => {


  this.props.updatePrepTime(this.state.prepTime)



}

logPrepTime = () => {
  console.log(this.state.prepTime);

}

  render(){
    let data = [{
      value: '0',
    }, {
      value: '10',
    }, {
      value: '20',
    }, {
      value: '30',
    }, {
      value: '40',
    }, {
      value: '50',
    }, {
      value: '60',

    }];

    return(
      <View style={{position: 'relative', top: -25}}>
      <Dropdown
      label='Get Ready Time'
      data={data}
      onChangeText={(prepTime) => this.setGetReadyTime(prepTime)}/>
      </View>
    )
  }

}
