"use server";
import { cookies } from "next/headers";

export interface dataprops {
  username: string;
}

export async function create(data: dataprops) {
  // faça alguma lógica com os dados
  // ...

  // crie um cookie com o nome do usuário
  cookies().set("username", data.username);

  // retorne uma resposta
  return {
    status: 200,
    data: {
      message: "Cookie criado com sucesso",
    },
  };
}
