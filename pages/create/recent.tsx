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

  const router = useRouter();
  const { user } = router.query;

  useEffect(() => {
    async function fetchBouquets() {
      const res = await fetch(
        `/api/getBouquets?limit=25${user ? `&user=${user}` : ""}`
      );
      const data = await res.json();
      setBouquets(data);
    }
    fetchBouquets();
  }, [user]);

  return (
    <div>
      <ul>
        {bouquets.map((bouquet) => (
          <li key={bouquet.id}>
            <div className={styles.bouquetDescription}>
              {bouquet.emoji} {bouquet.description} {bouquet.username}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
