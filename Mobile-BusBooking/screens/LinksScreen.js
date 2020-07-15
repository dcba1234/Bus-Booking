import React from "react";
import { ExpoLinksView } from "@expo/samples";
import { Button, Switch, Icon } from "@ant-design/react-native";
import { NovelDetailComp } from "./Component/NovelFull.js";
import { NovelPartialComp } from "./Component/NovelPartial.js";
import { NovelService } from "./Service/NovelService.js";
import * as Font from "expo-font";
import {  Linking } from "react-native";
import moment from 'moment'
const lodash = require("lodash");
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  StatusBar,
} from "react-native";
import { BusService } from "./Service/BusService.js";
export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      data: [], // cái này xem trong log để xem kiểu dữ liệu
    };
  }
  async componentDidMount() {
    //await NovelService.getAll()
    this.reLoad();
  }
  reLoad = async () => {
    this.setState({ isReady: false });
    let data = await BusService.getMyBusRoute();
    
    console.log(data);

    this.setState({ isReady: true, data });
  };

  viewMap = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const locate = this.state.data.FirstLocate.split(',');
    const latLng = `${locate[0]},${locate[1]}`;
    const label = this.state.data.FirstLocateName;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    console.log('sdsd')
    Linking.openURL(url); 
  }

  viewDetai = () => {
    this.props.navigation.navigate("Details", {
      Id: 1,
      Route: this.state.data
    });
  }

  render() {
    const data = this.state.data;
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={!this.state.isReady}
            onRefresh={() => {
              this.reLoad();
            }}
          />
        }
      >
        <View style={{ height: 40, width: "100%", flexDirection: "row" }}>
          <Icon name="read" size="lg" color="#2ae8bf" />
          <Text style={{ fontSize: 21, color: "#2ae8bf" }}> My Route</Text>
        </View>
        <View
          style={{
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Route Title
          </Text>
          <Text style={{ fontSize: 18 }}>{data.Name}</Text>
          <Text onPress={(e) => this.viewDetai()} style={{ fontSize: 18 , color:'#1890ff'}}>View Detail &gt;&gt;</Text>
        </View>
        <View
          style={{
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            From
          </Text>
          <Text style={{ fontSize: 18 }}>{data.FirstLocateName}</Text>
        </View>
        <View
          style={{
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            To
          </Text>
          <Text style={{ fontSize: 18 }}>{data.EndLocateName}</Text>
        </View>

        <View
          style={{
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Departure Time
          </Text>
          <Text style={{ fontSize: 18 }}>{moment(data.DepartureTime).format('HH:mm')}</Text>
        </View>

        <View
          style={{
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Arrive Time
          </Text>
          <Text style={{ fontSize: 18 }}>{moment(data.ArriveTime).format('HH:mm')}</Text>
        </View>
        <View
          style={{
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Parking
          </Text>
          <Text style={{ fontSize: 18 }}>{data.ParkingLot}</Text>
        </View>
        <View
          style={{
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Parking Fee
          </Text>
          <Text style={{ fontSize: 18 }}>{data.ParkingFee}vnd</Text>
        </View>
        <View
          style={{
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Bus
          </Text>
          <Text style={{ fontSize: 18 }}>{data.busNumber} - {data.busType}</Text>
        </View>
        <View
          style={{
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Seat
          </Text>
          <Text style={{ fontSize: 18 }}>{data.maxSeat}</Text>
        </View>
        <View
          style={{
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Driver Name
          </Text>
          <Text style={{ fontSize: 18 }}>{data.driverName}</Text>
        </View>

      </ScrollView>
    );
  }
}

LinksScreen.navigationOptions = {
  title: null,
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 17,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    marginTop: 35,
  },
});
