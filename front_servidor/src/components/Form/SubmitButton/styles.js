import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const Button = styled.button`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 4px;
  border-width: 0px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin: 5px 0px 5px 0px;
  background: #00648f;
  transition: background 0.5s;
  &:hover {
    background: #5ebabd;
  }
`;
