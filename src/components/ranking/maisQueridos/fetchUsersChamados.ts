import { UserProps } from "../userprops";

export interface actorRankingProps {
  name: string;
  qtd: number;
}

const fetchUsersData = async (): Promise<actorRankingProps[]> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_INTRANET}/apirest.php/User?expand_dropdowns=true`;

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
    console.log("Actor Data:", responseData);

    const actorRanking: actorRankingProps[] = responseData
      .filter((user: UserProps) => user.is_active === 1)
      .map((user: UserProps) => ({ name: user.name, qtd: 0 }));

    console.log("Actor Ranking:", actorRanking);
    return actorRanking;
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

export default fetchUsersData;
