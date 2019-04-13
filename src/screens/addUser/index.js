import React, { Component } from "react";
import { Keyboard, InteractionManager } from "react-native";
import { Appbar, withTheme } from "react-native-paper";
import { Container, Icon, Indicator } from "../../components";
import { AppConstants } from "../../helper/constants";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { submit } from "redux-form";
import AddUserFrom from "./addUserFrom";
import { update, emptyEditItem } from "../../redux/actions/usersSetting";
import { FloatingAction } from "react-native-floating-action";
import commonColor from "../../theme/variables/commonColor";
import { SkypeIndicator } from "react-native-indicators";
import Spinner from "../../components/Spinner";
import staticHelper from "../../helper/staticHelper";
import {refresh as loadWorkGroups} from "../../redux/actions/workGroupSetting"
import {refresh as loadShifts} from "../../redux/actions/shiftSetting"
import {refresh as loadCalendars} from "../../redux/actions/calendarSetting"


class AddUser extends Component {
  static timerId = null;
  constructor(props) {
    super(props);
    this.state = {
      isReady:false,
      calendarIsLoaded:false,
      workGroupIsLoaded:false,
      shfiltIsLoaded:false,
    };
  }
  shouldComponentUpdate(nextProps, nextState){
    return nextState.isReady;
  }
  componentWillMount() {}
  async componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      if(!this.props.workGroups || this.props.workGroups.length==0){
        this.props.loadWorkGroups()
        .then(()=>this.setState({workGroupIsLoaded:true},
          ()=>this.setState({isReady:this.state.calendarIsLoaded&&this.state.workGroupIsLoaded&&this.state.shfiltIsLoaded})))
        .catch(error=>console.log(error));
      }else
        this.state.workGroupIsLoaded=true;

      if(!this.props.shifts || this.props.shifts.length==0){
        this.props.loadShifts()
        .then(()=>this.setState({shfiltIsLoaded:true},
          ()=>this.setState({isReady:this.state.calendarIsLoaded&&this.state.workGroupIsLoaded&&this.state.shfiltIsLoaded})))
        .catch(error=>console.log(error));
      }else
        this.state.shfiltIsLoaded=true;
      if(!this.props.calendars || this.props.calendars.length==0){
        this.props.loadCalendars()
        .then(()=>this.setState({calendarIsLoaded:true},
          ()=>this.setState({isReady:this.state.calendarIsLoaded&&this.state.workGroupIsLoaded&&this.state.shfiltIsLoaded})))
        .catch(error=>console.log(error));
      }else
        this.state.calendarIsLoaded=true;

      requestAnimationFrame(() => {
          this.setState({isReady:true})
        })
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
        {!staticHelper.isBusy(status, ["loadEditItem"]) && this.state.isReady?
        <AddUserFrom
          onSubmit={form => {
            console.log(form);
            this.onSubmitForm(form);
          }}
        />:null}

        <FloatingAction
          color={theme.colors.fabsColor}
          position="right"
          onPressMain={() => this.props.submit("addUserFrom")}
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
  editItem: state.users.editItem,
  status: state.users.status,
  workGroups:state.workGroups.items,
  shifts:state.shifts.items,
  calendars:state.calendars.items,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      update,
      submit,
      emptyEditItem,
      loadWorkGroups,
      loadShifts,
      loadCalendars
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(AddUser));
