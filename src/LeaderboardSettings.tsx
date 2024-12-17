import { useState } from 'react';
import {
    Box,
    Button,
    Collapse,
    Paper,
    Typography
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

export const LeaderboardSettings = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Box sx={{ mt: 2 }}>
            <Button
                startIcon={<SettingsIcon />}
                onClick={() => setIsOpen(!isOpen)}
                variant="outlined"
                size="small"
            >
                benchmark settings
            </Button>

            <Collapse in={isOpen}>
                <Paper sx={{ mt: 2, p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="body2" paragraph>
                        temperature: 0.7, top-p: 0.95 (except o1 series)
                    </Typography>
                    <Typography variant="body2" paragraph>
                        *See Human Evaluation section of Report for details on how we calculated Human Baseline.
                    </Typography>
                    <Typography variant="body2">
                        **We try an engineered prompt to optimize benchmark specific performance.
                        See LLM Eval section of Report for details.
                    </Typography>
                </Paper>
            </Collapse>
        </Box>
    );
};
