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
}, {
  value: '5',
}];

    return(
      <View>
      <Dropdown
      label='Get Ready Time'
      data={data}
      onChangeText={(prepTime) => this.setGetReadyTime(prepTime)}/>
      </View>
    )
  }

}
