import React, { useState } from 'react';
import { 
  Activity, 
  BarChart3, 
  Compass, 
  Lightbulb, 
  ClipboardList, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Plus, 
  FileText, 
  HelpCircle,
  Users
} from 'lucide-react';
import { 
  UserRole, 
  Department, 
  TimeRange, 
  UserProfile, 
  ActionableInsight, 
  AssessmentSurvey 
} from './types';
import { 
  DEMO_USERS, 
  getKPIData, 
  INITIAL_ACTIONABLE_INSIGHTS, 
  INITIAL_ASSESSMENT_SURVEYS 
} from './data/mockData';
import { NavigationHeader, AppPageTab } from './components/NavigationHeader';
import { DepartmentTimeFilter } from './components/DepartmentTimeFilter';
import { KPISection } from './components/KPISection';
import { AIInsightStrip } from './components/AIInsightStrip';
import { HealthMatrix360 } from './components/HealthMatrix360';
import { ActionableInsightsView } from './components/ActionableInsightsView';
import { SurveyEngineView } from './components/SurveyEngineView';
import { LoginPageView } from './components/LoginPageView';
import { LoginRoleModal } from './components/LoginRoleModal';
import { AIDiagnosticCopilotModal } from './components/AIDiagnosticCopilotModal';

export default function App() {
  // Navigation & User State - 5 core pages as requested
  const [currentTab, setCurrentTab] = useState<AppPageTab>('dashboard');
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEMO_USERS[0]); // Default: Super Admin
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  // Filters State
  const [department, setDepartment] = useState<Department>('all');
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Data Store State
  const [insights, setInsights] = useState<ActionableInsight[]>(INITIAL_ACTIONABLE_INSIGHTS);
  const [surveys, setSurveys] = useState<AssessmentSurvey[]>(INITIAL_ASSESSMENT_SURVEYS);

  // Dynamic KPI Data derived from department and timeRange
  const kpiData = getKPIData(department, timeRange);

  // Role Switcher Handler
  const handleSelectRole = (role: UserRole) => {
    const selected = DEMO_USERS.find((u) => u.role === role) || DEMO_USERS[0];
    setCurrentUser(selected);
  };

  // Actionable Insight Handlers
  const handleUpdateInsightStatus = (id: string, newStatus: 'Open' | 'In Progress' | 'Resolved') => {
    setInsights((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const handleAddInsight = (newInsight: Omit<ActionableInsight, 'id' | 'detectedDate'>) => {
    const created: ActionableInsight = {
      ...newInsight,
      id: `insight-${Date.now()}`,
      detectedDate: 'Just now',
    };
    setInsights((prev) => [created, ...prev]);
  };

  // Survey Handlers
  const handleCreateSurvey = (newSurvey: AssessmentSurvey) => {
    setSurveys((prev) => [newSurvey, ...prev]);
  };

  const handleTakeSurveySubmit = (surveyId: string) => {
    setSurveys((prev) =>
      prev.map((s) => (s.id === surveyId ? { ...s, respondentsCount: s.respondentsCount + 1 } : s))
    );
  };

  // Refresh Diagnostics simulation
  const handleRefreshDiagnostics = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#140d21] via-[#1a1128] to-[#25153d] text-gray-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white pb-16">
      {/* Top Navigation Bar with Role Selector & Status */}
      <NavigationHeader
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        allRoles={DEMO_USERS}
        onSelectRole={handleSelectRole}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Only show department/time filter when on analytical pages */}
        {currentTab !== 'login' && (
          <DepartmentTimeFilter
            department={department}
            setDepartment={setDepartment}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onRefresh={handleRefreshDiagnostics}
            isRefreshing={isRefreshing}
          />
        )}

        {/* Employee Role Notice Banner (Contextual) */}
        {currentUser.role === 'employee' && currentTab !== 'login' && (
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  Employee Respondent View Active
                </h4>
                <p className="text-xs text-emerald-100/90">
                  Welcome, {currentUser.name}. You have 1 pending anonymous diagnostic pulse survey. Your feedback directly shapes organizational workload health.
                </p>
              </div>
            </div>
            <button
              onClick={() => setCurrentTab('surveys')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-md self-start sm:self-auto transition-colors flex items-center gap-1.5"
            >
              <span>Open Survey Engine →</span>
            </button>
          </div>
        )}

        {/* VIEW 1: LOGIN & ROLE SELECTION PAGE */}
        {currentTab === 'login' && (
          <LoginPageView
            currentUser={currentUser}
            allRoles={DEMO_USERS}
            onSelectRole={handleSelectRole}
            onContinueToDashboard={() => setCurrentTab('dashboard')}
          />
        )}

        {/* VIEW 2: LIVE DIAGNOSTIC DASHBOARD (ADMIN PANEL LANDING) */}
        {currentTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* AI Insight Strip */}
            <AIInsightStrip
              department={department}
              onOpenCopilot={() => setIsCopilotOpen(true)}
              onNavigateToInsights={() => setCurrentTab('insights')}
            />

            {/* Composite 4 KPI Cards */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#06b6d4]" />
                  Composite Organizational Health Indicators
                </h2>
                <span className="text-[11px] text-gray-500 font-medium">
                  Continuous Telemetry Stream
                </span>
              </div>
              <KPISection
                kpiList={kpiData}
                onCardClick={() => setCurrentTab('matrix')}
              />
            </div>

            {/* Quick Dual-Panel: 360° Health Snapshot & Priority Action Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: 360 Matrix Preview (6 Lenses Snapshot) */}
              <div className="lg:col-span-7 bg-[#1b122c]/90 backdrop-blur-xl rounded-2xl p-5 border border-white/[0.08] shadow-xl flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-[#ec4899]" />
                      <h3 className="text-sm font-bold text-white tracking-tight">
                        360° Health Matrix Snapshot
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                        6 Lenses
                      </span>
                    </div>

                    <button
                      onClick={() => setCurrentTab('matrix')}
                      className="text-xs text-[#06b6d4] hover:text-cyan-200 font-semibold flex items-center gap-1"
                    >
                      <span>Full Matrix</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-gray-400">
                    Live balance across organizational dimensions. Click into any lens to inspect root causes.
                  </p>

                  {/* 6 mini pills grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                    {[
                      { title: 'Employees', score: 87, color: 'text-[#10b981]', status: 'Optimal' },
                      { title: 'Teams', score: 91, color: 'text-[#06b6d4]', status: 'Optimal' },
                      { title: 'Leadership', score: 83, color: 'text-purple-300', status: 'Solid' },
                      { title: 'Culture', score: 88, color: 'text-[#ec4899]', status: 'High Align' },
                      { title: 'Business Metrics', score: 89, color: 'text-blue-400', status: 'Strong' },
                      { title: 'External View', score: 85, color: 'text-amber-400', status: 'Benchmark' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        onClick={() => setCurrentTab('matrix')}
                        className="p-3 rounded-xl bg-black/30 border border-white/[0.06] hover:border-purple-500/40 hover:bg-black/40 transition-all cursor-pointer space-y-1"
                      >
                        <div className="flex justify-between items-center text-[11px] text-gray-400">
                          <span className="font-semibold text-gray-300 truncate">{item.title}</span>
                          <span className={`font-bold ${item.color}`}>{item.score}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-[#06b6d4]"
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-gray-500 block">{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer preview note */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                    <span>Cross-department baseline: <strong className="text-white">87.1% Overall Health Index</strong></span>
                  </div>
                  <button
                    onClick={() => setIsCopilotOpen(true)}
                    className="text-xs text-purple-300 hover:text-white font-medium flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#ec4899]" />
                    <span>Run Deep Synthesis</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Top Actionable Insights & Active Pulses */}
              <div className="lg:col-span-5 space-y-5">
                {/* Priority Findings Card */}
                <div className="bg-[#1b122c]/90 backdrop-blur-xl rounded-2xl p-5 border border-white/[0.08] shadow-xl space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-[#10b981]" />
                      <h3 className="text-sm font-bold text-white tracking-tight">
                        Priority Action Interventions
                      </h3>
                    </div>
                    <button
                      onClick={() => setCurrentTab('insights')}
                      className="text-xs text-[#06b6d4] hover:text-cyan-200 font-semibold flex items-center gap-1"
                    >
                      <span>All ({insights.length})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {insights.slice(0, 2).map((ins) => (
                      <div
                        key={ins.id}
                        className="p-3 rounded-xl bg-black/30 border border-white/[0.06] hover:border-white/[0.12] transition-colors space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                              ins.priority === 'Critical'
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                : ins.priority === 'Elevated'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            }`}
                          >
                            {ins.priority}
                          </span>
                          <span className="text-[10px] text-gray-400">{ins.departmentName}</span>
                        </div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{ins.title}</h4>
                        <p className="text-[11px] text-gray-300 line-clamp-2">{ins.next}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Surveys Status Widget */}
                <div className="bg-[#1b122c]/90 backdrop-blur-xl rounded-2xl p-5 border border-white/[0.08] shadow-xl space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <ClipboardList className="w-4 h-4 text-purple-400" />
                      <h3 className="text-sm font-bold text-white tracking-tight">
                        Active Continuous Pulses
                      </h3>
                    </div>
                    <button
                      onClick={() => setCurrentTab('surveys')}
                      className="text-xs text-[#06b6d4] hover:text-cyan-200 font-semibold flex items-center gap-1"
                    >
                      <span>Manage Engine</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {surveys[0] && (
                    <div className="p-3 rounded-xl bg-black/30 border border-white/[0.06] space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white truncate max-w-[200px]">
                          {surveys[0].title}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-bold">
                          {Math.round((surveys[0].respondentsCount / surveys[0].totalTarget) * 100)}% responded
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-[#06b6d4]"
                          style={{
                            width: `${Math.round(
                              (surveys[0].respondentsCount / surveys[0].totalTarget) * 100
                            )}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-400">
                        <span>{surveys[0].respondentsCount} of {surveys[0].totalTarget} anonymous responses</span>
                        <span>{surveys[0].deadline}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: SURVEY & ASSESSMENT ENGINE (TASK MANAGEMENT) */}
        {currentTab === 'surveys' && (
          <div className="animate-in fade-in duration-300">
            <SurveyEngineView
              surveys={surveys}
              onCreateSurvey={handleCreateSurvey}
              onTakeSurveySubmit={handleTakeSurveySubmit}
              userRole={currentUser.role}
              department={department}
            />
          </div>
        )}

        {/* VIEW 4: 360° HEALTH MATRIX */}
        {currentTab === 'matrix' && (
          <div className="animate-in fade-in duration-300">
            <HealthMatrix360 department={department} />
          </div>
        )}

        {/* VIEW 5: ACTIONABLE INSIGHT CARDS */}
        {currentTab === 'insights' && (
          <div className="animate-in fade-in duration-300">
            <ActionableInsightsView
              insights={insights}
              onUpdateStatus={handleUpdateInsightStatus}
              onAddInsight={handleAddInsight}
              department={department}
              userRole={currentUser.role}
            />
          </div>
        )}
      </main>

      {/* Login & Role Selection Quick Switcher Modal */}
      <LoginRoleModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        currentUser={currentUser}
        allRoles={DEMO_USERS}
        onSelectRole={handleSelectRole}
      />

      {/* AI Diagnostic Copilot Modal */}
      <AIDiagnosticCopilotModal
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        department={department}
        onAddInsightFromAI={handleAddInsight}
      />

      {/* Persistent Enterprise Status Footer */}
      <footer className="mt-auto pt-8 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#06b6d4]" />
          <span>PulseHealth Enterprise · Organizational Health Diagnostics Platform</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.06] text-gray-400">v4.8 LTS</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Telemetry Streams Synchronized
          </span>
          <button
            onClick={() => setCurrentTab('login')}
            className="hover:text-purple-300 transition-colors cursor-pointer"
          >
            Role: <span className="text-gray-300 font-semibold">{currentUser.roleTitle.split('(')[0]}</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
