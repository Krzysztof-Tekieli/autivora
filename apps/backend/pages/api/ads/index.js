// pages/api/ads/index.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "GET") {
    try {
      const now = new Date();
      const ads = await prisma.ad.findMany({
        where: { status: "ACTIVE", expiresAt: { gt: now } },
        orderBy: { createdAt: "desc" },
        include: { images: true },
      });

      // Serializacja BigInt
      const serialized = ads.map(ad => ({
        ...ad,
        id: ad.id.toString(),
        price: Number(ad.price),
        images: ad.images.map(img => img.url),
      }));

      res.status(200).json(serialized);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Błąd serwera" });
    }
  } else if (req.method === "POST") {
    try {
      const { title, description, price, brand, model, year, images, packageType, phone } = req.body;

      if (!title || !description || !price || !brand || !model || !year || !packageType || !phone) {
        return res.status(400).json({ error: "Brakuje wymaganych pól" });
      }

      const newAd = await prisma.ad.create({
        data: {
          title,
          description,
          price: BigInt(price),
          brand,
          model,
          year: Number(year),
          packageType,
          phone,
          status: "ACTIVE",
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dni
        },
      });

      if (Array.isArray(images) && images.length > 0) {
        const imageData = images.map(url => ({ url, adId: newAd.id }));
        await prisma.adImage.createMany({ data: imageData });
      }

      // Pobieramy ad razem ze zdjęciami
      const adWithImages = await prisma.ad.findUnique({
        where: { id: newAd.id },
        include: { images: true },
      });

      res.status(201).json({
        ...adWithImages,
        id: adWithImages.id.toString(),
        price: Number(adWithImages.price),
        images: adWithImages.images.map(img => img.url),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Błąd serwera przy dodawaniu ogłoszenia" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "OPTIONS"]);
    res.status(405).json({ error: "Method not allowed" });
  }
}
