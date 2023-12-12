import { TicketProps } from "./ticketprops";
import { mockData } from "./mock";

const fetchTicketData = async (): Promise<TicketProps[]> => {
  //   const apiUrl = `${process.env.NEXT_PUBLIC_API_INTRANET}/apirest.php/Ticket?order=desc`;
  const apiUrl = `${process.env.NEXT_PUBLIC_API_INTERNET}/apirest.php/Ticket?order=desc`;

  const headers = {
    "Content-Type": "application/json",
    "App-Token": process.env.NEXT_PUBLIC_AppToken || "",
    "Session-Token": process.env.NEXT_PUBLIC_SessionToken || "",
  };

  try {
    const response = await fetch(apiUrl, { headers });

    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }

    const responseData = await response.json();
    const filteredData = responseData.filter(
      (ticket: TicketProps) =>
        ticket.itilcategories_id !== 72 && ticket.status === 1
    );

    return filteredData;
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
