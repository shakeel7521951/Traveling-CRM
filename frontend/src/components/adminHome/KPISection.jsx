import { Card, CardContent, Typography, useTheme, Box, Grid } from "@mui/material";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import React from "react";

const KPICard = ({ title, value, icon, color }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: '100%',
        p: 0,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        border: 'none',
        background: theme.palette.mode === 'dark' ?
          'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)' :
          'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '4px',
          height: '100%',
          backgroundColor: color,
        }
      }}
    >
      <CardContent sx={{
        p: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        height: '100%'
      }}>
        <Box sx={{
          minWidth: 60,
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '12px',
          background: `${color}15`,
          color: color,
        }}>
          {React.cloneElement(icon, { fontSize: "large" })}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 500,
              color: theme.palette.text.secondary,
              mb: 0.5,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontSize: '0.75rem'
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              lineHeight: 1.2
            }}
          >
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const KPISection = ({ title, value }) => {
  return (
    <Box sx={{
      width: '100%',
      px: { xs: 2, sm: 3, md: 4 },
      py: 2,
      display: 'flex',
      justifyContent: 'center'
    }}>
      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 4 }}
        sx={{
          maxWidth: '1200px',
          justifyContent: 'space-around'
        }}
      >
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <KPICard
            title={title}
            value={value}
            icon={<AirplaneTicketIcon />}
            color="#242C54"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <KPICard
            title="Departures"
            value="50"
            icon={<FlightTakeoffIcon />}
            color="#E4141C"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <KPICard
            title="Arrivals"
            value="70"
            icon={<FlightLandIcon />}
            color="#242C54"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default KPISection;