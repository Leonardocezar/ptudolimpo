import React from "react";
import {
  Container,
  SideLeft,
  SideRight,
  Body,
  Title,
  SubTitle,
} from "./styles";
import { BsArrowRight } from "react-icons/bs";
import { IconButton } from "@material-ui/core";
export default function DashboardCard({
  children,
  title,
  subtitle,
  textColor,
  onClick,
}) {
  return (
    <Container>
      <SideLeft>{children}</SideLeft>
      <Body>
        <Title>{title}</Title>
        <SubTitle color={textColor}>{subtitle}</SubTitle>
      </Body>
      <SideRight>
        <IconButton onClick={onClick}>
          <BsArrowRight color="#747474" size={20} />
        </IconButton>
      </SideRight>
    </Container>
  );
}
