// components/superadminoverview/SupKPISection.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  useTheme,
  Box,
  Grid,
  alpha,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import CancelIcon from "@mui/icons-material/Cancel";
import ScheduleIcon from "@mui/icons-material/Schedule";

/**
 * Reusable KPI Card
 */
const KPICard = ({ title, value, icon, color }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: "100%",
        position: "relative",
        borderRadius: 3,
        boxShadow: theme.shadows[3],
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)"
            : "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[6],
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: 4,
          height: "100%",
          backgroundColor: color,
          borderRadius: "3px 0 0 3px",
        },
      }}
    >
      <CardContent
        sx={{ display: "flex", alignItems: "center", gap: 3, p: 3 }}
      >
        <Box
          sx={{
            minWidth: 60,
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            backgroundColor: alpha(color, 0.12),
            color: color,
          }}
        >
          {React.cloneElement(icon, { fontSize: "large" })}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            fontWeight={500}
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            color="text.primary"
            fontWeight={700}
            sx={{ lineHeight: 1.2 }}
          >
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

/**
 * KPI Section Component
 */
const KPISection = ({ station = "All", data = {} }) => {
  const metrics = {
    totalFlights: data.totalFlights || (station === "All" ? 150 : 15),
    departures: data.departures || (station === "All" ? 50 : 7),
    arrivals: data.arrivals || (station === "All" ? 70 : 8),
    delayedFlights: data.delayedFlights || (station === "All" ? 10 : 2),
    cancelledFlights: data.cancelledFlights || (station === "All" ? 5 : 1),
  };

  const kpiCards = [
    {
      title: "Total Flights",
      value: metrics.totalFlights,
      icon: <AirplaneTicketIcon />,
      color: "#242C54",
    },
    {
      title: "Departures",
      value: metrics.departures,
      icon: <FlightTakeoffIcon />,
      color: "#E4141C",
    },
    {
      title: "Arrivals",
      value: metrics.arrivals,
      icon: <FlightLandIcon />,
      color: "#242C54",
    },
    {
      title: "Delayed Flights",
      value: metrics.delayedFlights,
      icon: <ScheduleIcon />,
      color: "#FFA500",
    },
    {
      title: "Cancelled Flights",
      value: metrics.cancelledFlights,
      icon: <CancelIcon />,
      color: "#FF0000",
    },
  ];

  return (
    <Box sx={{ width: "100%", py: 4 }}>
      <Grid container spacing={3} sx={{ maxWidth: 1400, mx: "auto" }}>
        {kpiCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <KPICard {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default KPISection;
