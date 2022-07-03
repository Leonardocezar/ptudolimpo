import React from "react";
import { ContentLoading } from "./styles";
import ReactLoading from "react-loading";
export default function Loading() {
  return (
    <ContentLoading>
      <ReactLoading
        type={"spinningBubbles"}
        color={"#056792"}
        height={80}
        width={80}
      />
    </ContentLoading>
  );
}
