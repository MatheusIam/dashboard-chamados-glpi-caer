import { UserProps } from "./userprops";

const filtrarGTI = (users: UserProps[]) => {
  let usersGTI: UserProps[] = [];
  users.forEach((user) => {
    if (user.entities_id === 0 && user.is_active === 1) {
      usersGTI.push(user);
    }
  });
  return usersGTI;
};

const fetchUsersData = async (): Promise<UserProps[]> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_INTRANET}/apirest.php/User`;
  // const apiUrl = `${process.env.NEXT_PUBLIC_API_INTERNET}/apirest.php/Ticket?order=desc`;

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

    // Precisa retornar assim: [{nome: "Matheus", qtdChamados: 59}, ...]
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        "Não foi possível coletar os dados de USUARIOS do GLPI",
        error.message
      );
    } else {
      console.error("Agora deu o caralho mesmo", error);
    }
    throw error;
  }
};

export default fetchUsersData;
