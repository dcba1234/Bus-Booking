import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginLeft:10,
        marginRight:10,
        marginTop:20,
    },
    hotlist:{
      marginTop:10,
      flexDirection:'row',
      justifyContent:'space-between'
    },
    containerHeader: {
      flexDirection: "row",
      marginTop: 50,
      marginLeft: 10,
    },
    left: {
      width: "20%"
    },
    right: {
      width: "70%",
      marginLeft: 20
    },
    statusBox: {
      justifyContent: "center",
      marginTop: 25,
      width: 50,
      borderStyle: "solid",
      borderWidth: 1,
      height: 25,
      borderColor: "#2ae8bf",
      borderRadius: 5
    }

})