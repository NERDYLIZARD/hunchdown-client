/**
 * Created on 19-May-18.
 */
import React from 'react';
import { Field } from 'redux-form';
import { shallow } from 'enzyme';
import CheckboxGroup, { CheckboxGroupComponent } from './CheckboxGroup';


describe('<CheckboxGroup />', () => {
  let props;
  let mountedCheckboxGroup;
  const checkboxGroup = () => {
    if (!mountedCheckboxGroup) {
      mountedCheckboxGroup = shallow(
        <CheckboxGroup {...props} />
      );
    }
    return mountedCheckboxGroup;
  };

  beforeEach(() => {
    props = {
      name: 'boxes',
      options: [
        {label: 'Life', value: 'id#1'},
        {label: 'Inspiration', value: 'id#2'},
      ],
    };
    mountedCheckboxGroup = undefined;
  });

  it('renders `CheckboxGroupComponent` with `name` and `options` props', () => {
    const checkboxGroupComponent = checkboxGroup().find(Field).filter({name: 'boxes'});
    expect(checkboxGroupComponent.length).toBe(1);
    expect(checkboxGroupComponent.props().options).toBe(props.options);
  });
});


describe('<CheckboxGroupComponent />', () => {
  let props;
  let mountedCheckboxGroupComponent;
  const checkboxGroupComponent = () => {
    // if running new test, mount the component
    // otherwise, use the mounted component
    if (!mountedCheckboxGroupComponent) {
      mountedCheckboxGroupComponent = shallow(
        <CheckboxGroupComponent {...props} />
      );
    }
    return mountedCheckboxGroupComponent;
  };

  // reset props before running a new test
  beforeEach(() => {
    props = {
      input: {
        name: 'boxes',
        onChange: jest.fn(),
        value: [],
      },
      meta: {
        touched: false,
        error: null,
      },
      options: [
        {label: 'Life', value: 'id#1'},
        {label: 'Inspiration', value: 'id#2'},
        {label: 'Happiness', value: 'id#3'},
      ],
    };
    mountedCheckboxGroupComponent = undefined;
  });

  it('always renders a `div` as wrapper', () => {
    const divWrapper = checkboxGroupComponent().find('div');
    expect(divWrapper.length).toBeGreaterThan(0);
  });

  describe('when `touched = false` and `error = null`', function () {
    it('does not render `error`', () => {
      expect(checkboxGroupComponent().find('.error').length).toBe(0);
    });
  });

  describe('when `touched = true` and there are `error`s', function () {
    beforeEach(() => {
      props.meta.touched = true;
      props.meta.error = 'Something went wrong.';
    });
    it('renders `error`', () => {
      const error = checkboxGroupComponent().find('.error');
      expect(error.length).toBe(1);
      expect(error.props().children).toBe('Something went wrong.');
    });
  });

  it('renders number of `input[type="checkbox"]` as per number of `options`', () => {
    const checkboxes = checkboxGroupComponent().find('input[type="checkbox"]');
    expect(checkboxes.length).toBe(props.options.length);
  });

  describe('when `input.value` is passed', () => {
    beforeEach(() => {
      props.input.value = ['id#1']
    });
    it('the rendered `input[type="checkbox"]` matching that `value` is checked', () => {
      const unCheckedCheckboxes = checkboxGroupComponent().find('input[type="checkbox"]').filter({value: 'id#2'});
      expect(unCheckedCheckboxes.props().checked).toBe(false);

      const checkedCheckboxes = checkboxGroupComponent().find('input[type="checkbox"]').filter({value: 'id#1'});
      expect(checkedCheckboxes.props().checked).toBe(true);
    });
  });

  describe('when a `checkbox` is `onChange`', () => {
    let argumentArray;
    beforeEach(() => {
      // populate some value
      props.input.value = ['id#1'];
      argumentArray = [...props.input.value];
    });

    it('calls `props.onChange` with an array containing the checked value', () => {
      const checkedCheckbox = { value: 'id#2' };
      const CheckboxGroupComponent = checkboxGroupComponent();
      const checkbox = CheckboxGroupComponent.find('input[type="checkbox"]').filter({value: checkedCheckbox.value});
      checkbox.simulate('change', {
        target: {
          value: checkedCheckbox.value,
          checked: true
        }
      });
      expect(props.input.onChange).toBeCalledWith(argumentArray.concat(checkedCheckbox.value));
    });

    it('calls `props.onChange` with an array not containing the unchecked value', () => {
      const uncheckedCheckbox = { value: 'id#1' };
      const CheckboxGroupComponent = checkboxGroupComponent();
      const checkbox = CheckboxGroupComponent.find('input[type="checkbox"]').filter({value: uncheckedCheckbox.value});
      checkbox.simulate('change', {
        target: {
          value: uncheckedCheckbox.value,
          checked: false
        }
      });
      argumentArray.splice(argumentArray.indexOf(uncheckedCheckbox.value), 1);
      expect(props.input.onChange).toBeCalledWith(argumentArray);
    });
  });

});
