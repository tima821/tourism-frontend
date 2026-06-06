// // src/components/dashboard/TripCard.jsx
// import { useState } from 'react';
// import {
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Box,
//   Chip,
//   Button,
//   Menu,
//   MenuItem,
//   Divider,
//   useTheme,
//   alpha,
//   Stack,
//   Paper,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import CopyIcon from '@mui/icons-material/FileCopy';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import PeopleIcon from '@mui/icons-material/People';

// const statusConfig = {
//   pending: { label: 'قيد الانتظار', color: 'warning' },
//   confirmed: { label: 'مؤكدة', color: 'success' },
//   completed: { label: 'منتهية', color: 'info' },
//   cancelled: { label: 'ملغية', color: 'error' },
// };

// const TripCard = ({ trip, onEdit, onDelete, onStatusChange, onDuplicate, getStatusText }) => {
//   const theme = useTheme();
//   const mode = theme.palette.mode;
//   const [expanded, setExpanded] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const openStatusMenu = Boolean(anchorEl);

//   const handleStatusClick = (event) => setAnchorEl(event.currentTarget);
//   const handleStatusClose = () => setAnchorEl(null);
//   const handleStatusChange = (newStatus) => {
//     onStatusChange(newStatus);
//     handleStatusClose();
//   };

//   const currentStatus = statusConfig[trip.status] || { label: getStatusText(trip.status), color: 'default' };

//   const formatPrice = (price) => {
//     if (!price) return 'غير محدد';
//     const numeric = parseFloat(price.toString().replace(/[^0-9.-]+/g, ''));
//     if (isNaN(numeric)) return price;
//     return `${numeric.toLocaleString()} ريال`;
//   };

//   return (
//     <Card
//       sx={{
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         borderRadius: 4,
//         transition: '0.3s',
//         bgcolor: 'background.paper',
//         border: `1px solid ${mode === 'dark' ? '#132f4c' : '#e0e0e0'}`,
//         '&:hover': {
//           transform: 'translateY(-4px)',
//           boxShadow: mode === 'dark'
//             ? '0 12px 30px rgba(0,229,255,0.15)'
//             : '0 12px 30px rgba(0,0,0,0.1)',
//           borderColor: 'primary.main',
//         },
//       }}
//     >
//       {trip.image_url && (
//         <CardMedia
//           component="img"
//           height="200"
//           image={trip.image_url}
//           alt={trip.title}
//           sx={{
//             objectFit: 'cover',
//             borderTopLeftRadius: 16,
//             borderTopRightRadius: 16,
//           }}
//           onError={(e) => {
//             e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
//           }}
//         />
//       )}

//       <CardContent sx={{ flexGrow: 1, p: 3 }}>
//         {/* رأس البطاقة: العنوان + حالة */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
//           <Typography
//             variant="h6"
//             component="h3"
//             sx={{
//               fontWeight: 'bold',
//               fontFamily: 'Cairo',
//               color: mode === 'dark' ? '#fff' : '#111',
//               fontSize: '1.1rem',
//               flex: 1,
//               ml: 1,
//             }}
//           >
//             {trip.title}
//           </Typography>
//           <Chip
//             label={currentStatus.label}
//             color={currentStatus.color}
//             size="small"
//             onClick={handleStatusClick}
//             sx={{
//               fontFamily: 'Cairo',
//               fontWeight: 'bold',
//               cursor: 'pointer',
//               '&:hover': { opacity: 0.8 },
//             }}
//           />
//           <Menu anchorEl={anchorEl} open={openStatusMenu} onClose={handleStatusClose}>
//             {Object.entries(statusConfig).map(([value, { label }]) => (
//               <MenuItem
//                 key={value}
//                 onClick={() => handleStatusChange(value)}
//                 selected={value === trip.status}
//                 sx={{ fontFamily: 'Cairo', justifyContent: 'flex-end' }}
//               >
//                 {label}
//               </MenuItem>
//             ))}
//           </Menu>
//         </Box>

//         {/* التفاصيل */}
//         <Stack spacing={1.5} sx={{ mb: 2 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <LocationOnIcon fontSize="small" color="primary" />
//             <Typography variant="body2" sx={{ fontFamily: 'Cairo', color: 'text.secondary' }}>
//               {trip.destination}
//             </Typography>
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <CalendarTodayIcon fontSize="small" color="primary" />
//             <Typography variant="body2" sx={{ fontFamily: 'Cairo', color: 'text.secondary' }}>
//               {trip.start_date} → {trip.end_date}
//             </Typography>
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <AttachMoneyIcon fontSize="small" color="primary" />
//             <Typography variant="body2" sx={{ fontFamily: 'Cairo', fontWeight: 'bold', color: 'primary.main' }}>
//               {formatPrice(trip.price)}
//             </Typography>
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <PeopleIcon fontSize="small" color="primary" />
//             <Typography variant="body2" sx={{ fontFamily: 'Cairo', color: 'text.secondary' }}>
//               {trip.participants || 0} / {trip.max_participants} مشارك
//             </Typography>
//           </Box>
//         </Stack>

//         {/* زر عرض/إخفاء الوصف */}
//         {trip.description && (
//           <Button
//             onClick={() => setExpanded(!expanded)}
//             size="small"
//             sx={{
//               fontFamily: 'Cairo',
//               textTransform: 'none',
//               color: 'primary.main',
//               mb: 1,
//               p: 0,
//               '&:hover': { bgcolor: 'transparent' },
//             }}
//             startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//           >
//             {expanded ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
//           </Button>
//         )}

//         {expanded && trip.description && (
//           <Paper
//             elevation={0}
//             sx={{
//               p: 2,
//               mb: 2,
//               bgcolor: alpha(theme.palette.primary.main, 0.05),
//               borderRadius: 2,
//               border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//             }}
//           >
//             <Typography variant="body2" sx={{ fontFamily: 'Cairo', color: 'text.secondary' }}>
//               {trip.description}
//             </Typography>
//           </Paper>
//         )}

//         {/* الخدمات المشمولة */}
//         {trip.included_services?.length > 0 && (
//           <Box sx={{ mb: 2 }}>
//             <Typography variant="caption" sx={{ fontFamily: 'Cairo', color: 'text.secondary', display: 'block', mb: 0.5 }}>
//               ✓ الخدمات المشمولة:
//             </Typography>
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//               {trip.included_services.map((service) => (
//                 <Chip
//                   key={service}
//                   label={service}
//                   size="small"
//                   variant="outlined"
//                   sx={{ fontFamily: 'Cairo', fontSize: '0.7rem' }}
//                 />
//               ))}
//             </Box>
//           </Box>
//         )}
//       </CardContent>

//       <Divider sx={{ opacity: 0.6 }} />

//       {/* أزرار الإجراءات */}
//       <Box sx={{ display: 'flex', p: 2, gap: 1.5 }}>
//         <Button
//           variant="contained"
//           startIcon={<EditIcon />}
//           onClick={onEdit}
//           fullWidth
//           sx={{
//             fontFamily: 'Cairo',
//             fontWeight: 'bold',
//             textTransform: 'none',
//             background: mode === 'dark'
//               ? 'linear-gradient(135deg, #00e5ff 0%, #7209b7 100%)'
//               : 'linear-gradient(135deg, #1976d2 0%, #7209b7 100%)',
//             color: '#fff',
//             borderRadius: 2,
//             py: 0.8,
//             '&:hover': { transform: 'translateY(-2px)' },
//           }}
//         >
//           تعديل
//         </Button>
//         <Button
//           variant="outlined"
//           startIcon={<CopyIcon />}
//           onClick={onDuplicate}
//           fullWidth
//           sx={{
//             fontFamily: 'Cairo',
//             fontWeight: 'bold',
//             textTransform: 'none',
//             borderColor: mode === 'dark' ? '#00e5ff' : '#1976d2',
//             color: mode === 'dark' ? '#00e5ff' : '#1976d2',
//             borderRadius: 2,
//             py: 0.8,
//             '&:hover': { transform: 'translateY(-2px)', bgcolor: 'transparent' },
//           }}
//         >
//           نسخ
//         </Button>
//         <Button
//           variant="contained"
//           startIcon={<DeleteIcon />}
//           onClick={onDelete}
//           fullWidth
//           sx={{
//             fontFamily: 'Cairo',
//             fontWeight: 'bold',
//             textTransform: 'none',
//             bgcolor: '#f44336',
//             color: '#fff',
//             borderRadius: 2,
//             py: 0.8,
//             '&:hover': { bgcolor: '#d32f2f', transform: 'translateY(-2px)' },
//           }}
//         >
//           حذف
//         </Button>
//       </Box>
//     </Card>
//   );
// };

// export default TripCard;




// src/components/dashboard/TripCard.jsx (نسخة متوافقة مع الباك)
import { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  alpha,
  Stack,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CopyIcon from '@mui/icons-material/FileCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';

const statusConfig = {
  pending: { label: 'قيد الانتظار', color: 'warning' },
  confirmed: { label: 'مؤكدة', color: 'success' },
  completed: { label: 'منتهية', color: 'info' },
  cancelled: { label: 'ملغية', color: 'error' },
};

const TripCard = ({ trip, onEdit, onDelete, onStatusChange, onDuplicate, getStatusText }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openStatusMenu = Boolean(anchorEl);

  const handleStatusClick = (event) => setAnchorEl(event.currentTarget);
  const handleStatusClose = () => setAnchorEl(null);
  const handleStatusChange = (newStatus) => {
    onStatusChange(newStatus);
    handleStatusClose();
  };

  // استخدم trip.status إذا كان موجودًا، وإلا "pending"
  const currentStatus = statusConfig[trip.status] || { label: getStatusText(trip.status), color: 'default' };

  const formatPrice = (price) => {
    if (!price) return 'غير محدد';
    const numeric = parseFloat(price.toString().replace(/[^0-9.-]+/g, ''));
    if (isNaN(numeric)) return price;
    return `${numeric.toLocaleString()} ل.س`;
  };

  // استخراج التواريخ بصيغة YYYY-MM-DD من start_time و end_time
  const formatDate = (dateTimeStr) => {
    if (!dateTimeStr) return 'غير محدد';
    return dateTimeStr.split(' ')[0];
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        transition: '0.3s',
        bgcolor: 'background.paper',
        border: `1px solid ${mode === 'dark' ? '#132f4c' : '#e0e0e0'}`,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: mode === 'dark'
            ? '0 12px 30px rgba(0,229,255,0.15)'
            : '0 12px 30px rgba(0,0,0,0.1)',
          borderColor: 'primary.main',
        },
      }}
    >
      {/* إذا كان هناك صورة مستقبلية */}
      {trip.image_url && (
        <CardMedia
          component="img"
          height="200"
          image={trip.image_url}
          alt={trip.trip_type}
          sx={{
            objectFit: 'cover',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* رأس البطاقة: العنوان + حالة */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 'bold',
              fontFamily: 'Cairo',
              color: mode === 'dark' ? '#fff' : '#111',
              fontSize: '1.1rem',
              flex: 1,
              ml: 1,
            }}
          >
            {trip.trip_type || 'رحلة سياحية'}
          </Typography>
          <Chip
            label={currentStatus.label}
            color={currentStatus.color}
            size="small"
            onClick={handleStatusClick}
            sx={{
              fontFamily: 'Cairo',
              fontWeight: 'bold',
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 },
            }}
          />
          <Menu anchorEl={anchorEl} open={openStatusMenu} onClose={handleStatusClose}>
            {Object.entries(statusConfig).map(([value, { label }]) => (
              <MenuItem
                key={value}
                onClick={() => handleStatusChange(value)}
                selected={value === trip.status}
                sx={{ fontFamily: 'Cairo', justifyContent: 'flex-end' }}
              >
                {label}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* التفاصيل - نعرض الوجهة إذا كانت موجودة، وإلا نعرض "غير محدد" */}
        <Stack spacing={1.5} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon fontSize="small" color="primary" />
            <Typography variant="body2" sx={{ fontFamily: 'Cairo', color: 'text.secondary' }}>
              {trip.destination || 'وجهة غير محددة'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarTodayIcon fontSize="small" color="primary" />
            <Typography variant="body2" sx={{ fontFamily: 'Cairo', color: 'text.secondary' }}>
              {formatDate(trip.start_time)} → {formatDate(trip.end_time)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AttachMoneyIcon fontSize="small" color="primary" />
            <Typography variant="body2" sx={{ fontFamily: 'Cairo', fontWeight: 'bold', color: 'primary.main' }}>
              {formatPrice(trip.trip_cost)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PeopleIcon fontSize="small" color="primary" />
            <Typography variant="body2" sx={{ fontFamily: 'Cairo', color: 'text.secondary' }}>
              {trip.available_seats || 0} / {trip.total_seats || 0} مشارك
            </Typography>
          </Box>
        </Stack>

        {/* عرض ملاحظات إضافية (notes) بدلاً من description */}
        {trip.notes && (
          <Button
            onClick={() => setExpanded(!expanded)}
            size="small"
            sx={{
              fontFamily: 'Cairo',
              textTransform: 'none',
              color: 'primary.main',
              mb: 1,
              p: 0,
              '&:hover': { bgcolor: 'transparent' },
            }}
            startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          >
            {expanded ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
          </Button>
        )}

        {expanded && trip.notes && (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Typography variant="body2" sx={{ fontFamily: 'Cairo', color: 'text.secondary' }}>
              {trip.notes}
            </Typography>
          </Paper>
        )}

        {/* الخدمات المشمولة - غير موجودة حالياً في الباك، يمكن إخفاؤها أو إضافتها لاحقاً */}
        {trip.included_services?.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ fontFamily: 'Cairo', color: 'text.secondary', display: 'block', mb: 0.5 }}>
              ✓ الخدمات المشمولة:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {trip.included_services.map((service) => (
                <Chip
                  key={service}
                  label={service}
                  size="small"
                  variant="outlined"
                  sx={{ fontFamily: 'Cairo', fontSize: '0.7rem' }}
                />
              ))}
            </Box>
          </Box>
        )}
      </CardContent>

      <Divider sx={{ opacity: 0.6 }} />

      {/* أزرار الإجراءات */}
      <Box sx={{ display: 'flex', p: 2, gap: 1.5 }}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={onEdit}
          fullWidth
          sx={{
            fontFamily: 'Cairo',
            fontWeight: 'bold',
            textTransform: 'none',
            background: mode === 'dark'
              ? 'linear-gradient(135deg, #00e5ff 0%, #7209b7 100%)'
              : 'linear-gradient(135deg, #1976d2 0%, #7209b7 100%)',
            color: '#fff',
            borderRadius: 2,
            py: 0.8,
            '&:hover': { transform: 'translateY(-2px)' },
          }}
        >
          تعديل
        </Button>
        <Button
          variant="outlined"
          startIcon={<CopyIcon />}
          onClick={onDuplicate}
          fullWidth
          sx={{
            fontFamily: 'Cairo',
            fontWeight: 'bold',
            textTransform: 'none',
            borderColor: mode === 'dark' ? '#00e5ff' : '#1976d2',
            color: mode === 'dark' ? '#00e5ff' : '#1976d2',
            borderRadius: 2,
            py: 0.8,
            '&:hover': { transform: 'translateY(-2px)', bgcolor: 'transparent' },
          }}
        >
          نسخ
        </Button>
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={onDelete}
          fullWidth
          sx={{
            fontFamily: 'Cairo',
            fontWeight: 'bold',
            textTransform: 'none',
            bgcolor: '#f44336',
            color: '#fff',
            borderRadius: 2,
            py: 0.8,
            '&:hover': { bgcolor: '#d32f2f', transform: 'translateY(-2px)' },
          }}
        >
          حذف
        </Button>
      </Box>
    </Card>
  );
};

export default TripCard;