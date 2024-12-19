import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    Button,
    Stack,
    Alert,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { questions } from './questions';
import { leaderboardData } from './board';

export const TryYourself = () => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({});

    // Add theme and media query for responsive design
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleAnswer = (questionId: number, answer: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
        setShowFeedback(prev => ({
            ...prev,
            [questionId]: true
        }));
    };

    const isCorrect = (questionId: number) => {
        const question = questions.find(q => q.id === questionId);
        return question?.correctAnswer === answers[questionId];
    };

    // Handle dropdown change
    const handleQuestionChange = (event: SelectChangeEvent<number>) => {
        const selectedQuestion = questions.find(q => q.id === event.target.value);
        if (selectedQuestion) {
            setCurrentQuestion(selectedQuestion);
        }
    };

    // Mobile question selector component
    const MobileQuestionSelector = () => (
        <FormControl fullWidth sx={{ mb: 2 }}>
            <Select
                value={currentQuestion.id}
                onChange={handleQuestionChange}
                size="small"
            >
                {questions.map((q) => (
                    <MenuItem key={q.id} value={q.id}>
                        Question {q.id}
                        {answers[q.id] && (
                            <Typography component="span" sx={{ ml: 1, color: isCorrect(q.id) ? 'success.main' : 'error.main' }}>
                                {isCorrect(q.id) ? "✓" : "✗"}
                            </Typography>
                        )}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                bgcolor: 'background.default'
            }}
        >
            {/* Header */}
            <Box sx={{
                p: 2,
                borderBottom: 1,
                borderColor: 'divider',
                bgcolor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/')}  // Changed from '/simple-bench-site/'
                    variant="outlined"
                    size="small"
                >
                    Back
                </Button>
                <Typography variant="h4" component="h1">
                    Try SimpleBench Questions
                </Typography>
            </Box>

            {/* Main content */}
            <Grid
                container
                sx={{
                    flex: 1,
                    minHeight: 0
                }}
            >
                {/* Desktop left panel - hidden on mobile */}
                {!isMobile && (
                    <Grid
                        item
                        md={3}
                        sx={{
                            borderRight: 1,
                            borderColor: 'divider',
                            height: '100%',
                            overflow: 'auto',
                            display: { xs: 'none', md: 'block' }
                        }}
                    >
                        <List disablePadding>
                            {questions.map((q) => (
                                <ListItem key={q.id} disablePadding>
                                    <ListItemButton
                                        selected={currentQuestion.id === q.id}
                                        onClick={() => setCurrentQuestion(q)}
                                    >
                                        <ListItemText
                                            primary={`Question ${q.id}`}
                                            secondary={answers[q.id] ?
                                                (isCorrect(q.id) ? "✓ Correct" : "✗ Incorrect")
                                                : "Not attempted"}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                )}

                {/* Right panel */}
                <Grid
                    item
                    xs={12}
                    md={isMobile ? 12 : 9}
                    sx={{
                        height: '100%',
                        overflow: 'auto',
                        bgcolor: 'grey.50'
                    }}
                >
                    <Box sx={{ p: 2 }}>
                        {/* Mobile dropdown */}
                        {isMobile && <MobileQuestionSelector />}

                        {/* Question section */}
                        <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="h5" gutterBottom sx={{ mb: 1 }}>
                                Question {currentQuestion.id}
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={8}>
                                    <Typography>
                                        {currentQuestion.text}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Stack spacing={1}>
                                        {currentQuestion.options.map((option, index) => (
                                            <Button
                                                key={index}
                                                variant={answers[currentQuestion.id] === option ? "contained" : "outlined"}
                                                fullWidth
                                                size="small"
                                                onClick={() => handleAnswer(currentQuestion.id, option)}
                                                sx={{
                                                    justifyContent: "flex-start",
                                                    px: 2,
                                                    bgcolor: showFeedback[currentQuestion.id] && answers[currentQuestion.id] === option
                                                        ? (isCorrect(currentQuestion.id) ? 'success.light' : 'error.light')
                                                        : undefined
                                                }}
                                            >
                                                {option}
                                            </Button>
                                        ))}
                                    </Stack>
                                </Grid>
                            </Grid>
                            {showFeedback[currentQuestion.id] && (
                                <Alert
                                    severity={isCorrect(currentQuestion.id) ? "success" : "error"}
                                    sx={{ mt: 2 }}
                                >
                                    {isCorrect(currentQuestion.id)
                                        ? "Correct! Well done!"
                                        : `Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`}
                                </Alert>
                            )}
                        </Paper>

                        {/* Model responses section */}
                        <Paper elevation={2} sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Model Responses
                            </Typography>
                            <Stack spacing={2}>
                                {leaderboardData.slice(0, 5).map((model) => (
                                    <Box key={model.model} sx={{ pb: 2 }}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} sm={4}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                    {model.model}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {model.organization}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Overall Score: {model.score}%
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={8}>
                                                <Typography variant="body2">
                                                    Sample response for this question would go here...
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider sx={{ mt: 2 }} />
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
