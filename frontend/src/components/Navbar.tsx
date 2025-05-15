import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'Popular', path: '/popular' },
    { text: 'Latest', path: '/latest' },
    { text: 'Genres', path: '/genres' },
  ];

  const drawer = (
    <Box
      sx={{
        background: theme.palette.background.default,
        height: '100%',
        padding: '1rem',
      }}
    >
      <List>
        {navItems.map((item) => (
          <ListItem
            component={RouterLink}
            to={item.path}
            key={item.text}
            onClick={handleDrawerToggle}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 105, 180, 0.1)',
              },
              cursor: 'pointer',
            }}
          >
            <ListItemText
              primary={item.text}
              sx={{
                color: theme.palette.text.primary,
                '& .MuiTypography-root': {
                  fontWeight: 600,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'rgba(26, 26, 46, 0.8)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : null}

          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: theme.palette.primary.main,
              fontWeight: 700,
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <FavoriteIcon sx={{ color: theme.palette.primary.main }} />
            AnimeVerse
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    color: theme.palette.text.primary,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 105, 180, 0.1)',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              sx={{
                color: theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: 'rgba(255, 105, 180, 0.1)',
                },
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            background: theme.palette.background.default,
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar; 