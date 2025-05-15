import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function generateUsers(count: number) {
  console.log(`Generating ${count} users...`);
  for (let i = 0; i < count; i++) {
    await prisma.user.create({
      data: {
        email: `user${i}_${faker.internet.email()}`,
        username: `user${i}_${faker.internet.username()}`,
        password: faker.internet.password(),
      },
    });
  }
}

async function generateAnimes(count: number) {
  console.log(`Generating ${count} animes...`);
  for (let i = 0; i < count; i++) {
    const anime = await prisma.anime.create({
      data: {
        title: `Anime Title ${i}`,
        description: `Description for anime ${i}`,
        imageUrl: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
        rating: Number(faker.number.float({ min: 0, max: 10, fractionDigits: 1 })),
        //episodes: faker.number.int({ min: 1, max: 1000 }),
        status: faker.helpers.arrayElement(['ongoing', 'completed', 'upcoming']),
        genres: ['Action', 'Adventure'],
        releaseYear: 2020 + (i % 5),
        aired: 'Spring',
        type: 'TV',
        studio: 'Studio Ghibli',
        source: 'Manga',
      },
    });

    for (let ep = 1; ep <= 2; ep++) {
      await prisma.episode.create({
        data: {
          title: `Episode ${ep}`,
          number: ep,
          animeId: anime.id,
        },
      });
    }
  }
}

async function generateReviews(count: number) {
  console.log(`Generating ${count} reviews...`);
  const users = await prisma.user.findMany();
  const animes = await prisma.anime.findMany();

  for (let i = 0; i < count; i++) {
    const user: { id: number } = faker.helpers.arrayElement(users);
    const anime: { id: number } = faker.helpers.arrayElement(animes);

    try {
      await prisma.review.create({
        data: {
          content: `Review content for anime ${anime.id} by user ${user.id}`,
          rating: faker.number.int({ min: 1, max: 10 }),
          userId: user.id,
          animeId: anime.id,
        },
      });
    } catch (error) {
      continue;
    }
  }
}

async function truncateTables() {
  await prisma.review.deleteMany({});
  await prisma.anime.deleteMany({});
  await prisma.user.deleteMany({});
}

async function main() {
  const USER_COUNT = 1000;
  const ANIME_COUNT = 100000;
  const REVIEW_COUNT = 1000;

  try {
    await truncateTables();
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