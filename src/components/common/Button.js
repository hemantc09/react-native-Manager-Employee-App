import React from 'react';
import { Text, TouchableOpacity } from 'react-native';


//onPress are nothing but props. we can name it anything
//children is onthing but a props recieved from parent button component
const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    /* first onPress is an event handler and second onPress is an props
      received from parent Button component*/
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
      {/* we are accessing the parent send props as children. So it will display "Buy Now" */}
        {children}
      </Text>
    </TouchableOpacity>
  );
};


const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15
  },

  buttonStyle: {
    //flex: 1 means expand the button as much content as possible can. Limits of container
    flex: 1,
    //position element itself usng flexbox rules
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: '#404021',
    borderRadius: 10,
  }
};

export { Button };
