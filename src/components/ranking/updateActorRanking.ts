import fetchAllTicketData from "./fetchAllticket";
import fetchUsersData, { actorRankingProps } from "./fetchactors";
import { ticketIDProps } from "./ticketIDprops";

const updateActorRanking = async (): Promise<actorRankingProps[]> => {
  const tickets = await fetchAllTicketData();
  const actorRanking = await fetchUsersData();
  const ticketUrl = `${process.env.NEXT_PUBLIC_API_INTRANET}/apirest.php/Ticket`;
  const headers = {
    "Content-Type": "application/json",
    "App-Token": process.env.NEXT_PUBLIC_AppToken || "",
    "Session-Token": process.env.NEXT_PUBLIC_SessionToken || "",
  };

  const ticketsDe1Mes = tickets.filter((ticket) => {
    const data = new Date(ticket.date_creation);
    const dataAtual = new Date().getMonth();
    // const umMesAtras = new Date(dataAtual.setMonth(dataAtual.getMonth() - 1));
    return data.getMonth() == dataAtual;
  });

  console.log("Tickets de 1 mês:", ticketsDe1Mes);

  // Para cada ticket, fazer um fetch na rota correspondente
  for (const ticket of ticketsDe1Mes) {
    // Obter o id do ticket
    const ticketId = ticket.id;

    // Construir a URL completa com o id do ticket
    const fullUrl = `${ticketUrl}/${ticketId}/Ticket_User?expand_dropdowns=true`;

    // Fazer o fetch e obter o JSON
    const response = await fetch(fullUrl, { headers });
    const ticketData: ticketIDProps[] = await response.json();

    for (const item of ticketData) {
      if (item.type === 2) {
        const tecnico = item.users_id;
        const actor = actorRanking.find((actor) => actor.name === tecnico);
        if (actor) {
          actor.qtd++;
        }
      }
    }

    console.log("Ticket:", ticketData);
  }

  console.log("Tickets:", tickets);
  console.log("Actor Ranking01:", actorRanking);

  // Retornar o array de atores atualizado
  return actorRanking;
};

export default updateActorRanking;
