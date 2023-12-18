import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { DatasetProps } from "..";

const dataset: DatasetProps[] = [
  { nome: "Alice", value: 75 },
  { nome: "Bruno", value: 120 },
  { nome: "Carla", value: 45 },
  { nome: "Daniel", value: 90 },
  { nome: "Eduarda", value: 60 },
  { nome: "Felipe", value: 150 },
  { nome: "Gabriela", value: 25 },
  { nome: "Hugo", value: 180 },
  { nome: "Isabela", value: 40 },
  { nome: "João", value: 100 },
  { nome: "Karina", value: 80 },
  { nome: "Lucas", value: 110 },
  { nome: "Mariana", value: 30 },
  { nome: "Nathan", value: 70 },
  { nome: "Olivia", value: 95 },
  { nome: "Pedro", value: 55 },
  { nome: "Quezia", value: 85 },
  { nome: "Rafael", value: 130 },
  { nome: "Sofia", value: 65 },
  { nome: "Thiago", value: 120 },
];

function ordenarDatasetPorValor(dataset: DatasetProps[]): DatasetProps[] {
  return dataset.sort((a, b) => a.value - b.value);
}

const top5Dataset = ordenarDatasetPorValor(dataset).slice(0, 5).reverse();
const MaisQueridosChartComponent = () => {
  return (
    <BarChart
      dataset={top5Dataset.map((item) => ({ ...item }))}
      xAxis={[{ scaleType: "band", dataKey: "nome" }]}
      series={[{ type: "bar", dataKey: "value" }]}
      width={500}
      height={300}
    />
  );
};

export default MaisQueridosChartComponent;
