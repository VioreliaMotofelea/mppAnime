import axios from 'axios';

interface SimulateOptions {
  baseUrl: string;
  token: string;
  requestCount?: number;
  delayMs?: number;
}

export const simulateSuspiciousActivity = async ({
  baseUrl,
  token,
  requestCount = 20,
  delayMs = 100
}: SimulateOptions) => {
  console.log('Starting suspicious activity simulation...');
  
  const endpoints = [
    '/api/anime',
    '/api/anime/1',
    '/api/anime/2',
    '/api/anime/3'
  ];

  const headers = {
    Authorization: `Bearer ${token}`
  };

  for (let i = 0; i < requestCount; i++) {
    const endpoint = endpoints[i % endpoints.length];
    const method = i % 2 === 0 ? 'get' : 'post';
    
    try {
      if (method === 'get') {
        await axios.get(`${baseUrl}${endpoint}`, { headers });
      } else {
        await axios.post(`${baseUrl}${endpoint}`, {
          title: `Test Anime ${i}`,
          description: `Test Description ${i}`,
          episodes: Math.floor(Math.random() * 100)
        }, { headers });
      }
      
      console.log(`Request ${i + 1}/${requestCount} completed`);
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, delayMs));
    } catch (error) {
      console.error(`Request ${i + 1} failed:`, error);
    }
  }

  console.log('Suspicious activity simulation completed');
}; 