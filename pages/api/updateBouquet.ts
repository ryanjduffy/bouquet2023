// pages/api/updateBouquet.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import emojiRegex from "emoji-regex";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "PUT") {
    const { id, description } = req.body;

    // Check if the description contains an emoji
    const hasEmoji = emojiRegex().test(description);
    // Set emoji to the matched emoji or ⚪️ if there is no emoji
    const emoji = hasEmoji ? description.match(emojiRegex())?.join("") : "⚪️";
    // Remove the emoji from the description
    const newDescription = description.replace(emojiRegex(), "").trim();

    try {
      const updatedBouquet = await prisma.bouquet2023.update({
        where: { id },
        data: { description: newDescription, emoji },
      });
      console.log("Updated bouquet:", updatedBouquet);
      res.status(200).json(updatedBouquet);
    } catch (error) {
      console.error("Error updating bouquet:", error);
      res.status(500).json({ message: "Error updating bouquet" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
