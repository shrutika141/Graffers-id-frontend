import React from 'react';
import { Star, StarHalf, StarOutline } from '@mui/icons-material';

export const Rating = ({ rating, color }: any) => {
  const stars:any = [];
  const roundedRating = Math.round(rating * 2) / 2;

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<Star key={i} style={{ color }} />);
    } else if (i - 0.5 === roundedRating) {
      stars.push(<StarHalf key={i} style={{ color }} />);
    } else {
      stars.push(<StarOutline key={i} />);
    }
  }

  return (
    <div>
      {stars}
    </div>
  );
};
