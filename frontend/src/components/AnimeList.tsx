import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Anime } from '../types/anime';
import AnimeCard from './AnimeCard';

interface AnimeListProps {
  animes: Anime[];
  onAnimeClick?: (anime: Anime) => void;
}

const AnimeList: React.FC<AnimeListProps> = ({ animes, onAnimeClick }) => {
  if (animes.length === 0) {
    return (
      <Container>
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No animes found
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)'
        },
        gap: 3,
        mt: 2
      }}>
        {animes.map((anime) => (
          <Box key={anime.id}>
            <AnimeCard
              anime={anime}
              onClick={() => onAnimeClick?.(anime)}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default AnimeList; 