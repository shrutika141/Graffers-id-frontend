import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { detailReviewCall } from '../../hooks/reviews.tsx';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography } from '@mui/material';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

export const ReviewDetails = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const [reviewDetails, setReviewDetails] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('desc');

    const fetchReviewDetails = async () => {
        try {
            const details = await detailReviewCall(id);
            setReviewDetails(details.data);
        } catch (error) {
            console.error('Error fetching review details:', error);
            toast.error('Failed to fetch review details');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRatingSort = () => {
        const sortedDetails = [...reviewDetails].sort((a, b) => {
            if (sortOrder === 'asc') {
                return parseFloat(a.rating) - parseFloat(b.rating);
            } else {
                return parseFloat(b.rating) - parseFloat(a.rating);
            }
        });
        setReviewDetails(sortedDetails);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
    };

    useEffect(() => {
        fetchReviewDetails();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
            <ToastContainer />
            <Typography className="heading" mb={3}>Reviewer Details</Typography>
            {isLoading ? (
                <CircularProgress />
            ) : (
                reviewDetails && (
                    <TableContainer component={Paper}>
                        <Table aria-label="review details table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Reviewer Name</TableCell>
                                    <TableCell>Subject</TableCell>
                                    <TableCell>Review Message</TableCell>
                                    <TableCell onClick={handleRatingSort} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', }}>
                                        <span>Rating</span>
                                        {sortOrder === 'asc' ? <ArrowUpward sx={{ fontSize: "15px",  marginleft: "5px"}} /> : <ArrowDownward sx={{ fontSize: "15px",  marginleft: "5px"}} />}
                                    </TableCell>
                                    <TableCell>Reviewed Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    reviewDetails?.map((detail: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell>{detail.full_name}</TableCell>
                                            <TableCell>{detail.subject}</TableCell>
                                            <TableCell>{detail.review_text}</TableCell>
                                            <TableCell>{detail.rating}</TableCell>
                                            <TableCell>{moment(new Date(detail.createdAt)).format('DD-MM-YYYY')}</TableCell>

                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            )}
        </Container>
    );
};