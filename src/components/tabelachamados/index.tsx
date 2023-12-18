import fetchTicketData from "./fetchticket";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TicketProps } from "./ticketprops";
import { SetorProps } from "./setorprops";
import React, { useEffect, useState } from "react";
import { Chip, Typography } from "@mui/material";
import fetchSetorData from "./fetchsetor";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "locations_id",
    headerName: "Setor",
    flex: 2,
    align: "center",
  },
  {
    field: "status",
    headerName: "Status",
    flex: 2,
    renderCell: (params) =>
      params.value === 1 ? (
        <Chip label="Novo" color="success" />
      ) : (
        <Chip label="Atribuído" color="warning" />
      ),
  },
  { field: "users_id_recipient", headerName: "Autor", flex: 3 },
  { field: "name", headerName: "Título", flex: 8 },
];
const TicketTable = () => {
  const [data, setData] = useState<TicketProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ticketData, setorData] = await Promise.all([
          fetchTicketData(),
          fetchSetorData(),
        ]);

        // Certifique-se de que setorData tem uma estrutura de array válida
        if (!Array.isArray(setorData)) {
          throw new Error("setorData não é um array");
        }

        // Merge the data based on locations_id
        const mergedData = ticketData.map((ticket) => {
          const matchingSetor = setorData.find(
            (setor) => setor.id === ticket.locations_id
          );

          // Se não encontrar um setor correspondente, use "???"
          const setorName = matchingSetor ? matchingSetor.comment : "???";

          // Retorne o ticket com o nome do setor substituído
          return {
            ...ticket,
            locations_id: setorName,
          };
        });

        setData(mergedData);
      } catch (error) {
        console.error("Erro baixando os dados de ticket:", error);
      }
    };

    fetchData();
    // Set up interval to fetch data every 1 minute
    const intervalId = setInterval(fetchData, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  if (data.length === 0) {
    return <Typography variant="h2">Não há chamados abertos !</Typography>;
  } else {
    return <DataGrid rows={data} columns={columns} pageSizeOptions={[10]} />;
  }
};

export default TicketTable;
