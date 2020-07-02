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
export class NovelPartialComp extends React.Component {
  constructor(props) {
    super(props);
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
            <Text numberOfLines={1} style={{}}>
              {this.props.item.Name}
            </Text>
            <Text numberOfLines={1} style={{ color: "#b3b3b3", fontSize: 12 }}>
              {this.props.item.Author}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    marginTop: 10
  },
  left: {
    width: "20%"
  },
  right: {
    width: "100%"
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
