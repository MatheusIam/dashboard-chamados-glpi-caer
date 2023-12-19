import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { DatasetProps } from "..";

const dataset: DatasetProps[] = [
  { nome: "Alice", qtd: 75 },
  { nome: "Bruno", qtd: 120 },
  { nome: "Carla", qtd: 45 },
];

function ordenarDatasetPorValor(dataset: DatasetProps[]): DatasetProps[] {
  return dataset.sort((a, b) => a.qtd - b.qtd);
}

const top5Dataset = ordenarDatasetPorValor(dataset).slice(0, 5).reverse();
const MaisQueridosChartComponent = () => {
  return (
    <BarChart
      dataset={top5Dataset.map((item) => ({ ...item }))}
      xAxis={[{ scaleType: "band", dataKey: "nome" }]}
      series={[{ type: "bar", dataKey: "qtd" }]}
      width={500}
      height={300}
    />
  );
};

export default MaisQueridosChartComponent;
