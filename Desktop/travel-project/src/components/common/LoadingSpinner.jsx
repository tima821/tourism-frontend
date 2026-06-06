// src/components/common/LoadingSpinner.jsx
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({ size = 'md', color = 'primary', text = 'جاري التحميل...' }) => {
  const sizes = { sm: 20, md: 32, lg: 48, xl: 64 };
  const spinnerSize = sizes[size] || 32;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <CircularProgress size={spinnerSize} color={color} />
      {text && <Typography sx={{ fontFamily: 'Cairo', color: 'text.secondary' }}>{text}</Typography>}
    </Box>
  );
};

export default LoadingSpinner;