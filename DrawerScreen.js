import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Button,
} from 'react-native';
import { withNavigation } from 'react-navigation';

type Props = {};
class DrawerScreen extends Component<Props> {
  constructor(props){
    super(props);
}
handleLogOut =() =>{
  firebase.auth().signOut().then(function() {
    this.props.navigation.navigate('Login');
  }).catch(function(error) {
    // An error happened.
  });
}
  render() {
    return (
      <ScrollView style={styles.container}>
            <View style={styles.buttonsty}>
              <TouchableHighlight style={styles.touchable} underlayColor="#696969"
              onPress={() => {this.props.navigation.navigate('MainPanel')}}>
                  <View style={styles.button}>
                      <Text style={styles.buttonText}>Home</Text>
                  </View>
              </TouchableHighlight>
            </View>
            <View style={styles.buttonsty}>
              <TouchableHighlight style={styles.touchable} underlayColor="#696969"
              onPress={() => {this.props.navigation.navigate('PromotionPanel')}}>
                  <View style={styles.button}>
                      <Text style={styles.buttonText}>Promotion</Text>
                  </View>
              </TouchableHighlight>
            </View>
            <View style={styles.buttonsty}>
              <TouchableHighlight style={styles.touchable} underlayColor="#696969"
              onPress={() => {this.handleLogOut()}}>
                  <View style={styles.button}>
                      <Text style={styles.buttonText}>Log Out</Text>
                  </View>
              </TouchableHighlight>
            </View>
            
      </ScrollView>
    )
  }
}
export default withNavigation(DrawerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 48,
    color: 'black',
  },
  center:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable:{
    width:300,
  },
  buttonsty: {
    flex: 1,
    marginBottom: 10,
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    padding: 15,
    color: 'black',
    fontSize: 20,
  },
})