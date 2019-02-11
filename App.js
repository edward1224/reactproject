import {
  createStackNavigator,
  createAppContainer,
  } from 'react-navigation';
  import LoginScreen from './LoginScreen';
  import CreateAccount from './CreateAccount';
  import MainPanel from './MainPanel';
  import PromotionPanel from './PromotionPanel';
  import ProjectDetailsPanel from './ProjectDetailsPanel';
  import LoginMethods from './LoginMethods';
  console.disableYellowBox = true;
  const AppNavigator = createStackNavigator({
    Login: {
      screen: LoginScreen,
    },
    CreateAccount: {
      screen: CreateAccount,
    },
    MainPanel: {
      screen: MainPanel,
    },
    PromotionPanel: {
      screen: PromotionPanel,
    },
    ProjectDetailsPanel:{
      screen: ProjectDetailsPanel,
    },
    LoginMethods:{
      screen: LoginMethods,
    }
  }, {
    initialRouteName: 'Login',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  });
  
  export default createAppContainer(AppNavigator);
  