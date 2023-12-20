import { TicketProps } from "@/components/tabelachamados/ticketprops";
import fetchAllTicketData from "./fetchAllticket";
import { actorRankingProps } from "../fetchactors";
import fetchUsersData from "./fetchUsersChamados";

const updateUserRanking = async (): Promise<actorRankingProps[]> => {
  const tickets: TicketProps[] = await fetchAllTicketData();
  const usersRanking = await fetchUsersData();

  // Obter a data atual
  const hoje = new Date();

  // Obter o dia da semana atual
  const diaDaSemana = hoje.getDay();

  // Obter a data da segunda-feira desta semana
  const segundaFeira = new Date(hoje);
  segundaFeira.setDate(hoje.getDate() - diaDaSemana + 1);

  const ticketsDe1Semana = tickets.filter((ticket) => {
    const data = new Date(ticket.date_creation);

    // Verificar se a data do ticket está na mesma semana
    return (
      data >= segundaFeira && // A partir da segunda-feira
      data < new Date(segundaFeira.getTime() + 7 * 24 * 60 * 60 * 1000) // Até o próximo domingo
    );
  });

  console.log("Tickets de 1 semana:", ticketsDe1Semana);
  for (const ticket of ticketsDe1Semana) {
    const usuario = ticket.users_id_recipient;
    console.log("TICKET USUARIO: ", usuario);
    const actor = usersRanking.find((actor) => {
      // Verificar se o nome do ator é igual ao usuário ou apenas o primeiro nome
      return actor.name === usuario || actor.name.split(".")[0] === usuario;
    });

    if (actor) {
      actor.qtd++;
      console.log("Incrementando Qtd para USUARIO:", actor.name);
    }
  }

  return usersRanking;
};

export default updateUserRanking;
