import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {  Icon } from '@ant-design/react-native';
import TabBarIcon from '../components/TabBarIcon';
import {HomeScreen} from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NovelDetail from '../screens/NovelDetail'
import ChapDetail from '../screens/ChapDetail'
import * as Font from "expo-font";
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});
 Font.loadAsync(
  "antoutline",
  require("../node_modules/@ant-design/icons-react-native/fonts/antoutline.ttf")
);
 Font.loadAsync(
  "antfill",
  require("../node_modules/@ant-design/icons-react-native/fonts/antfill.ttf")
);
export const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: NovelDetail,
    ChapDetail,
  },
  config
);


HomeStack.navigationOptions = {
  tabBarLabel: 'Trang chủ',
  tabBarIcon: ({ focused }) => (
    // <TabBarIcon
    //   focused={focused}
    //   name={
    //     Platform.OS === 'ios'
    //       ? `ios-information-circle${focused ? '' : '-outline'}`
    //       : 'md-information-circle'
    //   }
    // />
    <Icon name="home" size="md" color={focused? '#2f95dc' : '#ccc'} />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'My Route',
  tabBarIcon: ({ focused }) => {
    return(
    //#ccc #2f95dc<Icon type="" />
    
    <Icon name="appstore" size="md" color={focused? '#2f95dc' : '#ccc'} />
  )}
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Thông tin',
  tabBarIcon: ({ focused }) => (
    <Icon name="info-circle" size="md" color={focused? '#2f95dc' : '#ccc'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,

});

tabNavigator.path = '';

export default tabNavigator;
