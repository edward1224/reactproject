import React, { Component } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  FlatList,
  AppState,
  Image,
  ScrollView,
  Button
} from 'react-native';
import {
  InputWithLabel,
} from './UI';
import firebase from 'react-native-firebase'
export default class LoginScreen extends Component<Props> {
  constructor(props){
    super(props);
  }
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    if(this.state.email!='' && this.state.password!=''){
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('MainPanel'))
      .catch(error => this.setState({ errorMessage: error.message }))
    }else if(this.state.email==''){
      this.setState({ errorMessage:'Please enter email address.'})
    }else if(this.state.password==''){
      this.setState({ errorMessage:'Please enter password.'})
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'MainPanel' : 'Login')
    })
  }
  static navigationOptions = {header: null};
  render() {
    return (
      <ScrollView style={styles.container}>
      <View style={styles.center}>
      <Image style={styles.image}source={require('./img/app-logo.png')}/>  
        <Text style={styles.sub}>Smart Entrepreneur Tool</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        </View>

       
        <View style={styles.headerWrapper}>
        <InputWithLabel style={styles.input}
          placeholder={'Email'}
          value={this.state.email}
          autoCapitalize="none"
          onChangeText={email => this.setState({email})}
          value={this.state.email}
          orientation={'vertical'}
        />
        </View>
        <View style={styles.headerWrapper}>
         <InputWithLabel style={styles.input}
          placeholder={'Password'}
          value={this.state.password}
          onChangeText={(password) => {this.setState({password})}}
          orientation={'vertical'}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        </View>

        <View style={styles.center}>
          <View style={styles.buttonsty}>
              <TouchableHighlight style={styles.buttonsty} underlayColor="black"
              onPress={() => {this.handleLogin()}}>
                  <View style={styles.button}>
                      <Text style={styles.buttonText}>Login</Text>
                  </View>
              </TouchableHighlight>
          </View>

          <Text style={styles.displayText}>New to SET?</Text>
          <Text style={styles.createAcc}
          onPress={() => {this.props.navigation.navigate('LoginMethods')}}>
          Create an account
          </Text>
        
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  center:{
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  image: {
    marginTop: 10,
    width: 150,
    height: 150,
  },
  sub: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },
  headerWrapper: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  buttonsty: {  
    width: 150,
    alignItems: 'center',
    backgroundColor: '#696969',
    borderRadius:100,
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  buttonText: {
    padding: 15,
    color: 'white',
    fontSize: 20,
  },
  createAcc: {
    fontSize: 17,
    color: 'blue',
    textDecorationLine: 'underline',
    textAlignVertical: 'bottom',
  },
  displayText: {
    marginTop: 10,
    fontSize: 20,
  },
});