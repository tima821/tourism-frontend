// src/components/dashboard/NotificationsPanel.jsx
import { Paper, Typography, Box, Divider } from '@mui/material';

const NotificationsPanel = ({ notifications = [] }) => {
  const sampleNotifications = [
    { id: 1, message: 'تم حجز رحلة جديدة', time: 'منذ 5 دقائق', read: false },
    { id: 2, message: 'اكتملت الرحلة باريز', time: 'منذ ساعة', read: true },
  ];
  const notifs = notifications.length > 0 ? notifications : sampleNotifications;

  return (
    <Paper sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ fontFamily: 'Cairo', fontWeight: 'bold' }}>
          الإشعارات
        </Typography>
      </Box>
      {notifs.map((notif, idx) => (
        <Box key={notif.id}>
          <Box sx={{ p: 2, bgcolor: notif.read ? 'transparent' : 'action.hover' }}>
            <Typography sx={{ fontFamily: 'Cairo' }}>{notif.message}</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'Cairo', color: 'text.secondary', mt: 0.5, display: 'block' }}>
              {notif.time}
            </Typography>
          </Box>
          {idx < notifs.length - 1 && <Divider />}
        </Box>
      ))}
    </Paper>
  );
};

export default NotificationsPanel;