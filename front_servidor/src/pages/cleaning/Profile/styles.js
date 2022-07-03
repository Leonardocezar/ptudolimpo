import styled from "styled-components";
import { IconButton as Icon } from "@material-ui/core";
export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #fff;
`;

export const FormContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;
export const IconButton = styled(Icon)`
  height: 140px;
  width: 140px;
  margin: 10px;
  align-self: center;
`;

export const Avatar = styled.img`
  height: 120px;
  width: 120px;
  border-radius: 50%;
`;
