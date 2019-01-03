import React from 'react';
import { View } from 'react-native';

//we are passing style prop as array right props.style overwrite with left styles.containerStyle
//use containerstyle but anything better pass use props.style instead
const CardSection = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#DFDC36',
    position: 'relative'
  }
};

//this is a reusable component so we are exporting as named export
export { CardSection };
