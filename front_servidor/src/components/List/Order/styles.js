import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #fff;
  margin: 5px 0px;
  border-color: #ccc;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  padding: 10px;
`;
export const Service = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #000;
  margin: 0;
`;

export const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #000;
  margin: 0;
`;
export const Name = styled.span`
  font-size: 12px;
  color: #444;
  margin: 0;
`;

export const Phone = styled.span`
  font-size: 12px;
  color: #444;
  margin: 0;
`;
export const Email = styled.span``;
export const Address = styled.span`
  font-size: 12px;
  color: #444;
  margin: 0;
`;
export const Footer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 10px 0px;
`;

export const AcceptButton = styled.button`
  background: rgb(25, 102, 0);
  border-width: 0px;
  border-radius: 4px;
  padding: 10px;
  font-weight: bold;
  color: #fff;
  margin: 0px 10px 0px 0px;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;
export const RejectButton = styled.button`
  background: rgb(172, 0, 0);
  border-width: 0px;
  border-radius: 4px;
  padding: 10px;
  font-weight: bold;
  color: #fff;
  margin: 0px 0px 0px 10px;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;
