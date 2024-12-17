import { Box, Typography, Paper } from '@mui/material';

export const Introduction = () => {
    return (
        <Box component="section" sx={{ bgcolor: 'grey.100' }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Introduction
                </Typography>
                <Typography variant="body1" paragraph>
                    We introduce <strong>SimpleBench</strong>, a multiple-choice text benchmark for LLMs where individuals with
                    unspecialized (high school) knowledge outperform SOTA models. SimpleBench includes over 200 questions covering
                    spatio-temporal reasoning, social intelligence, and what we call linguistic adversarial robustness (or trick questions).
                </Typography>
                <Typography variant="body1" paragraph>
                    For the vast majority of text-based benchmarks LLMs outperform a non-specialized human, and increasingly,
                    exceed expert human performance. However, on SimpleBench, a non-specialized human baseline is 83.7%, based on
                    our small sample of nine participants, outperforming all 13 tested LLMs, including o1-preview, which scored 41.7%.
                </Typography>
                <Typography variant="body1">
                    While we expect model performance to improve over time, the results of SimpleBench confirm that the memorized
                    knowledge, and approximate reasoning retrieval, utilized by frontier LLMs is not always enough to answer basic
                    questions just yet.
                </Typography>
            </Paper>
        </Box>
    );
};
