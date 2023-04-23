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

  const router = useRouter();
  const { user } = router.query;

  useEffect(() => {
    async function fetchBouquets() {
      const res = await fetch(`/api/getBouquets?limit=1&user=${user}`);
      const data = await res.json();
      setBouquets(data);
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
      <h2>
        This is a temporary hack right now, and not showing the right data. Stay
        tuned.
      </h2>
      <ul>
        {bouquets.map((bouquet) => (
          <li key={bouquet.id}>
            {editingId === bouquet.id ? (
              <input
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
                onBlur={() => onSave(bouquet.id)}
              />
            ) : (
              <div
                className={styles.bouquetDescription}
                onClick={() => onEdit(bouquet)}
              >
                {bouquet.emoji} {bouquet.description}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
