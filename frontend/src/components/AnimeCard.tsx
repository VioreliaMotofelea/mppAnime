import React from 'react';
import { Card, CardContent, CardMedia, Typography, Rating, Box } from '@mui/material';
import { Anime } from '../types/anime';

interface AnimeCardProps {
  anime: Anime;
  onClick?: () => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onClick }) => {
  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': {
          transform: 'scale(1.02)',
          transition: 'transform 0.2s ease-in-out'
        }
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={anime.imageUrl}
        alt={anime.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {anime.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={anime.rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {anime.rating.toFixed(1)}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" noWrap>
          {anime.description}
        </Typography>
        <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {anime.genres.slice(0, 3).map((genre) => (
            <Typography key={genre} variant="caption" color="primary">
              {genre}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AnimeCard; 