import { Box, Typography, Container, Button, Stack } from '@mui/material';
import { PictureAsPdf, GitHub, Check } from '@mui/icons-material';

export const Hero = () => {
    return (
        <Box component="section" py={3}>
            <Container maxWidth="md">
                <Box textAlign="center">
                    <Typography 
                        variant="h3" 
                        component="h1" 
                        sx={{ 
                            mb: 1,
                            fontWeight: 'bold'
                        }}
                    >
                        SimpleBench
                    </Typography>
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            mb: 1,
                            color: 'text.secondary'
                        }}
                    >
                        Where Everyday Human Reasoning Still Surpasses Frontier Models
                    </Typography>
                    <Typography 
                        variant="subtitle1" 
                        color="text.secondary" 
                        sx={{ mb: 2 }}
                    >
                        SimpleBench Team
                    </Typography>

                    <Stack 
                        direction="row" 
                        spacing={2} 
                        justifyContent="center" 
                        sx={{ mt: 2 }}
                    >
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<PictureAsPdf />}
                            href="/simple-bench-site/SimpleBench.pdf"
                            target="_blank"
                        >
                            Report
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<Check />}
                            href="#/try-yourself"
                        >
                            Try Yourself
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<GitHub />}
                            href="https://github.com/simple-bench/SimpleBench"
                            target="_blank"
                        >
                            Code
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};
