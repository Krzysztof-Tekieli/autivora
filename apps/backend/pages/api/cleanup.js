// pages/api/cleanup.js
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,x-cron-secret");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 🔐 proste zabezpieczenie
  if (req.headers["x-cron-secret"] !== process.env.CLEANUP_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const days = Number(process.env.EXPIRE_DAYS || 30);
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    // znajdź wygasłe ogłoszenia
    const expiredAds = await prisma.ad.findMany({
      where: { expiresAt: { lte: cutoff } },
      include: { images: true },
    });

    const adIds = expiredAds.map(ad => ad.id);

    // usuń zdjęcia z dysku
    for (const ad of expiredAds) {
      for (const img of ad.images) {
        try {
          const filePath = path.join(process.cwd(), "public", "uploads", path.basename(img.url));
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (err) {
          console.warn("Błąd przy kasowaniu pliku:", err);
        }
      }
    }

    // usuń z bazy (najpierw images, potem ads)
    await prisma.adImage.deleteMany({ where: { adId: { in: adIds } } });
    await prisma.ad.deleteMany({ where: { id: { in: adIds } } });

    return res.json({ success: true, deleted: adIds });
  } catch (err) {
    console.error("Cleanup error:", err);
    return res.status(500).json({ error: "Cleanup error" });
  }
}
