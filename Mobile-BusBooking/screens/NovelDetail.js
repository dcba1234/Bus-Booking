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
import { Linking } from "react-native";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  StatusBar,
} from "react-native";
import styles from "../Css/HomeScreen";
import { MonoText } from "../components/StyledText";
import moment from "moment";
const lodash = require("lodash");

export default class NovelDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      data: null, // cái này xem trong log để xem kiểu dữ liệu
    };
  }

  async componentDidMount() {
    this.reLoad();
  }

  reLoad = async () => {
    this.setState({ isReady: false }); // await NovelService.getAllChap()
    let route = this.props.navigation.getParam("Route", "NO-ID");
    console.log("helo", route);

    this.setState({
      isReady: true,
      data: route,
    });
  };

  viewMap = (label, locate) => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    // const locate = this.props.navigation
    //   .getParam("Route", "NO-ID")
    //   .FirstLocate.split(",");
    // const latLng = `${locate[0]},${locate[1]}`;
    // const label = this.props.navigation.getParam("Route", "NO-ID")
    //   .FirstLocateName;
    const url = Platform.select({
      ios: `${scheme}${label}@${locate}`,
      android: `${scheme}${locate}(${label})`,
    });

    console.log("sdsd");
    Linking.openURL(url);
  };

  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const currentItem = navigation.getParam("Route", "NO-ID");
    return (
      <>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View
          style={{
            height: 40,
            marginTop: 20,
            marginLeft: 10,
            width: "100%",
            flexDirection: "row",
          }}
        >
          <Icon name="car" size="lg" color="#1890ff" />
          <Text style={{ fontSize: 21, color: "#1890ff" }}>
            {" "}
            Bus information
          </Text>
        </View>
        <View
          style={{
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
        >
          <Text>Hotline: 19004543925</Text>
          <Text style={{ fontSize: 18 }}>
            {currentItem.FirstLocateName} - {currentItem.EndLocateName}
          </Text>
        </View>
        <View style={{ height: "100%", marginTop: 15, paddingBottom: 17 }}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={!this.state.isReady}
                onRefresh={() => {
                  this.reLoad();
                }}
              />
            }
          >
            <View style={{ height: "100%" }}>
              <View style={{ margin: 10, borderBottomColor: "#ccc" }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {moment(currentItem.DepartureTime).format("HH:mm")}
                </Text>
                <Text style={{ fontSize: 18 }}>
                  {currentItem.FirstLocateName}
                </Text>
                <Text style={{ fontSize: 18 }}>
                  Parking description: {currentItem.ParkingLot}
                </Text>
                <Text style={{ fontSize: 18 }}>
                  Parking fee: {currentItem.ParkingFee} vnd
                </Text>
                <Text onPress={(e) => this.viewMap(currentItem.FirstLocateName, currentItem.FirstLocate)} style={{ fontSize: 18 , color:'#1890ff'}}>View map &gt;&gt;</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignContent: "center",
                  flexDirection: "row",
                }}
              >
                <Icon 
                  style={{ margin: "auto" }}
                  name="arrow-down"
                  size="lg"
                  color="#1890ff"
                />
              </View>
              {this.state.data &&
                this.state.data.locates.map((item,index) => (
                  <View key= {index}>
                    <View
                      style={{
                        padding: 10,
                      }}
                    >
                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {moment(item.ArriveTime).format("HH:mm")}
                      </Text>
                      <Text style={{ fontSize: 18 }}>
                        {item.Name}
                      </Text>
                      <Text onPress={(e) => this.viewMap(item.Name, item.Locate)} style={{ fontSize: 18 , color:'#1890ff'}}>View map &gt;&gt;</Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        alignContent: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Icon
                        style={{ margin: "auto" }}
                        name="arrow-down"
                        size="lg"
                        color="#1890ff"
                      />
                    </View>
                  </View>
                ))}

              <View
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {moment(currentItem.ArriveTime).format("HH:mm")}
                </Text>
                <Text style={{ fontSize: 18 }}>
                  {currentItem.EndLocateName}
                </Text>
                <Text onPress={(e) => this.viewMap(currentItem.EndLocateName, currentItem.EndLocate)} style={{ fontSize: 18 , color:'#1890ff'}}>View map &gt;&gt;</Text>
              </View>

              <View
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "bold" }}
                >{`17:30`}</Text>
                <Text style={{ fontSize: 18 }}>
                  Departure Time in the afternoon{" "}
                </Text>
              </View>

            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

NovelDetail.navigationOptions = {
  header: null,
};

// <View
//             style={{
//               width: "100%",
//               height: "auto",
//               position: "relative",
//               borderBottomColor: "#00000029",
//               borderBottomWidth: 0.5
//             }}
//           >
//             <Image
//               style={{ width: "100%", height: 150, position: "absolute" }}
//               resizeMode="cover"
//               blurRadius={4}
//               source={{ uri: currentItem.Image }}
//             />
//             <TouchableOpacity
//               onPress={() => {
//                 navigate("Home");
//               }}
//             >
//               <Icon
//                 name="arrow-left"
//                 size="md"
//                 style={{ marginTop: 25, marginLeft: 10 }}
//                 color="#fff"
//               />
//             </TouchableOpacity>
//             <View style={styles.containerHeader}>
//               <View style={styles.left}>
//                 <Image
//                   style={{ width: 70, height: 100, borderRadius: 5 }}
//                   source={{ uri: currentItem.Image }}
//                 ></Image>
//               </View>
//               <View style={styles.right}>
//                 <Text
//                   style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
//                 >
//                   {currentItem.Name}
//                 </Text>
//                 <Text
//                   style={{ color: "white", fontWeight: "bold", fontSize: 13 }}
//                 >
//                   {currentItem.Author}
//                 </Text>
//                 <View style={styles.statusBox}>
//                   <Text
//                     style={{
//                       alignSelf: "center",
//                       color: "#1890ff",
//                       fontSize: 12
//                     }}
//                   >
//                     {currentItem.Continue === "1" ? "Đang ra" : "Full"}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//             <Text style={{ margin: 10, color: "#b3b3b3" }}>
//               {currentItem.Summary}
//             </Text>
//           </View>

//           <View style={styles.container}>
//             <View style={{ flexDirection: "row" }}>
//               <Icon name="menu" size="md" color="#b3b3b3" />
//               <Text> Mục lục</Text>
//             </View>
//             <View>
//               {this.state.listChap.map((item, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() => {
//                     this.props.navigation.navigate("ChapDetail", {
//                       Chap: item
//                     });
//                   }}
//                 >
//                   <View style={{ marginBottom: 5, marginTop: 5 }}>
//                     <Text>{`Chương ${item.Chap}: ${item.Name}`}</Text>
//                   </View>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
