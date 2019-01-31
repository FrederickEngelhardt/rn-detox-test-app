/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Dimensions,
  Platform,
  Button,
  StyleSheet,
  Text,
  View
} from "react-native";

import Buttons from "./src/components/Buttons";
import Inputs from "./src/components/Inputs";
import Images from "./src/components/Images";
import Navigation from "./src/components/Navigation";

import { buttonProps } from "./testProps";

const { height: HEIGHT, width: WIDTH } = Dimensions.get("screen");

type Props = {};
export default class App extends Component<Props> {
  static defaultProps = {
    pages: ["Buttons", "Inputs", "Images"]
  };

  state = {
    focus: ''
  };

  render() {
    const { pages } = this.props;
    const { focus } = this.state;
    return (
      <View testID={"welcome"} style={styles.container}>
        <Navigation goBack={() => this.setState({focus: ''})}/>
        {pages.map(pageId => (
          focus === '' && <Button
            key={pageId}
            onPress={() => this.setState({ focus: pageId })}
            title={`Show ${pageId}`}
          />
        ))}

        {focus === "Buttons" && <Buttons {...buttonProps} />}
        {focus === "Inputs" && <Inputs />}
        {focus === "Images" && <Images />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6dbf53"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
