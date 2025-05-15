import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  useTheme,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import AnimeForm from '../components/AnimeForm';
import { animeApi } from '../services/api';
import { Anime } from '../types/anime';

const Home = () => {
  const theme = useTheme();
  const [addOpen, setAddOpen] = useState(false);
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const fetchAnimes = async () => {
    setLoading(true);
    try {
      const data = await animeApi.getAllAnimes(1, 20); // adjust limit as needed
      setAnimes(data.animes || []);
    } catch (err) {
      setAnimes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimes();
  }, []);

  const handleAddAnime = async (anime: Partial<Anime>) => {
    try {
      await animeApi.createAnime(anime);
      setAddOpen(false);
      setSuccess(true);
      setFormKey((k) => k + 1); // reset form
      fetchAnimes();
    } catch (err) {
      alert('Failed to add anime');
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '500px',
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("https://wallpaperaccess.com/full/1098150.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          marginBottom: 4,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              marginBottom: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Welcome to AnimeVerse
          </Typography>
          <Typography
            variant="h5"
            sx={{
              marginBottom: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            Discover and watch your favorite anime series
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrowIcon />}
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Start Watching
          </Button>
        </Container>
      </Box>

      {/* Add Anime Button */}
      <Container maxWidth="lg" sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddOpen(true)}
          sx={{ fontWeight: 600 }}
        >
          + Add Anime
        </Button>
      </Container>

      {/* Featured Section */}
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            marginBottom: 3,
            fontWeight: 600,
            color: theme.palette.text.primary,
          }}
        >
          Featured Anime
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
            <CircularProgress />
          </Box>
        ) : (
          Array.isArray(animes) && animes.length > 0 ? (
            <Grid container spacing={3}>
              {animes.map((anime) => (
                <Grid item xs={12} sm={6} md={3} key={anime.id}>
                  <Card
                    component={RouterLink}
                    to={`/anime/${anime.id}`}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textDecoration: 'none',
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="300"
                      image={anime.imageUrl}
                      alt={anime.title}
                      sx={{
                        objectFit: 'cover',
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.text.primary,
                        }}
                      >
                        {anime.title}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: 1,
                        }}
                      >
                        <StarIcon
                          sx={{
                            color: '#FFD700',
                            marginRight: 0.5,
                            fontSize: '1.2rem',
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          {anime.rating}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {anime.genres && anime.genres.map((genre) => (
                          <Chip
                            key={genre}
                            label={genre}
                            size="small"
                            sx={{
                              backgroundColor: theme.palette.primary.main,
                              color: 'white',
                              '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography align="center" sx={{ mt: 4 }}>
              No anime found.
            </Typography>
          )
        )}
      </Container>

      <AnimeForm
        key={formKey}
        open={addOpen}
        onSubmit={handleAddAnime}
        onCancel={() => setAddOpen(false)}
      />
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Anime added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home; 