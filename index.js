/** @format */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Tester, TestHookStore } from 'cavy';

import AppSpec from './specs/test';
import { name as appName } from './app.json';
import App from './App';

import { E2E_TESTING } from 'react-native-dotenv';

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
