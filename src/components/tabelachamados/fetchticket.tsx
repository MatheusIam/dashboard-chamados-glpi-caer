import { TicketProps } from "./ticketprops";

const fetchTicketData = async () => {
  const apiUrl = "http://172.16.95.125/apirest.php/Ticket";
  const headers = {
    "Content-Type": "application/json",
    "App-Token": process.env.AppToken || "",
    "Session-Token": process.env.SessionToken || "",
  };

  try {
    const response = await fetch(apiUrl, { headers });

    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }

    const data: TicketProps = await response.json();
    return data;
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
