import { 
  Department, 
  TimeRange, 
  KPICardData, 
  HealthLens, 
  ActionableInsight, 
  AssessmentSurvey, 
  UserProfile 
} from '../types';

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'user-1',
    name: 'Elena Rostova',
    email: 'elena.rostova@pulsehealth.enterprise',
    role: 'super_admin',
    roleTitle: 'Chief People & Culture Officer (Super Admin)',
    department: 'all',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user-2',
    name: 'Marcus Vance',
    email: 'marcus.vance@pulsehealth.enterprise',
    role: 'org_admin',
    roleTitle: 'VP of Organizational Effectiveness & HR Lead',
    department: 'all',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user-3',
    name: 'David Sterling',
    email: 'david.sterling@pulsehealth.enterprise',
    role: 'leadership',
    roleTitle: 'VP of Product & Engineering (Leadership Viewer)',
    department: 'engineering',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user-4',
    name: 'Aria Chen',
    email: 'aria.chen@pulsehealth.enterprise',
    role: 'employee',
    roleTitle: 'Senior Product Designer (Employee Respondent)',
    department: 'product_design',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  },
];

// Helper to provide department-specific or time-range modulated KPI metrics
export function getKPIData(dept: Department, timeRange: TimeRange): KPICardData[] {
  let burnoutVal = 18;
  let safetyVal = 91;
  let velocityVal = 84;
  let retentionVal = 89;

  let burnoutStatus = 'Low Risk';
  let burnoutColor: 'mint' | 'cyan' | 'pink' | 'purple' | 'amber' = 'mint';

  let safetyStatus = 'Optimal';
  let safetyColor: 'mint' | 'cyan' | 'pink' | 'purple' | 'amber' = 'cyan';

  let velocityStatus = 'High Alignment';
  let velocityColor: 'mint' | 'cyan' | 'pink' | 'purple' | 'amber' = 'pink';

  let retentionStatus = 'Strong';
  let retentionColor: 'mint' | 'cyan' | 'pink' | 'purple' | 'amber' = 'purple';

  if (dept === 'engineering') {
    burnoutVal = 15;
    safetyVal = 95;
    safetyStatus = 'Pinnacle Trust';
    velocityVal = 88;
    retentionVal = 93;
  } else if (dept === 'product_design') {
    burnoutVal = 32;
    burnoutStatus = 'Elevated Risk';
    burnoutColor = 'pink';
    safetyVal = 82;
    safetyStatus = 'Solid Baseline';
    velocityVal = 76;
    velocityStatus = 'Sprint Friction';
    velocityColor = 'amber';
    retentionVal = 81;
    retentionStatus = 'Watchlist';
  } else if (dept === 'sales_marketing') {
    burnoutVal = 24;
    burnoutStatus = 'Moderate';
    burnoutColor = 'amber';
    safetyVal = 86;
    velocityVal = 89;
    retentionVal = 85;
  } else if (dept === 'operations') {
    burnoutVal = 14;
    safetyVal = 89;
    velocityVal = 81;
    retentionVal = 94;
    retentionStatus = 'Peak Stability';
  }

  // Adjust slightly by time range to demonstrate live dynamic reaction
  const timeOffset = timeRange === '7d' ? 0 : timeRange === '30d' ? 1 : timeRange === 'q3' ? -2 : 3;
  burnoutVal = Math.max(10, Math.min(65, burnoutVal + (timeRange === '7d' ? 0 : 2)));
  safetyVal = Math.max(60, Math.min(99, safetyVal + timeOffset));
  velocityVal = Math.max(50, Math.min(98, velocityVal + (timeOffset > 0 ? 1 : -1)));

  return [
    {
      id: 'kpi-burnout',
      title: 'Burnout Risk Index',
      value: burnoutVal,
      unit: '%',
      statusLabel: burnoutStatus,
      statusColor: burnoutColor,
      trend: {
        direction: dept === 'product_design' ? 'up' : 'down',
        percentage: dept === 'product_design' ? 4.2 : 2.8,
        isPositive: dept !== 'product_design',
        period: 'vs previous diagnostic window',
      },
      benchmark: 'Global Tech Median: 24%',
      description: 'Synthetic telemetry derived from cognitive load, survey cadence, and weekend slack activity.',
    },
    {
      id: 'kpi-safety',
      title: 'Psychological Safety Score',
      value: safetyVal,
      unit: '%',
      statusLabel: safetyStatus,
      statusColor: safetyColor,
      trend: {
        direction: 'up',
        percentage: 3.5,
        isPositive: true,
        period: 'vs previous diagnostic window',
      },
      benchmark: 'Top Quartile Target: >85%',
      description: 'Measures willingness to voice unconventional ideas, flag blockers, and admit mistakes without fear.',
    },
    {
      id: 'kpi-velocity',
      title: 'Team Cultural Velocity',
      value: velocityVal,
      unit: '%',
      statusLabel: velocityStatus,
      statusColor: velocityColor,
      trend: {
        direction: dept === 'product_design' ? 'down' : 'up',
        percentage: 1.9,
        isPositive: dept !== 'product_design',
        period: 'vs previous diagnostic window',
      },
      benchmark: 'SaaS Enterprise Index: 78%',
      description: 'Speed of consensus building, cross-functional momentum, and strategic goal resonance.',
    },
    {
      id: 'kpi-retention',
      title: 'Predictive Retention Stability',
      value: retentionVal,
      unit: '%',
      statusLabel: retentionStatus,
      statusColor: retentionColor,
      trend: {
        direction: 'up',
        percentage: 1.2,
        isPositive: true,
        period: 'vs previous diagnostic window',
      },
      benchmark: 'Industry Volatility Floor: 82%',
      description: 'Probability of voluntary staff continuity over the next 12-month horizon based on health signals.',
    },
  ];
}

export function getAIInsightSummary(dept: Department): { text: string; departmentAlert: string; severity: 'info' | 'warning' | 'critical' } {
  if (dept === 'product_design') {
    return {
      text: "Sprint scope expansion is producing early workload strain in Product Design (32% burnout index, +4.2%). Blameless communication remains resilient, but uninterrupted deep work has dropped to 1.8 hrs/day.",
      departmentAlert: "Early Workload Strain Detected in Product Design",
      severity: "warning",
    };
  }
  if (dept === 'engineering') {
    return {
      text: "Pinnacle Psychological Safety (95%) and blameless retrospective cadence in Engineering are driving industry-leading retention stability (93%). Architecture syncs have reduced PR turnaround times by 22%.",
      departmentAlert: "High Trust & Benchmark Psychological Safety in Engineering",
      severity: "info",
    };
  }
  if (dept === 'sales_marketing') {
    return {
      text: "Strong strategic velocity (89%) propelled by unified Q3 go-to-market targets. Slight uptick in quota stress offset by weekly peer recognition circles.",
      departmentAlert: "High Alignment With Noticeable End-of-Quarter Cadence Stress",
      severity: "info",
    };
  }
  if (dept === 'operations') {
    return {
      text: "Operations demonstrates exceptional organizational equilibrium with lowest company burnout (14%) and 94% retention stability. Cross-functional SLA satisfaction stands at 91%.",
      departmentAlert: "Optimal Stability & High Operational Predictability",
      severity: "info",
    };
  }
  return {
    text: "High trust and blameless retrospectives in Engineering team (95% safety), with early workload strain and meeting fragmentation detected in Product Design (32% burnout). Company-wide cultural velocity remains strong at 84%.",
    departmentAlert: "Live Organization Telemetry: 14 Active Signals Synthesized",
    severity: "info",
  };
}

export const INITIAL_HEALTH_LENSES: HealthLens[] = [
  {
    id: 'lens-employees',
    title: 'Employees',
    subtitle: 'Individual Wellbeing, Autonomy & Cognitive Load',
    score: 87,
    statusLabel: 'Optimal Balance',
    color: 'mint',
    icon: 'UserCheck',
    trend: '+2.4% vs benchmark',
    summary: 'Individual contributors report high day-to-day autonomy and deep pride in craftsmanship, tempered by occasional meeting overload in sprint weeks.',
    subMetrics: [
      { name: 'Autonomy & Ownership', score: 92, benchmark: 82, status: 'Optimal', trend: 'up', analysis: 'Teams feel empowered to make architectural decisions without gatekeeping.' },
      { name: 'Cognitive Workload Index', score: 79, benchmark: 75, status: 'Strong', trend: 'down', analysis: 'Noticeable context switching between Slack notifications and Jira updates.' },
      { name: 'Work-Life Equilibrium', score: 85, benchmark: 78, status: 'Strong', trend: 'up', analysis: 'Weekend disconnect policies adhered to by 89% of personnel.' },
      { name: 'Growth & Skill Trajectory', score: 91, benchmark: 80, status: 'Optimal', trend: 'up', analysis: 'Internal learning stipends and design teardowns show strong participation.' },
    ],
    keyStrengths: [
      'Engineers and designers express 94% confidence in their direct team support networks.',
      'Clear definition of role boundaries with transparent career ladders across grades.',
    ],
    vulnerabilities: [
      'Mid-level ICs report an average of 4.2 hours spent in meetings on Tuesdays and Thursdays.',
    ],
  },
  {
    id: 'lens-teams',
    title: 'Teams',
    subtitle: 'Cross-functional Cohesion & Psychological Safety',
    score: 91,
    statusLabel: 'Optimal',
    color: 'cyan',
    icon: 'Users',
    trend: '+4.1% vs Q2',
    summary: 'Team dynamics are the strongest pillar of the organization, characterized by high blameless curiosity and mutual accountability.',
    subMetrics: [
      { name: 'Psychological Safety', score: 94, benchmark: 83, status: 'Optimal', trend: 'up', analysis: 'Employees consistently raise critical blockers without fear of retribution.' },
      { name: 'Cross-Functional Friction', score: 86, benchmark: 76, status: 'Strong', trend: 'up', analysis: 'Hand-offs between Design and Front-end have improved via design token automations.' },
      { name: 'Blameless Accountability', score: 93, benchmark: 81, status: 'Optimal', trend: 'up', analysis: 'Post-mortems focus strictly on system vulnerabilities rather than individual fault.' },
      { name: 'Consensus Building Speed', score: 88, benchmark: 77, status: 'Strong', trend: 'up', analysis: 'Average RFC approval cycle reduced from 7.2 days to 3.8 days.' },
    ],
    keyStrengths: [
      'Zero reports of fear-based feedback in anonymous diagnostic pulse channels.',
      'Active peer recognition frequency is 38% above tech sector averages.',
    ],
    vulnerabilities: [
      'Product & Sales misalignment on custom enterprise delivery dates requires structured escalation.',
    ],
  },
  {
    id: 'lens-leadership',
    title: 'Leadership',
    subtitle: 'Vision Clarity, Executive Empathy & Trust',
    score: 83,
    statusLabel: 'Solid Confidence',
    color: 'purple',
    icon: 'Compass',
    trend: '+1.6% vs Q2',
    summary: 'Executive vision is widely understood, but employees seek more transparent communication around product roadmap prioritization tradeoffs.',
    subMetrics: [
      { name: 'Strategic Vision Clarity', score: 87, benchmark: 80, status: 'Strong', trend: 'up', analysis: 'Company-wide OKRs understood and recalled by 84% of staff.' },
      { name: 'Empathy & Active Listening', score: 82, benchmark: 74, status: 'Strong', trend: 'up', analysis: 'Town hall Q&A sessions praised for candid, unscripted responses.' },
      { name: 'Decision Velocity', score: 78, benchmark: 73, status: 'Needs Attention', trend: 'down', analysis: 'Strategic pivots sometimes feel delayed awaiting C-suite executive consensus.' },
      { name: 'Resource Allocation Trust', score: 84, benchmark: 79, status: 'Strong', trend: 'up', analysis: 'Confidence that budget aligns with long-term technological resilience.' },
    ],
    keyStrengths: [
      'Town Hall transparency score of 89% with high attendance across international hubs.',
      'Direct managers consistently praised for prioritizing employee mental health.',
    ],
    vulnerabilities: [
      'Desire for clearer documentation on why certain experimental projects are sunsetted.',
    ],
  },
  {
    id: 'lens-culture',
    title: 'Culture',
    subtitle: 'Innovation Appetite, Inclusivity & Resonance',
    score: 88,
    statusLabel: 'High Alignment',
    color: 'pink',
    icon: 'Sparkles',
    trend: '+3.8% vs benchmark',
    summary: 'A vibrant culture of technical experimentation with deep commitment to psychological equity and peer empowerment.',
    subMetrics: [
      { name: 'Inclusivity & Belonging', score: 92, benchmark: 84, status: 'Optimal', trend: 'up', analysis: 'Employee Resource Groups report high executive sponsorship and real influence.' },
      { name: 'Appetite for Experimentation', score: 89, benchmark: 79, status: 'Optimal', trend: 'up', analysis: 'Internal hack weeks yield actionable production features.' },
      { name: 'Recognition & Gratitude', score: 86, benchmark: 75, status: 'Strong', trend: 'up', analysis: 'Kudos channels demonstrate genuine gratitude and cross-department camaraderie.' },
      { name: 'Mission Resonance', score: 85, benchmark: 82, status: 'Strong', trend: 'up', analysis: 'Employees genuinely believe the product creates ethical value for customers.' },
    ],
    keyStrengths: [
      'Exceptional diversity of thought reflected in bottom-up innovation initiatives.',
      'Active cultural rituals like Demo Days maintain company-wide connectedness.',
    ],
    vulnerabilities: [
      'Remote vs hybrid parity needs continued calibration for social celebrations.',
    ],
  },
  {
    id: 'lens-business',
    title: 'Business Metrics',
    subtitle: 'Organizational Agility, eNPS & Retention Probability',
    score: 89,
    statusLabel: 'Strong Performance',
    color: 'blue',
    icon: 'TrendingUp',
    trend: '+5.0% vs industry',
    summary: 'Internal health indicators directly correlate with positive business output, low churn, and industry-leading employee Net Promoter Score.',
    subMetrics: [
      { name: 'Employee Net Promoter (eNPS)', score: 94, benchmark: 70, status: 'Optimal', trend: 'up', analysis: 'Net score of +52 ranks in the 94th percentile of enterprise software firms.' },
      { name: 'Voluntary Turnover Probability', score: 89, benchmark: 82, status: 'Optimal', trend: 'up', analysis: 'Projected annualized voluntary churn is below 4.1% across all engineering squads.' },
      { name: 'Talent Referral Willingness', score: 92, benchmark: 81, status: 'Optimal', trend: 'up', analysis: '81% of new open requisitions receive qualified internal referrals.' },
      { name: 'Execution Agility Index', score: 82, benchmark: 76, status: 'Strong', trend: 'up', analysis: 'Time from customer feature request to initial staging validation is 18 days.' },
    ],
    keyStrengths: [
      'eNPS of +52 with positive verbatim praise citing collaborative peers and mission alignment.',
      'Talent acquisition cost is 42% lower due to high inbound candidate sentiment.',
    ],
    vulnerabilities: [
      'Rapid headcount scaling in Q4 could dilute team cultural velocity if onboarding is rushed.',
    ],
  },
  {
    id: 'lens-external',
    title: 'External View',
    subtitle: 'Glassdoor Sentiment, Brand Equity & CSAT Echo',
    score: 85,
    statusLabel: 'Benchmark Leader',
    color: 'amber',
    icon: 'Globe',
    trend: '+0.3 pt rating',
    summary: 'Public perception closely mirrors internal diagnostics, with consistent praise for company leadership integrity and technical excellence.',
    subMetrics: [
      { name: 'Glassdoor Public Rating', score: 92, benchmark: 80, status: 'Optimal', trend: 'up', analysis: '4.7 / 5.0 cumulative rating across 380+ verified employee reviews.' },
      { name: 'Customer Satisfaction Impact', score: 88, benchmark: 82, status: 'Strong', trend: 'up', analysis: 'Internal team happiness index correlates at r=0.78 with customer CSAT scores.' },
      { name: 'Employer Brand Appeal', score: 84, benchmark: 78, status: 'Strong', trend: 'up', analysis: 'Recognized as a Best Workplace for Innovators by industry publications.' },
      { name: 'Vendor & Partner Trust', score: 79, benchmark: 75, status: 'Strong', trend: 'steady', analysis: 'Reliable payment terms and collaborative project management praised by partners.' },
    ],
    keyStrengths: [
      'CEO approval rating stands at 96% on public employer ranking portals.',
      'Zero severe negative brand controversies regarding workplace culture.',
    ],
    vulnerabilities: [
      'Occasional reviews mention high bar for interview process and technical rigor.',
    ],
  },
];

export const INITIAL_ACTIONABLE_INSIGHTS: ActionableInsight[] = [
  {
    id: 'insight-1',
    title: 'Workload Compression & Sprint Scope Creep in Product Design',
    department: 'product_design',
    departmentName: 'Product & Design',
    priority: 'Elevated',
    status: 'Open',
    what: 'Product Design team reports a sharp spike in cognitive overload, with burnout risk reaching 32% (+4.2% over two weeks). 68% of designers cite shifting sprint priorities.',
    why: 'Mid-sprint requirement alterations from enterprise deals without scope de-commitments have forced 14+ hours of overtime per designer.',
    where: 'Product Design Guild & Core Application UI/UX Squad',
    priorityReason: 'Elevated Risk of key staff turnover before Q4 major release milestone if unresolved.',
    next: 'Implement an immediate 2-week "Scope Freeze" and enforce 1-in-1-out prioritization protocol with Product Management.',
    owner: 'Marcus Vance (HR Lead) & Head of Product',
    impactScore: 88,
    confidence: 94,
    detectedDate: '2 hours ago',
    tags: ['Burnout', 'Sprint Hygiene', 'Workload'],
  },
  {
    id: 'insight-2',
    title: 'Cross-Functional Feedback Latency Between Engineering & Product',
    department: 'engineering',
    departmentName: 'Engineering',
    priority: 'Moderate',
    status: 'In Progress',
    what: 'Engineers report that PR sign-offs and design asset clarifications take an average of 38 hours, causing idle wait states and duplicate code work.',
    why: 'Asynchronous Figma-to-GitHub hand-offs lack standardized acceptance criteria, leading to repeated back-and-forth comment cycles.',
    where: 'Frontend Platform Squad & Core Web App Team',
    priorityReason: 'Slows feature shipping velocity by 18% and degrades inter-team alignment.',
    next: 'Institute a mandatory 15-minute daily synchronous desk-check between squad leads and embed design tokens directly in CI/CD.',
    owner: 'David Sterling (VP Engineering)',
    impactScore: 76,
    confidence: 91,
    detectedDate: 'Yesterday',
    tags: ['Velocity', 'Collaboration', 'CI/CD'],
  },
  {
    id: 'insight-3',
    title: 'Meeting Fragmentation & Deep Work Deprivation Across Tech ICs',
    department: 'all',
    departmentName: 'All Departments',
    priority: 'Critical',
    status: 'Open',
    what: 'Company-wide telemetry detects that 64% of individual contributors experience less than 2 consecutive hours of uninterrupted creative focus time per workday.',
    why: 'Ad-hoc status syncs, recurring 30-minute committee check-ins, and multi-tier calendar invites have fragmented the core working day into 45-minute slices.',
    where: 'Company-wide (Peak severity in Marketing, Product, and Senior Engineering)',
    priorityReason: 'Direct contributor to end-of-day fatigue, late night catching-up, and decreased engineering flow state.',
    next: 'Formalize "Focus Wednesdays" (zero internal recurring meetings allowed) and audit all recurring syncs longer than 25 minutes.',
    owner: 'Elena Rostova (Super Admin)',
    impactScore: 95,
    confidence: 97,
    detectedDate: '3 days ago',
    tags: ['Deep Work', 'Burnout Prevention', 'Calendar Hygiene'],
  },
  {
    id: 'insight-4',
    title: 'Exemplary Psychological Safety & Blameless Culture in Platform Engineering',
    department: 'engineering',
    departmentName: 'Engineering',
    priority: 'Positive',
    status: 'Resolved',
    what: 'Platform & Infrastructure engineering achieved an extraordinary 95% psychological safety index with 100% voluntary retention across 18 months.',
    why: 'Systemic adoption of transparent blameless post-mortems, paired programming rotations, and public celebration of near-miss discoveries.',
    where: 'Cloud Infrastructure & Site Reliability Engineering (SRE)',
    priorityReason: 'Gold standard organizational model suitable for institutional codification.',
    next: 'Replicate SRE blameless post-mortem framework and psychological safety ritual guides into the Sales Operations and Marketing divisions.',
    owner: 'Engineering Leadership Council',
    impactScore: 92,
    confidence: 99,
    detectedDate: '5 days ago',
    tags: ['Psychological Safety', 'Best Practice', 'Culture Replicability'],
  },
  {
    id: 'insight-5',
    title: 'Q3 Quota Realignment Stress in Mid-Market Enterprise Sales',
    department: 'sales_marketing',
    departmentName: 'Sales & Marketing',
    priority: 'Elevated',
    status: 'Open',
    what: 'Sales reps indicate rising anxiety regarding territory shifts and unexpected CRM tracking requirements implemented in mid-quarter.',
    why: 'Territory rebalancing was announced without detailed transition accounts or pipeline compensation credit protection.',
    where: 'Mid-Market North America Sales Team',
    priorityReason: 'May result in commission disputes and reduced client pipeline momentum.',
    next: 'Host a territory rebalancing AMA with Revenue Operations and implement a 60-day commission floor safety net.',
    owner: 'Head of Global Revenue',
    impactScore: 84,
    confidence: 89,
    detectedDate: '1 week ago',
    tags: ['Sales Operations', 'Compensation', 'Transparency'],
  },
];

export const INITIAL_ASSESSMENT_SURVEYS: AssessmentSurvey[] = [
  {
    id: 'survey-1',
    title: 'Weekly Continuous Diagnostic Pulse (W38)',
    description: 'A 3-minute anonymous check-in tracking weekly psychological safety, team friction, cognitive load, and workload equity.',
    recurrence: 'Weekly Pulse',
    departmentTarget: 'all',
    status: 'Active',
    respondentsCount: 312,
    totalTarget: 380,
    anonymityLevel: '100% Blind Anonymity',
    deadline: 'Tomorrow, 5:00 PM',
    createdDate: 'Sep 18, 2026',
    questions: [
      {
        id: 'q-1',
        text: 'During the past week, I felt comfortable expressing critical opinions or questions without fear of negative consequences.',
        type: 'likert',
        category: 'safety',
      },
      {
        id: 'q-2',
        text: 'My current workload allows me to maintain healthy cognitive focus without feeling consistently drained or rushed.',
        type: 'likert',
        category: 'burnout',
      },
      {
        id: 'q-3',
        text: 'How would you rate your team’s cross-functional momentum and consensus speed over the last 5 days?',
        type: 'multiple_choice',
        category: 'velocity',
        options: ['Exceptional & frictionless', 'Smooth with minor delays', 'Moderate bottlenecking', 'Severely obstructed'],
      },
      {
        id: 'q-4',
        text: 'What single institutional obstacle or distraction most impacted your work this week?',
        type: 'open_text',
        category: 'general',
      },
    ],
  },
  {
    id: 'survey-2',
    title: 'Product Design & UX Cognitive Load Deep-Dive',
    description: 'Targeted assessment evaluating sprint scope creep, Figma-to-code bottlenecks, and uninterrupted deep focus availability.',
    recurrence: 'Bi-Weekly',
    departmentTarget: 'product_design',
    status: 'Active',
    respondentsCount: 42,
    totalTarget: 50,
    anonymityLevel: '100% Blind Anonymity',
    deadline: 'Friday, 6:00 PM',
    createdDate: 'Sep 15, 2026',
    questions: [
      {
        id: 'q-201',
        text: 'How frequently have mid-sprint requirements changed without corresponding timeline adjustments?',
        type: 'multiple_choice',
        category: 'burnout',
        options: ['Never / Extremely rare', 'Occasionally (manageable)', 'Frequently (impacts delivery)', 'Constant churn'],
      },
      {
        id: 'q-202',
        text: 'I have sufficient blocks of uninterrupted time (2+ hours) to produce deep creative and architectural work.',
        type: 'likert',
        category: 'burnout',
      },
      {
        id: 'q-203',
        text: 'What specific change in our product sprint cadence would immediately reduce your workload strain?',
        type: 'open_text',
        category: 'general',
      },
    ],
  },
  {
    id: 'survey-3',
    title: 'Q3 Cultural Velocity & Executive Trust Census',
    description: 'Comprehensive quarterly organizational health diagnostic measuring strategic alignment, leadership empathy, and eNPS.',
    recurrence: 'Monthly Deep-Dive',
    departmentTarget: 'all',
    status: 'Scheduled',
    respondentsCount: 0,
    totalTarget: 420,
    anonymityLevel: 'Aggregated (5+ min)',
    deadline: 'Oct 15, 2026',
    createdDate: 'Sep 20, 2026',
    questions: [
      {
        id: 'q-301',
        text: 'I understand how our Q4 strategic objectives connect to my day-to-day work and priorities.',
        type: 'likert',
        category: 'velocity',
      },
      {
        id: 'q-302',
        text: 'Executive leadership demonstrates transparent decision-making and genuine empathy for personnel well-being.',
        type: 'likert',
        category: 'safety',
      },
      {
        id: 'q-303',
        text: 'How likely are you to recommend PulseHealth Enterprise as a phenomenal place to build a career? (eNPS)',
        type: 'multiple_choice',
        category: 'retention',
        options: ['10 - Extremely Likely (Promoter)', '8-9 - Likely', '6-7 - Neutral', '1-5 - Unlikely (Detractor)'],
      },
    ],
  },
];
