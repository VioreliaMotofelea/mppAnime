import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Chip,
  Button,
  Paper,
  Grid,
  Divider,
  useTheme,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Anime } from '../types/anime';
import { animeApi } from '../services/api';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LanguageIcon from '@mui/icons-material/Language';
import AnimeForm from '../components/AnimeForm';

const StyledGrid = styled(Grid)(({ theme }) => ({
  '&.MuiGrid-item': {
    padding: theme.spacing(2),
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const AnimeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const theme = useTheme();

  const fetchAnime = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await animeApi.getAnimeById(id);
      setAnime(data);
    } catch (error) {
      setAnime(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime();
    // eslint-disable-next-line
  }, [id]);

  const handleEdit = async (values: Partial<Anime>) => {
    if (!id) return;
    try {
      const { episodes, ...rest } = values;
      await animeApi.updateAnime(id, rest);
      setEditOpen(false);
      setSuccess('Anime updated successfully!');
      fetchAnime();
    } catch {
      setSuccess('Failed to update anime');
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await animeApi.deleteAnime(id);
      setDeleteOpen(false);
      setSuccess('Anime deleted successfully!');
      setTimeout(() => navigate('/'), 1000);
    } catch {
      setSuccess('Failed to delete anime');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress sx={{ color: theme.palette.primary.main }} />
      </Box>
    );
  }

  if (!anime) {
    return (
      <Container>
        <Typography variant="h5" sx={{ textAlign: 'center', mt: 4 }}>
          Anime not found
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 2 }}>
          <Button variant="outlined" color="primary" onClick={() => setEditOpen(true)}>
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={() => setDeleteOpen(true)}>
            Delete
          </Button>
        </Box>
        <Grid container spacing={4}>
          {/* Left Column - Image and Basic Info */}
          <Grid component="div" xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                height: '100%',
              }}
            >
              <Box
                component="img"
                src={anime.imageUrl}
                alt={anime.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
              <Box sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    },
                    mb: 2,
                  }}
                >
                  Watch Now
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <StarIcon sx={{ color: '#FFD700', mr: 1 }} />
                  <Typography variant="h6">{anime.rating?.toFixed(1)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                  {(anime.genres || []).map((genre) => (
                    <Chip
                      key={genre}
                      label={genre}
                      size="small"
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Right Column - Detailed Info */}
          <Grid component="div" xs={12} md={8}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                height: '100%',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: theme.palette.text.primary,
                }}
              >
                {anime.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: theme.palette.text.secondary,
                  lineHeight: 1.7,
                }}
              >
                {anime.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={2}>
                <Grid component="div" xs={12} sm={6}>
                  {anime.aired && (
                    <StyledPaper>
                      <Typography variant="subtitle1" gutterBottom>
                        Aired
                      </Typography>
                      <Typography variant="body2">
                        {anime.aired}
                      </Typography>
                    </StyledPaper>
                  )}
                  <StyledPaper>
                    <Typography variant="subtitle1" gutterBottom>
                      Status
                    </Typography>
                    <Typography variant="body2">
                      {anime.status}
                    </Typography>
                  </StyledPaper>
                </Grid>
                <Grid component="div" xs={12} sm={6}>
                  {anime.type && (
                    <StyledPaper>
                      <Typography variant="subtitle1" gutterBottom>
                        Type
                      </Typography>
                      <Typography variant="body2">
                        {anime.type}
                      </Typography>
                    </StyledPaper>
                  )}
                  <StyledPaper>
                    <Typography variant="subtitle1" gutterBottom>
                      Episodes
                    </Typography>
                    <Typography variant="body2">
                      {anime.episodes}
                    </Typography>
                  </StyledPaper>
                  {anime.studio && (
                    <StyledPaper>
                      <Typography variant="subtitle1" gutterBottom>
                        Studio
                      </Typography>
                      <Typography variant="body2">
                        {anime.studio}
                      </Typography>
                    </StyledPaper>
                  )}
                  {anime.source && (
                    <StyledPaper>
                      <Typography variant="subtitle1" gutterBottom>
                        Source
                      </Typography>
                      <Typography variant="body2">
                        {anime.source}
                      </Typography>
                    </StyledPaper>
                  )}
                  <StyledPaper>
                    <Typography variant="subtitle1" gutterBottom>
                      Rating
                    </Typography>
                    <Typography variant="body2">
                      {anime.rating.toFixed(1)}
                    </Typography>
                  </StyledPaper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <AnimeForm
          open={editOpen}
          initialValues={anime}
          onSubmit={handleEdit}
          onCancel={() => setEditOpen(false)}
        />
        <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
          <DialogTitle>Delete Anime</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this anime?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess(null)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={() => setSuccess(null)} severity={success?.includes('successfully') ? 'success' : 'error'} sx={{ width: '100%' }}>
            {success}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default AnimeDetail; 