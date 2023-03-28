import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  Container,
  Button,
} from '@mui/material';
import { Menu, Facebook, Instagram, Twitter } from '@mui/icons-material';

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
              <Facebook />
              <Instagram />
              <Twitter />
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
