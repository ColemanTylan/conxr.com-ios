import React, { useEffect } from 'react';
import { Easing, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './screen/login';
import { Icon } from 'native-base';
import CreateAccount from './screen/createaccount';
import Home from './screen/home';
import Forget from './screen/forget';
import Inbox from './screen/inobx';
import Profile from './screen/profile';
import CardPost from './Componets/CardPost';
import Chat from './screen/chat';
import Initial from './screen/inital';
import { useDispatch, useSelector } from 'react-redux';
import AuthAction from './store/actions/auth';
import AsyncStorage from '@react-native-community/async-storage';
import AddFriend from './screen/AddFirends';
import Friend from './screen/friend';
import CookieManager from '@react-native-community/cookies';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 500,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 500,
    easing: Easing.linera,
  },
};

function LoginStack() {
  const count = useSelector((state) => state);

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        TransitionSpecs: { open: config, close: closeConfig },
      }}
      initialRouteName="Iniital"
      headerMode="float"
    // headerMode="none"
    >
      <Stack.Screen
        name="Iniital"
        component={Initial}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Forget"
        component={Forget}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function yStack({ navigation, route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        // gestureEnabled: true,
        // gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        TransitionSpecs: { open: config, close: closeConfig },
      }}
      initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
    d
        name="CardPost"
        component={CardPost}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddFreind"
        component={AddFriend}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Freind"
        component={Friend}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack({ navigation, route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        // gestureEnabled: true,
        // gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        TransitionSpecs: { open: config, close: closeConfig },
      }}
      initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AddFreind"
        component={AddFriend}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Freind"
        component={Friend}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function InboxStack({ navigation, route }) {
  if (route.state && route.state.index == 1) {
    navigation.setOptions({ tabBarVisible: false });
  } else if (route.state && route.state.index == 2) {
    navigation.setOptions({ tabBarVisible: false });
  } else if (route.state && route.state.index == 0) {
    navigation.setOptions({ tabBarVisible: true });
  } else if (route.state == undefined) {
    navigation.setOptions({ tabBarVisible: true });
  } else {
    navigation.setOptions({ tabBarVisible: false });
  }
  return (
    <Stack.Navigator
      screenOptions={{
        // gestureEnabled: true,
        // gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        TransitionSpecs: { open: config, close: closeConfig },
      }}
      initialRouteName="InboxScreen">
      <Stack.Screen
        name="InboxScreen"
        component={Inbox}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ChatScreen"
        component={Chat}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const BottomTab = ({ navigation, route }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{

        showLabel: false,
        labelStyle: {
          fontSize: 15,
          margin: 0,
          padding: 0,
        },

        style: {
          //----------add this line------------------------//

          height: 44,
        },
      }}>
      <Tab.Screen
        name="Inbox"
        component={InboxStack}
        options={({ route }) => ({
          headerShown: false,
          tabBarLabel: 'Inbox',

          tabBarIcon: ({ color, size }) => {
            return (
              <Image
                resizeMode={'contain'}
                source={require('../assets/logo.png')}
                style={
                  //----------add this line------------------------//

                  { height: 44 }
                }
              />
            );
          },
        })}
      />
      <Tab.Screen
        name="Home"
        component={yStack}
        options={{
          showLabel: false,

          headerShown: false,
          tabBarLabel: 'Home',

          tabBarIcon: ({ color, size }) => {
            return (
              <Icon
                name={'home'}
                type={'SimpleLineIcons'}
                style={{
                  color: color,
                  fontSize: 30,
                  margin: 5,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => {
            return (
              <Icon
                name={'user'}
                type={'AntDesign'}
                style={{
                  color: color,
                  fontSize: 30,
                  margin: 5,
                }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

function Navigation(props) {
  var dispatch = useDispatch();

  const data = useSelector((state) => state.AuthReducer.userdata);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await AsyncStorage.getItem('token');
      const responce1 = await AsyncStorage.getItem('userData');
      const cookies = await AsyncStorage.getItem('cookies');

      // AsyncStorage.setItem('token', success.data.key);
      // AsyncStorage.setItem('userData', JSON.stringify(val.data[0]));
      // ...text-14" ><strong>Discount 50%
      if (response && responce1) {
        var value = JSON.parse(responce1);
       
        dispatch(
          AuthAction.userLoginDirect({ usertoken: response, userdata: value ,cookies}),
        );
      }
 
    }
    fetchData();
  }, []);
  return (
    <NavigationContainer>
      {data == '' ? <LoginStack /> : <BottomTab />}
      {/* <BottomTab /> */}
    </NavigationContainer>
  );
}

export default Navigation;
