import fetchTicketData from "./fetchticket";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TicketProps } from "./ticketprops";
import React, { useEffect, useState } from "react";

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
  }, []);
  return <DataGrid rows={data} columns={columns} />;
};

export default TicketTable;
