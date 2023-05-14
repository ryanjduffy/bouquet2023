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

export default function UserPage() {
  const [bouquets, setBouquets] = useState<Bouquet[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");

  const router = useRouter();
  const { user } = router.query;

  useEffect(() => {
    async function fetchBouquets() {
      const res = await fetch(`/api/getBouquets?user=${user}`);
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

  // Group bouquets by week
  // Group bouquets by week
  const groupedBouquets = bouquets.reduce((acc, bouquet) => {
    const bouquetDate = new Date(bouquet.date);
    const weekStart = new Date(
      bouquetDate.getFullYear(),
      bouquetDate.getMonth(),
      bouquetDate.getDate() - bouquetDate.getDay()
    ); // Get the start of the week for the bouquet date
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // Get the end of the week for the bouquet date

    const options = { month: "long" as const, day: "numeric" as const };

    const formatter = new Intl.DateTimeFormat("en-US", options);

    const weekStartFormatted = formatter.format(weekStart);
    const weekEndFormatted = formatter.format(weekEnd);

    // If the start and end dates are in the same month, don't repeat the month
    const isSameMonth = weekStart.getMonth() === weekEnd.getMonth();
    const weekEndDay = weekEndFormatted.split(" ")[1]; // Extract the day from the formatted end date

    const weekRange = isSameMonth
      ? `${weekStartFormatted} - ${weekEndDay}`
      : `${weekStartFormatted} - ${weekEndFormatted}`;

    if (!acc[weekRange]) {
      acc[weekRange] = [];
    }

    acc[weekRange].push(bouquet);
    return acc;
  }, {});

  const addEmojiVariant = (emoji) => {
    if (emoji.slice(-1) !== "\uFE0F") {
      return emoji + "\uFE0F";
    }
    return emoji;
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className="mb-4 text-xl font-bold text-gray-400">{user}</h1>
      <div className={styles.bouquetContainer}>
        {Object.keys(groupedBouquets).map((weekRange) => (
          <div key={weekRange} className={styles.weekContainer}>
            <h2 className="font-medium text-gray-400">{weekRange}</h2>
            <div className={styles.emojiContainer}>
              {groupedBouquets[weekRange].map((bouquet) => (
                <div
                  key={bouquet.id}
                  className={`inline-block ${styles.emoji}`}
                  onClick={() => onEdit(bouquet)}
                >
                  {addEmojiVariant(bouquet.emoji)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
