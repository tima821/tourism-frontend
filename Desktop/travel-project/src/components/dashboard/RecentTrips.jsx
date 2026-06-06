// src/components/dashboard/RecentTrips.jsx
import { useState, useEffect } from 'react';
import { Paper, Typography, Box, Divider, Skeleton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';

const RecentTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setTrips([
          { id: 1, destination: 'باريس', date: '2024-05-15', participants: 12, status: 'مؤكدة' },
          { id: 2, destination: 'دبي', date: '2024-05-20', participants: 8, status: 'قيد الانتظار' },
          { id: 3, destination: 'اسطنبول', date: '2024-06-01', participants: 15, status: 'مؤكدة' },
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  if (loading) {
    return (
      <Paper sx={{ p: 2, borderRadius: 3 }}>
        <Skeleton variant="text" width="60%" height={32} />
        {[1, 2, 3].map((i) => (
          <Box key={i} sx={{ my: 2 }}>
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="40%" />
          </Box>
        ))}
      </Paper>
    );
  }

  return (
    <Paper sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ fontFamily: 'Cairo', fontWeight: 'bold' }}>
          أحدث الرحلات
        </Typography>
      </Box>
      {trips.map((trip, idx) => (
        <Box key={trip.id}>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontFamily: 'Cairo', fontWeight: 'bold' }}>
                  {trip.destination}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <CalendarTodayIcon fontSize="small" color="action" />
                  <Typography variant="body2" sx={{ fontFamily: 'Cairo', color: 'text.secondary' }}>
                    {trip.date}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <PeopleIcon fontSize="small" color="action" />
                  <Typography variant="body2" sx={{ fontFamily: 'Cairo', color: 'text.secondary' }}>
                    {trip.participants} مشارك
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: 'Cairo',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  bgcolor: trip.status === 'مؤكدة' ? 'success.light' : 'warning.light',
                  color: trip.status === 'مؤكدة' ? 'success.contrastText' : 'warning.contrastText',
                }}
              >
                {trip.status}
              </Typography>
            </Box>
          </Box>
          {idx < trips.length - 1 && <Divider />}
        </Box>
      ))}
    </Paper>
  );
};

export default RecentTrips;