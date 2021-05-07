import React from 'react';
import PropTypes from 'prop-types';

const FormInputArea = ({
  ariaInvalid,
  ariaLabel,
  id,
  label,
  maxLength,
  pattern,
  register,
  required,
}) => (
  <>
    <label htmlFor={id} className="screen-reader-text">
      {label}
    </label>
    <textarea
      placeholder={label}
      aria-describedby={ariaInvalid ? `${id}-error` : null}
      aria-invalid={ariaInvalid}
      aria-label={ariaLabel}
      aria-required={required}
      rows={12}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...register(label, { maxLength, pattern, required })}
    />
  </>
);

FormInputArea.defaultProps = {
  ariaInvalid: false,
  maxLength: 1024,
  pattern: null,
  required: false,
};

FormInputArea.propTypes = {
  ariaInvalid: PropTypes.bool,
  ariaLabel: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  label: PropTypes.string.isRequired,
  pattern: PropTypes.string,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export { FormInputArea as default };
