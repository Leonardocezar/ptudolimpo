import React, { useRef, useEffect } from "react";
import ReactInputMask, { Props as InputProps } from "react-input-mask";
import { InputMask, GroupInput, Container, Text } from "./styles";

import { useField } from "@unform/core";

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue = "", error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <GroupInput>
        <InputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
      </GroupInput>
      {error && <Text>{error}</Text>}
    </Container>
  );
}
