import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const StyledCard = styled(Card)(({ theme, gradient }) => ({
  color: theme.palette.common.white,
  background: gradient,
  borderRadius: '16px',
  padding: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  textDecoration: 'none',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    opacity: 0.5,
    transition: 'opacity 0.3s ease',
  },
  '&:hover:before': {
    opacity: 0.8,
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(1),
  right: theme.spacing(1),
  color: 'rgba(255, 255, 255, 0.3)',
  transform: 'rotate(-15deg)',
  transition: 'transform 0.3s ease',
  '& .MuiSvgIcon-root': {
    fontSize: '5rem',
  },
  '&:hover': {
    transform: 'rotate(0deg) scale(1.1)',
  },
}));

const StatCardV2 = ({ title, value, icon, gradient, linkTo, change, changeDirection }) => {
  const changeIconColor = changeDirection === 'up' ? '#4caf50' : '#f44336';

  const cardContent = (
    <StyledCard gradient={gradient}>
      <Box>
        <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          {title}
        </Typography>
      </Box>
      <IconWrapper>{icon}</IconWrapper>
      <Box sx={{ mt: 2, minHeight: '36px' }}>
        {change && (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(0, 0, 0, 0.15)',
            p: '4px 8px',
            borderRadius: '12px',
            width: 'fit-content'
          }}>
            {changeDirection === 'up' ?
              <ArrowUpwardIcon sx={{ color: changeIconColor, mr: 0.5 }} fontSize="small" /> :
              <ArrowDownwardIcon sx={{ color: changeIconColor, mr: 0.5 }} fontSize="small" />
            }
            <Typography variant="body2" sx={{ color: 'common.white', fontWeight: 'bold' }}>
              {change}%
            </Typography>
            <Typography variant="body2" sx={{ ml: 1, opacity: 0.8, color: 'common.white' }}>
              than last week
            </Typography>
          </Box>
        )}
      </Box>
    </StyledCard>
  );

  if (linkTo) {
    return (
      <RouterLink to={linkTo} style={{ textDecoration: 'none', height: '100%' }}>
        {cardContent}
      </RouterLink>
    );
  }

  return cardContent;
};

export default StatCardV2;