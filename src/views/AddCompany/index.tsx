import React from 'react';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { FormTextField } from '../../common/formComponent.tsx';
import { UseAddCompany } from '../../hooks/company.tsx';

export interface AddCompanyData {
  company_name: string;
  location: string;
  founded_on: string;
  city: string;
}

export const AddCompany = () => {

  const navigate = useNavigate();
  const theme = useTheme();

  const addCompanySchema = yup.object().shape({
    company_name: yup.string().required('Company Name is required'),
    location: yup.string().required('Location is required'),
    founded_on: yup.string().required('Founded On is required'),
    city: yup.string().required('City is required'),
  });

  const { ...formMethods } = useForm<AddCompanyData>({
    mode: 'onTouched',
    defaultValues: {
      company_name: '',
      location: '',
      founded_on: '',
      city: '',
    },
    resolver: yupResolver(addCompanySchema),
  });

  const { handleSubmit } = formMethods;

  const onSubmit = async (data) => {
    const response = await UseAddCompany(data)
    if (response.status === 200) navigate('/')
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
      <Paper elevation={3} className='form'>
        <Typography className='form-heading'>Add Company</Typography>
        <Box display='flex' flexDirection='column' padding={3}>
          <FormTextField
            {...formMethods}
            name='company_name'
            label='Company name'
            // width={246}
            theme={theme}
            handleBlur={() => { }}
          />
          <FormTextField
            {...formMethods}
            name='location'
            label='Location'
            // width={246}
            theme={theme}
            handleBlur={() => { }}
          />
          <FormTextField
            {...formMethods}
            name='founded_on'
            label='Founded On'
            // width={246}
            theme={theme}
            handleBlur={() => { }}
          />
          <FormTextField
            {...formMethods}
            name='city'
            label='City'
            // width={246}
            theme={theme}
            handleBlur={() => { }}
          />

          <Box display='flex' gap={2}>
            <Button className='company-btn' type='submit' size='small' onClick={handleSubmit(onSubmit)}>Submit</Button>
            <Button variant='outlined' size='small' onClick={() => navigate('/')}>Back</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
