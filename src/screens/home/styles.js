const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  linearGradient: {
    flex: 2,
    
    
  },
  barStyle:{
    shadowRadius: 2,
    shadowColor: "#000000",
    elevation: 3,
    margin: 7,
    marginTop: 0,
    bottom: 8,
    left:4,
    right:4,
    height: 56,
    borderRadius: 5,
    borderWidth: 0,
    position: 'absolute'
  },
  bottomNavigationStyle:{
    backgroundColor: "white"
  }
};
