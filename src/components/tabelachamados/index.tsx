import fetchTicketData from "./fetchticket";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TicketProps } from "./ticketprops";
import { SetorProps } from "./setorprops";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import fetchSetorData from "./fetchsetor";

// export const getSetorById = (id: number) => {
//   const setores = fetchSetorData();
//   // Encontre a linha com o ID desejado
//   const setorEncontrado = setores.find((setor: any) => setor.id === id);

//   // Se o setor for encontrado, retorne o campo COMMENT
//   if (setorEncontrado) {
//     return setorEncontrado.comment;
//   } else {
//     // Retorne alguma coisa caso o ID não seja encontrado
//     return null; // Ou lance uma exceção, dependendo do comportamento desejado
//   }
// };

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "locations_id",
    headerName: "Setor",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 3,
  },
  { field: "users_id_recipient", headerName: "Autor", flex: 1 },
  { field: "name", headerName: "Título", flex: 8 },
];
const TicketTable = () => {
  const [data, setData] = useState<TicketProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketData = await fetchTicketData();

        setData(ticketData);
      } catch (error) {
        // Handle error as needed
        console.error("Erro baixando os dados de ticket:", error);
      }
    };

    fetchData();
    // Set up interval to fetch data every 500ms
    const intervalId = setInterval(fetchData, 500);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  if (data.length === 0) {
    return <Typography variant="h2">Não há chamados abertos !</Typography>;
  } else {
    return <DataGrid rows={data} columns={columns} />;
  }
};

export default TicketTable;
