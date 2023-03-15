// pages/api/getBouquets.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, bouquet2023 } from "@prisma/client";
import emojiRegex from "emoji-regex";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { limit, user } = req.query;

  // Filter by the user query parameter
  const bouquets = await prisma.bouquet2023.findMany({
    where: user ? { username: user.toString() } : {},
    orderBy: { id: "desc" },
    take: Number(limit) || 25,
  });

  res.status(200).json(bouquets);
}
