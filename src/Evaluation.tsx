import { Box, Container, Typography, Paper, Link } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { leaderboardData, organizationColors } from './board';

export const EvaluationSection = () => {
    // Transform and sort data for the chart
    const chartData = [...leaderboardData]
        .sort((a, b) => b.score - a.score)
        .map(entry => ({
            name: entry.model,
            score: entry.score,
            organization: entry.organization,
            fill: organizationColors[entry.organization] || '#87CEEB'
        }));

    // Custom tooltip to show organization
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <Paper sx={{ p: 1, bgcolor: 'rgba(255, 255, 255, 0.95)' }}>
                    <Typography variant="body2">{payload[0].payload.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {payload[0].payload.organization}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                        Score: {payload[0].value}%
                    </Typography>
                </Paper>
            );
        }
        return null;
    };

    // Custom legend that shows organizations
    const CustomLegend = () => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mb: 2 }}>
            {Object.entries(organizationColors).map(([org, color]) => (
                <Box
                    key={org}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    <Box
                        sx={{
                            width: 16,
                            height: 16,
                            bgcolor: color,
                            borderRadius: '4px'
                        }}
                    />
                    <Typography variant="body2">{org}</Typography>
                </Box>
            ))}
        </Box>
    );

    return (
        <Box component="section" sx={{ bgcolor: 'grey.100', py: 6 }}>
            <Container maxWidth="md">
                <Paper sx={{ p: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Evaluating Reasoning and Prompting
                    </Typography>

                    <CustomLegend />

                    <Box sx={{ my: 4, height: 500 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                layout="vertical"
                                margin={{
                                    top: 20,    // Increased top margin
                                    right: 20,   // Added right margin
                                    left: 20,   // Increased left margin for labels
                                    bottom: 20,  // Increased bottom margin
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} />
                                <XAxis
                                    type="number"
                                    domain={[0, 100]}
                                    label={{
                                        value: "AVG@5 Score (%)",
                                        position: "bottom",
                                        offset: 0
                                    }}
                                />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    width={200}
                                    tick={{
                                        fontSize: 14,
                                        dx: -5,  // Adjust label position
                                        dy: 13
                                    }}
                                    scale="band"
                                    interval={0}
                                />
                                <Tooltip
                                    content={<CustomTooltip />}
                                    cursor={{ fill: 'rgba(0, 0, 0, 0.1)'}}
                                    wrapperStyle={{ zIndex: 100 }}  // Ensure tooltip is above bars
                                />
                                <Bar
                                    dataKey="score"
                                    label={{
                                        position: 'right',
                                        formatter: (value: number) => `${value}%`,
                                        // dx: 5  // Adjust label position
                                        dy: 2  // Adjust label position
                                    }}
                                    fillOpacity={0.9}
                                    // fill={(entry: number) => entry.fill}
                                    // barSize={20}  // Control bar height
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>


                    <Typography variant="body1" paragraph>
                        The results show interesting patterns across organizations, with OpenAI and Anthropic models
                        leading the benchmark, followed by Google's models. Despite the varying approaches and
                        architectures used by different organizations, all models still fall significantly short
                        of human performance (83.7%).
                    </Typography>

                    <Typography variant="body1" paragraph>
                        To assess LLMs fairly, we standardized prompts across all models, directing them to choose
                        the most realistic answer step-by-step (COT). Additionally, we tested a benchmark specific
                        engineered prompt for select models. Prompt engineering showed slight improvements
                        suggesting that while tailored prompts can aid performance, fundamental
                        limitations remain.
                    </Typography>

                    <Typography variant="body1" paragraph>
                        In the full report, we also hypothesize that the surprising underperformance of GPT4o
                        stems from optimizing for specific industrial applications (math and coding) at the
                        expense of holistic reasoning.
                    </Typography>

                    <Typography variant="body1">
                        For a deeper dive into our results and our methods, check out the full technical report{' '}
                        <Link
                            href="https://drive.google.com/file/d/1mddNFK5UbBFVr3oDftd2Kyc6D8TFctfe/view"
                            target="_blank"
                            sx={{ color: '#0077B6' }}
                        >
                            here
                        </Link>.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};
