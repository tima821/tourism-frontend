// src/components/dashboard/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BusinessIcon from '@mui/icons-material/Business';
import CampaignIcon from '@mui/icons-material/Campaign';
import SettingsIcon from '@mui/icons-material/Settings';

const menuItems = [
  { path: "/dashboard", name: "لوحة التحكم", icon: DashboardIcon },
  { path: "/dashboard/trips", name: "إدارة الرحلات", icon: CalendarMonthIcon },
  { path: "/dashboard/requests", name: "طلبات المستخدمين", icon: NotificationsActiveIcon },
  { path: "/dashboard/hotels", name: "إدارة الفنادق", icon: HotelIcon },
  { path: "/dashboard/transport", name: "شركات النقل", icon: LocalShippingIcon },
  { path: "/dashboard/companies", name: "إدارة الشركات", icon: BusinessIcon },
  { path: "/dashboard/promotions", name: "الإعلانات الترويجية", icon: CampaignIcon },
  { path: "/dashboard/settings", name: "الإعدادات", icon: SettingsIcon },
];

const Sidebar = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: 260,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 260,
          boxSizing: 'border-box',
          bgcolor: mode === 'dark' ? '#0a1929' : '#1976d2',
          color: '#fff',
          borderRight: 'none',
          borderLeft: 'none',
          position: 'relative',
          height: '100vh',
          top: 0,
          right: 0,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 64, borderBottom: `1px solid ${mode === 'dark' ? '#132f4c' : 'rgba(255,255,255,0.2)'}` }}>
        <Typography variant="h6" sx={{ fontFamily: 'Cairo', fontWeight: 'bold', color: '#fff' }}>
          سياحة دليلي
        </Typography>
      </Box>
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
            <NavLink
              to={item.path}
              end={item.path === '/dashboard'}
              style={{ textDecoration: 'none' }}
            >
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    py: 1.5,
                    px: 2.5,
                    justifyContent: 'flex-start',
                    bgcolor: isActive ? (mode === 'dark' ? '#0b3b5c' : '#1565c0') : 'transparent',
                    borderRight: isActive ? `4px solid ${mode === 'dark' ? '#00e5ff' : '#ffeb3b'}` : 'none',
                    '&:hover': {
                      bgcolor: mode === 'dark' ? '#0d3b5e' : '#1e88e5',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: '#fff', minWidth: 40 }}>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{
                      '& .MuiTypography-root': {
                        fontFamily: 'Cairo',
                        fontWeight: isActive ? 'bold' : 'normal',
                        fontSize: '0.95rem',
                      },
                    }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Drawer>

);
};
export default Sidebar;
