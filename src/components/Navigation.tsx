import React from 'react';
import {
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  View
} from 'react-native';

const { height: HEIGHT, width: WIDTH } = Dimensions.get('screen');

type Props = {
  goBack: () => void;
  inputID: string;
};

const Navigation = (props: Props) => (
  <View testID={props.inputID} style={style.wrapper}>
    <TouchableOpacity
      testID={'NavigateBack'}
      style={style.button}
      onPress={() => props.goBack()}
    >
      <Text style={style.text}>Go Back</Text>
    </TouchableOpacity>
  </View>
);

const style = StyleSheet.create({
  wrapper: {
    top: 0,
    position: 'absolute',
    height: HEIGHT * 0.1,
    width: WIDTH,
    backgroundColor: 'black'
  },

  button: {
    position: 'relative',
    height: HEIGHT * 0.05,
    top: HEIGHT * 0.05,
    width: 100,
    alignSelf: 'flex-start',
    zIndex: 1
  },

  text: {
    fontSize: 25,
    color: 'yellow',
    textAlign: 'center'
  }
});

export default Navigation;
