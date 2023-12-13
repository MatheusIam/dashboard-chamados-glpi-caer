import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const MaisQueridosChartComponent = () => {
  return (
    <BarChart
      xAxis={[
        {
          id: "barCategories",
          data: ["bar A", "bar B", "bar C"],
          scaleType: "band",
        },
      ]}
      series={[
        {
          data: [2, 5, 3],
        },
      ]}
      width={500}
      height={300}
    />
  );
};

export default MaisQueridosChartComponent;
