import React, {Component} from 'react';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager,LoginButton } from 'react-native-fbsdk';
import{
    Alert,
    StyleSheet,
    ScrollView,
    View,
    TouchableHighlight,
    Image,
    Text,
}from 'react-native';

type Props ={};
export default class ProjectDetailPanel extends Component<Props> {
    static navigationOptions ={
        title:'Login Methods',
    };

    constructor(props){
        super(props)

        this.state={
            
        };
    }

    componentDidMount() {
        GoogleSignin.configure({
          //It is mandatory to call this method before attempting to call signIn()
          scopes: ['https://www.googleapis.com/auth/drive.readonly'],
          offlineAccess: true,
          forceConsentPrompt: true,
          // Replace with your webClientId generated from Firebase console
          webClientId:
            '154668967750-0fvipu1hjngo2850ipiuc60sk26f44h1.apps.googleusercontent.com',
        });
      }

    handleSignUp = () => {
        GoogleSignin.signIn()
        .then((data) => {
          // Create a new Firebase credential with the token
          const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
          // Login with the credential
          return firebase.auth().signInWithCredential(credential);
        })
        .then((user) => {
          this.props.navigation.navigate('MainPanel');
        })
        .catch((error) => this.setState({ errorMessage: error.message }))
    }

    onLoginOrRegister = () => {
        LoginManager.logInWithReadPermissions(['public_profile','email','user_birthday'])
          .then((result) => {
            if (result.isCancelled) {
              return Promise.reject(new Error('The user cancelled the request'));
            }
            // Retrieve the access token
            return AccessToken.getCurrentAccessToken();
          })
          .then((data) => {
            // Create a new Firebase credential with the token
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            // Login with the credential
            return firebase.auth().signInWithCredential(credential);
          })
          .then((user) => {
            this.props.navigation.navigate('MainPanel');
          })
          .catch((error) => {
            const { code, message } = error;
            // For details of error codes, see the docs
            // The message contains the default Firebase string
            // representation of the error
          });
      }
    static navigationOptions = {header: null};
    render(){
        return (
            <ScrollView style={styles.container}>
            {/* {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
                {this.state.errorMessage}
            </Text>} */}

            <View style={styles.center}>

            <TouchableHighlight style={{backgroundColor: 'white'}} underlayColor='white'
                onPress={() => {this.props.navigation.navigate('CreateAccount')}}>
                <Image style={{ width: 350,height: 160}}source={require('./img/sign-up-button.png')}/>  
            </TouchableHighlight>

            <Image style={{width: 350,height: 46}}source={require('./img/or.png')}/>  

            <TouchableHighlight style={{flex:1, backgroundColor: 'white'}} underlayColor='white'
                onPress={() => this.handleSignUp()}>
                <Image style={{width: 350,height: 160}}source={require('./img/google-signin-button.png')}/>  
            </TouchableHighlight>
            
            <Image style={{width: 350,height: 46}}source={require('./img/or.png')}/>  
             
            <TouchableHighlight style={{flex:1, backgroundColor: 'white'}} underlayColor='white'
                onPress={() =>this.onLoginOrRegister()}>
                <Image style={{width: 350,height: 140}}source={require('./img/fbloginbtn.png')}/>  
            </TouchableHighlight>
            
            </View>
            
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    center:{
        justifyContent:'center',
        alignItems:'center',
    },
});