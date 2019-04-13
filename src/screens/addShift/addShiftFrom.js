import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { ReduxTextInput,ReduxDropdown } from "../../Fields";
import { Content } from "../../components";
import { fieldRequired } from "../../Fields/fieldValidators";
import styles from "./styles";
class AddShiftForm extends Component {
  constructor(props) {
    super(props);
  }
  async componentWillMount() {
  }

  render() {
    const timeIntervals=this.props.timeIntervals.reduce((obj,item)=>{
      obj.push({value:item.id,label:item.name});return obj},[]);
    return (
      <Content>
        <Field
          name="name"
          component={ReduxTextInput}
          validate={[fieldRequired]}
          inputProps={{ label: "" }}
        />
        <Field
          name="description"
          component={ReduxTextInput}
          validate={[]}
          inputProps={{ label: "" }}
        />
        <Field
        name="saturday"
        component={ReduxDropdown}
        validate={[fieldRequired]}
        inputProps={{ label: "",data :timeIntervals }}
      />
      <Field
      name="sunday"
      component={ReduxDropdown}
      validate={[fieldRequired]}
      inputProps={{ label: "",data :timeIntervals }}
    />
    <Field
      name="monday"
      component={ReduxDropdown}
      validate={[fieldRequired]}
      inputProps={{ label: "",data :timeIntervals }}
    />
    <Field
      name="tuesday"
      component={ReduxDropdown}
      validate={[fieldRequired]}
      inputProps={{ label: "",data :timeIntervals }}
    />
    <Field
      name="wednesday"
      component={ReduxDropdown}
      validate={[fieldRequired]}
      inputProps={{ label: "",data :timeIntervals }}
    />
    <Field
      name="thursday"
      component={ReduxDropdown}
      validate={[fieldRequired]}
      inputProps={{ label: "",data :timeIntervals }}
    />
    <Field
      name="friday"
      component={ReduxDropdown}
      validate={[fieldRequired]}
      inputProps={{ label: "",data :timeIntervals }}
    />
    
      </Content>
    );
  }
}
InitializeFromStateForm = reduxForm({
  form: "addShiftForm"
})(AddShiftForm);

InitializeFromStateForm = connect(
  state => ({
    timeIntervals: state.timeIntervals.items,
    initialValues: state.shifts.editItem // pull initial values from shifts reducer

  }),
  {
  
  } // bind account loading action creator
)(InitializeFromStateForm);

export default InitializeFromStateForm;
