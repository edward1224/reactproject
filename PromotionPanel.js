import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  DrawerLayoutAndroid
} from 'react-native';
import DrawerScreen from './DrawerScreen.js';
import {
  InputWithLabel,
  PickerWithLabel,
  AppButton,
} from './UI';

type Props = {};
export default class MainPanel extends Component<Props> {
  static navigationOptions = {
    headerLeft: null,
    title:'Events & Promotions',
  };

  constructor(props) {
    super(props)

    this.state = {
    };

  }

  render() {
    return (
       <DrawerLayoutAndroid
        ref={'MyDrawer'}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() =><DrawerScreen />}>
        
        <View style={styles.container}>
        <Image style={{flex:1,width: null,height: null,resizeMode: 'cover'}}source={require('./img/starbuck.jpg')}/>  
        </View>

      <View style={{flex: 0.5, flexDirection: 'row'}}>
          <TouchableHighlight style={{flex:0.5, backgroundColor: 'white'}} underlayColor='white'
          onPress={() => {this.props.navigation.navigate('MainPanel')}}>
            <Image style={{flex:1,width: null,height: null,resizeMode: 'cover'}}source={require('./img/workshop.jpg')}/>  
          </TouchableHighlight>
          <View style={{flex:0.5, backgroundColor: 'skyblue'}} >
          <Image style={{flex:1,width: null,height: null,resizeMode: 'cover'}}source={require('./img/competition.jpg')}/>  
          </View>
      </View>

      <View style={{flex: 0.5, flexDirection: 'row'}}>
        <View style={{flex:0.5, backgroundColor: 'white'}}>
        <Image style={{flex:1,width: null,height: null,resizeMode: 'cover'}}source={require('./img/ticket.jpg')}/> 
        </View>
        <View style={{flex:0.5, backgroundColor: 'powderblue'}}>
        <Image style={{flex:1,width: null,height: null,resizeMode: 'cover'}}source={require('./img/promotion.jpg')}/>
        </View>
      </View>
      
      <View style={{flex: 0.2, flexDirection: 'row', paddingTop:15}}>
            <TouchableHighlight style={{flex:0.5, backgroundColor: 'white'}} underlayColor='black'
              onPress={() => {this.props.navigation.navigate('MainPanel')}}>
              <View style={styles.center}>
                <Image style={styles.icon}source={require('./img/home-button.jpg')}/>  
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={{flex:0.5, backgroundColor: 'white'}} underlayColor='black'
              onPress={() => {this.props.navigation.navigate('PromotionPanel')}}>
              <View style={styles.center}>
                <Image style={styles.icon}source={require('./img/promotion-button.png')}/> 
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={{flex:0.5, backgroundColor: 'white'}} underlayColor='black'
              onPress={() => {this.props.navigation.navigate('MainPanel')}}>
              <View style={styles.center}>
                <Image style={styles.icon}source={require('./img/project-button.png')}/>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={{flex:0.5, backgroundColor: 'white'}} underlayColor='black'
              onPress={() => {this.props.navigation.navigate('MainPanel')}}>
                <View style={styles.center}>
                  <Image style={styles.icon}source={require('./img/notice-button.png')}/> 
               </View>
            </TouchableHighlight>

           <TouchableHighlight style={{flex:0.5, backgroundColor: 'white'}} underlayColor='black'
              onPress={() => {this.props.navigation.navigate('MainPanel')}}>
                <View style={styles.center}>
                  <Image style={styles.icon}source={require('./img/more-option-button.png')}/> 
                </View>
          </TouchableHighlight>
          </View>
      </DrawerLayoutAndroid>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon:{
    width: 30,
    height: 30,
  },
  input: {
    fontSize: 20,
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },
  picker: {
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },
  displayText: {
    marginTop: 50,
    fontSize: 25,
    marginBottom: 30,
    marginLeft: 20,
  },
  displayText2: {
    marginTop: 35,
    fontSize: 25,
    marginBottom: 30,
    marginLeft: 20,
  },
});