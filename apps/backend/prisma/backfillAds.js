const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function backfill() {
  const ads = await prisma.ad.findMany();
  for (const ad of ads) {
    await prisma.ad.update({
      where: { id: ad.id },
      data: {
        phone: "123456789", // wpisz prawdziwy numer lub placeholder
        expiresAt: new Date(ad.createdAt.getTime() + 30*24*60*60*1000), // +30 dni
      },
    });
  }
  console.log("Backfill completed");
  await prisma.$disconnect();
}

backfill();
