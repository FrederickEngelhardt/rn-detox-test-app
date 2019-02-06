import React from 'react';
import {
  ActivityIndicator,
  TextInput,
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

type FieldKeys = ['username', 'password'];

type Field = {
  id: FieldKeys[any];
  label: string;
};

type Props = {
  fields: Array<Field>;
  testID: string;
};

const { width: WIDTH } = Dimensions.get('screen');

const mockApi = () => new Promise((resolve: any) => setTimeout(resolve, 2500));

type PromiseInputType = Promise<any>;
type PromiseReturnType = { promise: any; cancel: () => void };
const promiseCancelWrapper = (promise: PromiseInputType): PromiseReturnType => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
      error => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error))
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    }
  };
};

class Buttons extends React.PureComponent<Props> {
  requestApi: { promise: any; cancel: () => void } | undefined;

  state = {
    username: '',
    password: '',
    isLoggedIn: false,
    isRequesting: false
  };

  componentWillUnmount() {
    if (this.requestApi) this.requestApi.cancel(); // Cancel the promise
  }

  handleLogin = async () => {
    const { isRequesting } = this.state;

    if (isRequesting === true) return;
    this.requestApi = promiseCancelWrapper(mockApi());

    this.setState({ isRequesting: true });

    // Avoid anti pattern isMounted() check
    this.requestApi.promise
      .then(() => this.setState({ isLoggedIn: true, isRequesting: false }))
      .catch((reason: { isCanceled: any }) =>
        console.log('isCanceled', reason.isCanceled)
      );
  };

  render() {
    const { fields, testID } = this.props;
    const { isLoggedIn, isRequesting } = this.state;
    return (
      <View testID={testID} style={styles.container}>
        {fields.map(field => (
          <React.Fragment key={field.id}>
            <View style={styles.labelFieldContainer}>
              <Text style={styles.labelField}>{field.label}</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                testID={field.id}
                onChangeText={text => this.setState({ [field.id]: text })}
                secureTextEntry={field.id === 'password'}
                maxLength={15}
                style={styles.inputField}
                value={this.state[field.id]}
              />
              <TouchableOpacity
                testID={`${field.id}Clear`}
                onPress={() => this.setState({ [field.id]: '' })}
                style={styles.reset}
              >
                <Text style={styles.resetText}>X</Text>
              </TouchableOpacity>
            </View>
          </React.Fragment>
        ))}
        {!isRequesting && (
          <TouchableHighlight
            testID={'LoginButton'}
            onPress={this.handleLogin}
            style={styles.loginButton}
            underlayColor={'white'}
          >
            <Text style={styles.labelField}>
              {isLoggedIn ? 'Sign out' : 'Login'}
            </Text>
          </TouchableHighlight>
        )}
        {isRequesting && (
          <View testID={'Loader'} style={styles.loader}>
            <ActivityIndicator size="large" color="#fffff" />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },

  loader: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100
  },

  loginButton: {
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(40, 40, 40)',
    width: WIDTH * 0.4,
    height: 40,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },

  labelFieldContainer: {
    marginTop: 15,
    padding: 10,
    width: WIDTH * 0.95,
    backgroundColor: 'rgba(40,40,40, 1)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },

  labelField: {
    textAlign: 'center',
    color: 'rgb(255,255,0)',
    fontSize: 20,
    fontWeight: 'bold'
  },

  inputContainer: {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },

  reset: {
    position: 'absolute',
    right: 10,
    top: 20
  },

  resetText: {
    fontSize: 25,
    color: 'rgb(0, 0, 255)'
  },

  inputField: {
    fontSize: 30,
    width: WIDTH * 0.95,
    padding: 10
  },

  text: {
    textAlign: 'center'
  }
});

export default Buttons;
