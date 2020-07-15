import React from "react";
import { ExpoLinksView } from "@expo/samples";
import { Button, Switch, Icon } from "@ant-design/react-native";
import { NovelDetailComp } from "./Component/NovelFull.js";
import { NovelPartialComp } from "./Component/NovelPartial.js";
import { NovelService } from "./Service/NovelService.js";
import * as Font from "expo-font";
import moment from "moment";
import { StackActions, NavigationActions } from "react-navigation";
const lodash = require("lodash");
import { AuthenService } from "./Service/AuthenService.js";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  RefreshControl,
  BackHandler,
  StatusBar,
} from "react-native";
import { BusService } from "./Service/BusService.js";
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    BackHandler.addEventListener("hardwareBackPress", function () {
      console.log("dsds");
      return true;
    });
    this.state = {
      isReady: false,
      data: [], // cái này xem trong log để xem kiểu dữ liệu,
      account: "",
      password: "",
    };
  }

  async componentDidMount() {
    //await NovelService.getAll()
    
    const a = await AuthenService.checkToken();
    console.log('token',a);
    if(a) {
      this.props.navigation.navigate("Settings")
      return;
    }
    this.reLoad();
  }
  reLoad = async () => {
    this.setState({ isReady: false });

    this.setState({ isReady: true });
  };

  viewMap = () => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const locate = this.state.data.FirstLocate.split(",");
    const latLng = `${locate[0]},${locate[1]}`;
    const label = this.state.data.FirstLocateName;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    console.log("sdsd");
    Linking.openURL(url);
  };

  viewDetai = () => {
    this.props.navigation.navigate("Details", {
      Id: 1,
      Route: this.state.data,
    });
  };

  login = async() => {
    const result = await AuthenService.login({userName: this.state.account, password: this.state.password})
    console.log(result);
    if(result){
      console.log(result);
      AuthenService.storeToken(result.accessToken);
      this.props.navigation.navigate("Home")
    }
  }

  render() {
    const data = this.state.data;
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Bus Booking</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Account..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ account: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.login();

          }}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

LoginScreen.navigationOptions = {
  title: null,
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});
