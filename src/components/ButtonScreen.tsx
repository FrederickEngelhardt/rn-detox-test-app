import React from 'react';
import {
  Animated,
  Easing,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  View
} from 'react-native';

const { width: WIDTH } = Dimensions.get('screen');

type ButtonArrayType = Array<number>;
type ButtonAnimationArrayType = Array<Animated.Value>;

type Props = {
  buttonsArray: ButtonArrayType;
};

class ButtonScreen extends React.PureComponent<Props> {
  buttonAnimationArray: ButtonAnimationArrayType;

  constructor(props: Props) {
    super(props);
    this.buttonAnimationArray = this.props.buttonsArray.map(
      () => new Animated.Value(0)
    );
  }

  bounceAnimation = (id: number) =>
    Animated.sequence([
      Animated.timing(this.buttonAnimationArray[id], {
        toValue: 1,
        duration: 500,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true
      }),
      Animated.timing(this.buttonAnimationArray[id], {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true
      })
    ]).start();

  render() {
    return (
      <View style={styles.container}>
        {this.props.buttonsArray.map((button: number, index: number) => (
          // @ts-ignore (DETOX input makes this type fail)
          <TouchableOpacity
            inputID={button as number}
            key={`${button}`}
            style={styles.wrapper}
            onPress={() => this.bounceAnimation(index)}
          >
            <Animated.View
              style={[stylesAnimation(this.buttonAnimationArray[index]).button]}
            >
              <Text style={styles.text}>blah{button}</Text>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}
const stylesAnimation = (modifier: Animated.Value) => ({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH * 0.3,
    height: 50,
    margin: 10,
    backgroundColor: 'rgba(255,255,0, .8)',
    borderRadius: 20,
    transform: [
      {
        scaleX: modifier.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.5]
        })
      },
      {
        scaleY: modifier.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.5]
        })
      }
    ]
  }
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  wrapper: {
    flexShrink: 1
  },

  text: {
    textAlign: 'center'
  }
});

export default ButtonScreen;
