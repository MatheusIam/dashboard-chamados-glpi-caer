import mariadb from "mariadb";
import { NextResponse } from "next/server";

export async function GET() {
  const conn = await mariadb.createConnection({
    host: process.env.NEXT_PUBLIC_API_DB_HOST,
    user: process.env.NEXT_PUBLIC_API_DB_USER,
    password: process.env.NEXT_PUBLIC_API_DB_PASSWD,
    database: process.env.NEXT_PUBLIC_API_DB_NAME,
  });

  const today = new Date();
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    1,
    7,
    15,
    0
  );
  const endDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    12,
    45,
    59
  );

  const result = await conn.query(
    `SELECT 
    glpi_users.firstname, 
    CAST(glpi_users.id AS CHAR) AS ID,
    COUNT(*) as contagem 
  FROM glpi_tickets_users 
  INNER JOIN glpi_tickets ON glpi_tickets_users.tickets_id = glpi_tickets.id
  INNER JOIN glpi_users ON glpi_tickets_users.users_id = glpi_users.id
  WHERE glpi_tickets_users.type = 2 AND glpi_tickets.solvedate IS NOT NULL 
  GROUP BY glpi_users.firstname;
  `,
    (err: any, res: any, meta: any) => {
      if (err) {
        console.error("Erro durante a contagem de chamados atendidos: ", err);
      } else {
        console.log(res);
      }
    }
  );

  const data = await result.map((row: any) => ({
    ID: row.ID,
    firstname: row.firstname,
    contagem: Number(row.contagem), // Convertendo BigInt para número
  }));

  return NextResponse.json(data);
}
