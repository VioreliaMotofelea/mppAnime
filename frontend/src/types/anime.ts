export interface Anime {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  episodes: number;
  status: 'ongoing' | 'completed';
  genres: string[];
  releaseYear: number;
  aired: string;
  type: string;
  studio: string;
  source: string;
}

export interface AnimeListResponse {
  animes: Anime[];
  total: number;
  page: number;
  limit: number;
} 