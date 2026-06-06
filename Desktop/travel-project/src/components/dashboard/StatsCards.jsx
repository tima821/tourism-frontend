// // src/components/dashboard/StatsCards.jsx
// import { Grid, Paper, Typography, Box, useTheme } from '@mui/material';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import PeopleIcon from '@mui/icons-material/People';
// import DescriptionIcon from '@mui/icons-material/Description';
// import WarningIcon from '@mui/icons-material/Warning';
// import BusinessIcon from '@mui/icons-material/Business';

// const statsConfig = [
//   { title: 'إجمالي الرحلات', key: 'totalTrips', icon: CalendarMonthIcon, color: 'primary' },
//   { title: 'الرحلات النشطة', key: 'activeTrips', icon: CalendarMonthIcon, color: 'success' },
//   { title: 'طلبات قيد الانتظار', key: 'pendingRequests', icon: DescriptionIcon, color: 'warning' },
//   { title: 'إجمالي الحجوزات', key: 'totalBookings', icon: PeopleIcon, color: 'secondary' },
//   { title: 'الشركات المسجلة', key: 'companiesCount', icon: BusinessIcon, color: 'info' },
//   { title: 'إنذارات نشطة', key: 'warningsCount', icon: WarningIcon, color: 'error' },
// ];

// const StatsCards = ({ stats }) => {
//   const theme = useTheme();
//   const mode = theme.palette.mode;

//   return (
//     <Grid container spacing={2} sx={{ mb: 4 }}>
//       {statsConfig.map((stat) => (
//         <Grid item xs={12} sm={6} md={4} lg={2} key={stat.key}>
//           <Paper
//             elevation={0}
//             sx={{
//               p: 2,
//               borderRadius: 3,
//               border: `1px solid ${mode === 'dark' ? '#132f4c' : '#e0e0e0'}`,
//               bgcolor: 'background.paper',
//               transition: '0.3s',
//               '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 },
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Box>
//                 <Typography variant="body2" sx={{ fontFamily: 'Cairo', color: 'text.secondary' }}>
//                   {stat.title}
//                 </Typography>
//                 <Typography variant="h5" sx={{ fontFamily: 'Cairo', fontWeight: 'bold', mt: 0.5 }}>
//                   {stats[stat.key] || 0}
//                 </Typography>
//               </Box>
//               <Box
//                 sx={{
//                   bgcolor: `${theme.palette[stat.color]?.main}20`,
//                   borderRadius: '50%',
//                   p: 1,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <stat.icon sx={{ color: theme.palette[stat.color]?.main, fontSize: 28 }} />
//               </Box>
//             </Box>
//           </Paper>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default StatsCards;



// src/components/dashboard/StatsCards.jsx
import { Grid, Paper, Typography, Box, useTheme } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import WarningIcon from '@mui/icons-material/Warning';
import BusinessIcon from '@mui/icons-material/Business';

const statsConfig = [
  { title: 'إجمالي الرحلات', key: 'totalTrips', icon: CalendarMonthIcon, color: 'primary' },
  { title: 'الرحلات النشطة', key: 'activeTrips', icon: CalendarMonthIcon, color: 'success' },
  { title: 'طلبات قيد الانتظار', key: 'pendingRequests', icon: DescriptionIcon, color: 'warning' },
  { title: 'إجمالي الحجوزات', key: 'totalBookings', icon: PeopleIcon, color: 'secondary' },
  { title: 'الشركات المسجلة', key: 'companiesCount', icon: BusinessIcon, color: 'info' },
  { title: 'إنذارات نشطة', key: 'warningsCount', icon: WarningIcon, color: 'error' },
];

const StatsCards = ({ stats }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {statsConfig.map((stat) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={stat.key}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 3,
              border: `1px solid ${mode === 'dark' ? '#132f4c' : '#e0e0e0'}`,
              bgcolor: 'background.paper',
              transition: '0.3s',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" sx={{ fontFamily: 'Cairo', color: 'text.secondary' }}>
                  {stat.title}
                </Typography>
                <Typography variant="h5" sx={{ fontFamily: 'Cairo', fontWeight: 'bold', mt: 0.5 }}>
                  {stats[stat.key] || 0}
                </Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: `${theme.palette[stat.color]?.main}20`,
                  borderRadius: '50%',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <stat.icon sx={{ color: theme.palette[stat.color]?.main, fontSize: 28 }} />
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;