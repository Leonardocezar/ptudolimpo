import React from "react";
import {
  Container,
  Header,
  Title,
  Body,
  Description,
  Amount,
  Footer,
  FooterDescription,
} from "./styles";
export default function DashboardCard({
  color,
  title,
  description,
  amount,
  footerDescription,
  onClick,
}) {
  return (
    <Container onClick={onClick}>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Body>
        <Amount color={color}>{amount}</Amount>
        <Description>{description}</Description>
      </Body>
      <Footer>
        <FooterDescription>{footerDescription}</FooterDescription>
      </Footer>
    </Container>
  );
}
