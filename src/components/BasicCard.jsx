/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard({name, university, gpa, id}) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {name}
        </Typography>
        <Typography variant="h5" component="div">
          {university}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {gpa}
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Link size="small" to={"/student/" + id} style={{
          fontSize: 20,
          textDecoration: "none",
          cursor: "pointer",
          color: "black",
          fontWeight: "700",
        }} >About us</Link>
      </CardActions>
    </Card>
  );
}