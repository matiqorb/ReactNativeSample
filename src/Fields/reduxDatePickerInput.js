import React, { Component } from "react";
import { View, Modal,Keyboard } from "react-native";
import { TextField } from "react-native-material-textfield";
import { TouchableRipple, Appbar, withTheme } from "react-native-paper";
import { Calendar } from "react-native-general-calendars";
import {Container,Icon} from "../components";
export class ReduxDatePickerInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalendar: false
    };
  }
  render() {
    const { input, label, type, meta, theme, ...props } = this.props;
    var hasError = false;
    const {
      active,
      asyncValidating,
      autofilled,
      dirty,
      dispatch,
      error,
      form,
      initial,
      invalid,
      pristine,
      submitFailed,
      submitting,
      touched,
      valid,
      visited,
      warning
    } = meta;
    console.log("ReduxTextInput input:", { ...props });
    if (
      (error !== undefined && !active && dirty) ||
      (submitFailed && error !== undefined)
    ) {
      hasError = true;
    }
    const { hideIcon } = props;
    return (
      <TouchableRipple
        onPress={() => {
          this.inputRef.focus();
          Keyboard.dismiss();
          setTimeout(() => {
            this.setState({ showCalendar: true });
          }, 0);
        }}
      >
        <View pointerEvents="box-only">
          <TextField
            ref={ref => (this.inputRef = ref)}
            disabled={false}
            fontSize={theme.inputStyle.fontSize + 2}
            style={{
              fontFamily: theme.fonts.regular,
              color: theme.colors.text,
              fontSize: theme.inputStyle.fontSize
            }}
            labelTextStyle={{
              fontFamily: theme.fonts.regular
            }}
            titleTextStyle={{
              fontFamily: theme.fonts.regular,
              fontSize: theme.subtitleStyle.fontSize
            }}
            affixTextStyle={{
              fontFamily: theme.fonts.regular,
              fontSize: theme.subtitleStyle.fontSize
            }}
            tintColor={theme.colors.primary}
            errorColor={theme.colors.danger}
            {...input}
            {...props.inputProps}
            error={hasError ? (error == "" ? " " : error) : ""}
          />

          <Modal
            animationType="slide"
            hardwareAccelerated={true}
            onRequestClose={() => {
              this.setState({ showCalendar: false });
            }}
            visible={this.state.showCalendar}
          >
            <Container>
              <Appbar.Header>
                <Appbar.BackAction
                  onPress={() => this.setState({ showCalendar: false })}
                />
                <Appbar.Content
                  titleStyle={theme.titleStyle}
                  subtitleStyle={theme.subtitleStyle}
                />
              </Appbar.Header>
              <Calendar
                ref={cal => (this.cal = cal)}
                rtl={false}
                type="jalaali"
                onDayPress={(date, localDate) => {
                  setTimeout(() => {
                    input.onChange(localDate.dateString);
                  }, 0);
                  this.setState({ showCalendar: false });
                }}
                renderArrow={direction =>
                  direction == "left" ? (
                    <Icon type="Ionicons" name="ios-arrow-forward" />
                  ) : (
                    <Icon type="Ionicons" name="ios-arrow-back" />
                  )
                }
                // Do not show days of other months in month page. Default = false
                hideExtraDays={false}
                // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={true}
                // Hide day names. Default = false
                hideDayNames={false}
                // Show week numbers to the left. Default = false
                showWeekNumbers={false}
                theme={theme.calendarTheme}
              />
            </Container>
          </Modal>
        </View>
      </TouchableRipple>
    );
  }
}
export default withTheme(ReduxDatePickerInput);
