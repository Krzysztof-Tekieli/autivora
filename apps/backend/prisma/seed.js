import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.ad.create({
    data: {
      title: "Audi A4 B9 2.0 TDI",
      description: "Stan techniczny idealny, pełna historia serwisowa",
      brand: "Audi",
      model: "A4",
      year: 2018,
      price: 90000,
      packageType: "Basic",
      status: "ACTIVE"
    }
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
