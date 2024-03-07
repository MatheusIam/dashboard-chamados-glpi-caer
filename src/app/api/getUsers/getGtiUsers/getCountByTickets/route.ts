import mariadb from "mariadb";
import { NextResponse } from "next/server";

export async function GET() {
  const conn = await mariadb.createConnection({
    host: process.env.NEXT_PUBLIC_API_DB_HOST,
    user: process.env.NEXT_PUBLIC_API_DB_USER,
    password: process.env.NEXT_PUBLIC_API_DB_PASSWD,
    database: process.env.NEXT_PUBLIC_API_DB_NAME,
  });

  const OFFSET_HOURS = -4; // Offset for your timezone (-04)

  const today = new Date();
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    1,
    7,
    15,
    0 // Standard local time values
  );
  const endDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    12,
    45,
    59
  );

  // Apply timezone offset during creation:
  startDate.setUTCHours(startDate.getUTCHours() + OFFSET_HOURS);
  endDate.setUTCHours(endDate.getUTCHours() + OFFSET_HOURS);

  // Formatting for MariaDB (with timezone)
  const formattedStartDate =
    startDate.toISOString().slice(0, 19).replace("T", " ") + "-04:00";
  const formattedEndDate =
    endDate.toISOString().slice(0, 19).replace("T", " ") + "-04:00";

  console.log(formattedStartDate);
  console.log(formattedEndDate);

  const result = await conn.query(
    `SELECT 
    glpi_users.firstname, 
    CAST(glpi_users.id AS CHAR) AS ID,
    COUNT(*) as contagem 
  FROM glpi_tickets_users 
  INNER JOIN glpi_tickets ON glpi_tickets_users.tickets_id = glpi_tickets.id
  INNER JOIN glpi_users ON glpi_tickets_users.users_id = glpi_users.id
  WHERE glpi_tickets_users.type = 2 AND glpi_tickets.solvedate IS NOT NULL AND glpi_tickets.solvedate BETWEEN ? AND ?
  GROUP BY glpi_users.firstname;
  `,
    [formattedStartDate, formattedEndDate]
  );

  const data = await result.map((row: any) => ({
    ID: row.ID,
    firstname: row.firstname,
    contagem: Number(row.contagem), // Convertendo BigInt para número
  }));

  return NextResponse.json(data);
}
