import React from "react";
import Chart from "react-google-charts";
export default function ChartLine({ title, scheduled, progress, finished }) {
  return (
    <Chart
      height={"270px"}
      chartType="PieChart"
      loader={<div>Carregando ...</div>}
      data={[
        ["Task", "Hours per Day"],
        ["Agendado", scheduled.length],
        ["Finalizado", finished.length],
        ["Em Execução", progress.length],
      ]}
      options={{
        fontColor: "#000",
        title: title,
        is3D: true,
        slices: {
          0: { color: "#63c9ee" },
          1: { color: "#63ee9a" },
          2: { color: "#f7f728" },
        },
      }}
      rootProps={{ "data-testid": "2" }}
    />
  );
}
