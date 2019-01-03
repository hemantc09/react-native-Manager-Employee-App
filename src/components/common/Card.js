import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
      <View style={styles.containerStyle}>
      {/*we are receving the parent component <Card> tag children there
      because those are passed as props and access here*/}
        {props.children}
      </View>
  );
};

const styles = {
    containerStyle: {
      boderColor: '#ddd',
      borderBottom: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10
    }
};

//this is a reusable component so we are exporting as named export
export { Card };
