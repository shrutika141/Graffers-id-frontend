import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AddCompany } from '../views/AddCompany/index.tsx';
import { ListView } from '../views/ListView/index.tsx';
import { AddReview } from '../views/AddReview/index.tsx';
import { ReviewDetails } from '../views/ReviewDetails/index.tsx';

export const Routing = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<ListView />}
      />
      <Route
        path="/add-company"
        element={<AddCompany />}
      />
      <Route
        path="/add-review/*"
        element={<AddReview />}
      />
      <Route
        path="/review-details/*"
        element={<ReviewDetails />}
      />

    </Routes>
  );
};