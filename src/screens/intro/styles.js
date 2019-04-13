const React = require("react-native");
const { Dimensions, Platform } = React;
import { Colors } from "react-native-paper";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  slideContainer: {
    flex: 1,
    justifyContent: "center"
  },
  textContainer:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  slide1_cloudIcon: { position: "absolute", top: 20, alignSelf: "center" },
  slide1_user_tie: {
    position: "absolute",
    top: hp('31%'),
    left: wp('55%'),
    width: wp('27%'),
    height: hp('15%')
  },
  slide1_user_clock: { position: "absolute", top: hp('31%'), right: wp('55%') },
  headerText: { color: Colors.grey200, fontSize: hp('2.7%'), marginBottom: hp('1%') },
  descriptionText: {
    color: Colors.grey300,
    fontSize: hp('2%'),
    padding: hp('2%'),
    textAlign: "center"
  },
  slide2_wifiIcon: { position: "absolute", top: 40, alignSelf: "center" },
  slide2_bluetooth: {
    position: "absolute",
    top: hp('28%'),
    left: wp('63%'),
    width: wp('27%'),
    height: hp('15%')
  },
  slide2_markIcon: { position: "absolute", top: hp('34%'), right: wp('69%') },
  slide2_deviceIcon: { position: "absolute", bottom: hp('3%'), alignSelf: "center" },
};
