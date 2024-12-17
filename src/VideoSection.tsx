import { Box, Container, Typography } from '@mui/material';

export const VideoSection = () => {
    return (
        <Box component="section" sx={{ py: 6 }}>
            <Container maxWidth="md">
                <Typography variant="h4" gutterBottom align="center">
                    Video Summary
                </Typography>
                <Box
                    sx={{
                        position: 'relative',
                        paddingBottom: '56.25%', // 16:9 aspect ratio
                        height: 0,
                        overflow: 'hidden',
                        '& iframe': {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                        },
                    }}
                >
                    <iframe
                        src="https://www.youtube.com/embed/tGsBJhMbiIU?si=YSGfKjkViVGwLziO&start=702"
                        title="SimpleBench Video Summary"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </Box>
            </Container>
        </Box>
    );
};
