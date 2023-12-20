import { TicketProps } from "@/components/tabelachamados/ticketprops";

const fetchAllTicketData = async (): Promise<TicketProps[]> => {
  const apiUrl2 = `${process.env.NEXT_PUBLIC_API_INTRANET}/apirest.php/Ticket?expand_dropdowns=true&order=desc&glpilist_limit=9999`;

  const headers = {
    "Content-Type": "application/json",
    "App-Token": process.env.NEXT_PUBLIC_AppToken || "",
    "Session-Token": process.env.NEXT_PUBLIC_SessionToken || "",
  };

  try {
    // Fetch data from apiUrl2
    const response2 = await fetch(apiUrl2, { headers });

    if (!response2.ok) {
      throw new Error(`Erro: ${response2.statusText}`);
    }

    const responseData2 = await response2.json();

    return responseData2;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Não foi possível coletar os dados do GLPI", error.message);
    } else {
      console.error("Agora deu o caralho mesmo", error);
    }
    throw error;
  }
};

export default fetchAllTicketData;
