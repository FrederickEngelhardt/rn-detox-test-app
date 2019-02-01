import React from 'react';
import {
  TextInput,
  Text,
  StyleSheet,
  View
} from 'react-native';

type FieldKeys = ['username', 'password']

type Field = {
  key: FieldKeys[any],
  label: string,
}

type Props = {
  fields: Array<Field>
}

class Buttons extends React.PureComponent<Props> {
  state = {
    username: '',
    password: ''
  };

  render() {
    const { fields } = this.props
    return (
      <View style={styles.container}>

        { fields.map((field) => (
            <React.Fragment key={field.key}>
              <Text style={styles.labelField}>{field.label}</Text>
              <TextInput
                onChangeText={(text) => this.setState({ [field.key]: text})}
                secureTextEntry={field.key === 'password'}
                style={styles.inputField}
                value={this.state[field.key]}
              />
            </React.Fragment>
          )
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  wrapper: {
    flexShrink: 1
  },

  labelField: {
    flexGrow: 1,
    flexBasis: 25,
  },

  inputField: {
    flexGrow: 1,
    flexBasis: 75,
    padding: 10,
    // width: WIDTH*.8,
    height: 50,
    backgroundColor: '#ffffff'
  },

  text: {
    textAlign: 'center'
  }
});

export default Buttons;
