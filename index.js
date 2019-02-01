/** @format */

import React from 'react';
import { AppRegistry } from 'react-native';
// @ts-ignore
import { Tester, TestHookStore } from 'cavy';
// @ts-ignore
import { E2E_TESTING } from 'react-native-dotenv';
// @ts-ignore
import AppSpec from './specs/test';
// @ts-ignore
import { name as appName } from './app.json';

import App from './App';

const testHookStore = new TestHookStore();

const AppWrapper = () =>
  E2E_TESTING === 'true' ? (
    <Tester
      specs={[AppSpec]}
      store={testHookStore}
      sendReport={true}
      waitTime={1000}
    >
      <App />
    </Tester>
  ) : (
    <App />
  );

AppRegistry.registerComponent(appName, () => AppWrapper);
