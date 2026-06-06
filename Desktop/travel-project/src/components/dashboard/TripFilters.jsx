import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  useTheme,
  alpha,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const TripFilters = ({ filters, onFilterChange, onReset }) => {

  const theme = useTheme();
  const mode = theme.palette.mode;

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
   <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: `1px solid ${mode === 'dark' ? '#132f4c' : '#e0e0e0'}`,
        bgcolor: 'background.paper',
        mb: 4,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontFamily: 'Cairo', fontWeight: 'bold' }}>
          خيارات البحث والفلترة
        </Typography>
        <Button
          startIcon={<ClearIcon />}
          onClick={onReset}
          sx={{
            fontFamily: 'Cairo',
            color: '#f44336',
            '&:hover': { bgcolor: 'rgba(244,67,54,0.08)' },
          }}
        >
          إعادة تعيين
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            name="search"
            label="بحث"
            value={filters.search}
            onChange={handleChange}
            placeholder="عنوان الرحلة أو الوجهة..."
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'action.active', ml: 1 }} />,
            }}
            sx={{
              '& label': { fontFamily: 'Cairo', right: 14, left: 'auto', transformOrigin: 'right' },
              '& input': { fontFamily: 'Cairo' },
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel sx={{ fontFamily: 'Cairo', right: 14, left: 'auto', transformOrigin: 'right' }}>
              الحالة
            </InputLabel>
            <Select
              name="status"
              value={filters.status}
              onChange={handleChange}
              label="الحالة"
              sx={{ fontFamily: 'Cairo' }}
            >
              <MenuItem value="all" sx={{ fontFamily: 'Cairo' }}>الكل</MenuItem>
              <MenuItem value="pending" sx={{ fontFamily: 'Cairo' }}>قيد الانتظار</MenuItem>
              <MenuItem value="confirmed" sx={{ fontFamily: 'Cairo' }}>مؤكدة</MenuItem>
              <MenuItem value="completed" sx={{ fontFamily: 'Cairo' }}>منتهية</MenuItem>
              <MenuItem value="cancelled" sx={{ fontFamily: 'Cairo' }}>ملغية</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            name="destination"
            label="الوجهة"
            value={filters.destination}
            onChange={handleChange}
            placeholder="اسم الوجهة..."
            sx={{
              '& label': { fontFamily: 'Cairo', right: 14, left: 'auto', transformOrigin: 'right' },
              '& input': { fontFamily: 'Cairo' },
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel sx={{ fontFamily: 'Cairo', right: 14, left: 'auto', transformOrigin: 'right' }}>
              ترتيب حسب
            </InputLabel>
            <Select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleChange}
              label="ترتيب حسب"
              sx={{ fontFamily: 'Cairo' }}
            >
              <MenuItem value="created_at" sx={{ fontFamily: 'Cairo' }}>تاريخ الإضافة</MenuItem>
              <MenuItem value="start_date" sx={{ fontFamily: 'Cairo' }}>تاريخ البداية</MenuItem>
              <MenuItem value="price" sx={{ fontFamily: 'Cairo' }}>السعر</MenuItem>
              <MenuItem value="title" sx={{ fontFamily: 'Cairo' }}>العنوان</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TripFilters;