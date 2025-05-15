import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Stack,
  MenuItem,
} from '@mui/material';
import { Anime } from '../types/anime';

interface AnimeFormProps {
  open: boolean;
  initialValues?: Partial<Anime>;
  onSubmit: (anime: Partial<Anime>) => void;
  onCancel: () => void;
}

const statusOptions = [
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'completed', label: 'Completed' },
];

const AnimeForm: React.FC<AnimeFormProps> = ({ open, initialValues = {}, onSubmit, onCancel }) => {
  const [form, setForm] = useState<Partial<Anime>>({
    title: '',
    description: '',
    imageUrl: '',
    rating: 0,
    episodes: 1,
    status: 'ongoing',
    genres: [],
    releaseYear: new Date().getFullYear(),
    aired: '',
    type: '',
    studio: '',
    source: '',
    ...initialValues,
  });
  const [genreInput, setGenreInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddGenre = () => {
    if (genreInput && !form.genres?.includes(genreInput)) {
      setForm({ ...form, genres: [...(form.genres || []), genreInput] });
      setGenreInput('');
    }
  };

  const handleDeleteGenre = (genre: string) => {
    setForm({ ...form, genres: (form.genres || []).filter((g) => g !== genre) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{form.id ? 'Edit Anime' : 'Add Anime'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              fullWidth
              multiline
              minRows={2}
            />
            <TextField
              label="Image URL"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Rating"
              name="rating"
              type="number"
              inputProps={{ min: 0, max: 10, step: 0.1 }}
              value={form.rating}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Episodes"
              name="episodes"
              type="number"
              inputProps={{ min: 1 }}
              value={form.episodes}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              required
              fullWidth
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Box>
              <TextField
                label="Add Genre"
                value={genreInput}
                onChange={(e) => setGenreInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddGenre();
                  }
                }}
                sx={{ mr: 1, width: '60%' }}
              />
              <Button onClick={handleAddGenre} variant="outlined" sx={{ mt: 1, mb: 1 }}>
                Add
              </Button>
              <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {(form.genres || []).map((genre) => (
                  <Chip key={genre} label={genre} onDelete={() => handleDeleteGenre(genre)} />
                ))}
              </Box>
            </Box>
            <TextField
              label="Release Year"
              name="releaseYear"
              type="number"
              value={form.releaseYear}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Aired"
              name="aired"
              value={form.aired}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Type"
              name="type"
              value={form.type}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Studio"
              name="studio"
              value={form.studio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Source"
              name="source"
              value={form.source}
              onChange={handleChange}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {form.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AnimeForm; 