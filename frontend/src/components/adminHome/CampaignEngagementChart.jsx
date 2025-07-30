import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardContent, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const data = [
    { month: 'Jan', Dubai: 400, London: 300, Paris: 250 },
    { month: 'Feb', Dubai: 500, London: 350, Paris: 300 },
    { month: 'Mar', Dubai: 450, London: 400, Paris: 280 },
    { month: 'Apr', Dubai: 470, London: 420, Paris: 290 },
    { month: 'May', Dubai: 520, London: 480, Paris: 320 },
    { month: 'June', Dubai: 520, London: 480, Paris: 320 },
    { month: 'July', Dubai: 520, London: 480, Paris: 320 },
    { month: 'August', Dubai: 520, London: 480, Paris: 320 },
    { month: 'September', Dubai: 520, London: 480, Paris: 320 },
    { month: 'October', Dubai: 520, London: 480, Paris: 320 },
    { month: 'November', Dubai: 520, London: 480, Paris: 320 },
    { month: 'December', Dubai: 520, London: 480, Paris: 320 },
];

const colors = {
    Dubai: '#E4141C',
    London: '#242C54',
    Paris: '#6b7280',
};

const destinations = ['All', 'Dubai', 'London', 'Paris'];

const CampaignEngagementChart = () => {
    const [selectedDestination, setSelectedDestination] = React.useState('All');
    const months = data.map((d) => d.month);

    const handleChange = (event) => {
        setSelectedDestination(event.target.value);
    };

    const buildSeries = () => {
        if (selectedDestination === 'All') {
            return Object.keys(colors).map((dest) => ({
                data: data.map((d) => d[dest]),
                label: dest,
                stack: 'engagement',
                color: colors[dest],
            }));
        } else {
            return [
                {
                    data: data.map((d) => d[selectedDestination]),
                    label: selectedDestination,
                    color: colors[selectedDestination],
                },
            ];
        }
    };

    return (
        <Card sx={{ 
            mt: 3, 
            boxShadow: 3,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider'
        }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#242C54', fontWeight: 'bold' }}>
                    Campaign Engagement by Destination
                </Typography>

                <div className='w-full flex justify-end'>
                    <FormControl sx={{ mb: 2, minWidth: 180 }} size="small">
                        <InputLabel 
                            id="destination-filter-label"
                            sx={{ color: '#242C54' }}
                        >
                            Select Destination
                        </InputLabel>
                        <Select
                            labelId="destination-filter-label"
                            value={selectedDestination}
                            label="Select Destination"
                            onChange={handleChange}
                            sx={{
                                color: '#242C54',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#242C54',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#E4141C',
                                },
                            }}
                        >
                            {destinations.map((dest) => (
                                <MenuItem 
                                    key={dest} 
                                    value={dest}
                                    sx={{ color: '#242C54' }}
                                >
                                    {dest}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div style={{ width: '100%', overflowX: 'auto' }}>
                    <BarChart
                        xAxis={[{ 
                            data: months, 
                            scaleType: 'band', 
                            label: 'Month',
                            tickLabelStyle: { fill: '#242C54' }
                        }]}
                        yAxis={[{ 
                            label: 'Engagement',
                            tickLabelStyle: { fill: '#242C54' }
                        }]}
                        series={buildSeries()}
                        width={1000}
                        height={350}
                        margin={{ top: 20, bottom: 70, left: 60, right: 20 }}
                        sx={{
                            '& .MuiChartsAxis-line, & .MuiChartsAxis-tick': {
                                stroke: '#242C54',
                            },
                            '@media (max-width: 768px)': {
                                width: '100%',
                                height: 300,
                            },
                        }}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default CampaignEngagementChart;