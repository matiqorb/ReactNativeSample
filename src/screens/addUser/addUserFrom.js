import React, { Component } from "react";
import { View, TextInput } from "react-native";

import { Caption} from "react-native-paper";
import { Content } from "../../components";

import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { ReduxTextInput ,ReduxDropdown,ReduxCheckBoxInput} from "../../Fields/";
import { fieldRequired,phoneValidation } from "../../Fields/fieldValidators";
import styles from "./styles";

class AddUserFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersIsLoaded: false
    };
  }

  async componentWillMount() {}
 
  render() {
    const shifts = this.props.shifts.reduce((obj, item) => {
      obj.push({ value: item.id, label: item.name });
      return obj;
    }, []);
    const workGroups = this.props.workGroups.reduce((obj, item) => {
      obj.push({ value: item.id, label: item.name });
      return obj;
    }, []);
    const calendars = this.props.calendars.reduce((obj, item) => {
      obj.push({ value: item.id, label: item.name });
      return obj;
    }, []);
    return (
      <Content padder>
        <Field
          name="firstName"
          component={ReduxTextInput}
          validate={[fieldRequired]}
        />
        <Field
          name="lastName"
          component={ReduxTextInput}
          validate={[fieldRequired]}
        />
        <Field 
            itemProps={{inlineLable:true}}
            style={{ flexDirection: "row-reverse" }}
            name="phoneNumber"
            component={ReduxTextInput}
            validate={[phoneValidation]}
            inputProps={{
              keyboardType: "numeric",
              maxLength: 10,
              style: { textAlign: "left" },
              affixTextStyle:{color:"red"}
            }}
            errorProps={{}}
          />
          <Field
          name="position"
          component={ReduxTextInput}
          validate={[fieldRequired]}
        />
        <Field
          name="sex"
          component={ReduxDropdown}
          validate={[]}
        />
        <Field
          name="shiftId"
          component={ReduxDropdown}
          validate={[fieldRequired]}
        />
        <Field
          name="workGroupId"
          component={ReduxDropdown}
          validate={[fieldRequired]}
        />
        <Field
          name="calendarId"
          component={ReduxDropdown}
          validate={[fieldRequired]}
        />
        <Field
        name="isApproved"
        component={ReduxCheckBoxInput}
        validate={[]}
        inputProps={{}}
        
      />
      <Field
      name="isDisabled"
      component={ReduxCheckBoxInput}
      validate={[]}
      inputProps={{}}
      
    />
      </Content>
    );
  }
}
InitializeFromStateForm = reduxForm({
  form: "addUserFrom"
})(AddUserFrom);

InitializeFromStateForm = connect(
  state => ({
    initialValues: state.users.editItem ? state.users.editItem : {sex:0,isApproved:false,isDisabled:false}, // pull initial values from shifts reducer
    calendars: state.calendars.items,
    workGroups: state.workGroups.items,
    shifts: state.shifts.items
  }),
  {
  } // bind account loading action creator
)(InitializeFromStateForm);

export default InitializeFromStateForm;
