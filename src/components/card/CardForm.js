/**
 * Created by Hoppies on 11-APR-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';

const CardForm = ({ card, onSave, onChange, saving, errors }) => {
  return (
    <form>
      <h1>Card Form</h1>

      <TextInput
        name="wisdom"
        label="Wisdom"
        value={card.wisdom}
        onChange={onChange}
        error={errors.wisdom}/>

      <TextInput
        name="attribute"
        label="Attribute"
        value={card.attribute}
        onChange={onChange}
        error={errors.attribute}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

CardForm.propTypes = {
  card: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default CardForm;
