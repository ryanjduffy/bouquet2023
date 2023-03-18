import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, bouquet2023 } from "@prisma/client";
import emojiRegex from "emoji-regex";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    const { description, username } = req.body;
    const date = new Date(req.body.date);
    console.log("Received request:", { description, date, username });
    // Check if the description contains an emoji
    const hasEmoji = emojiRegex().test(description);
    // Set emoji to the matched emoji or ⚪️ if there is no emoji
    const emoji = hasEmoji ? description.match(emojiRegex())?.join("") : "⚪️";
    // Remove the emoji from the description
    const newDescription = description.replace(emojiRegex(), "").trim();

    try {
      const bouquet = await prisma.bouquet2023.create({
        data: { description: newDescription, date, username, emoji },
      });
      console.log("Created bouquet:", bouquet);
      res.status(200).json(bouquet);
    } catch (error) {
      console.error("Error creating bouquet:", error);
      res.status(500).json({ message: "Error creating bouquet" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
