// src/components/dashboard/CompanyWarnings.jsx
import { Paper, Typography, Box, Divider } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const CompanyWarnings = () => {
  const companies = [
    { id: 1, name: 'شركة النقل السريع', type: 'نقل', warnings: 2 },
    { id: 2, name: 'فندق الأهرام', type: 'فندق', warnings: 1 },
  ];

  return (
    <Paper sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ fontFamily: 'Cairo', fontWeight: 'bold' }}>
          إنذارات الشركات
        </Typography>
      </Box>
      {companies.map((company, idx) => (
        <Box key={company.id}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography sx={{ fontFamily: 'Cairo', fontWeight: 'bold' }}>{company.name}</Typography>
              <Typography variant="caption" sx={{ fontFamily: 'Cairo', color: 'text.secondary' }}>
                {company.type}
              </Typography>
            </Box>
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                bgcolor: company.warnings >= 3 ? 'error.light' : 'warning.light',
                color: company.warnings >= 3 ? 'error.contrastText' : 'warning.contrastText',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <WarningIcon fontSize="small" />
              <Typography variant="caption" sx={{ fontFamily: 'Cairo', fontWeight: 'bold' }}>
                {company.warnings}/4 إنذارات
              </Typography>
            </Box>
          </Box>
          {idx < companies.length - 1 && <Divider />}
        </Box>
      ))}
    </Paper>
  );
};

export default CompanyWarnings;