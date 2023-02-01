import { Rating } from '@mui/material';
import styled from 'styled-components';

export default function RatingComponent({ rate, total }) {
  if (isNaN(rate)) return;
  return (
    <RatingStarsContainer total={total}>
      <Rating name="half-rating-read" defaultValue={rate} precision={0.5} size={total ? 'large' : 'medium'} readOnly />
    </RatingStarsContainer>
  );
}

const RatingStarsContainer = styled.div`
  width: ${(props) => (props.total ? 'auto' : '100%')};
  display: ${(props) => (props.total ? 'inline' : 'flex')};
  justify-content: center;
`;
