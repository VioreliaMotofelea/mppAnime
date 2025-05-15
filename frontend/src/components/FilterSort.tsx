import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Chip,
  Stack,
  Typography,
  Paper,
} from '@mui/material';

interface FilterSortProps {
  filters: {
    title: string;
    status: string;
    genre: string[];
    minRating: number;
    maxRating: number;
    releaseYear: number | null;
    studio: string;
    type: string;
    sortBy: string;
    order: 'ASC' | 'DESC';
  };
  onFilterChange: (filters: any) => void;
  availableGenres: string[];
}

const FilterSort: React.FC<FilterSortProps> = ({
  filters,
  onFilterChange,
  availableGenres,
}) => {
  const handleChange = (field: string, value: any) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Filters & Sort
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Title"
            value={filters.title}
            onChange={(e) => handleChange('title', e.target.value)}
            size="small"
            sx={{ minWidth: 200 }}
          />

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              label="Status"
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="ongoing">Ongoing</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Genre</InputLabel>
            <Select
              multiple
              value={filters.genre}
              label="Genre"
              onChange={(e) => handleChange('genre', e.target.value)}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {availableGenres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Studio</InputLabel>
            <Select
              value={filters.studio}
              label="Studio"
              onChange={(e) => handleChange('studio', e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="MAPPA">MAPPA</MenuItem>
              <MenuItem value="Studio Ghibli">Studio Ghibli</MenuItem>
              <MenuItem value="Kyoto Animation">Kyoto Animation</MenuItem>
              <MenuItem value="Madhouse">Madhouse</MenuItem>
              <MenuItem value="Bones">Bones</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={filters.type}
              label="Type"
              onChange={(e) => handleChange('type', e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="TV">TV</MenuItem>
              <MenuItem value="Movie">Movie</MenuItem>
              <MenuItem value="OVA">OVA</MenuItem>
              <MenuItem value="ONA">ONA</MenuItem>
              <MenuItem value="Special">Special</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Typography gutterBottom>Rating Range</Typography>
          <Slider
            value={[filters.minRating, filters.maxRating]}
            onChange={(_, newValue) => {
              const [min, max] = newValue as number[];
              handleChange('minRating', min);
              handleChange('maxRating', max);
            }}
            valueLabelDisplay="auto"
            min={0}
            max={10}
            step={0.5}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Release Year"
            type="number"
            value={filters.releaseYear || ''}
            onChange={(e) => handleChange('releaseYear', e.target.value ? Number(e.target.value) : null)}
            size="small"
            sx={{ width: 150 }}
          />

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={filters.sortBy}
              label="Sort By"
              onChange={(e) => handleChange('sortBy', e.target.value)}
            >
              <MenuItem value="id">Default</MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="releaseYear">Release Year</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Order</InputLabel>
            <Select
              value={filters.order}
              label="Order"
              onChange={(e) => handleChange('order', e.target.value)}
            >
              <MenuItem value="ASC">Ascending</MenuItem>
              <MenuItem value="DESC">Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
    </Paper>
  );
};

export default FilterSort; 