import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { Input, Picker, CheckBox, Radio } from 'native-base';

class InputField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: undefined
    };

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handlePickerChange = this.handlePickerChange.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);

    this.renderCheckBox = this.renderCheckBox.bind(this);
    this.renderRadio = this.renderRadio.bind(this);
    this.renderPicker = this.renderPicker.bind(this);
    this.renderField = this.renderField.bind(this);

    this.renderField = this.renderField.bind(this);
  }

  componentWillMount() {
    // this.props.input.onChange();
  }

  handleCheckboxChange(input, meta) {
    this.setState(
      prevState => ({
        value: !prevState.value
      }),
      () => input.onChange(this.state.value)
    );
  }

  handleRadioChange(input, meta) {
    this.setState(
      {
        value: input.value
      },
      () => input.onChange(input.value)
    );
  }

  handlePickerChange(input, meta, value) {
    this.setState(
      {
        value
      },
      () => input.onChange(value)
    );
  }

  handleFieldChange(event, newValue, prevValue, name) { }

  renderCheckBox(input, meta) {
    const { value } = this.state;
    const { props } = this;

    return (
      <CheckBox
        checked={value}
        onPress={() => this.handleCheckboxChange(input, meta)}
        {...input}
        {...props}
      />
    );
  }

  renderRadio(input, meta, currentValue) {
    const { props } = this;

    return (
      <Radio
        {...input}
        {...props}
        selected={currentValue === this.state.value}
        onPress={() => this.handleRadioChange(input, meta)}
      />
    );
  }

  renderInput(input, meta) {
    const { props } = this;

    return (
      <Input {...input} {...props} /> 
    );
  }

  renderPicker(input, meta) {
    const { items } = this.props;
    const { value } = this.state;

    return (
      <Picker
        selectedValue={value}
        onValueChange={value => this.handlePickerChange(input, meta, value)}
        {...this.props}
      >
        {items.map(item => (
          <Picker.Item
            key={item.key}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>
    );
  }

  renderField({ input, meta, type }) {
    const { forms } = this.props;

    const form = forms[meta.form];
    const formValues = form ? form.values : {};
    const currentValue = formValues ? formValues[input.name] : '';

    switch (type) {
      case 'checkbox':
        return this.renderCheckBox(input, meta);
      case 'radio':
        return this.renderRadio(input, meta, currentValue);
      case 'select':
        return this.renderPicker(input, meta);
      default:
        return this.renderInput(input, meta);
    }
  }

  render() {
    const { name, type, value } = this.props;

    return (
      <Field
        name={name}
        type={type}
        value={value}
        component={this.renderField}
        onChange={this.handleFieldChange}
      />
    );
  }
}

const mapStateToProps = state => ({
  forms: state.form
});

export default connect(mapStateToProps)(InputField);
