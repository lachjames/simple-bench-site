export interface LeaderboardEntry {
  rank: number | string;
  model: string;
  score: number;
  organization: string;
}

export interface BenchmarkSettings {
  temperature: number;
  topP: number;
  exceptions: string[];
  notes: string[];
}

export interface OrganizationStats {
  averageScore: number;
  modelCount: number;
  bestPerformer: LeaderboardEntry;
}

export type OrganizationColors = Record<string, string>;

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer?: string;
  selectedAnswer?: string;
}
