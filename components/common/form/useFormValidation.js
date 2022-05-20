import React from 'react';
import validateForm from './validateForm';

function useFormValidation(initialState, validationRules, callBack) {
  const [state, setState] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const submitting = React.useCallback(
    () => {
      setIsSubmitting(false);
    },
    [setIsSubmitting],
  );

  React.useEffect(
    () => {
      if (isSubmitting) {
        let noErrors = 0;
        Object.values(errors).forEach(err => {
          noErrors += err.length;
        });
        if (noErrors === 0) {
          callBack();
          setErrors({});
        } else {
          setIsSubmitting(false);
        }
      }
    },
    [isSubmitting],
  );

  const handleChange = e => {
    const { name, value, files, type, checked } = e.target;
    if (type === 'file') {
      if (files) {
        setState(state => ({
          ...state,
          [name]: Object.values(files),
        }));
      }
    } else if (type === 'tel') {
      let cleaned = value.replace(/\D/g, '');
      // Check if the input is of correct length
      let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        setState(() => ({
          ...state,
          [name]: `(${match[1]}) ${match[2]} - ${match[3]}`,
        }));
      } else {
        setState({
          ...state,
          [name]: value,
        });
      }
    } else if (type === 'checkbox') {
      setState({ ...state, [name]: checked });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const handleBlur = e => {
    const { name } = e.target;
    const err = validateForm(
      { [name]: state[`${name}`] },
      { [name]: validationRules[`${name}`] },
    );
    setErrors(error => ({ ...error, ...err }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    setErrors(validateForm(state, validationRules));
  };
  const clearValues = (action = true) => {
    if (action) {
      setState(initialState);
      setErrors({});
    }
  };
  const setValues = (data = {}) => {
    if (Object.keys(data).length > 0) {
      setState({ ...state, ...data });
    }
  };
  const setServerErrors = (err = {}) => {
    if (Object.keys(err).length > 0) {
      setErrors({ ...errors, ...err });
    }
  };
  const updateIsSubmitting = boolean => {
    setIsSubmitting(boolean);
  };

  return {
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    updateIsSubmitting,
    errors,
    state,
    clearValues,
    setValues,
    setServerErrors,
  };
}

export default useFormValidation;
