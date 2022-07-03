import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import { InputData, GroupInput, Container, Text } from "./styles";

import { MdPersonOutline, MdMailOutline, MdLockOutline } from "react-icons/md";
export default function Input({ name, type, transform, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue = "", error } = useField(name);

  function createIcon() {
    if (type === "email") {
      return <MdMailOutline size={20} color={"#444"} />;
    } else if (type === "doc") {
      return <MdPersonOutline size={20} color={"#444"} />;
    } else if (type === "name") {
      return <MdPersonOutline size={20} color={"#444"} />;
    } else if (type === "password") {
      return <MdLockOutline size={20} color={"#444"} />;
    } else {
      return;
    }
  }
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
        {createIcon()}
        {type === "password" ? (
          <InputData
            ref={inputRef}
            defaultValue={defaultValue}
            {...rest}
            type="password"
            transform={transform}
          />
        ) : (
          <InputData ref={inputRef} defaultValue={defaultValue} {...rest} />
        )}
      </GroupInput>
      {error && <Text>{error}</Text>}
    </Container>
  );
}
