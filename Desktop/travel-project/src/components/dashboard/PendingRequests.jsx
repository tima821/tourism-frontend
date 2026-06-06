// src/components/dashboard/PendingRequests.jsx
import { useState, useEffect } from 'react';
import { Paper, Typography, Box, Divider, Button, Skeleton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';

const PendingRequests = ({ onApprove, onReject }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setRequests([
          { id: 1, userName: 'أحمد محمد', destination: 'شرم الشيخ', date: '2024-06-10', participants: 4 },
          { id: 2, userName: 'سارة علي', destination: 'القاهرة', date: '2024-06-15', participants: 2 },
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <Paper sx={{ p: 2, borderRadius: 3 }}>
        <Skeleton variant="text" width="60%" height={32} />
        {[1, 2].map((i) => (
          <Box key={i} sx={{ my: 2 }}>
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
          </Box>
        ))}
      </Paper>
    );
  }

  return (
    <Paper sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ fontFamily: 'Cairo', fontWeight: 'bold' }}>
          طلبات المستخدمين
        </Typography>
      </Box>
      {requests.length === 0 ? (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography sx={{ fontFamily: 'Cairo', color: 'text.secondary' }}>لا توجد طلبات</Typography>
        </Box>
      ) : (
        requests.map((req, idx) => (
          <Box key={req.id}>
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontFamily: 'Cairo', fontWeight: 'bold' }}>
                    {req.userName}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <LocationOnIcon fontSize="small" color="action" />
                    <Typography variant="body2" sx={{ fontFamily: 'Cairo', color: 'text.secondary' }}>
                      {req.destination}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <CalendarTodayIcon fontSize="small" color="action" />
                    <Typography variant="body2" sx={{ fontFamily: 'Cairo', color: 'text.secondary' }}>
                      {req.date}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <PeopleIcon fontSize="small" color="action" />
                    <Typography variant="body2" sx={{ fontFamily: 'Cairo', color: 'text.secondary' }}>
                      {req.participants} أشخاص
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={() => onApprove?.(req.id)}
                    sx={{ minWidth: 36, p: 0.8, borderRadius: 2 }}
                  >
                    <CheckIcon fontSize="small" />
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => onReject?.(req.id)}
                    sx={{ minWidth: 36, p: 0.8, borderRadius: 2 }}
                  >
                    <CloseIcon fontSize="small" />
                  </Button>
                </Box>
              </Box>
            </Box>
            {idx < requests.length - 1 && <Divider />}
          </Box>
        ))
      )}
    </Paper>
  );
};

export default PendingRequests;