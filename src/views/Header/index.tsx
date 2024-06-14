import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { Star } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Header = () => {

  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }} className='header'>
      <AppBar position="static" color='transparent'>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <IconButton
            onClick={() => navigate('/')}
            className='logo-icon'
            edge="start"
            sx={{ mr: 2 }}
            style={{
              padding: 0,
              background: 'linear-gradient(100deg, #D100F3 5%, #002BC5 110%)',
            }}
          >
            <Star fontSize='small' style={{ color: 'white', WebkitBackgroundClip: 'text' }} />
          </IconButton>
          <Typography sx={{ flexGrow: 1, marginRight: '20px' }}>
            Review&<span style={{ fontWeight: 'bold' }}>RATE</span>
          </Typography>
          <Box display='flex' justifyContent='space-around' alignItems='center'>
            <TextField
              placeholder="Search"
              variant="outlined"
              size='small'
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="search"
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
            <Typography className='header-text'>SignUp</Typography>
            <Typography className='header-text'>Login</Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
