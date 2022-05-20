import React from "react";
import useFormValidation from "./useFormValidation";

const INITIAL_STATE = {
    name: "",
    age: "",
    hubby: ""
};
const VALIDATION_RULES = {
    name: "email",
    age: "required|numeric|min:3>Must be at least 3 char|max:6",
    hubby: "required|string"
};

const Hooks = () => {
    const {
        state: values,
        handleChange,
        handleSubmit,
        isSubmitting,
        errors,
        handleBlur
    } = useFormValidation(INITIAL_STATE, VALIDATION_RULES, registerUser);
    async function registerUser() {
        console.log(values);
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <br />
                {errors.name} <br />
                <input
                    type="text"
                    name="age"
                    placeholder="age"
                    value={values.age}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <br />
                {errors.age} <br />
                <input
                    type="text"
                    name="hubby"
                    placeholder="hubby"
                    value={values.hubby}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <br />
                {errors.hubby} <br />
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
            </form>
        </>
    );
};

export default Hooks;
