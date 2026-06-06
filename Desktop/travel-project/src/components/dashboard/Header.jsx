// src/components/dashboard/Header.jsx
import { Box, IconButton, Badge, Typography, Avatar, useTheme } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// ✅ استقبال props من الأعلى
const Header = ({ user, toggleTheme, mode }) => {
  //const theme = useTheme();
  // استخدام القيمة القادمة من prop أو من theme (للتأكد)
  //const mode = propMode !== undefined ? propMode : theme.palette.mode;

  const localToggle = () => {
    toggleTheme(); // استخدم الدالة القادمة من props
  };

  return (
    <Box
      component="header"
      sx={{
        bgcolor: 'background.paper',
        borderBottom: `1px solid ${mode === 'dark' ? '#132f4c' : '#e0e0e0'}`,
        boxShadow: mode === 'dark' ? 'none' : 1,
        px: 3,
        py: 1.5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <IconButton sx={{ color: 'text.secondary' }}>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Typography variant="body1" sx={{ fontFamily: 'Cairo', color: 'text.primary' }}>
          {user?.name || 'مدير النظام'}
        </Typography>
        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
          <AccountCircleIcon />
        </Avatar>
      </Box>
    </Box>
  );
};

export default Header;