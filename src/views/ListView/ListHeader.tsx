import React from 'react'
import { LocationOn } from '@mui/icons-material'
import { Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const ListHeader = ({ onSearch }: any) => {

    const navigate = useNavigate();

    return (
        <Grid container sx={{ borderBottom: '1px solid #eeee', paddingBottom: "24px" }}>
            <Grid item lg={8} display='flex' alignItems='center' gap={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <TextField
                        id="selectCity"
                        variant="outlined"
                        fullWidth
                        size='small'
                        placeholder='Search City'
                        onChange={(e) => onSearch({ location: e.target.value })}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    aria-label="search"
                                    edge="end"
                                    style={{ color: 'linear-gradient(136.93deg, #D100F3 9.08%, #002BC5 108.36%)' }}
                                >
                                    <LocationOn />
                                </IconButton>
                            ),
                        }}
                    />
                </Box>
                <Button variant="contained" size='small' className='company-btn'>Find Company</Button>
            </Grid>
            <Grid item lg={4} display='flex' alignItems='center' gap={3}>
                <Button variant="contained" size='small' className='company-btn' onClick={() => navigate('/add-company')}>Add Company</Button>
                <FormControl size='small' sx={{ width: '20%' }}>
                    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={sort}
                        size='small'
                        // onChange={(e: any) => onSort(e)}
                        label="Sort"
                    >
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="location">Location</MenuItem>
                        <MenuItem value="rating">Rating</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}