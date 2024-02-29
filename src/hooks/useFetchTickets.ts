import mariadb from "mariadb";
import { useState, useEffect } from "react"; // Import React hooks

export function useFetchTickets() {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const conn = await mariadb.createConnection({
          host: process.env.NEXT_PUBLIC_API_DB_HOST,
          user: process.env.NEXT_PUBLIC_API_DB_USER,
          password: process.env.NEXT_PUBLIC_API_DB_PASSWORD,
          database: process.env.NEXT_PUBLIC_API_DB_NAME,
        });

        const result = await conn.query("SELECT * FROM glpi_tickets");
        setTickets(result);
        setError(null);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array: fetch data only on component mount

  return { tickets, isLoading, error };
}
