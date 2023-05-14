import React, { useState, useEffect } from "react";
import styles from "../../styles/bouquet.module.css";
import { useRouter } from "next/router";

interface Bouquet {
  id: number;
  description: string;
  date: string;
  username: string;
  emoji: string;
}

export default function Home() {
  const [bouquets, setBouquets] = useState<Bouquet[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true); // New loading state

  const router = useRouter();
  const { user } = router.query;

  useEffect(() => {
    async function fetchBouquets() {
      setIsLoading(true); // Set loading to true before fetching
      const res = await fetch(`/api/getBouquets?limit=25&user=${user}`);
      const data = await res.json();
      setBouquets(data);
      setIsLoading(false); // Set loading to false after fetching
    }
    fetchBouquets();
  }, [user]);

  const onEdit = (bouquet: Bouquet) => {
    setEditingId(bouquet.id);
    setEditingValue(bouquet.description);
  };

  const onSave = async (id: number) => {
    setEditingId(null);
    setEditingValue("");

    // Update the bouquet in the local state
    const updatedBouquets = bouquets.map((bouquet) =>
      bouquet.id === id ? { ...bouquet, description: editingValue } : bouquet
    );
    setBouquets(updatedBouquets);

    // Make API call to update the bouquet on the server
    await fetch(`/api/updateBouquet`, {
      method: "PUT",
      body: JSON.stringify({ id, description: editingValue }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div> // Show a loading message or a spinner
      ) : (
        <ul>
          {bouquets.map((bouquet) => (
            // Rest of your JSX...
          ))}
        </ul>
      )}
    </div>
  );
}
