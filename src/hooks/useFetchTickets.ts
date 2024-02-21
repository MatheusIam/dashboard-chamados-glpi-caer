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
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: "glpi10",
        });

        const result = await conn.query("SELECT * FROM table-name"); // Replace 'table-name'
        setTickets(result); // Assuming your result is an array of ticket objects
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
