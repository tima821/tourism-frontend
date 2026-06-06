// src/pages/admin/Dashboard.jsx
import { useState } from "react";
import { Box, Container, Typography, Grid, useTheme } from "@mui/material";
import StatsCards from "../../components/dashboard/StatsCards";
import RecentTrips from "../../components/dashboard/RecentTrips";
import PendingRequests from "../../components/dashboard/PendingRequests";
import NotificationsPanel from "../../components/dashboard/NotificationsPanel";
import CompanyWarnings from "../../components/dashboard/CompanyWarnings";
import toast from "react-hot-toast";

const Dashboard = () => {

  const theme = useTheme();
  const mode = theme.palette.mode;
  
  const [stats] = useState({
    totalTrips: 12,
    activeTrips: 5,
    pendingRequests: 3,
    totalBookings: 48,
    companiesCount: 7,
    warningsCount: 2,
  });

  const handleApprove = (id) => toast.success(`تم قبول الطلب رقم ${id}`);
  const handleReject = (id) => {
    const reason = prompt("الرجاء إدخال سبب الرفض:");
    if (reason) toast.success(`تم رفض الطلب رقم ${id} بسبب: ${reason}`);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, direction: "rtl" }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ fontFamily: "Cairo", color: mode === "dark" ? "#fff" : "#111" }}
        >
          لوحة التحكم
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontFamily: "Cairo", color: "text.secondary", mt: 0.5 }}
        >
          مرحباً بك في لوحة إدارة الرحلات السياحية
        </Typography>
      </Box>

      <StatsCards stats={stats} />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={8}>
          <RecentTrips />
        </Grid>
        <Grid item xs={12} lg={4}>
          <NotificationsPanel />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <PendingRequests onApprove={handleApprove} onReject={handleReject} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <CompanyWarnings />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
