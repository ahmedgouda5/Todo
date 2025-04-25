import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

async function main() {
 await prisma.todo.createMany({
  data: Array.from({length:10},()=> ({
    title: faker.lorem.words(3),
    body: faker.lorem.sentence(),
    userId: faker.string.uuid(),
    completed: faker.datatype.boolean(),
  })),
 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
 