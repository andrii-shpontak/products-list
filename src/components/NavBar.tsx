import { Box, AppBar, Toolbar, Typography, IconButton, Stack, Container } from '@mui/material';
import { Menu, Facebook, Instagram, Twitter } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}>
                <Menu />
              </IconButton>
              <Typography variant="h6">Products List</Typography>
            </Stack>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100px',
              }}>
              <Link
                style={{ textDecoration: 'none', color: '#fff' }}
                target={'_blank'}
                to="https://www.facebook.com/">
                <Facebook />
              </Link>
              <Link
                style={{ textDecoration: 'none', color: '#fff' }}
                target={'_blank'}
                to="https://www.instagram.com/">
                <Instagram />
              </Link>
              <Link
                style={{ textDecoration: 'none', color: '#fff' }}
                target={'_blank'}
                to="https://twitter.com/">
                <Twitter />
              </Link>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
