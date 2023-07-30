import { PrismaClient } from ".prisma/client";
import * as argon from "argon2";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.user.create({
    data: {
      email: "test@gmail.com",
      firstName: "Test",
      lastName: "User",
      password: await argon.hash("Test123!"),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.warn(e);
    await prisma.$disconnect();
    process.exit(1);
  });
