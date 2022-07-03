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
import { Doughnut } from "react-chartjs-2";

export default function CardChart({ title, dataValue }) {
  const labels = () => {
    const x = dataValue.map((val) => {
      return val.state;
    });
    var novaArr = x.reduce((unico, item) => {
      return unico.includes(item) ? unico : [...unico, item];
    }, []);
    return novaArr;
  };
  const values = () => {
    const b = [];
    labels().forEach((v) => {
      let g = [];
      let x = dataValue.filter((val) => val.state === v);
      b.push(x.length);
    });
    return b;
  };
  const data = {
    labels: labels(),
    datasets: [
      {
        label: "",
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 1,
        data: values(),
      },
    ],
  };
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Body>
        {" "}
        <Doughnut
          data={data}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </Body>
      <Footer>
        <FooterDescription></FooterDescription>
      </Footer>
    </Container>
  );
}
