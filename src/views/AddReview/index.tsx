import React from 'react';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { FormTextField } from '../../common/formComponent.tsx';
import { AddReviewCall } from '../../hooks/reviews.tsx';

export interface AddReviewData {
    company_id?: string;
    full_name: string;
    subject: string;
    review_text: string;
    rating: any;
}

export const AddReview = () => {

    const navigate = useNavigate();
    const theme = useTheme();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const addReviewSchema = yup.object().shape({
        full_name: yup.string().required('Full Name is required'),
        subject: yup.string().required('Review Subject is required'),
        review_text: yup.string().required('Review message is required'),
        rating: yup.number().min(0.5).max(5).required('Rating is required'),
    });

    const { ...formMethods } = useForm<AddReviewData>({
        mode: 'onTouched',
        defaultValues: {
            company_id: '',
            full_name: '',
            subject: '',
            review_text: '',
            rating: '',
        },
        resolver: yupResolver(addReviewSchema),
    });

    const { handleSubmit } = formMethods;

    const onSubmit = async (data) => {
        const response = await AddReviewCall({
            company_id: id,
            full_name: data.full_name,
            subject: data.subject,
            review_text: data.review_text,
            rating: data.rating,
        })
        if (response.status === 200) navigate('/')
    };

    return (
        <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
            <Paper elevation={3} className='form'>
                <Typography className='form-heading'>Add Companies Review</Typography>
                <Box display='flex' flexDirection='column' padding={3}>
                    <FormTextField
                        {...formMethods}
                        name='full_name'
                        label='Full name'
                        theme={theme}
                        handleBlur={() => { }}
                    />
                    <FormTextField
                        {...formMethods}
                        name='subject'
                        label='Subject'
                        theme={theme}
                        handleBlur={() => { }}
                    />
                    <FormTextField
                        {...formMethods}
                        name='review_text'
                        label='Review Text'
                        theme={theme}
                        handleBlur={() => { }}
                    />
                    <FormTextField
                        {...formMethods}
                        name='rating'
                        label='Rating'
                        theme={theme}
                        handleBlur={() => { }}
                    />
                    <Box display='flex' gap={2}>
                        <Button className='company-btn' type='submit' size='small' onClick={handleSubmit(onSubmit)}>Submit Review</Button>
                        <Button variant='outlined' size='small' onClick={() => navigate('/')}>Back</Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};
