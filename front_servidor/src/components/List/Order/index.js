import React from "react";

import {
  Container,
  Service,
  Name,
  Phone,
  Email,
  Address,
  Date,
  Footer,
  AcceptButton,
  RejectButton,
} from "./styles";

import * as moment from "moment";
export default function Order({ data, accept, reject }) {
  return (
    <Container>
      <Service>
        <b>Tipo de serviço :</b> {data.service.name}
      </Service>
      <Date>
        <b>Data de Agendamento : </b>
        {moment(data.date).format("DD/MM/YYYY HH:mm")}
      </Date>
      <Name>
        {" "}
        <b>Cliente : </b>
        {data.name}
      </Name>
      <Phone>
        {" "}
        <b>Telefone de Contato : </b>
        {data.phone}
      </Phone>
      <Address>
        <b>Endereço : </b>Rua {data.street}, numero {data.number} - {data.city}
      </Address>
      <Address>
        <b>Referencia : </b>
        {data.reference}
      </Address>
      <Email>
        {" "}
        <b>E-mail : </b>
        {data.email}
      </Email>
      <Footer>
        <AcceptButton onClick={() => accept(data)}>Aceitar</AcceptButton>
        <RejectButton onClick={() => reject(data.id)}>Rejeitar</RejectButton>
      </Footer>
    </Container>
  );
}
