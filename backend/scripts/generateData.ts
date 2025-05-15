import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function generateUsers(count: number) {
  console.log(`Generating ${count} users...`);
  for (let i = 0; i < count; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      },
    });
  }
}

async function generateAnimes(count: number) {
  console.log(`Generating ${count} animes...`);
  for (let i = 0; i < count; i++) {
    await prisma.anime.create({
      data: {
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        imageUrl: faker.image.url(),
        //rating: faker.number.float({ min: 0, max: 10, precision: 0.1 }),
        rating: Number(faker.number.float({ min: 0, max: 10, fractionDigits: 1 })),
        episodes: faker.number.int({ min: 1, max: 1000 }),
        status: faker.helpers.arrayElement(['ongoing', 'completed', 'upcoming']),
      },
    });
  }
}

async function generateReviews(count: number) {
  console.log(`Generating ${count} reviews...`);
  const users = await prisma.user.findMany();
  const animes = await prisma.anime.findMany();

  for (let i = 0; i < count; i++) {
    //const user = faker.helpers.arrayElement(users);
    //const anime = faker.helpers.arrayElement(animes);

    const user: { id: number } = faker.helpers.arrayElement(users);
    const anime: { id: number } = faker.helpers.arrayElement(animes);

    try {
      await prisma.review.create({
        data: {
          content: faker.lorem.paragraph(),
          rating: faker.number.int({ min: 1, max: 10 }),
          userId: user.id,
          animeId: anime.id,
        },
      });
    } catch (error) {
      // Skip if review already exists for this user-anime pair
      continue;
    }
  }
}

async function main() {
  const USER_COUNT = 100000;
  const ANIME_COUNT = 100000;
  const REVIEW_COUNT = 100000;

  try {
    await generateUsers(USER_COUNT);
    await generateAnimes(ANIME_COUNT);
    await generateReviews(REVIEW_COUNT);
    console.log('Data generation completed successfully!');
  } catch (error) {
    console.error('Error generating data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 