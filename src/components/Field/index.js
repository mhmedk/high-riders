// == Import : npm
import PropTypes from 'prop-types';

// == Import : local
import './style.scss';

// == Composant
const Field = ({
  value,
  type,
  name,
  placeholder,
  onChange,
  min,
  max,
  step,
  required,
}) => {
  const handleChange = (evt) => {
    onChange(evt.target.value, name);
  };

  const inputId = `field-${name}`;

  return (
    <div className={value.length > 0 ? 'field field--has-content' : 'field'}>
      <input
        value={value}
        onChange={handleChange}
        id={inputId}
        type={type}
        className="field-input"
        placeholder={placeholder}
        name={name}
        min={min}
        max={max}
        step={step}
        required={required}
      />

      <label
        htmlFor={inputId}
        className="field-label"
      >
        {placeholder}{required && ' *'}
      </label>
    </div>
  );
};

Field.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  required: PropTypes.bool,
};

Field.defaultProps = {
  value: '',
  type: 'text',
  min: 0,
  max: 5,
  step: 1,
  required: false,
};

// == Export
export default Field;
