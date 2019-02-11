import React, {Component} from 'react'
import firebase from 'react-native-firebase'
import {
  Alert,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button
} from 'react-native';
import {
  InputWithLabel,
  PickerWithLabel,
  AppButton,
} from './UI';

export default class CreateAccount extends Component<Props> {
    constructor(props){
      super(props);
  }
  static navigationOptions = {
    title:'Join SET',
  };

  state = { email: '', password: '', errorMessage: null }
  handleSignUp = () => {
    if(this.state.email!='' && this.state.password!=''){
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Login'))
      .catch(error => this.setState({ errorMessage: error.message }))
    }else if(this.state.email==''){
      this.setState({ errorMessage:'Please enter email address.'})
    }else if(this.state.password==''){
      this.setState({ errorMessage:'Please enter password.'})
    }
  }
render() {
    return (
      <ScrollView style={styles.container}>
      <Text style={styles.displayText}>SET</Text>
        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
          <View style={styles.headerWrapper}>
          <InputWithLabel style={styles.input}
          label={'Email'}
          value={this.state.email}
          autoCapitalize="none"
          onChangeText={email => this.setState({email})}
          orientation={'vertical'}
        />
        </View>

        <View style={styles.headerWrapper}>
        <InputWithLabel style={styles.input}
          label={'Password'}
          value={this.state.password}
          onChangeText={(password) => {this.setState({password})}}
          orientation={'vertical'}
          secureTextEntry={true}
          autoCapitalize="none"
          />
        </View>

        <View style={styles.center}>
        <AppButton style={styles.button}
        title={'Create'}
        theme={'primary'}
        onPress={this.handleSignUp} 
        />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>

      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  center:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 20,
    color: 'black',
  },
  headerWrapper: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  picker: {
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
    marginBottom: 50,
    width: 150,
    alignItems: 'center',
    borderRadius:100,
  },
  displayText: {
    fontSize: 30,
    marginBottom: 30,
  },
});