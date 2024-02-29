import mariadb from "mariadb";
import { NextResponse } from "next/server";
export async function GET() {
  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   next: { revalidate: 60 },
  // })

  const conn = await mariadb.createConnection({
    host: process.env.NEXT_PUBLIC_API_DB_HOST,
    user: process.env.NEXT_PUBLIC_API_DB_USER,
    password: process.env.NEXT_PUBLIC_API_DB_PASSWD,
    database: process.env.NEXT_PUBLIC_API_DB_NAME,
  });

  const result = await conn.query(
    "SELECT * FROM glpi_tickets WHERE status = 1 AND is_deleted != 1 AND itilcategories_id NOT IN (72, 74, 78, 79, 76, 75, 77, 11) ORDER BY id DESC LIMIT 50",
    (err: any, res: any, meta: any) => {
      if (err) {
        console.error("Error querying data: ", err);
      } else {
        console.log(res);
      }
    }
  );

  const data = await result;

  return NextResponse.json(data);
}
