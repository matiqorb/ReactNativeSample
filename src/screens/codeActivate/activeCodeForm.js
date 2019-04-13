import React, { Component } from "react";
import { View } from "react-native";
import { Text, Colors ,withTheme} from "react-native-paper";
import { Indicator } from "../../components";
import { Field, reduxForm } from "redux-form";
import LottieView from "lottie-react-native";

import { ReduxTextInput } from "../../Fields";
import styles from "./styles";

class ActiveCodeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submited: false
    };
  }
  async componentWillMount() {}
  onTextChanged = text => {
    if (text.length == 4 && !this.state.submited) {
      this.state.submited = true;
      setTimeout(() => {
        const submitter = this.props.handleSubmit(this.props.onSubmit);
        submitter();
      }, 0);
    } else this.state.submited = false;
  };
  render() {
    const {theme} =this.props;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.deepPurple500,
            marginBottom:15
          }}
        >
          <View style={{ width: 180, height: 180,margin:15}}>
            <LottieView
              hardwareAccelerationAndroid
              resizeMode="contain"
              loop={true}
              autoPlay={true}
            />
          </View>
          <View style={{marginBottom: 5}}>
          <Text style={{ textAlign: "center",color:"white" }}>{this.props.phoneNumber}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {!this.props.isLoading ? (
            <Field
              onChange={(e, val) => this.onTextChanged(val)}
              label={null}
              style={{ flexDirection: "row-reverse" }}
              name="activationCode"
              component={ReduxTextInput}
              validate={[]}
              inputProps={{
                keyboardType: "numeric",
                maxLength: 4,
                placeholder: "XXXX",
                style: { textAlign: "center" },
                label: "",
                affixTextStyle: { color: "red" }
              }}
              errorProps={{}}
            />
          ) : (
            <Indicator color={theme.colors.indicatorColor}/>
            
          )}
        </View>
      </View>
    );
  }
}
export default reduxForm({
  form: "ActiveCode"
})(withTheme(ActiveCodeForm));
