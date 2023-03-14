import React, { useState, useEffect } from "react";
import styles from "../styles/bouquet.module.css";

interface Bouquet {
  id: number;
  description: string;
  date: string;
  username: string;
  emoji: string;
}

export default function Home() {
  const [bouquets, setBouquets] = useState<Bouquet[]>([]);

  useEffect(() => {
    async function fetchBouquets() {
      const res = await fetch("/api/getBouquets?limit=25");
      const data = await res.json();
      setBouquets(data);
    }
    fetchBouquets();
  }, []);

  return (
    <div>
      <ul>
        {bouquets.map((bouquet) => (
          <li key={bouquet.id}>
            <div className={styles.bouquetDescription}>
              {bouquet.emoji} {bouquet.description}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
