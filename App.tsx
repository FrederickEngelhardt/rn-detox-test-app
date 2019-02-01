import React, { Component } from 'react';
// @ts-ignore (@type/cavy does not exist)
import { hook } from 'cavy';

import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ButtonScreen from './src/components/ButtonScreen';
import InputScreen from './src/components/InputScreen';
import Navigation from './src/components/Navigation';

import testProps from './testProps';

type ComponentListType = 'ButtonScreen' | 'InputScreen'

const componentList = (id: ComponentListType) =>
  ({
    ButtonScreen,
    InputScreen
  }[id]);

const { width: WIDTH } = Dimensions.get('screen');

type Style = {
  button: Object;
  container: Object;
};

type Props = {
  generateTestHook: any;
  ButtonScreen: {
    ButtonArrayType: Array<Number>;
  };
  InputScreen: {};
  pages: ['ButtonScreen', 'InputScreen'];
};

class App extends Component<Props> {
  static defaultProps = {
    ...testProps
  };

  state = {
    focus: ''
  };

  render() {
    const { pages } = this.props;
    const { focus } = this.state;
    return (
      <View testID={'welcome'} style={styles.container}>
        <Navigation goBack={() => this.setState({ focus: '' })} />
        {focus === '' &&
          pages.map((pageId: string) => (
            <TouchableOpacity
              style={styles.button}
              ref={this.props.generateTestHook('App.Button')}
              key={pageId}
              onPress={() => this.setState({ focus: pageId })}
            >
              <Text>Show {pageId}</Text>
            </TouchableOpacity>
          ))}

        {pages.map((screen: ComponentListType) => {
          const Component: any = componentList(screen);
          const props = this.props[screen];
          return focus === screen && <Component key={screen} {...props} />;
        })}
      </View>
    );
  }
}

const TestableApp = hook(App);
export default TestableApp;

const styles: Style = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH * 0.3,
    height: 50,
    margin: 10,
    backgroundColor: 'rgba(255,255,0, .8)',
    borderRadius: 20
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6dbf53'
  }
});
