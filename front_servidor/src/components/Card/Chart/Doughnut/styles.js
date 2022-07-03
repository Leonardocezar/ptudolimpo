import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #fff;
  height: 300px;
  border-color: #eee;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
  }
`;
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
`;
export const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
  margin-left: 20px;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 210px;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
  border-bottom-style: solid;
`;

export const Amount = styled.h1`
  color: ${(props) => props.color};
  font-size: 38px;
  margin: 0px;
`;
export const Description = styled.h1`
  color: #acacac;
  font-size: 12px;
  margin: 0px;
  font-weight: 400;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  background: #fafafa;
`;

export const FooterDescription = styled.h1`
  color: #acacac;
  align-self: center;
  font-size: 10px;
  margin-left: 20px;
`;
