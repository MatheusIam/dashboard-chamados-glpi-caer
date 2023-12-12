import fetchTicketData from "./fetchticket";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TicketProps } from "./ticketprops";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const fetchData = async () => {
  try {
    return await fetchTicketData();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Título", flex: 2 },
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
        console.error("Error fetching ticket data:", error);
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
