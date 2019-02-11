import React, { Component } from 'react'
import firebase from 'react-native-firebase'
import MapView,{ PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {
  Alert,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  DrawerLayoutAndroid,
  TouchableHighlight,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import DrawerScreen from './DrawerScreen.js';
import {
  InputWithLabel,
  PickerWithLabel,
  AppButton,
} from './UI';

let humanIcon = require('./img/standing-man.png');

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

type Props = {};

async function requestLocationPermission(){
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Geolocation Permission Required',
        'message': 'This app needs to access your device location',
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission granted');
    }
    else {
      console.log('Location permission denied');
    }
    return granted;
  }
  catch (err) {
    console.warn(err);
  }
}

export default class MainPanel extends Component<Props> {
  static navigationOptions = {
    headerLeft: null,
    title:'SET',
  };

  constructor(props) {
    super(props)

    this.state = {
      currentUser: null,
      granted: PermissionsAndroid.RESULTS.DENIED,
      region :{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markers:[
        {
          coordinates: {
            latitude: 37.4105,
            longitude: -122.084,
          },
          title: 'Edward',
          description: 'Testing112',
        },
        {
          coordinates: {
            latitude: 37.4109,
            longitude: -122.084,
          },
          title: 'Jackson',
          description: 'Testing 12',
        },
      ]
    }

    this.onRegionChange = this.onRegionChange.bind(this);
  }


  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })

    let granted = requestLocationPermission();

    this.setState({
      granted: granted,
    });

    if(granted){
      this.readLocation();
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  readLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        };
        this.setState({region});
      },
      (error) => console.log(error.message),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000
      }
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({position});
      console.log(position);
    });

  }

  render() {
    const { currentUser } = this.state
    return (
       <DrawerLayoutAndroid
        ref={'MyDrawer'}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() =>
          <DrawerScreen />
        }
      >
        <ScrollView style={styles.container}>
        <View styles={styles.mapContainer}>
          <MapView
            showsUserLocation={true}
            showsMyLocationButton={true}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={this.state.region}
            followUserLocation={true}
          >
            {this.state.markers.map(marker =>(
              <Marker
                coordinate={marker.coordinates}
                title={marker.title}
                description={marker.description}
                //image={require('./img/standing-man.png')}
                onCalloutPress={()=> ToastAndroid.show(marker.title+' is Pressed!', ToastAndroid.SHORT)}
              />
            ))}
          </MapView>
        </View>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>

          <View style={{flex:1, flexDirection: 'row',paddingTop:15}}>

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
              onPress={() => {this.props.navigation.navigate('ProjectDetailsPanel')}}>
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
        </ScrollView>
      </DrawerLayoutAndroid>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: 500,
    height: 480,
  },
  icon:{
    width: 30,
    height: 30,
  },
  center:{
    justifyContent: 'center',
    alignItems: 'center',
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
  mapContainer: {
    flex: 1,
  },
  map: {
    height:400,
    width:400,
  },
});
