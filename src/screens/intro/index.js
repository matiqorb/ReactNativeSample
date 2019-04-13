import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { createAnimatableComponent } from "react-native-animatable";
import { IconButton as SimpleIconButton } from "react-native-paper";
import { Icon } from "../../components";
import { TabView} from "react-native-tab-view";
import Slide1 from "./slide1";
import Slide2 from "./slide2";
import Slide3 from "./slide3";
const IconButton = createAnimatableComponent(SimpleIconButton);
class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      showRegister: false,
      slideNumber: 0,
      index: 0,
      routes: [
        { key: "Slide1", title: "First" },
        { key: "Slide2", title: "Second" },
        { key: "Slide3", title: "Second" }
      ],
      isOnTransition: false
    };
  }

  _onDone = () => {
    this.setState({ isOnTransition: true });
    setTimeout(() => {
      this.props.navigation.navigate("Register");
    }, 0);
  };
  onNextSlide(index) {
    if (index < 2) {
      this.setState({ isOnTransition: true });
      setTimeout(() => {
        this.setState({ index: ++index, isOnTransition: false });
      }, 500);
    }
  }
  onPreviousSlide(index) {
    if (index > 0) {
      this.setState({ isOnTransition: true });
      setTimeout(() => {
        this.setState({ index: --index, isOnTransition: false });
      }, 500);
    }
  }
  render() {
    const { index } = this.state;
      return (
        // <AppIntroSlider
        //   slides={slides}
        //   renderDoneButton={this._renderDoneButton}
        //   renderNextButton={this._renderNextButton}
        //   onDone={this._onDone}
        // />
        <View style={{ flex: 1 }}>
          <LottieView
            ref={ref => (this.wifiAnimation = ref)}
            hardwareAccelerationAndroid={true}
            resizeMode="cover"
            speed={0.3}
            source={require("../../../assets/lottie/gradient_animated_background.json")}
            loop={true}
            autoPlay={true}
          />
          <TabView
            animationEnabled={false}
            configureTransition={() => null}
            renderTabBar={() => null}
            navigationState={this.state}
            renderScene={({ route, jumpTo }) => {
              switch (route.key) {
                case "Slide1":
                  return (
                    <Slide1
                      jumpTo={jumpTo}
                      navigation={this.props.navigation}
                      index={this.state.index}
                      isOnTransition={this.state.isOnTransition}
                    />
                  );
                case "Slide2":
                  return (
                    <Slide2
                      jumpTo={jumpTo}
                      navigation={this.props.navigation}
                      index={this.state.index}
                      isOnTransition={this.state.isOnTransition}
                    />
                  );
                case "Slide3":
                  return (
                    <Slide3
                      jumpTo={jumpTo}
                      navigation={this.props.navigation}
                      index={this.state.index}
                      isOnTransition={this.state.isOnTransition}
                    />
                  );
              }
            }}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height
            }}
            onSwipeEnd={() => {
              this.setState({ index: this.state.index });
            }}
          />
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              height: 90,
              bottom: 0,
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <IconButton
              animation={index > 0 ? "zoomIn" : "zoomOut"}
              useNativeDriver
              icon={() => (
                <Icon
                  color="white"
                  type="SimpleLineIcons"
                  name="arrow-right"
                  fontSize={30}
                />
              )}
              style={{ width: 70 }}
              onPress={() => this.onPreviousSlide(index)}
            />

            {index < 2 ? (
              <IconButton
                animation={index < 2 ? "zoomIn" : "zoomOut"}
                useNativeDriver
                delay={index == 2 ? 100 : 300}
                icon={() => (
                  <Icon
                    color="white"
                    type="SimpleLineIcons"
                    name="arrow-left"
                    fontSize={30}
                  />
                )}
                style={{
                  width: 50,

                  alignSelf: "center"
                }}
                onPress={() => this.onNextSlide(index)}
                color="white"
              />
            ) : (
              <IconButton
                animation="zoomIn"
                delay={300}
                useNativeDriver
                icon={() => (
                  <Icon
                    color="white"
                    type="Ionicons"
                    name="md-checkmark-circle"
                    fontSize={60}
                  />
                )}
                style={{
                  width: 70,

                  margin: 5
                }}
                onPress={() => this._onDone()}
                color="white"
              />
            )}
          </View>
        </View>
      );
    }
}
export default Intro;
