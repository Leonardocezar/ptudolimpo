import React, { useRef, useState, useEffect } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { useField } from "@unform/core";

import { Container, GroupInput, DatePicker, Text } from "./styles";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt-BR";
registerLocale("pt", pt);
export default function InputDate({ name, ...rest }) {
  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [date, setDate] = useState(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: "props.selected",
      clearValue: (ref) => {
        ref.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <GroupInput>
        <DatePicker
          locale="pt"
          ref={datepickerRef}
          selected={date}
          onChange={setDate}
          {...rest}
          showTimeSelect
          timeFormat="p"
          timeIntervals={30}
          dateFormat="Pp"
          isClearable
        />
      </GroupInput>
      {error && <Text>{error}</Text>}
    </Container>
  );
}
