// Filtrar os atores que estão atribuidos como técnicos nos chamados do GLPI
// Aqui deve ter este retorno: [{ nome: "Alice", value: 75 }]

import fetchTicketData from "../tabelachamados/fetchticket";
import { actorsInATicketProps } from "./actorsInATicketProps";

const headers = {
  "Content-Type": "application/json",
  "App-Token": process.env.NEXT_PUBLIC_AppToken || "",
  "Session-Token": process.env.NEXT_PUBLIC_SessionToken || "",
};

const fetchUsersData = async (
  apiUrl: string
): Promise<actorsInATicketProps> => {
  try {
    const response = await fetch(apiUrl, { headers });

    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        "Não foi possível coletar os dados de ATORES do GLPI",
        error.message
      );
    } else {
      console.error("Agora deu o caralho mesmo", error);
    }
    throw error;
  }
};

// Tickets de fetchTicketData()

let actors: actorsInATicketProps[] = [];

const fetchActorsInATicket = async (): Promise<actorsInATicketProps[]> => {
  const tickets = await fetchTicketData();

  const actorPromises = tickets.map(async (ticket) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_INTRANET}/apirest.php/Ticket/${ticket.id}/Ticket_User/?expand_dropdowns=true`;
    const actorsInATicket = await fetchUsersData(apiUrl);
    return actorsInATicket;
  });

  const actors = await Promise.all(actorPromises);
  return actors.flat(); // Flatten the array of arrays into a single array
};

export default fetchActorsInATicket;
