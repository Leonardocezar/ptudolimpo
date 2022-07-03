import React from "react";
import ReactLoading from "react-loading";
import { Container, Button } from "./styles";
export default function SubmitButton({ title, loading }) {
  return (
    <Container>
      {loading ? (
        <ReactLoading type="spinningBubbles" color="#056792" />
      ) : (
        <Button>{title}</Button>
      )}
    </Container>
  );
}
