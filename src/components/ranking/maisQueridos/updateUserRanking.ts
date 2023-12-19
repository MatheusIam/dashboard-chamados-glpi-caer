import fetchAllTicketData from "../fetchAllticket";
import { actorRankingProps } from "../fetchactors";

const updateUserRanking = async(): Promise<actorRankingProps[]> => {

    const tickets = await fetchAllTicketData()

    // Obter a data atual
    const hoje = new Date();

    // Obter o dia da semana atual
    const diaDaSemana = hoje.getDay();

    // Obter a data da segunda-feira desta semana
    const segundaFeira = new Date(hoje);
    segundaFeira.setDate(hoje.getDate() - diaDaSemana + 1);

    const ticketsDe1Semana = tickets.filter((ticket) => {
        const data = new Date(ticket.date_creation);
        return data >= segundaFeira;
    });

    

    return (  );
}
 
export default updateUserRanking;