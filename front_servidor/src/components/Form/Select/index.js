import React, { useRef, useEffect } from "react";
import { Container, Text } from "./styles";
import ReactSelect from "react-select";
import { useField } from "@unform/core";

const Select = ({ name, options, placeholder, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: "state.value",
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option) => option.value);
        } else {
          if (!ref.state.value) {
            return "";
          }
          return ref.state.value.value;
        }
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      <ReactSelect
        defaultValue={
          defaultValue &&
          options.find((option) => option.value === defaultValue)
        }
        placeholder={placeholder}
        ref={selectRef}
        classNamePrefix="react-select"
        options={options}
        {...rest}
      />
      {error && <Text>{error}</Text>}
    </Container>
  );
};
export default Select;
