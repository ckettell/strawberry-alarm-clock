import React from 'react';
import { Text } from 'react-native';
import { View, List, ListItem } from "native-base";

import styles from "./searchResultsStyles.js";

export const SearchResults = () =>{

  return(
    <View style ={styles.searchResultsWrapper} >
    <List>
    <ListItem button avatar><Text>List item 1 </Text></ListItem>
    <ListItem><Text>List item 2 </Text></ListItem>
    </List>
    </View>
  )
}

export default SearchResults;
