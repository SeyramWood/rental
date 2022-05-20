import React from "react";
import PropTypes from "prop-types";

const SelectField = React.forwardRef(function SelectField(props, ref) {
  const { type, label, id, error, helpertext, placeholder } = props;
  const [msg, setMsg] = React.useState(helpertext);

  const handleOnBlur = (event) => {
    const { onBlur } = props;
    onBlur && onBlur(event);
  };
  const handleOnChange = (event) => {
    const { onChange } = props;
    onChange && onChange(event);
  };

  const handleFocus = (event) => {
    const { onFocus, value } = props;
    // To fix the issue with cursor at beginning
    if (value) {
      event.target.value = "";
      event.target.value = value;
    }

    onFocus && onFocus(event);
  };

  const handleKeyDown = (event) => {
    const { onKeyDown } = props;
    onKeyDown && onKeyDown(event);
  };

  let _props = {
    ...props,
    onChange: handleOnChange,
    onFocus: handleFocus,
    onBlur: handleOnBlur,
    onKeyDown: handleKeyDown,
  };

  return (
    <div className="text__field__wrapper">
      <label htmlFor={id} className="text__field__wrapper__label">
        <span className="text__field__wrapper__label__text">{label}</span>
        <select {..._props} type={type} ref={ref} >
          <option value="" disabled hidden>{placeholder}</option>
          {props.children}
        </select>
      </label>

      {helpertext && typeof msg === "string" ? (
        <p className="text__field__wrapper__error">{msg}</p>
      ) : (
        msg.length > 0 &&
        msg.map((m, index) => (
          <p className="text__field__wrapper__error" key={index}>
            {m}
          </p>
        ))
      )}
    </div>
  );
});

export default SelectField;
//Validate the props
SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  id: PropTypes.string,
  pattern: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  /* Will be applied to container */
  className: PropTypes.string,
  /* Will be applied to underlying input/textarea tag */
  inputClassName: PropTypes.string,
  /* Will be applied to label */
  labelClassName: PropTypes.string,

  /* Value */
  value: PropTypes.string,
  // defaultValue: PropTypes.string,
  error: PropTypes.bool,
  helpertext: PropTypes.any,
};

//Set the default props
SelectField.defaultProps = {
  label: "",
  placeholder: "",
  helpertext: "",
  readOnly: false,
  // defaultValue: "",
};
