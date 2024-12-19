import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid, Container } from '@mui/material';
import { theme } from './theme';
import { Hero } from './Hero';
import { Introduction } from './Introduction';
import { Leaderboard } from './Leaderboard';
import { VideoSection } from './VideoSection';
import { EvaluationSection } from './Evaluation';
import { Footer } from './Footer';
// Change BrowserRouter to HashRouter
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { TryYourself } from './TryYourself';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={
            <Container maxWidth="xl">
              <Grid container spacing={4}>
                <Grid item xs={12} lg={6}>
                  <Hero />
                  <Introduction />
                  <EvaluationSection />
                </Grid>
                <Grid item xs={12} lg={6} mt={2}>
                  <Leaderboard />
                  <VideoSection />
                </Grid>
              </Grid>
              <Footer />
            </Container>
          } />
          <Route path="/try-yourself" element={<TryYourself />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
