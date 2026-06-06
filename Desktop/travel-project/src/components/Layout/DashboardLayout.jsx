// src/components/Layout/DashboardLayout.jsx
import { Outlet } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import Sidebar from '../dashboard/Sidebar';
import Header from '../dashboard/Header';
import { useAuth } from '../../contexts/AuthContext';

const DashboardLayout = ({ toggleTheme, mode }) => {
  const { user } = useAuth();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: mode === 'dark' ? '#050c14' : '#f4f6f8' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, width: 0, minWidth: 0 }}>
        <Header user={user} toggleTheme={toggleTheme} mode={mode} />
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;