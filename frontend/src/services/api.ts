import axios from 'axios';
import { Anime, AnimeListResponse } from '../types/anime';

const API_URL = 'http://localhost:5000/api';

export const animeApi = {
  getAllAnimes: async (page = 1, limit = 10): Promise<AnimeListResponse> => {
    const response = await axios.get<AnimeListResponse>(`${API_URL}/animes?page=${page}&limit=${limit}`);
    return response.data;
  },

  getAnimeById: async (id: string): Promise<Anime> => {
    const response = await axios.get<Anime>(`${API_URL}/animes/${id}`);
    return response.data;
  },

  searchAnimes: async (query: string): Promise<AnimeListResponse> => {
    const response = await axios.get<AnimeListResponse>(`${API_URL}/animes/search?q=${query}`);
    return response.data;
  },

  createAnime: async (anime: Partial<Anime>): Promise<Anime> => {
    const response = await axios.post<Anime>(`${API_URL}/animes`, anime);
    return response.data;
  },

  updateAnime: async (id: string, anime: Partial<Anime>): Promise<Anime> => {
    const response = await axios.put<Anime>(`${API_URL}/animes/${id}`, anime);
    return response.data;
  },

  deleteAnime: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/animes/${id}`);
  }
}; 