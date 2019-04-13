import React, { Component } from "react";
import { Keyboard, InteractionManager } from "react-native";
import { Appbar, withTheme } from "react-native-paper";
import { Container, Icon, Indicator } from "../../components";
import { AppConstants } from "../../helper/constants";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { submit } from "redux-form";
import AddShiftForm from "./addShiftFrom";
import { update, emptyEditItem } from "../../redux/actions/shiftSetting";
import { FloatingAction } from "react-native-floating-action";
import Spinner from "../../components/Spinner";
import staticHelper from "../../helper/staticHelper";
import { refresh } from "../../redux/actions/timeIntervalsSetting";
class AddShift extends Component {
  static timerId = null;
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isReady;
  }
  componentWillMount() {}
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      if (!this.props.timeIntervals || this.props.timeIntervals.length == 0)
        this.props
          .loadTimeIntervals({})
          .then(() =>
            requestAnimationFrame(() => {
              this.setState({ isReady: true });
            })
          )
          .catch(error => this.setState({ isReady: true }));
      else
        requestAnimationFrame(() => {
          this.setState({ isReady: true });
        });
    });
  }

  componentWillUnmount() {
    this.props.emptyEditItem();
  }
  onSubmitForm = async form => {
    setTimeout(() => {
      this.props
        .update(form)
        .then(response => {
          this.props.navigation.pop();
        })
        .catch(error => {});
    }, 0);
    Keyboard.dismiss();
  };
  render() {
    const { status, theme ,editItem} = this.props;
    return (
      <Container>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this.props.navigation.pop()} />
          <Appbar.Content
            titleStyle={theme.titleStyle}
          />
        </Appbar.Header>
        {!staticHelper.isBusy(status, ["loadEditItem"]) &&
        this.state.isReady ? (
          <AddShiftForm
            onSubmit={form => {
              console.log(form);
              this.onSubmitForm(form);
            }}
          />
        ) : null}

        <FloatingAction
          color={theme.colors.fabsColor}
          position="right"
          onPressMain={() => this.props.submit("addShiftForm")}
          showBackground={false}
          floatingIcon={
            staticHelper.isBusy(status, ["update"]) ? (
              <Indicator />
            ) : (
              <Icon
                type="MaterialIcons"
                name="check"
                color={theme.colors.fabsIconColor}
                fontSize={theme.fabs.fontSize}
              />
            )
          }
          visible={this.state.isReady}
        />

        <Spinner
          visible={
            !this.state.isReady ||
            staticHelper.isBusy(status, ["update", "loadEditItem"])
          }
          showSpinner={
            !this.state.isReady || staticHelper.isBusy(status, ["loadEditItem"])
          }
          cancelable={false}
          {...theme.spinner}
          delay={AppConstants.spinnerDelay}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  timeIntervals: state.timeIntervals.items,
  editItem: state.shifts.editItem,
  status: state.shifts.status
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      update,
      submit,
      emptyEditItem,
      loadTimeIntervals: refresh
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(AddShift));
