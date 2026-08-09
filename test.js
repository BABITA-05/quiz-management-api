import prisma from "./src/prisma.js";

async function main() {
  await prisma.$connect();
  console.log("✅ Database Connected Successfully");
  await prisma.$disconnect();
}

main().catch(console.error);