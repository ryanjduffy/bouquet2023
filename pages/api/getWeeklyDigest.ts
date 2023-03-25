import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user =
    typeof req.query.user === "string" ? req.query.user : req.query.user[0];
  const startDate =
    typeof req.query.startDate === "string"
      ? req.query.startDate
      : req.query.startDate?.[0] || "2023-03-13"; // Provide a default value here if needed

  const endDate =
    typeof req.query.endDate === "string"
      ? req.query.endDate
      : req.query.endDate?.[0] || "2023-03-19"; // Provide a default value here if needed

  try {
    console.log("Query parameters:", {
      user,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    });

    const bouquets = await prisma.bouquet2023.findMany({
      where: {
        username: user,
        date: {
          gte: new Date(startDate).toISOString(),
          lt: new Date(endDate).toISOString(),
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    console.log("Bouquets:", bouquets);

    res.status(200).json(bouquets);
  } catch (error) {
    console.error("Error fetching weekly digest data:", error);
    res.status(500).json({ message: "Server error" });
  }
}
