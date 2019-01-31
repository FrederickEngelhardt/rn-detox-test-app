import React  from "react";
import {
  Animated,
	Easing,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  View
} from "react-native";

const { height: HEIGHT, width: WIDTH } = Dimensions.get("screen");

class Buttons extends React.PureComponent {
  constructor(props) {
    super(props);
    this.buttonAnimationArray = this.props.buttonsArray.map(
      () => new Animated.Value(0)
    );
  }

  bounceAnimation = id =>
    Animated.sequence([Animated.timing(this.buttonAnimationArray[id], {
      toValue: 1,
      duration: 500,
      easing: Easing.in(Easing.ease),
			useNativeDriver: true,
    }),
			Animated.timing(this.buttonAnimationArray[id], {
				toValue: 0,
				duration: 200,
				easing: Easing.in(Easing.ease),
				useNativeDriver: true,
			})
    ]).start();

  render() {
    return (
      <View style={style.container}>
        {this.props.buttonsArray.map((button, index) => (
          <TouchableOpacity
            inputID={button}
            key={button}
            style={[style.wrapper]}
            onPress={() => this.bounceAnimation(index)}
          >
            <Animated.View
              style={[styleAnimation(this.buttonAnimationArray[index]).button]}
            >
              <Text style={style.text}>blah{button}</Text>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}
const styleAnimation = modifier => ({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: WIDTH * 0.3,
    height: 50,
    margin: 10,
		backgroundColor: "rgba(255,255,0, .8)",
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

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wrapper: {
		flexShrink: 1,
  },

  text: {
    textAlign: "center"
  }
});

export default Buttons;
