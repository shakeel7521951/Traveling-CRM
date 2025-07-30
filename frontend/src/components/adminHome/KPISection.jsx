import { Card, CardContent, Typography, useTheme } from "@mui/material";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';

const KPICard = ({ title, value, icon, color }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        minWidth: 250,
        maxWidth: 300,
        m: 2,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        boxShadow: 6,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 10,
        },
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <div style={{ color, display: 'flex', alignItems: 'center' }}>
        {icon}
      </div>
      <CardContent sx={{ p: 0 }}>
        <Typography variant="subtitle2" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="h5" fontWeight="bold" color="textPrimary">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

const KPISection = ({ title, value }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1.5rem',
        padding: '1rem',
      }}
    >
      <KPICard
        title={title}
        value={value}
        icon={<AirplaneTicketIcon fontSize="large" />}
        color="#1976d2"
      />
      <KPICard
        title="Departures"
        value="50"
        icon={<FlightTakeoffIcon fontSize="large" />}
        color="#388e3c"
      />
      <KPICard
        title="Arrivals"
        value="70"
        icon={<FlightLandIcon fontSize="large" />}
        color="#f57c00"
      />
    </div>
  );
};

export default KPISection;
