import styled from "styled-components";

import ReactDatePicker from "react-datepicker";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export const GroupInput = styled.div`
  display: flex;
  height: 50px;
  margin: 5px 0px 5px 0px;
  padding: 0px 0px 0px 10px;
  display: flex;
  flex-direction: column;
  align-items: left;
  border-style: solid;
  border-radius: 4px;
  border-width: 1px;
  border-color: #ccc;
  background: #fff;
`;
export const DatePicker = styled(ReactDatePicker)`
  flex: 1;
  height: 40px;
  border-radius: 4px;
  border-width: 0px;
  background: transparent;
  font-size: 15px;
  font-weight: 400;
  color: #000;
  outline: none;
`;

export const Text = styled.span`
  color: #ed3237;
  font-size: 14px;
  margin: 5px 0px 5px 20px;
`;
