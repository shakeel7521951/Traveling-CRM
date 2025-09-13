import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { 
  Box, 
  Typography, 
  useTheme, 
  Card, 
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from "@mui/material";

const feedbackData = [
  { station: "JED", positive: 120, neutral: 40, negative: 15 },
  { station: "RUH", positive: 95, neutral: 25, negative: 10 },
  { station: "DXB", positive: 150, neutral: 50, negative: 20 },
  { station: "MED", positive: 85, neutral: 30, negative: 12 },
  { station: "DMM", positive: 110, neutral: 35, negative: 18 },
];

const COLORS = ["#222950", "#626884", "#ef4444"]; // green, yellow, red

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const total = data.value + (data.positive || 0) + (data.neutral || 0) + (data.negative || 0);
    const percentage = ((data.value / total) * 100).toFixed(1);
    
    return (
      <Box
        sx={{
          backgroundColor: "background.paper",
          border: 1,
          borderColor: "divider",
          p: 1.5,
          borderRadius: 2,
          boxShadow: 3,
          minWidth: 140,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.primary" }}>
          {data.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {data.value} feedbacks ({percentage}%)
        </Typography>
      </Box>
    );
  }
  return null;
};

const FeedbackRatingSummary = ({ station: initialStation = "All" }) => {
  const theme = useTheme();
  const [station, setStation] = useState(initialStation);
  const [data, setData] = useState([]);
  const [totalFeedback, setTotalFeedback] = useState(0);

  useEffect(() => {
    let processedData = [];
    let total = 0;

    if (station === "All") {
      const totals = feedbackData.reduce(
        (acc, cur) => ({
          positive: acc.positive + cur.positive,
          neutral: acc.neutral + cur.neutral,
          negative: acc.negative + cur.negative,
        }),
        { positive: 0, neutral: 0, negative: 0 }
      );
      
      processedData = [
        { name: "Positive", value: totals.positive },
        { name: "Neutral", value: totals.neutral },
        { name: "Negative", value: totals.negative },
      ];
      
      total = totals.positive + totals.neutral + totals.negative;
    } else {
      const found = feedbackData.find((d) => d.station === station);
      if (found) {
        processedData = [
          { name: "Positive", value: found.positive },
          { name: "Neutral", value: found.neutral },
          { name: "Negative", value: found.negative },
        ];
        total = found.positive + found.neutral + found.negative;
      }
    }
    
    setData(processedData);
    setTotalFeedback(total);
  }, [station]);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight={600}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        transition: "all 0.3s ease",
        "&:hover": { boxShadow: 6 },
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography
              variant="h6"
              sx={{ 
                fontWeight: 700, 
                color: "text.primary",
              }}
            >
              Feedback Ratings
            </Typography>
          </Grid>
          <Grid item>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="station-select-label">Station</InputLabel>
              <Select
                labelId="station-select-label"
                value={station}
                label="Station"
                onChange={(e) => setStation(e.target.value)}
              >
                <MenuItem value="All">All Stations</MenuItem>
                {feedbackData.map((station) => (
                  <MenuItem key={station.station} value={station.station}>
                    {station.station}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          flexDirection: "column",
          mt: 2
        }}>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
            Total Feedbacks: {totalFeedback}
          </Typography>
          
          <Box sx={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="90%"
                  paddingAngle={2}
                  cornerRadius={8}
                  label={renderCustomizedLabel}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      stroke={theme.palette.background.paper}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={48}
                  iconSize={14}
                  iconType="circle"
                  formatter={(value) => (
                    <span style={{ 
                      fontWeight: 600, 
                      color: theme.palette.text.secondary,
                      fontSize: "0.875rem"
                    }}>
                      {value}
                    </span>
                  )}
                  wrapperStyle={{ paddingTop: "16px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FeedbackRatingSummary;