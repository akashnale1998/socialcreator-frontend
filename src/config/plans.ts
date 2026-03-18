export type PlanType = 'free' | 'creator' | 'pro' | 'lifetime';

export interface PlanConfig {
  name: string;
  credits: number;
  resetPeriod: 'daily' | 'monthly';
  features: string[];
}

export const PLANS: Record<PlanType, PlanConfig> = {
  free: {
    name: 'Free',
    credits: 10,
    resetPeriod: 'daily',
    features: ['captions', 'hooks', 'hashtags', 'trending', 'ideas'],
  },
  creator: {
    name: 'Creator',
    credits: 500,
    resetPeriod: 'monthly',
    features: [
      'full-post',
      'captions',
      'hooks',
      'hashtags',
      'script-generator',
      'titles',
      'trending',
      'ideas',
      'hook-library',
      'profile-analyzer',
      'history',
    ],
  },
  pro: {
    name: 'Pro Creator',
    credits: 1500,
    resetPeriod: 'monthly',
    features: [
      'full-post',
      'captions',
      'hooks',
      'hashtags',
      'script-generator',
      'titles',
      'trending',
      'ideas',
      'hook-library',
      'profile-analyzer',
      'history',
      'reel-analyzer',
      'scripts', // script-analyzer
    ],
  },
  lifetime: {
    name: 'Lifetime Creator',
    credits: 2000,
    resetPeriod: 'monthly',
    features: [
      'full-post',
      'captions',
      'hooks',
      'hashtags',
      'script-generator',
      'titles',
      'trending',
      'ideas',
      'hook-library',
      'profile-analyzer',
      'history',
      'reel-analyzer',
      'scripts',
    ],
  },
};

export const CREDIT_COSTS: Record<string, number> = {
  'captions': 1,
  'hooks': 1,
  'hashtags': 1,
  'script-generator': 2,
  'full-post': 2,
  'profile-analyzer': 2,
  'reel-analyzer': 3,
};
