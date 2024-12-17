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
// import { OrganizationStats } from './OrganizationStats';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Left Column - Information */}
          <Grid item xs={12} lg={6}>
            <Hero />
            <Introduction />
            <EvaluationSection />
            {/* <OrganizationStats /> */}
          </Grid>

          {/* Right Column - Data */}
          <Grid item xs={12} lg={6} mt={2}>
            <Leaderboard />
            <VideoSection />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
