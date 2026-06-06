// src/components/dashboard/DeleteConfirmModal.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const DeleteConfirmModal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <Dialog open onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningAmberIcon color="error" />
        <Typography variant="h6" sx={{ fontFamily: 'Cairo', fontWeight: 'bold' }}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ fontFamily: 'Cairo' }}>{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onConfirm} variant="contained" color="error" sx={{ fontFamily: 'Cairo' }}>
          حذف
        </Button>
        <Button onClick={onCancel} variant="outlined" sx={{ fontFamily: 'Cairo' }}>
          إلغاء
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmModal;