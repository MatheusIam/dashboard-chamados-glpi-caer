import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { actorRankingProps } from "./fetchactors";
import updateActorRanking from "./updateActorRanking";
import { useEffect, useState } from "react";

export interface DatasetProps {
  nome: string;
  qtd: number;
}

const RankingChartComponent = () => {
  const [dataset, setDataset] = useState<DatasetProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const actorRanking: actorRankingProps[] = await updateActorRanking();
        console.log("ACTOR RANKING: ", actorRanking);

        // Contagem concluída, atualizar o estado
        const updatedDataset: DatasetProps[] = actorRanking.map((actor) => ({
          nome: actor.name,
          qtd: actor.qtd,
        }));
        // Verificar se o componente ainda está montado antes de atualizar o estado
        if (isMounted) {
          setDataset(updatedDataset);
          setIsLoading(false); // Indica que o carregamento está concluído
        }
      } catch (error) {
        console.error("Erro ao obter o dataset:", error);
      }
    };

    fetchData();

    // Limpar a flag de montagem quando o componente for desmontado
    return () => {
      isMounted = false;
    };
  }, []); // Certifique-se de passar um array vazio como segundo argumento para o useEffect

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const setDeDados = dataset.sort((a, b) => b.qtd - a.qtd);
  const top5Dataset = setDeDados.slice(0, 5);
  console.log("TOP 5 DATASET:", top5Dataset);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography>Ranking de Atendimentos do Mês</Typography>
      <BarChart
        dataset={top5Dataset.map((item) => ({ ...item }))}
        xAxis={[{ scaleType: "band", dataKey: "nome" }]}
        series={[{ type: "bar", dataKey: "qtd" }]}
        width={500}
        height={300}
      />
    </Box>
  );
};

export default RankingChartComponent;
