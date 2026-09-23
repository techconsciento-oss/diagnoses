export type UserRole = 'super_admin' | 'org_admin' | 'leadership' | 'employee';

export type Department = 'all' | 'engineering' | 'product_design' | 'sales_marketing' | 'operations';

export type TimeRange = '7d' | '30d' | 'q3' | 'ytd';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitle: string;
  department: Department;
  avatar: string;
}

export interface KPICardData {
  id: string;
  title: string;
  value: number;
  unit?: string;
  statusLabel: string;
  statusColor: 'mint' | 'cyan' | 'pink' | 'purple' | 'amber';
  trend: {
    direction: 'up' | 'down';
    percentage: number;
    isPositive: boolean;
    period: string;
  };
  benchmark: string;
  description: string;
}

export interface LensSubMetric {
  name: string;
  score: number;
  benchmark: number;
  status: 'Optimal' | 'Strong' | 'Needs Attention' | 'At Risk';
  trend: 'up' | 'down' | 'steady';
  analysis: string;
}

export interface HealthLens {
  id: string;
  title: string;
  subtitle: string;
  score: number;
  statusLabel: string;
  color: 'mint' | 'cyan' | 'pink' | 'purple' | 'amber' | 'blue';
  icon: string;
  trend: string;
  summary: string;
  subMetrics: LensSubMetric[];
  keyStrengths: string[];
  vulnerabilities: string[];
}

export interface ActionableInsight {
  id: string;
  title: string;
  department: Department;
  departmentName: string;
  priority: 'Critical' | 'Elevated' | 'Moderate' | 'Positive';
  status: 'Open' | 'In Progress' | 'Resolved';
  what: string;
  why: string;
  where: string;
  priorityReason: string;
  next: string;
  owner: string;
  impactScore: number; // 1-100
  confidence: number; // e.g. 94%
  detectedDate: string;
  tags: string[];
}

export interface SurveyQuestion {
  id: string;
  text: string;
  type: 'likert' | 'multiple_choice' | 'open_text';
  category: 'burnout' | 'safety' | 'velocity' | 'retention' | 'general';
  options?: string[];
}

export interface AssessmentSurvey {
  id: string;
  title: string;
  description: string;
  recurrence: 'Weekly Pulse' | 'Bi-Weekly' | 'Monthly Deep-Dive' | 'Ad-hoc';
  departmentTarget: Department;
  status: 'Active' | 'Scheduled' | 'Completed' | 'Draft';
  respondentsCount: number;
  totalTarget: number;
  anonymityLevel: '100% Blind Anonymity' | 'Aggregated (5+ min)';
  deadline: string;
  createdDate: string;
  questions: SurveyQuestion[];
}

export interface FilterState {
  department: Department;
  timeRange: TimeRange;
  searchQuery: string;
}
