/** @format */

import React from "react";
import { AppRegistry } from "react-native";
import { Tester, TestHookStore } from "cavy";

import AppSpec from "./specs/test";
import { name as appName } from "./app.json";
import App from "./App";

import { API_KEY, BLAH } from 'react-native-dotenv'


const testHookStore = new TestHookStore();

console.log(process.env, API_KEY, BLAH);

export default class AppWrapper extends React.PureComponent {
  render() {
    return (
      <Tester specs={[AppSpec]} store={testHookStore} sendReport={true} waitTime={4000}>
        <App />
      </Tester>
    );
  }
}

AppRegistry.registerComponent(appName, () => AppWrapper);
