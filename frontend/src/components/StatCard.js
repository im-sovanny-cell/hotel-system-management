import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';

const StatCard = ({ title, value, icon, color }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
        </Box>
        <Avatar sx={{ backgroundColor: color, height: 56, width: 56 }}>
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

export default StatCard;