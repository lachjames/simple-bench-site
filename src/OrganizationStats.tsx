import { Box, Typography, Grid, Paper, LinearProgress } from '@mui/material';
import { getByOrganization, getMaxScoreByOrganization, organizationColors } from './board';

export const OrganizationStats = () => {
    const maxScores = getMaxScoreByOrganization();
    const HUMAN_BASELINE = 83.7;

    // Sort organizations by score
    const sortedOrgs = Object.entries(maxScores)
        .sort(([, a], [, b]) => b.score - a.score);

    return (
        <Box sx={{ mt: 4, p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Organization Performance
            </Typography>

            {/* Human Baseline Card */}
            <Grid container spacing={1.5}>
                <Grid item xs={12}>
                    <Paper
                        elevation={2}
                        sx={{
                            p: 2.5,
                            borderLeft: 6,
                            borderColor: '#2E7D32', // Green color for human baseline
                            bgcolor: 'rgba(46, 125, 50, 0.04)', // Light green background
                        }}
                    >
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={12} md={3}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Human Baseline
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                            Score: {HUMAN_BASELINE}%
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={100}
                                        sx={{
                                            height: 8,
                                            borderRadius: 4,
                                            backgroundColor: 'rgba(46, 125, 50, 0.1)',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: '#2E7D32',
                                            }
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 1 }}
                                    >
                                        Based on average performance of 9 participants
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* AI Organization Cards */}
                {sortedOrgs.map(([org, { score, model }]) => (
                    <Grid item xs={12} key={org}>
                        <Paper
                            elevation={2}
                            sx={{
                                p: 2.5,
                                borderLeft: 6,
                                borderColor: organizationColors[org] || '#grey.500',
                                position: 'relative',
                                overflow: 'hidden',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    transition: 'transform 0.2s ease-in-out',
                                }
                            }}
                        >
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item xs={12} md={3}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        {org}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                Best Score: {score.toFixed(1)}%
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Models: {getByOrganization(org).length}
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={(score / HUMAN_BASELINE) * 100}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                backgroundColor: 'rgba(0,0,0,0.1)',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: organizationColors[org] || '#grey.500',
                                                }
                                            }}
                                        />
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mt: 1 }}
                                        >
                                            Best Model: {model}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
