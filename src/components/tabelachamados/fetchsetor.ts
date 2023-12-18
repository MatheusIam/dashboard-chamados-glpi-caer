import { SetorProps } from "./setorprops";

const fetchSetorData = async (): Promise<SetorProps[]> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_INTRANET}/apirest.php/location?glpilist_limit=999`;
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
    const filteredData = responseData.map(({ id, comment }: SetorProps) => ({
      id,
      comment,
    }));

    console.log(filteredData);
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

export default fetchSetorData;
