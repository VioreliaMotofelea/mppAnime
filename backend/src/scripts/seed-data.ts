import { faker } from '@faker-js/faker';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { Anime } from '../entities/Anime';
import { Review } from '../entities/Review';
import { Episode } from '../entities/Episode';
import { UserRole } from '../entities/User';
import { Not, IsNull } from 'typeorm';

const BATCH_SIZE = 100; // Reduced batch size for better control

async function cleanup() {
  try {
    await AppDataSource.initialize();
    console.log('Cleaning up existing data...');

    // Delete in correct order to respect foreign key constraints
    const reviewRepo = AppDataSource.getRepository(Review);
    const episodeRepo = AppDataSource.getRepository(Episode);
    const animeRepo = AppDataSource.getRepository(Anime);
    const userRepo = AppDataSource.getRepository(User);

    console.log('Starting cleanup process...');

    // Delete reviews first
    console.log('Deleting reviews...');
    const reviewResult = await reviewRepo.delete({ id: Not(IsNull()) });
    console.log(`Deleted ${reviewResult.affected} reviews`);

    // Delete episodes
    console.log('Deleting episodes...');
    const episodeResult = await episodeRepo.delete({ id: Not(IsNull()) });
    console.log(`Deleted ${episodeResult.affected} episodes`);

    // Delete animes
    console.log('Deleting animes...');
    const animeResult = await animeRepo.delete({ id: Not(IsNull()) });
    console.log(`Deleted ${animeResult.affected} animes`);

    // Delete users
    console.log('Deleting users...');
    const userResult = await userRepo.delete({ id: Not(IsNull()) });
    console.log(`Deleted ${userResult.affected} users`);

    console.log('Cleanup completed successfully');
  } catch (error) {
    console.error('Error during cleanup:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
    }
    throw error;
  } finally {
    try {
      await AppDataSource.destroy();
      console.log('Database connection closed');
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  }
}

async function seedData() {
  try {
    console.log('Starting data seeding process...');
    
    // Clean up existing data first
    await cleanup();
    console.log('Cleanup completed, proceeding with data seeding...');

    await AppDataSource.initialize();
    console.log('Connected to database');

    // Create users
    const userRepo = AppDataSource.getRepository(User);
    console.log('Creating users...');
    
    // Track used emails and usernames across all batches
    const usedEmails = new Set<string>();
    const usedUsernames = new Set<string>();
    
    // First create admin user
    const adminEmail = faker.internet.email();
    const adminUsername = faker.internet.userName();
    usedEmails.add(adminEmail);
    usedUsernames.add(adminUsername);
    
    const admin = userRepo.create({
      email: adminEmail,
      username: adminUsername,
      password: 'password123',
      role: UserRole.ADMIN
    });
    await userRepo.save(admin);
    console.log('Created admin user');
    
    // Create regular users in smaller batches
    for (let i = 0; i < 999; i += BATCH_SIZE) {
      const users = [];
      const batchSize = Math.min(BATCH_SIZE, 999 - i);
      
      for (let j = 0; j < batchSize; j++) {
        let email: string;
        let username: string;
        let attempts = 0;
        const maxAttempts = 10;
        
        // Generate unique email with retry
        do {
          email = faker.internet.email();
          attempts++;
          if (attempts >= maxAttempts) {
            throw new Error(`Failed to generate unique email after ${maxAttempts} attempts`);
          }
        } while (usedEmails.has(email));
        usedEmails.add(email);
        
        // Reset attempts for username
        attempts = 0;
        
        // Generate unique username with retry
        do {
          username = faker.internet.userName();
          attempts++;
          if (attempts >= maxAttempts) {
            throw new Error(`Failed to generate unique username after ${maxAttempts} attempts`);
          }
        } while (usedUsernames.has(username));
        usedUsernames.add(username);

        const user = userRepo.create({
          email,
          username,
          password: 'password123',
          role: UserRole.USER
        });
        users.push(user);
      }
      
      // Save batch and verify
      const savedUsers = await userRepo.save(users);
      console.log(`Created users ${i + 1} to ${i + batchSize}`);
      
      // Verify uniqueness after save
      const emails = savedUsers.map(u => u.email);
      const usernames = savedUsers.map(u => u.username);
      
      if (new Set(emails).size !== emails.length || new Set(usernames).size !== usernames.length) {
        throw new Error('Duplicate values detected after save');
      }
    }
    console.log('Users created');

    // Create animes
    const animeRepo = AppDataSource.getRepository(Anime);
    console.log('Creating animes...');
    for (let i = 0; i < 100000; i += BATCH_SIZE) {
      const animes = [];
      const batchSize = Math.min(BATCH_SIZE, 100000 - i);
      for (let j = 0; j < batchSize; j++) {
        const anime = animeRepo.create({
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          imageUrl: faker.image.url(),
          rating: faker.number.float({ min: 0, max: 10, fractionDigits: 1 }),
          status: faker.helpers.arrayElement(['ongoing', 'completed', 'upcoming']),
          genres: faker.helpers.arrayElements(['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi'], { min: 1, max: 4 }),
          releaseYear: faker.number.int({ min: 1990, max: 2024 }),
          aired: faker.date.past().toISOString(),
          type: faker.helpers.arrayElement(['TV', 'Movie', 'OVA', 'ONA']),
          studio: faker.company.name(),
          source: faker.helpers.arrayElement(['Manga', 'Light Novel', 'Original', 'Game'])
        });
        animes.push(anime);
      }
      await animeRepo.save(animes);
      console.log(`Created animes ${i + 1} to ${i + batchSize}`);
    }
    console.log('Animes created');

    // Get all animes for episode creation
    const allAnimes = await animeRepo.find();
    const episodeRepo = AppDataSource.getRepository(Episode);
    console.log('Creating episodes...');
    for (let i = 0; i < allAnimes.length; i += BATCH_SIZE) {
      const batchAnimes = allAnimes.slice(i, i + BATCH_SIZE);
      for (const anime of batchAnimes) {
        const episodeCount = faker.number.int({ min: 1, max: 24 });
        const episodes = [];
        for (let j = 0; j < episodeCount; j++) {
          const episode = episodeRepo.create({
            title: faker.lorem.words(3),
            number: j + 1,
            animeId: anime.id
          });
          episodes.push(episode);
        }
        await episodeRepo.save(episodes);
      }
      console.log(`Created episodes for animes ${i + 1} to ${i + batchAnimes.length}`);
    }
    console.log('Episodes created');

    // Get all users for review creation
    const allUsers = await userRepo.find();
    const reviewRepo = AppDataSource.getRepository(Review);
    console.log('Creating reviews...');
    
    // Keep track of which animes each user has reviewed
    const userReviewedAnimes = new Map<number, Set<number>>();
    
    for (let i = 0; i < allUsers.length; i += BATCH_SIZE) {
      const batchUsers = allUsers.slice(i, i + BATCH_SIZE);
      for (const user of batchUsers) {
        const reviewCount = faker.number.int({ min: 1, max: 50 });
        const reviews = [];
        const userAnimes = userReviewedAnimes.get(user.id) || new Set<number>();
        
        for (let j = 0; j < reviewCount; j++) {
          // Find an anime that hasn't been reviewed by this user
          let anime;
          do {
            anime = faker.helpers.arrayElement(allAnimes);
          } while (userAnimes.has(anime.id));
          
          userAnimes.add(anime.id);
          const review = reviewRepo.create({
            content: faker.lorem.paragraph(),
            rating: faker.number.int({ min: 1, max: 10 }),
            user: user,
            anime: anime
          });
          reviews.push(review);
        }
        
        userReviewedAnimes.set(user.id, userAnimes);
        await reviewRepo.save(reviews);
      }
      console.log(`Created reviews for users ${i + 1} to ${i + batchUsers.length}`);
    }
    console.log('Reviews created');

    console.log('Data seeding completed');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

seedData(); 