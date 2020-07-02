import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { red } from "ansi-colors";
export class NovelDetailComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }
  async componentDidMount() {}
  render() {
    if (!!!this.props.item) return <></>;
    return (
      <TouchableOpacity onPress={this.props.onClick}>
        <View style={styles.container} key={this.props.item.Id}>
          <View style={styles.left}>
            <Image
              style={{ width: 70, height: 100, borderRadius: 5 }}
              source={{ uri: this.props.item.Image }}
            ></Image>
          </View>
          <View style={styles.right}>
            <Text style={{}}>{this.props.item.Name}</Text>
            <Text style={{ color: "#b3b3b3", fontSize: 12 }}>
              {this.props.item.Author}
            </Text>
            <Text numberOfLines={2} style={{ fontSize: 12 }}>
              {this.props.item.Summary}
            </Text>
            <View style={styles.statusBox}>
              <Text
                style={{ alignSelf: "center", color: "#2ae8bf", fontSize: 12 }}
              >
                {this.props.item.Continue === "1" ? "Đang ra" : "Full"}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10
  },
  left: {
    width: "20%"
  },
  right: {
    width: "70%",
    marginLeft: 10
  },
  statusBox: {
    justifyContent: "center",
    marginTop: 7,
    width: 50,
    borderStyle: "solid",
    borderWidth: 1,
    height: 25,
    borderColor: "#2ae8bf",
    borderRadius: 5
  }
});
