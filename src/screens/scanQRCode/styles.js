const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  qrcode: {
    flex: 1
  },
  QRframe: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  QRFrameImage:{
    height: 300,
    width: 300,
    borderWidth: 2,
    backgroundColor: 'transparent'
  }
};
