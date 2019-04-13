import React, { Component } from "react";
import { View } from "react-native";
import {
  View as AnimatedView,
  createAnimatableComponent
} from "react-native-animatable";
import { Text as SimpleText, Colors } from "react-native-paper";
import { Icon as SimpleIcon } from "../../components";
import styles from "./styles";

const Icon = createAnimatableComponent(SimpleIcon);
const Text = createAnimatableComponent(SimpleText);
class Slide1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { index, isOnTransition } = this.props;
    const isShow=index==0;
    if (!isOnTransition && !isShow) return null;
    return (
      <AnimatedView
        style={styles.slideContainer}
        isOnTransition
        animation={
          isOnTransition && isShow ? "zoomOut" : isShow ? "fadeIn" : ""
        }
        duration={isOnTransition && isShow ? 600 : isShow ? 50 : 0}
        useNativeDriver
      >
        <View style={styles.slideContainer}>
          <AnimatedView
            animation="fadeIn"
            duration={1000}
            useNativeDriver
            style={{ position: "absolute", top: 5 }}
          >
            <Icon
              type="MaterialIcons"
              name="fingerprint"
              color="white"
              fontSize={380}
              style={{ opacity: 0.05 }}
            />
          </AnimatedView>
          <Icon
            animation="zoomIn"
            useNativeDriver
            type="MaterialCommunityIcons"
            name="cloud-sync"
            color={Colors.white}
            duration={700}
            fontSize={180}
            style={styles.slide1_cloudIcon}
          />
          <Icon
            animation="fadeInLeft"
            useNativeDriver
            type="FontAwesome5"
            name="user-tie"
            color={Colors.white}
            delay={250}
            fontSize={85}
            style={styles.slide1_user_tie}
          />
          <Icon
            animation="fadeInRight"
            useNativeDriver
            type="FontAwesome5"
            name="user-clock"
            color={Colors.white}
            delay={300}
            fontSize={70}
            style={styles.slide1_user_clock}
          />
        </View>
        <View style={styles.textContainer}>
          <Text
            animation="bounceIn"
            useNativeDriver
            duration={1000}
            delay={100}
            style={styles.headerText}
          >
          </Text>
          <Text
            animation="fadeIn"
            useNativeDriver
            duration={1000}
            delay={500}
            style={styles.descriptionText}
          >
          </Text>
        </View>
      </AnimatedView>
    );
  }
}
export default Slide1;
