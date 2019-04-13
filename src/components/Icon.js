import * as React from "react";
import { StyleSheet, View } from "react-native";
import { withTheme } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome5Pro from "react-native-vector-icons/FontAwesome5Pro";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import Octicons from "react-native-vector-icons/Octicons";
import Zocial from "react-native-vector-icons/Zocial";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

function Icon(props) {
  const { type, style, fontSize, color,name } = props;
  const styles = StyleSheet.create({
    icon: {
      backgroundColor: "transparent",
      fontSize:fontSize?fontSize: 24,
      alignSelf: "center",
    },
    item: {
      margin: 8,
      alignItems: "center",
      justifyContent: "center"
    }
  });
  let childern;
  switch (type) {
    case "FontAwesome":
      childern = (
        <FontAwesome
          name={name}
          style={[styles.icon, { color }]}
        />
      );
      break;
      case "FontAwesome5":
      childern = (
        <FontAwesome5
          name={name}
          style={[styles.icon, { color }]}
        />
      );
      break;
      case "FontAwesome5Pro":
      childern = (
        <FontAwesome5Pro
          name={name}
          style={[styles.icon, { color }]}
        />
      );
      break;
      case "Entypo":
      childern = (
        <Entypo
          name={name}
          style={[styles.icon, { color }]}
        />
      );
      break;
      case "EvilIcons":
      childern = (
        <EvilIcons
          name={name}
          style={[styles.icon, { color }]}
        />
      );
      break;
      case "MaterialCommunityIcons":
      childern = (
        <MaterialCommunityIcons
          name={name}
          style={[styles.icon, { color }]}
        />
      );
      break;
     
    case "MaterialIcons":
      childern = (
        <MaterialIcons
          name={name}
          style={[styles.icon, { color }]}
        />
      );
      break;
      case "Ionicons":
      childern = (
        <Ionicons
          name={name}
          style={[styles.icon, { color }]}
        />
      );
      break;
      case "Foundation":
      childern = (
        <Foundation
          name={name}
          style={[styles.icon, { color }]}
        />
      );
      break;
      case "Octicons":
      childern = (
        <Octicons
          name={name}
          style={[styles.icon, { color }]}
        />
      );
      break;
      case "Zocial":
      childern = (
        <Zocial
          name={name}
          style={[styles.icon, { color }]}
        />
      );
      break;
      case "SimpleLineIcons":
      childern = (
        <SimpleLineIcons
          name={name}
          style={[styles.icon, { color }]}
        />
      );
      break;
    
  }
  return (
    <View style={[styles.item, style]} pointerEvents="box-none">
      {childern}
    </View>
  );
}

export default withTheme(Icon);

