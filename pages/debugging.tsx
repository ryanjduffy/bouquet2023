import { useEffect, useState } from "react";

const Debugging = () => {
  const [result, setResult] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/problems");
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const { problematicBouquets } = await response.json();
        setResult(problematicBouquets);
      } catch (error) {
        console.error("Error fetching problematic bouquets:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Debugging</h1>
      <ul>
        {result.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Debugging;
