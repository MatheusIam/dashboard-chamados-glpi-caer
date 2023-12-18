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

  // Para cada ticket, fazer um fetch na rota correspondente
  for (const ticket of tickets) {
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
          console.log("Incrementando Qtd para", actor.name);
        }
      }
    }

    console.log("Ticket:", ticketData);

    // Verificar se o tipo é 2, que é correspondente a técnico atribuído
    // if (ticketData.type === 2) {
    //   // Obter o id do usuário
    //   const userId = ticketData.users_id;

    //   // Procurar o usuário no array de atores
    //   const actor = actorRanking.find((actor) => actor.name === userId);

    //   // Se encontrar, incrementar a propriedade qtd
    //   if (actor) {
    //     actor.qtd++;
    //     console.log("Incrementando Qtd para", actor.name);
    //   }
    // }
  }

  console.log("Tickets:", tickets);
  console.log("Actor Ranking01:", actorRanking);

  // Retornar o array de atores atualizado
  return actorRanking;
};

export default updateActorRanking;
