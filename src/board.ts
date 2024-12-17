import { LeaderboardEntry } from './types';

export const leaderboardData: LeaderboardEntry[] = [
    {
        rank: '-',
        model: 'Human Baseline*',
        score: 83.7,
        organization: ''
    },
    {
        rank: 1,
        model: 'o1-preview',
        score: 41.7,
        organization: 'OpenAI'
    },
    {
        rank: 2,
        model: 'Claude 3.5 Sonnet 10-22',
        score: 41.4,
        organization: 'Anthropic'
    },
    {
        rank: 3,
        model: 'Gemini-exp-1206',
        score: 31.1,
        organization: 'Google'
    },
    {
        rank: 4,
        model: 'Claude 3.5 Sonnet 06-20',
        score: 27.5,
        organization: 'Anthropic'
    },
    {
        rank: 5,
        model: 'Gemini 1.5 Pro 002',
        score: 27.1,
        organization: 'Google'
    },
    {
        rank: 6,
        model: 'GPT-4 Turbo',
        score: 25.1,
        organization: 'OpenAI'
    },
    {
        rank: 7,
        model: 'Claude 3 Opus',
        score: 23.5,
        organization: 'Anthropic'
    },
    {
        rank: 8,
        model: 'Llama 3.1 405b instruct',
        score: 23.0,
        organization: 'Meta'
    },
    {
        rank: 9,
        model: 'Grok 2',
        score: 22.7,
        organization: 'xAI'
    },
    {
        rank: 10,
        model: 'Mistral Large v2',
        score: 22.5,
        organization: 'Mistral'
    },
    {
        rank: 11,
        model: 'Llama 3.3 70b instruct',
        score: 19.9,
        organization: 'Meta'
    },
    {
        rank: 12,
        model: 'Gemini 2.0 Flash Exp',
        score: 18.9,
        organization: 'Google'
    },
    {
        rank: 13,
        model: 'o1-mini',
        score: 18.1,
        organization: 'OpenAI'
    },
    {
        rank: 14,
        model: 'GPT-4o 08-06',
        score: 17.8,
        organization: 'OpenAI'
    },
    {
        rank: 15,
        model: 'Command R+',
        score: 17.4,
        organization: 'Cohere'
    },
    {
        rank: 16,
        model: 'GPT-4o mini',
        score: 10.7,
        organization: 'OpenAI'
    }
];

// Helper functions for data analysis
export const getTopPerformers = (count: number = 5): LeaderboardEntry[] => {
    return leaderboardData
        .filter(entry => entry.rank !== '-') // Exclude human baseline
        .slice(0, count);
};

export const getByOrganization = (org: string): LeaderboardEntry[] => {
    return leaderboardData.filter(entry => entry.organization === org);
};

export const getAverageScoreByOrganization = (): Record<string, number> => {
    const orgScores: Record<string, { total: number; count: number }> = {};

    leaderboardData
        .filter(entry => entry.organization) // Exclude entries with no organization
        .forEach(entry => {
            if (!orgScores[entry.organization]) {
                orgScores[entry.organization] = { total: 0, count: 0 };
            }
            orgScores[entry.organization].total += entry.score;
            orgScores[entry.organization].count += 1;
        });

    return Object.entries(orgScores).reduce((acc, [org, { total, count }]) => {
        acc[org] = total / count;
        return acc;
    }, {} as Record<string, number>);
};

export const getMaxScoreByOrganization = (): Record<string, LeaderboardEntry> => {
    const bestPerformers: Record<string, LeaderboardEntry> = {};

    leaderboardData
        .filter(entry => entry.organization) // Exclude entries with no organization
        .forEach(entry => {
            if (!bestPerformers[entry.organization] || entry.score > bestPerformers[entry.organization].score) {
                bestPerformers[entry.organization] = entry;
            }
        });

    return bestPerformers;
}

// Additional metadata
export const organizationColors: Record<string, string> = {
    'OpenAI': '#412991',
    'Anthropic': '#0066CC',
    'Google': '#4285F4',
    'Meta': '#0668E1',
    'xAI': '#1DA1F2',
    'Mistral': '#00A67E',
    'Cohere': '#FF6B6B'
};

export const benchmarkSettings = {
    temperature: 0.7,
    topP: 0.95,
    exceptions: ['o1 series'],
    notes: [
        'See Human Evaluation section of Report for details on how we calculated Human Baseline.',
        'We try an engineered prompt to optimize benchmark specific performance. See LLM Eval section of Report for details.'
    ]
};
