import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { id } = req.query;

  if (req.method === "GET") {
    const adId = parseInt(id, 10);
    if (isNaN(adId)) {
      return res.status(400).json({ error: "Nieprawidłowe ID" });
    }

    try {
      const ad = await prisma.ad.findUnique({
        where: { id: adId },
        include: { images: true },
      });

      // dodatkowa kontrola wygasłych ogłoszeń
      if (
        !ad ||
        ad.status !== "ACTIVE" ||
        ad.expiresAt <= new Date()
      ) {
        return res.status(404).json({ error: "Ogłoszenie nie znalezione lub wygasło" });
      }

      const formattedAd = {
        ...ad,
        id: ad.id.toString(),         // id jako string
        price: Number(ad.price),      // BigInt -> Number
        packageTier: ad.packageType,
        images: ad.images.map((img) => img.url),
      };

      res.status(200).json(formattedAd);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Błąd serwera" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: "Method not allowed" });
  }
}
