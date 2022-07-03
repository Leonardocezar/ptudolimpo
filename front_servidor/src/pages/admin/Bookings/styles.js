import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const FormContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;

export const CustomerName = styled.span`
  margin: 0px;
  font-size: 16px;
  font-weight: 400;
`;

export const CustomerAddress = styled.span`
  margin: 0px;
  font-size: 14px;
  font-weight: 400;
`;
export const CustomerCity = styled.span`
  margin: 0px;
  font-size: 14px;
  font-weight: 400;
`;
export const Button = styled.button`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 4px;
  border-width: 0px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin: 5px 10px 5px 10px;
  background: #00648f;
  transition: background 0.5s;
  &:hover {
    background: #5ebabd;
  }
`;
