import { NextApiRequest, NextApiResponse } from "next";
import RSS from "rss";
import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { user } = req.query;
    const now = new Date();
    const startDate = new Date("2023-03-15");
    const totalWeeks = Math.ceil(
      (now.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)
    );

    const feed = new RSS({
      title: `${user}'s Weekly Digest`,
      description: "A weekly digest of bouquets",
      feed_url: `${process.env.API_BASE_URL}/api/weeklyDigestRss?user=${user}`,
      site_url: `${process.env.SITE_URL}/user/${user}`,
      pubDate: now.toISOString(),
    });

    for (let week = 0; week <= totalWeeks; week++) {
      const weekStartDate = new Date(startDate);
      weekStartDate.setDate(weekStartDate.getDate() + 7 * week);
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 7);

      try {
        const response = await fetch(
          `${
            process.env.API_BASE_URL
          }/api/getWeeklyDigest?user=${user}&startDate=${weekStartDate.toISOString()}&endDate=${weekEndDate.toISOString()}`
        );

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const bouquets = await response.json();

        if (bouquets.length === 0) {
          continue;
        }

        const digestContent = bouquets
          .map(
            (bouquet) =>
              `${bouquet.emoji} ${bouquet.description} - ${new Date(
                bouquet.date
              ).toLocaleDateString()}`
          )
          .join("\n");

        feed.item({
          title: `Weekly Digest - ${weekStartDate.toLocaleDateString()} - ${weekEndDate.toLocaleDateString()}`,
          description: digestContent,
          url: `${process.env.SITE_URL}/user/${user}`,
          author: user,
          date: weekEndDate,
        });
      } catch (error) {
        console.error(`Error fetching weekly digest for week ${week}:`, error);
      }
    }

    res.setHeader("Content-Type", "application/rss+xml");
    res.send(feed.xml());
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    res.status(500).json({ message: "Server error" });
  }
}
