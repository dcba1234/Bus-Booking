import * as WebBrowser from "expo-web-browser";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Button, Switch, Icon } from "@ant-design/react-native";
import { NovelDetailComp } from "./Component/NovelFull.js";
import { NovelPartialComp } from "./Component/NovelPartial.js";
import React from "react";
import { NovelService } from "./Service/NovelService.js";
import { createStackNavigator } from "react-navigation-stack";
import { StackNavigator, createAppContainer } from "react-navigation";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  StatusBar
} from "react-native";
import styles from "../Css/HomeScreen";
import { MonoText } from "../components/StyledText";

const lodash = require("lodash");

export default class ChapDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      listChap: [] // cái này xem trong log để xem kiểu dữ liệu
    };
  }

  async componentDidMount() {
    this.reLoad();
  }

  reLoad = async () => {};

  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const currentItem = navigation.getParam("Chap", "NO-ID");
    return (
      <ScrollView style={{marginLeft:10,marginRight: 10,paddingBottom:17}}>
        <StatusBar hidden={true}/>
        <TouchableOpacity
          onPress={() => {
            navigate("Home");
          }}
        >
          <Icon
            name="arrow-left"
            size="md"
            style={{ marginTop: 25, marginLeft: 10 }}
            color="#fff"
          />
        </TouchableOpacity>
        <Text>{`CHƯƠNG ${currentItem.Chap} : ${currentItem.Name.toUpperCase()}`}</Text>
        <Text>{currentItem.Content}</Text>
      </ScrollView>
    );
  }
}

ChapDetail.navigationOptions = {
  header: null
};
