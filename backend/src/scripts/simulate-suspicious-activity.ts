import axios from 'axios';
import { UserRole, User } from '../entities/User';
import { AppDataSource } from '../data-source';

//const API_URL = 'http://localhost:5000/api';
const API_URL = 'https://mppanime-backend.onrender.com/api/animes';

type Operation = {
  method: 'POST' | 'PUT' | 'DELETE';
  url: string;
  data?: any;
};

async function checkServerRunning() {
  try {
    await axios.get(`${API_URL}/animes`);
    return true;
  } catch (error) {
    return false;
  }
}

async function simulateSuspiciousActivity() {
  try {
    // Check if server is running
    const isServerRunning = await checkServerRunning();
    if (!isServerRunning) {
      console.error('Error: Server is not running. Please start the server first with "npm run dev"');
      return;
    }

    // Initialize TypeORM
    await AppDataSource.initialize();

    // Create a test user
    const userRepo = AppDataSource.getRepository(User);
    const user = userRepo.create({
      email: `test${Date.now()}@example.com`,
      username: `testuser${Date.now()}`,
      password: 'password123',
      role: UserRole.USER
    });
    await userRepo.save(user);

    console.log('Created test user:', user);

    // Simulate rapid CRUD operations
    const operations: Operation[] = [
      // Create multiple animes
      ...Array(60).fill(null).map(() => ({
        method: 'POST' as const,
        url: `${API_URL}/animes`,
        data: {
          title: `Test Anime ${Math.random()}`,
          description: 'Test description',
          imageUrl: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
          status: 'ongoing',
          genres: ['Action'],
          releaseYear: 2024,
          aired: '2024',
          type: 'TV',
          studio: 'Test Studio',
          source: 'Manga'
        }
      })),
      // Update multiple animes
      ...Array(40).fill(null).map(() => ({
        method: 'PUT' as const,
        url: `${API_URL}/animes/${Math.floor(Math.random() * 10) + 1}`,
        data: {
          title: `Updated Anime ${Math.random()}`
        }
      })),
      // Delete multiple animes
      ...Array(15).fill(null).map(() => ({
        method: 'DELETE' as const,
        url: `${API_URL}/animes/${Math.floor(Math.random() * 10) + 1}`
      }))
    ];

    console.log(`\nStarting simulation with ${operations.length} operations...`);
    let successCount = 0;
    let failureCount = 0;

    // Execute operations with minimal delay
    for (const [index, operation] of operations.entries()) {
      try {
        const config = {
          method: operation.method,
          url: operation.url,
          headers: {
            'Authorization': `Bearer ${user.id}`
          }
        };
        
        if (operation.data) {
          Object.assign(config, { data: operation.data });
        }

        console.log(`\nOperation ${index + 1}/${operations.length}:`);
        console.log(`${operation.method} ${operation.url}`);
        if (operation.data) {
          console.log('Data:', JSON.stringify(operation.data, null, 2));
        }

        const response = await axios(config);
        console.log('Response:', {
          status: response.status,
          data: response.data
        });
        successCount++;

        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error: any) {
        failureCount++;
        if (error.response) {
          console.error('Error executing operation:', {
            status: error.response.status,
            message: error.response.data?.message || error.message,
            url: operation.url,
            method: operation.method
          });
        } else {
          console.error('Error executing operation:', error.message || 'Unknown error');
        }
      }
    }

    console.log('\nSimulation Summary:');
    console.log(`Total operations: ${operations.length}`);
    console.log(`Successful: ${successCount}`);
    console.log(`Failed: ${failureCount}`);
    console.log('Suspicious activity simulation completed');
  } catch (error) {
    console.error('Error in simulation:', error);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

simulateSuspiciousActivity(); 