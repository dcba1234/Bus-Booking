import * as WebBrowser from "expo-web-browser";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Button, Switch, Icon, SearchBar,Badge } from "@ant-design/react-native";
import { NovelDetailComp } from "./Component/NovelFull.js";
import { NovelPartialComp } from "./Component/NovelPartial.js";
import React from "react";
import { NovelService } from "./Service/NovelService.js";
import { createStackNavigator } from "react-navigation-stack";
import { StackNavigator, createAppContainer } from "react-navigation";
import NovelDetail from "./NovelDetail";
import moment from 'moment'
import {
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
import { AuthenService } from "./Service/AuthenService.js";
import { BusService } from "./Service/BusService.js";

const lodash = require("lodash");

export class MyRequestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      searchValue: '',
      listRoute: [],
      listNovel: [] // cái này xem trong log để xem kiểu dữ liệu
    };
    
  }

  async componentDidMount() {
    //await NovelService.getAll()
    const a =await AuthenService.checkToken();
    console.log(a);
    if(!a) {
      this.props.navigation.navigate("Login")
      return;
    }
    let listRoute = await BusService.getMyRequest();
    console.log(listRoute);
    this.setState({ isReady: true, listRoute });
  }

  reLoad = async () => {
    this.setState({ isReady: false });
    let listRoute = await BusService.getAllBusRoute();;
    console.log(listRoute);
    this.setState({ isReady: true, listRoute });
  };

  onChange = searchValue => {
    this.setState({ searchValue });
  };

  onRouteClick = (item,index) => {
   
    
  }

  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const dataSource = this.state.searchValue.length == 0? [...this.state.listRoute] : this.state.listRoute
            .filter((i) => i.Name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) > -1 
            || i.FirstLocateName.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) > -1
            || i.EndLocateName.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) > -1
            )
    return (
      <>
      <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
      <View style={{ height: "100%",marginTop:15,paddingBottom:17 }}>
        
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
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
            <Icon name="file-done" size="lg" color="#1890ff" />
            <Text style={{ fontSize: 21, color: "#1890ff" }}> My Request</Text>
          </View>
          <View>
            <Button onPress={() => {
              this.props.navigation.navigate("Links")
            }} type="primary">My route</Button>
          </View>
          <View style={{ height: 60, width: "100%", flexDirection: "column" }}>
             <SearchBar defaultValue="" placeholder="Search by locate or name" value={this.state.value} cancelText="cancel" onChange={this.onChange}/>
          </View>
          {/* <Badge text={109} dot>
           
          </Badge> */}
          <View style={{width:'100%',borderBottomWidth:1,borderBottomColor:'#ccc', flexDirection:'row'}}>
            <Text style={{ fontSize: 16,color: "#000",width:'15%' }}> No</Text>
            <Text style={{ fontSize: 16, color: "#000",width:'55%'  }}> Status</Text>
            <Text style={{ fontSize: 16, color: "#000",width:'30%' }}> Time</Text>
          </View>
          <ScrollView 
        
              contentContainerStyle={styles.contentContainer}
          >
            {dataSource.map((item, index) => 
             <TouchableOpacity key={index} onPress={() => this.onRouteClick(item,index)}>
               <View key={index} style={{width:'100%', borderBottomWidth:1,paddingBottom:15,paddingTop:15,borderBottomColor:'#ccc',flexDirection:'row'}}>
                  <View style={{ fontSize: 16, color: "#000",width:'15%', textAlign:'left' }}><Text style={{textAlign: 'left'}}>{item.Name}</Text></View>
                  <View style={{ fontSize: 16, color: "#000",width:'53%',marginLeft:'2%', textAlign:'left' }}><Text style={{textAlign: 'left'}}>{item.Status}</Text></View>
                  <View style={{ fontSize: 16, color: "#000",width:'30%', textAlign:'left' }}><Text style={{textAlign: 'left'}}>
                    {`${moment(item.DepartureTime).format('HH:mm')} - ${moment(item.ArriveTime).format('HH:mm')}`}
                    </Text></View>
    
               </View>
             </TouchableOpacity>
           
            )}
           
          </ScrollView>
          {/* <Text style={{ fontSize: 18 }}>Truyện hot khuyên đọc</Text>
          <View>
            <NovelDetailComp
              onClick={() => {
                this.props.navigation.navigate("Details", {
                  Id: dataHot[0].Id,
                  Novel: dataHot[0]
                });
              }}
              item={dataHot[0]}
            />
          </View>
          <View style={styles.hotlist}>
            {dataHot
              .slice(1, dataHot.length > 5 ? 5 : dataHot.length)
              .filter(item => item.Hot === "1")
              .map((item, index) => (
                <NovelPartialComp
                  onClick={() => {
                    this.props.navigation.navigate("Details", {
                      Id: item.Id,
                      Novel: item
                    });
                  }}
                  key={index}
                  item={item}
                />
              ))}
          </View>
          <Text style={{ fontSize: 20,marginTop:10, fontWeight: "bold" }}>
            Nhiều người đọc
          </Text>
          {lodash
            .orderBy(
              data.map(item => {
                return { ...item, Viewer: parseInt(item.Viewer) };
              }),
              "Viewer",
              "desc"
            )
            .map((item, index) => (
              <NovelDetailComp
                onClick={() => {
                  this.props.navigation.navigate("Details", {
                    Id: item.Id,
                    Novel: item
                  });
                }}
                key={index}
                item={item}
              />
            ))}  */}
        </ScrollView> 
      </View>
      </>
    );
  }
}

MyRequestScreen.navigationOptions = {
  header: null
};
