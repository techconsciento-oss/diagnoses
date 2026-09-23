import { SurveyQuestion } from '../types';

export interface QuestionBankItem {
  id: string;
  category: 'burnout' | 'safety' | 'velocity' | 'retention' | 'leadership' | 'culture' | 'general';
  categoryLabel: string;
  text: string;
  type: 'likert' | 'multiple_choice' | 'open_text';
  options?: string[];
  scientificReference?: string;
}

export const QUESTION_BANK: QuestionBankItem[] = [
  // Psychological Safety (Amy Edmondson Model)
  {
    id: 'qb-safety-1',
    category: 'safety',
    categoryLabel: 'Psychological Safety',
    text: 'If you make a mistake on this team, it is not held against you.',
    type: 'likert',
    scientificReference: 'Edmondson Psychological Safety Index (1999)',
  },
  {
    id: 'qb-safety-2',
    category: 'safety',
    categoryLabel: 'Psychological Safety',
    text: 'Members of this team are able to bring up problems and tough issues candidly.',
    type: 'likert',
    scientificReference: 'Edmondson Psychological Safety Index (1999)',
  },
  {
    id: 'qb-safety-3',
    category: 'safety',
    categoryLabel: 'Psychological Safety',
    text: 'People on this team sometimes reject others for being different or proposing unconventional ideas.',
    type: 'likert',
    scientificReference: 'Inverted Safety Marker',
  },
  {
    id: 'qb-safety-4',
    category: 'safety',
    categoryLabel: 'Psychological Safety',
    text: 'How safe do you feel expressing disagreement with a technical or strategic decision made by team leadership?',
    type: 'multiple_choice',
    options: ['Completely Safe (Encouraged)', 'Moderately Safe (No Backlash)', 'Somewhat Hesitant', 'Unsafe / Risky to Reputation'],
  },

  // Burnout & Cognitive Workload (Maslach Burnout Inventory)
  {
    id: 'qb-burnout-1',
    category: 'burnout',
    categoryLabel: 'Burnout & Cognitive Workload',
    text: 'My current workload allows me to maintain sustainable cognitive focus without feeling consistently drained.',
    type: 'likert',
    scientificReference: 'Maslach Burnout Inventory adaptation',
  },
  {
    id: 'qb-burnout-2',
    category: 'burnout',
    categoryLabel: 'Burnout & Cognitive Workload',
    text: 'I have sufficient blocks of uninterrupted focus time (at least 2 consecutive hours) during the working day.',
    type: 'likert',
    scientificReference: 'Deep Work Telemetry Standard',
  },
  {
    id: 'qb-burnout-3',
    category: 'burnout',
    categoryLabel: 'Burnout & Cognitive Workload',
    text: 'How frequently have mid-sprint requirement shifts or scope alterations impacted your planned hours this month?',
    type: 'multiple_choice',
    options: ['Rarely or Never', '1-2 times per sprint (Manageable)', 'Frequently (Causes Overtime)', 'Continuous Scope Churn'],
  },
  {
    id: 'qb-burnout-4',
    category: 'burnout',
    categoryLabel: 'Burnout & Cognitive Workload',
    text: 'What single meeting or recurring process contributed most to calendar fatigue this past week?',
    type: 'open_text',
  },

  // Team Cultural Velocity & Alignment
  {
    id: 'qb-velocity-1',
    category: 'velocity',
    categoryLabel: 'Team Cultural Velocity',
    text: 'Cross-functional collaboration between Product, Engineering, and Design operates with high trust and minimal friction.',
    type: 'likert',
  },
  {
    id: 'qb-velocity-2',
    category: 'velocity',
    categoryLabel: 'Team Cultural Velocity',
    text: 'Our team reaches clear decisions efficiently without getting stuck in protracted committee consensus cycles.',
    type: 'likert',
  },
  {
    id: 'qb-velocity-3',
    category: 'velocity',
    categoryLabel: 'Team Cultural Velocity',
    text: 'Rate your team’s delivery momentum over the past 14 days:',
    type: 'multiple_choice',
    options: ['High Momentum & Smooth Flow', 'Moderate Momentum with Minor Blockers', 'Sluggish (Waiting on Approvals)', 'Blocked / High Friction'],
  },

  // Retention & Belonging (eNPS)
  {
    id: 'qb-retention-1',
    category: 'retention',
    categoryLabel: 'Retention & eNPS',
    text: 'How likely are you to recommend our organization as a phenomenal place to work and grow? (eNPS)',
    type: 'multiple_choice',
    options: ['10 - Extremely Likely (Promoter)', '9 - Very Likely', '7-8 - Neutral (Passive)', '1-6 - Unlikely (Detractor)'],
  },
  {
    id: 'qb-retention-2',
    category: 'retention',
    categoryLabel: 'Retention & eNPS',
    text: 'I see a compelling, transparent career development path for myself here over the next 12 to 24 months.',
    type: 'likert',
  },

  // Leadership & Empathy
  {
    id: 'qb-leadership-1',
    category: 'leadership',
    categoryLabel: 'Leadership Clarity',
    text: 'Executive leadership communicates company strategy and prioritization tradeoffs with clarity and honesty.',
    type: 'likert',
  },
  {
    id: 'qb-leadership-2',
    category: 'leadership',
    categoryLabel: 'Leadership Clarity',
    text: 'What is one concrete leadership decision or announcement that could be communicated with greater transparency?',
    type: 'open_text',
  },
];
