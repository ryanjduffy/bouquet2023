import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const bouquets = await prisma.bouquet2023.findMany();
    const problematicBouquets: string[] = [];

    for (const bouquet of bouquets) {
      if (bouquet.description.includes("\u0000")) {
        problematicBouquets.push(
          `Bouquet with ID ${bouquet.id} has an invalid character in the description.`
        );
      }
    }

    res.status(200).json({ problematicBouquets });
  } catch (error) {
    console.error("Error fetching bouquets:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
