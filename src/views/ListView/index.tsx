import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Container, Typography } from '@mui/material';
import { ListHeader } from './ListHeader.tsx';
import { UseGetCompany } from '../../hooks/company.tsx';
import { useNavigate } from 'react-router-dom';
import { Rating } from './rating.tsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ListView = () => {

  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCompanies = async (search?: any) => {
    try {
      const companyData = await UseGetCompany(search);
      const companiesWithAverageRating = companyData.data.map((company: any) => {
        const totalRating = company.Reviews.reduce((acc: any, review: any) => acc + parseInt(review.rating), 0);
        const averageRating = totalRating / (company.Reviews.length || 1);
        return { ...company, averageRating };
      });
      setCompanies(companiesWithAverageRating);
    } catch (error) {
      console.log('error', error)
      toast.error('Failed to fetch Company list');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
      <ToastContainer />
      <ListHeader onSearch={fetchCompanies} />
      <Box mt={5}>
        <Typography className="heading">Record Found: {companies.length}</Typography>
        {
          isLoading ? (
            <CircularProgress />
          ) : companies.length === 0 ? (
            <Typography className="heading" mt={3} textAlign='center'>No record found !</Typography>
          ) : (
            companies && companies?.map((company: any, index: any) => (
              <Card key={index} sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                <Box display='flex'>
                  <Box p={3}>
                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfot1wzj5kjYEHViQjoqOLevA1bupRKDBRQg&s"
                      alt="Company Logo"
                    />
                  </Box>
                    <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', justifyContent: "space-between" }}>
                      <Typography fontWeight="bold" className="text">{company.company_name}</Typography>
                      <Typography className="text">{company.location}</Typography>
                      <Box display='flex' gap={2}>
                        <Typography className="text">{company.Reviews ? company.averageRating.toFixed(1) : 0}</Typography>
                        <Rating rating={company.averageRating} color="gold" />
                        <Typography fontWeight="bold" className="text">{company.Reviews.length}  Reviews</Typography>
                      </Box>
                    </CardContent>
                </Box>
                <Box display='flex' flexDirection='column' justifyContent='space-around'>
                  <Typography className="text">Founded on : {company.founded_on}</Typography>
                  <Box display='flex' gap={2}>
                    <Button className='company-btn' variant="contained" size="small" onClick={() => navigate(`/add-review?id=${company.id.toString()}`)}>Add Review</Button>
                    <Button sx={{backgroundColor: "black"}} variant="contained" size="small" onClick={() => navigate(`/review-details?id=${company.id.toString()}`)}>Detail Review</Button>
                  </Box>
                </Box>
              </Card>
            ))
          )
        }
      </Box>
    </Container>
  )
}