import React, { Component } from "react";
import {
  ImageBackground,
  StatusBar,
  Alert,
  Linking,
  TouchableOpacity,
  Image,
  View
} from "react-native";
import color from "../../theme/variables/commonColor";
import styles from "./styles";
import MIcon from "react-native-vector-icons/MaterialIcons";
import { TextInputMask } from "react-native-masked-text";
import QRCodeScanner from "react-native-qrcode-scanner";
import {Container} from "../../components"
class ScanQRCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "key3"
    };
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  onSuccess(e) {
    console.log(e);
  }
  render() {
    return (
      <Container>
        
        <View style={styles.content} padder>
          <View>
            
          </View>
          <QRCodeScanner
            style={styles.qrcode}
            showMarker={true}
            //customMarker={<View style={styles.QRframe}><Image  style={styles.QRFrameImage} source={require("../../../assets/bg/QRCodeFrame.png")} /></View> }
            checkAndroid6Permissions={true}
            bottomContent={<View ><Button transparent primary onPress={()=>this.props.navigation.goBack()}><Text>بازگشت</Text></Button></View>}
            onRead={this.onSuccess.bind(this)}
          />
        </View>
        
      </Container>
    );
  }
}

export default ScanQRCode;
