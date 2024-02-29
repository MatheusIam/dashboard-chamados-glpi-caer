"use client";

import { BarChart } from "@mui/x-charts/BarChart";
import { Box, useTheme } from "@mui/material";
import { useState, useEffect } from "react";

const RankingGraph = () => {
  const theme = useTheme();
  const [chartHeight, setChartHeight] = useState("100vw");

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      if (innerWidth >= 3000) {
        setChartHeight("1000px");
      } else if (innerWidth >= theme.breakpoints.values.xl) {
        setChartHeight("400px");
      } else if (innerWidth >= theme.breakpoints.values.lg) {
        setChartHeight("350px");
      } else if (innerWidth >= theme.breakpoints.values.md) {
        setChartHeight("250px");
      } else {
        setChartHeight("200px");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [theme]);

  return (
    <Box
      sx={{
        height: `${chartHeight};`,
      }}
    >
      <BarChart
        xAxis={[{ scaleType: "band", data: ["group A", "group B", "group C"] }]}
        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
        margin={{ top: 20, bottom: 80 }}
      />
    </Box>
  );
};

export default RankingGraph;
