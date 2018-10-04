/**
 * Created on 05-Aug-18.
 */
import React, {Component} from 'react';
import {Field} from "redux-form";
import PropTypes from 'prop-types';

export default class CheckboxGroup extends Component {

  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })).isRequired
  };

  render() {
    return <Field {...this.props} type="checkbox" component={CheckboxGroupComponent} />;
  }
}


export const CheckboxGroupComponent = ({input, meta, options}) => {

  const {name, onChange} = input;
  const {touched, error} = meta;
  const inputValue = input.value;

  const checkboxes = options.map(({label, value}, index) => {

    const handleChange = (event) => {
      const arr = [...inputValue];
      if (event.target.checked) {
        arr.push(event.target.value);
      }
      else {
        arr.splice(arr.indexOf(event.target.value), 1);
      }
      return onChange(arr);
    };

    const checked = inputValue.includes(value);

    return (
      <label key={`checkbox-${index}`}>
        <input type="checkbox" name={`${name}[${index}]`} value={value} checked={checked} onChange={handleChange} />
        <span>{label}</span>
      </label>
    );
  });

  return (
    <div>
      <div>{checkboxes}</div>
      {touched && error && <p className="error">{error}</p>}
    </div>
  );
};

CheckboxGroupComponent.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};
