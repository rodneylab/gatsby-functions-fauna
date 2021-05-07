import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
  ariaInvalid,
  ariaLabel,
  id,
  maxLength,
  label,
  pattern,
  register,
  required,
}) => (
  <>
    <label htmlFor={id} className="screen-reader-text">
      {label}
    </label>
    <input
      id={id}
      aria-describedby={ariaInvalid ? `${id}-error` : null}
      aria-label={ariaLabel}
      aria-invalid={ariaInvalid}
      aria-required={required}
      placeholder={label}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...register(label, { maxLength, pattern, required })}
    />
  </>
);

FormInput.defaultProps = {
  ariaInvalid: false,
  maxLength: 1024,
  pattern: null,
  required: false,
};

FormInput.propTypes = {
  ariaInvalid: PropTypes.bool,
  ariaLabel: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  label: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pattern: PropTypes.object,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export { FormInput as default };
