import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 140px;
  background: #fff;
  margin: 10px 5px;
  border-radius: 10px;
  border-width: 0px;
  padding: 0px 4px;
  box-shadow: #ccc 1px 2px 4px;
`;

export const SideLeft = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;
export const SideRight = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Title = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #999;
`;
export const SubTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.color};
`;
