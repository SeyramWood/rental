import React from "react";
import PropTypes from "prop-types";

const TextField = React.forwardRef(function TextField(props, ref) {
  const { type, label, id, error, helpertext } = props;
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
      {type === "radio" || type === "checkbox" ? (
        <label htmlFor={id} className="text__field__wrapper__label text__field__wrapper__label--radio">
          <input {..._props} type={type} ref={ref} className="text__field__wrapper__label__radio" />
          <span className="text__field__wrapper__label__text text__field__wrapper__label__text--radio">
            <span>{label}</span>
          </span>
        </label>
      ) : (
        <label htmlFor={id} className="text__field__wrapper__label">
          <span className="text__field__wrapper__label__text">{label}</span>
          <input
            {..._props}
            type={type}
            ref={ref}
            className="text__field__wrapper__label__input"
          />
        </label>
      )}

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

export default TextField;
//Validate the props
TextField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    "text",
    "number",
    "password",
    "date",
    "email",
    "tel",
    "url",
    "search",
    "radio",
    "checkbox",
  ]).isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  id: PropTypes.string,
  maxLength: PropTypes.number,
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
  /* Renders a textarea if true */
  multi: PropTypes.bool,
  /* Value */
  value: PropTypes.string,
  error: PropTypes.bool,
  helpertext: PropTypes.any,
};

//Set the default props
TextField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  helpertext: "",
  readOnly: false,
  multi: false,
};
