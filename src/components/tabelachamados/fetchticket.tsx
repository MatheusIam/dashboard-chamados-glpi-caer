import { TicketProps } from "./ticketprops";
import { mockData } from "./mock";

const fetchTicketData = async (): Promise<TicketProps[]> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_INTRANET}/apirest.php/Ticket?order=desc`;
  const apiUrl2 = `${process.env.NEXT_PUBLIC_API_INTRANET}/apirest.php/Ticket?expand_dropdowns=true&order=desc`;

  const headers = {
    "Content-Type": "application/json",
    "App-Token": process.env.NEXT_PUBLIC_AppToken || "",
    "Session-Token": process.env.NEXT_PUBLIC_SessionToken || "",
  };

  try {
    // Fetch data from apiUrl
    const response = await fetch(apiUrl, { headers });

    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }

    const responseData = await response.json();

    // Filter data from apiUrl
    const filteredData = responseData.filter(
      (ticket: TicketProps) =>
        ticket.itilcategories_id !== 72 &&
        (ticket.status === 1 || ticket.status === 2)
    );

    // Fetch data from apiUrl2
    const response2 = await fetch(apiUrl2, { headers });

    if (!response2.ok) {
      throw new Error(`Erro: ${response2.statusText}`);
    }

    const responseData2 = await response2.json();

    // Compare and replace users_id_recipient
    const updatedData = filteredData.map((ticket: TicketProps) => {
      const matchingTicket = responseData2.find(
        (t: TicketProps) => t.id === ticket.id
      );
      if (matchingTicket) {
        return {
          ...ticket,
          users_id_recipient: matchingTicket.users_id_recipient,
        };
      }
      return ticket;
    });

    console.log(updatedData);
    return updatedData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Não foi possível coletar os dados do GLPI", error.message);
    } else {
      console.error("Agora deu o caralho mesmo", error);
    }
    throw error;
  }
};

export default fetchTicketData;
