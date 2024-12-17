import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box
} from '@mui/material';
import { leaderboardData, organizationColors } from './board';

export const Leaderboard = () => {
    return (
        <TableContainer component={Paper} elevation={3}>
            <Box sx={{ p: 3, borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                <Typography variant="h4" gutterBottom>
                    SimpleBench Leaderboard
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Current standings of LLM performance on everyday reasoning tasks
                </Typography>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Rank</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Model</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Score (AVG@5)</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Organization</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {leaderboardData.map((row) => (
                        <TableRow 
                            key={row.model}
                            sx={{
                                backgroundColor: row.rank === '-' ? 'rgba(46, 125, 50, 0.04)' : 'inherit',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                }
                            }}
                        >
                            <TableCell>{row.rank}</TableCell>
                            <TableCell sx={{ fontWeight: row.rank === '-' ? 'bold' : 'normal' }}>
                                {row.model}
                            </TableCell>
                            <TableCell 
                                align="center"
                                sx={{ 
                                    fontWeight: 'bold',
                                    color: organizationColors[row.organization] || 'inherit'
                                }}
                            >
                                {row.score}%
                            </TableCell>
                            <TableCell>{row.organization}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
