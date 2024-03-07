import { Chamados } from "../../fetchTickets";

const tickets: Promise<Chamados> = fetch("/api/getTickets")
  .then((response) => {
    if (!response.ok) {
      throw new Error(
        "Não conseguir buscar os chamados. Verifique se o cliente está na intranet."
      );
    }
    return response.json();
  })
  .catch((error: any) => {
    // Handle error here
  });

export const ActorsInATicketData = async () => {};
