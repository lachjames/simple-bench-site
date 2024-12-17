import { Box, Container, Typography, Link } from '@mui/material';

export const Footer = () => {
    return (
        <Box component="footer" sx={{ bgcolor: 'grey.200', py: 6, mt: 6 }}>
            <Container maxWidth="md">
                <Typography variant="body1" align="center">
                    Please reach out to{' '}
                    <Link href="mailto:philip@theinsiders.ai">
                        philip@theinsiders.ai
                    </Link>
                    {' '}for inquiries, business questions or feedback about SimpleBench.
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
                    This page was adopted from the{' '}
                    <Link href="https://nerfies.github.io" target="_blank" rel="noopener">
                        Nerfies
                    </Link>
                    {' '}project page.
                </Typography>
            </Container>
        </Box>
    );
};
