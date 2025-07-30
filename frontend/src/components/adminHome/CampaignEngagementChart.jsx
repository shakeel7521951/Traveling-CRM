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
    Dubai: '#4fc3f7',
    London: '#81c784',
    Paris: '#ffb74d',
};

const destinations = ['All', 'Dubai', 'London', 'Paris'];

const CampaignEngagementChart = () => {
    const [selectedDestination, setSelectedDestination] = React.useState('All');
    const months = data.map((d) => d.month);

    const handleChange = (event) => {
        setSelectedDestination(event.target.value);
    };

    // Dynamically build series based on filter
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
        <Card sx={{ mt: 3, boxShadow: 4 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    📈 Campaign Engagement by Destination
                </Typography>

                {/* Filter Dropdown */}
                <div className='w-full flex justify-end'>
                    <FormControl className=' w-40 ' sx={{ mb: 2 }} >
                        <InputLabel id="destination-filter-label" className=''>Select Destination</InputLabel>
                        <Select
                            labelId="destination-filter-label"
                            value={selectedDestination}
                            label="Select Destination"
                            onChange={handleChange}
                        >
                            {destinations.map((dest) => (
                                <MenuItem key={dest} value={dest}>
                                    {dest}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </div>
                <div className="overflow-auto">
                    <BarChart
                        xAxis={[{ data: months, scaleType: 'band', label: 'Month' }]}
                        yAxis={[{ label: 'Engagement' }]}
                        series={buildSeries()}
                        width={1000}
                        height={350}
                        margin={{ top: 20, bottom: 70 }}
                        sx={{
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
