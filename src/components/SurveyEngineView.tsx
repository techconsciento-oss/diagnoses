import React, { useState } from 'react';
import { 
  ClipboardList, 
  Plus, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  Send, 
  HelpCircle, 
  BarChart2, 
  Play, 
  Eye, 
  Sparkles,
  Lock,
  MessageSquare,
  BookOpen,
  PieChart,
  Layers,
  ArrowRight,
  Sliders,
  Check,
  Filter,
  RefreshCw,
  PlusCircle,
  Copy
} from 'lucide-react';
import { AssessmentSurvey, SurveyQuestion, Department, UserRole } from '../types';
import { QUESTION_BANK, QuestionBankItem } from '../data/questionBank';

interface SurveyEngineViewProps {
  surveys: AssessmentSurvey[];
  onCreateSurvey: (survey: AssessmentSurvey) => void;
  onTakeSurveySubmit: (surveyId: string) => void;
  userRole: UserRole;
  department: Department;
}

export const SurveyEngineView: React.FC<SurveyEngineViewProps> = ({
  surveys,
  onCreateSurvey,
  onTakeSurveySubmit,
  userRole,
  department,
}) => {
  // Sub-tabs inside the Survey Application
  const [subTab, setSubTab] = useState<'tasks' | 'create' | 'bank' | 'distribution'>('tasks');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Scheduled' | 'Completed'>('all');

  // Survey Taker & Preview Modals
  const [activeSurveyToTake, setActiveSurveyToTake] = useState<AssessmentSurvey | null>(null);
  const [previewSurvey, setPreviewSurvey] = useState<AssessmentSurvey | null>(null);
  const [analyzingSurvey, setAnalyzingSurvey] = useState<AssessmentSurvey | null>(null);

  // Survey responses in progress
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  // New Survey Form State
  const [newTitle, setNewTitle] = useState('Bi-Weekly Sprint Hygiene & Cognitive Load Pulse');
  const [newDesc, setNewDesc] = useState('Measures uninterrupted focus blocks, sprint velocity consistency, and psychological safety in retros.');
  const [newRecurrence, setNewRecurrence] = useState<'Weekly Pulse' | 'Bi-Weekly' | 'Monthly Deep-Dive' | 'Ad-hoc'>('Bi-Weekly');
  const [newDeptTarget, setNewDeptTarget] = useState<Department>('all');
  const [newAnonymity, setNewAnonymity] = useState<'100% Blind Anonymity' | 'Aggregated (5+ min)'>('100% Blind Anonymity');
  const [newQuestions, setNewQuestions] = useState<SurveyQuestion[]>([
    {
      id: 'q-custom-1',
      text: 'Members of this team are able to bring up problems and tough issues candidly.',
      type: 'likert',
      category: 'safety',
    },
    {
      id: 'q-custom-2',
      text: 'My current workload allows me to maintain sustainable cognitive focus without feeling consistently drained.',
      type: 'likert',
      category: 'burnout',
    },
    {
      id: 'q-custom-3',
      text: 'How frequently have mid-sprint requirement shifts or scope alterations impacted your planned hours this month?',
      type: 'multiple_choice',
      category: 'burnout',
      options: ['Rarely or Never', '1-2 times per sprint (Manageable)', 'Frequently (Causes Overtime)', 'Continuous Scope Churn'],
    },
  ]);

  // Bank Filter
  const [selectedBankCategory, setSelectedBankCategory] = useState<string>('all');
  const [addedBankIds, setAddedBankIds] = useState<Record<string, boolean>>({});

  const handleAddQuestion = () => {
    const newQ: SurveyQuestion = {
      id: `q-custom-${Date.now()}`,
      text: '',
      type: 'likert',
      category: 'general',
    };
    setNewQuestions([...newQuestions, newQ]);
  };

  const handleRemoveQuestion = (id: string) => {
    setNewQuestions(newQuestions.filter((q) => q.id !== id));
  };

  const handleQuestionTextChange = (id: string, text: string) => {
    setNewQuestions(
      newQuestions.map((q) => (q.id === id ? { ...q, text } : q))
    );
  };

  const handleQuestionTypeChange = (id: string, type: 'likert' | 'multiple_choice' | 'open_text') => {
    setNewQuestions(
      newQuestions.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            type,
            options: type === 'multiple_choice' ? ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'] : undefined,
          };
        }
        return q;
      })
    );
  };

  const handleInsertFromBank = (item: QuestionBankItem) => {
    const q: SurveyQuestion = {
      id: `qb-${Date.now()}-${item.id}`,
      text: item.text,
      type: item.type,
      category: item.category as any,
      options: item.options,
    };
    setNewQuestions([...newQuestions, q]);
    setAddedBankIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedBankIds((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: AssessmentSurvey = {
      id: `survey-${Date.now()}`,
      title: newTitle,
      description: newDesc || 'Targeted organizational pulse assessment collecting anonymous team sentiment.',
      recurrence: newRecurrence,
      departmentTarget: newDeptTarget,
      status: 'Active',
      respondentsCount: 1, // seed 1 respondent
      totalTarget: newDeptTarget === 'all' ? 380 : 65,
      anonymityLevel: newAnonymity,
      deadline: '7 days remaining',
      createdDate: 'Just now',
      questions: newQuestions.filter((q) => q.text.trim() !== ''),
    };

    onCreateSurvey(created);
    setSubTab('tasks');
  };

  const handleStartTakingSurvey = (survey: AssessmentSurvey) => {
    setActiveSurveyToTake(survey);
    setAnswers({});
    setSurveySubmitted(false);
  };

  const handleAnswerChange = (qId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleFinishSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSurveyToTake) return;
    onTakeSurveySubmit(activeSurveyToTake.id);
    setSurveySubmitted(true);
    setTimeout(() => {
      setActiveSurveyToTake(null);
      setSurveySubmitted(false);
    }, 2200);
  };

  const filteredSurveys = surveys.filter((s) => {
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    if (department !== 'all' && s.departmentTarget !== 'all' && s.departmentTarget !== department) return false;
    return true;
  });

  const filteredBank = QUESTION_BANK.filter((item) => {
    if (selectedBankCategory !== 'all' && item.category !== selectedBankCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* App Header & Sub-Navigation */}
      <div className="bg-[#1b122c]/90 backdrop-blur-xl p-5 rounded-3xl border border-white/[0.08] shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Core Page 3 of 5
              </span>
              <h1 className="text-xl font-extrabold text-white tracking-tight">
                Survey & Assessment Engine
              </h1>
            </div>
            <p className="text-xs text-gray-400">
              Enterprise Task Management for creating, scheduling recurring pulses, tracking distribution anonymously, and running question bank diagnostics.
            </p>
          </div>

          {/* Quick Action Button */}
          {(userRole === 'super_admin' || userRole === 'org_admin') && (
            <button
              onClick={() => setSubTab('create')}
              className="px-4 py-2 text-xs font-bold rounded-xl text-white bg-gradient-to-r from-purple-600 via-pink-600 to-[#06b6d4] hover:opacity-95 shadow-md shadow-purple-950 flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Survey Task</span>
            </button>
          )}
        </div>

        {/* Sub Navigation Bar */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06] overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSubTab('tasks')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
              subTab === 'tasks'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Active Tasks & Pulse Surveys ({surveys.length})</span>
          </button>

          <button
            onClick={() => setSubTab('create')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
              subTab === 'create'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create & Schedule Survey</span>
          </button>

          <button
            onClick={() => setSubTab('bank')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
              subTab === 'bank'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Question Bank Library ({QUESTION_BANK.length})</span>
          </button>

          <button
            onClick={() => setSubTab('distribution')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
              subTab === 'distribution'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <PieChart className="w-3.5 h-3.5 text-emerald-400" />
            <span>Distribution Status & Telemetry</span>
          </button>
        </div>
      </div>

      {/* Cryptographic Anonymity Banner */}
      <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-200">
        <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0" />
        <div className="flex-1">
          <strong className="text-cyan-300 font-semibold">100% Cryptographic Anonymity Protocol:</strong> Individual responses are decoupled from user credentials. Scores are processed solely via k-anonymity aggregation (minimum 5 respondents per cohort) to ensure zero leadership tracking.
        </div>
      </div>

      {/* SUB-VIEW 1: ACTIVE TASKS & SURVEYS */}
      {subTab === 'tasks' && (
        <div className="space-y-4">
          {/* Status Filter Bar */}
          <div className="flex items-center justify-between flex-wrap gap-2 p-3 bg-black/20 rounded-xl border border-white/[0.04]">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-gray-500 mr-1" />
              <span className="text-xs text-gray-400 font-medium">Filter Status:</span>
              {(['all', 'Active', 'Scheduled', 'Completed'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                    statusFilter === st
                      ? 'bg-purple-600/40 text-purple-200 border border-purple-500/40'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {st === 'all' ? 'All Surveys' : st}
                </button>
              ))}
            </div>

            <span className="text-xs text-gray-500">
              Showing {filteredSurveys.length} of {surveys.length} survey tasks
            </span>
          </div>

          {/* Survey Cards */}
          <div className="space-y-4">
            {filteredSurveys.map((survey) => {
              const completionPercentage = Math.round(
                (survey.respondentsCount / survey.totalTarget) * 100
              );

              return (
                <div
                  key={survey.id}
                  id={`survey-task-card-${survey.id}`}
                  className="bg-[#1b122c]/90 backdrop-blur-xl rounded-2xl p-5 border border-white/[0.08] shadow-xl hover:border-white/[0.14] transition-all space-y-4"
                >
                  {/* Top Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {survey.recurrence}
                        </span>

                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/[0.05] text-gray-300 border border-white/[0.06]">
                          {survey.departmentTarget === 'all'
                            ? 'Company-Wide'
                            : survey.departmentTarget === 'engineering'
                            ? 'Engineering Target'
                            : 'Product & Design Target'}
                        </span>

                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                            survey.status === 'Active'
                              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          ● {survey.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white tracking-tight">
                        {survey.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-normal">
                        {survey.description}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0 flex-wrap">
                      <button
                        onClick={() => setPreviewSurvey(survey)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-xl text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Prompts ({survey.questions.length})</span>
                      </button>

                      <button
                        onClick={() => setAnalyzingSurvey(survey)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-xl text-cyan-300 hover:text-cyan-200 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 flex items-center gap-1.5 transition-colors"
                      >
                        <BarChart2 className="w-3.5 h-3.5" />
                        <span>Results</span>
                      </button>

                      <button
                        onClick={() => handleStartTakingSurvey(survey)}
                        className="px-4 py-1.5 text-xs font-bold rounded-xl text-white bg-gradient-to-r from-emerald-600 to-[#06b6d4] hover:opacity-95 shadow-md shadow-emerald-950 flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Take Pulse Survey</span>
                      </button>
                    </div>
                  </div>

                  {/* Progress & Anonymity Distribution Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                    {/* Participation Progress */}
                    <div className="space-y-1.5 md:col-span-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-cyan-400" />
                          Anonymous Response Collection Status:
                        </span>
                        <span className="font-bold text-white">
                          {survey.respondentsCount} / {survey.totalTarget}{' '}
                          <span className="text-cyan-300 font-semibold">
                            ({completionPercentage}%)
                          </span>
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-white/[0.08] overflow-hidden p-[1px]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 via-[#ec4899] to-[#06b6d4] transition-all duration-500"
                          style={{ width: `${Math.min(100, completionPercentage)}%` }}
                        />
                      </div>
                    </div>

                    {/* Deadlines and Anonymity Level */}
                    <div className="flex items-center justify-between md:justify-end gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Deadline: <strong className="text-gray-200">{survey.deadline}</strong></span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-400">
                        <Lock className="w-3.5 h-3.5" />
                        <span>{survey.anonymityLevel}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: CREATE & SCHEDULE SURVEY */}
      {subTab === 'create' && (
        <div className="bg-[#1b122c]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-600 to-[#06b6d4] text-white">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Add & Schedule New Assessment Survey
                </h3>
                <p className="text-xs text-gray-400">
                  Configure recurring pulse surveys with question banks (Likert scales, open text, multiple choice).
                </p>
              </div>
            </div>

            <button
              onClick={() => setSubTab('tasks')}
              className="text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-xl bg-white/[0.04]"
            >
              Back to Tasks
            </button>
          </div>

          <form onSubmit={handleCreateSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Survey Name / Objective
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Weekly Engineering Psychological Safety Pulse"
                  className="w-full px-3.5 py-2 text-xs bg-black/40 border border-white/[0.1] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#06b6d4]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Objective & Diagnostic Summary
                </label>
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Briefly describe what signals this survey measures..."
                  className="w-full px-3.5 py-2 text-xs bg-black/40 border border-white/[0.1] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#06b6d4]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  Recurrence Schedule
                </label>
                <select
                  value={newRecurrence}
                  onChange={(e) => setNewRecurrence(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-black/40 border border-white/[0.1] rounded-xl text-white focus:outline-none focus:border-[#06b6d4]"
                >
                  <option value="Weekly Pulse">Weekly Pulse (Active)</option>
                  <option value="Bi-Weekly">Bi-Weekly Cadence</option>
                  <option value="Monthly Deep-Dive">Monthly Deep-Dive</option>
                  <option value="Ad-hoc">Ad-hoc Immediate Check</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  Target Department
                </label>
                <select
                  value={newDeptTarget}
                  onChange={(e) => setNewDeptTarget(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-black/40 border border-white/[0.1] rounded-xl text-white focus:outline-none focus:border-[#06b6d4]"
                >
                  <option value="all">Company-Wide (All Staff)</option>
                  <option value="engineering">Engineering Squads</option>
                  <option value="product_design">Product & Design Guild</option>
                  <option value="sales_marketing">Sales & Marketing</option>
                  <option value="operations">Operations & Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  Anonymity Level
                </label>
                <select
                  value={newAnonymity}
                  onChange={(e) => setNewAnonymity(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-black/40 border border-white/[0.1] rounded-xl text-white focus:outline-none focus:border-[#06b6d4]"
                >
                  <option value="100% Blind Anonymity">100% Blind Anonymity (Default)</option>
                  <option value="Aggregated (5+ min)">Aggregated (5+ min cohort)</option>
                </select>
              </div>
            </div>

            {/* Dynamic Question Builder & Question Bank Link */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                    Question Prompts ({newQuestions.length})
                  </h4>
                  <p className="text-[11px] text-gray-400">
                    Combine Likert 1-5 scales, multiple choice options, and open text.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSubTab('bank')}
                    className="px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:text-cyan-200 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-xl border border-cyan-500/30 flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Pick from Question Bank
                  </button>

                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Custom Prompt
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {newQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-black/30 border border-white/[0.06] space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-purple-300">
                        Question #{idx + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <select
                          value={q.type}
                          onChange={(e) => handleQuestionTypeChange(q.id, e.target.value as any)}
                          className="px-2.5 py-1 text-xs bg-black/60 border border-white/[0.1] rounded-lg text-gray-200"
                        >
                          <option value="likert">Likert Scale (1-5)</option>
                          <option value="multiple_choice">Multiple Choice</option>
                          <option value="open_text">Open Text</option>
                        </select>
                        {newQuestions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveQuestion(q.id)}
                            className="p-1.5 text-gray-500 hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <input
                      type="text"
                      required
                      placeholder="Enter the diagnostic question text..."
                      value={q.text}
                      onChange={(e) => handleQuestionTextChange(q.id, e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-black/40 border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#06b6d4]"
                    />

                    {/* Preview Indicator */}
                    <div className="text-[11px] text-gray-500 flex items-center gap-2">
                      {q.type === 'likert' && (
                        <span>Likert buttons: 1 (Strongly Disagree) to 5 (Strongly Agree)</span>
                      )}
                      {q.type === 'multiple_choice' && (
                        <span>Multiple choice options with radio selector</span>
                      )}
                      {q.type === 'open_text' && (
                        <span>Open qualitative feedback field</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => setSubTab('tasks')}
                className="px-4 py-2.5 text-xs font-semibold text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-[#8b5cf6] to-[#06b6d4] rounded-xl shadow-lg hover:opacity-95 cursor-pointer"
              >
                Schedule & Launch Assessment Task
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SUB-VIEW 3: QUESTION BANK LIBRARY */}
      {subTab === 'bank' && (
        <div className="space-y-5">
          <div className="bg-[#1b122c]/90 backdrop-blur-xl p-5 rounded-3xl border border-white/[0.08] shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Validated Question Bank Library
              </h3>
              <p className="text-xs text-gray-400">
                Scientifically formulated assessment prompts across Psychological Safety, Burnout, Cultural Velocity, Leadership, and eNPS.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { key: 'all', label: 'All Prompts' },
                { key: 'safety', label: 'Psychological Safety' },
                { key: 'burnout', label: 'Burnout & Workload' },
                { key: 'velocity', label: 'Cultural Velocity' },
                { key: 'leadership', label: 'Leadership' },
                { key: 'retention', label: 'Retention & eNPS' },
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedBankCategory(cat.key)}
                  className={`px-3 py-1.5 text-xs rounded-xl font-medium whitespace-nowrap transition-colors ${
                    selectedBankCategory === cat.key
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-gray-400 hover:text-white bg-white/[0.03]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBank.map((item) => {
              const isAdded = addedBankIds[item.id];
              return (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-[#1b122c]/80 backdrop-blur-md border border-white/[0.08] shadow-lg hover:border-white/[0.16] transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold uppercase">
                        {item.categoryLabel}
                      </span>
                      <span className="text-gray-500 text-[11px] uppercase font-semibold">
                        {item.type.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-gray-100 leading-relaxed">
                      "{item.text}"
                    </p>

                    {item.scientificReference && (
                      <p className="text-[10px] text-gray-400 italic">
                        Reference: {item.scientificReference}
                      </p>
                    )}

                    {item.options && (
                      <div className="pt-1 flex flex-wrap gap-1">
                        {item.options.map((opt, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-gray-300 border border-white/[0.04]"
                          >
                            {opt}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">Validated Signal</span>
                    <button
                      onClick={() => handleInsertFromBank(item)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
                        isAdded
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-white/[0.06] hover:bg-white/[0.12] text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Inserted into Draft!</span>
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-3.5 h-3.5 text-[#06b6d4]" />
                          <span>Insert into New Survey</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: DISTRIBUTION & TELEMETRY */}
      {subTab === 'distribution' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#1b122c]/90 border border-white/[0.08] shadow-xl space-y-2">
              <span className="text-xs font-semibold text-gray-400 uppercase">
                Active Pulse Distribution
              </span>
              <div className="text-3xl font-extrabold text-[#06b6d4]">
                {surveys.reduce((acc, s) => acc + s.respondentsCount, 0)}
              </div>
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                100% Cryptographic Anonymity verified
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1b122c]/90 border border-white/[0.08] shadow-xl space-y-2">
              <span className="text-xs font-semibold text-gray-400 uppercase">
                Mean Participation Rate
              </span>
              <div className="text-3xl font-extrabold text-purple-300">
                82.4%
              </div>
              <p className="text-xs text-gray-400">
                Top decile for enterprise SaaS organizations
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1b122c]/90 border border-white/[0.08] shadow-xl space-y-2">
              <span className="text-xs font-semibold text-gray-400 uppercase">
                Survey Fatigue Protection
              </span>
              <div className="text-3xl font-extrabold text-[#10b981]">
                Active
              </div>
              <p className="text-xs text-gray-400">
                Max 1 micro-pulse per contributor per week
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#1b122c]/90 border border-white/[0.08] shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-300">
              Departmental Distribution & Response Density
            </h3>
            <div className="space-y-3">
              {[
                { dept: 'Engineering (Platform & Core)', count: '162/185', pct: 88, color: 'from-emerald-500 to-cyan-500' },
                { dept: 'Product & Design Guild', count: '46/50', pct: 92, color: 'from-pink-500 to-purple-500' },
                { dept: 'Sales & Marketing', count: '104/142', pct: 73, color: 'from-amber-500 to-orange-500' },
                { dept: 'Operations & People', count: '82/89', pct: 92, color: 'from-blue-500 to-indigo-500' },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-black/30 border border-white/[0.06] space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-200">{item.dept}</span>
                    <span className="text-cyan-300">{item.count} ({item.pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAKE PULSE ASSESSMENT MODAL (Interactive Respondent Experience) */}
      {activeSurveyToTake && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#1d1230] border border-white/[0.12] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar">
            {surveySubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <h3 className="text-2xl font-bold text-white">Diagnostic Pulse Recorded!</h3>
                <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                  Your feedback has been cryptographically anonymized and integrated into the real-time Organizational Health Index. Thank you for fostering a high-trust culture!
                </p>
                <span className="inline-block text-[11px] text-cyan-300 font-semibold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  Dashboard Telemetry Recalibrated
                </span>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                      {activeSurveyToTake.recurrence} · Anonymous Pulse
                    </span>
                    <h3 className="text-lg font-bold text-white">{activeSurveyToTake.title}</h3>
                  </div>
                  <button
                    onClick={() => setActiveSurveyToTake(null)}
                    className="text-gray-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-white/[0.05]"
                  >
                    Close
                  </button>
                </div>

                <form onSubmit={handleFinishSurvey} className="space-y-6">
                  {activeSurveyToTake.questions.map((q, idx) => (
                    <div
                      key={q.id}
                      className="p-4 sm:p-5 rounded-2xl bg-black/30 border border-white/[0.06] space-y-3.5"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300">
                          Q{idx + 1}
                        </span>
                        <p className="text-sm font-semibold text-gray-100">{q.text}</p>
                      </div>

                      {/* Question Response Interface */}
                      {q.type === 'likert' && (
                        <div className="space-y-2 pt-1">
                          <div className="grid grid-cols-5 gap-2">
                            {[1, 2, 3, 4, 5].map((val) => {
                              const isSelected = answers[q.id] === val;
                              return (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => handleAnswerChange(q.id, val)}
                                  className={`py-3 px-1 text-xs font-bold rounded-xl border transition-all ${
                                    isSelected
                                      ? 'bg-gradient-to-r from-purple-600 to-[#06b6d4] text-white border-transparent shadow-lg shadow-purple-900/50 scale-105'
                                      : 'bg-white/[0.03] text-gray-300 border-white/[0.08] hover:bg-white/[0.08]'
                                  }`}
                                >
                                  {val}
                                </button>
                              );
                            })}
                          </div>
                          <div className="flex justify-between text-[10px] text-gray-400 px-1 font-medium">
                            <span className="text-rose-400">1 - Strongly Disagree</span>
                            <span className="text-gray-500">3 - Neutral</span>
                            <span className="text-emerald-400">5 - Strongly Agree</span>
                          </div>
                        </div>
                      )}

                      {q.type === 'multiple_choice' && q.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {q.options.map((opt, oIdx) => {
                            const isSelected = answers[q.id] === opt;
                            return (
                              <button
                                key={oIdx}
                                type="button"
                                onClick={() => handleAnswerChange(q.id, opt)}
                                className={`p-3 text-xs text-left font-medium rounded-xl border transition-all ${
                                  isSelected
                                    ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/50 font-bold'
                                    : 'bg-white/[0.03] text-gray-300 border-white/[0.06] hover:bg-white/[0.08]'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {q.type === 'open_text' && (
                        <textarea
                          rows={3}
                          placeholder="Your candid anonymous thoughts here..."
                          value={answers[q.id] || ''}
                          onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-black/40 border border-white/[0.1] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#06b6d4]"
                        />
                      )}
                    </div>
                  ))}

                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Lock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Zero personal identifiers retained</span>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-[#06b6d4] rounded-xl shadow-lg hover:opacity-95 flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Anonymous Responses</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* VIEW SURVEY RESULTS & SENTIMENT ANALYTICS MODAL */}
      {analyzingSurvey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#1d1230] border border-white/[0.12] rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                  Aggregated Survey Telemetry
                </span>
                <h3 className="text-base font-bold text-white">{analyzingSurvey.title}</h3>
              </div>
              <button
                onClick={() => setAnalyzingSurvey(null)}
                className="text-gray-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-white/[0.05]"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-black/30 border border-white/[0.06]">
                <span className="text-[10px] uppercase font-bold text-gray-400">Responses Collected</span>
                <p className="text-2xl font-extrabold text-[#06b6d4] mt-1">
                  {analyzingSurvey.respondentsCount}
                </p>
                <span className="text-[10px] text-gray-500">of {analyzingSurvey.totalTarget} target participants</span>
              </div>

              <div className="p-3.5 rounded-xl bg-black/30 border border-white/[0.06]">
                <span className="text-[10px] uppercase font-bold text-gray-400">Mean Sentiment Score</span>
                <p className="text-2xl font-extrabold text-[#10b981] mt-1">
                  4.4 / 5.0
                </p>
                <span className="text-[10px] text-emerald-400">High Alignment Cohort</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                Breakdown by Question Prompt
              </h4>
              {analyzingSurvey.questions.map((q, idx) => (
                <div key={q.id} className="p-3.5 rounded-xl bg-black/20 border border-white/[0.06] space-y-2 text-xs">
                  <div className="flex justify-between items-center text-gray-300">
                    <span className="font-semibold text-white">Prompt #{idx + 1}: {q.text}</span>
                    <span className="text-[11px] font-bold text-cyan-300">88% Positive</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-[#06b6d4]"
                      style={{ width: `${80 + (idx * 5) % 18}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW PROMPTS MODAL */}
      {previewSurvey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#1d1230] border border-white/[0.12] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div>
                <h3 className="text-base font-bold text-white">{previewSurvey.title}</h3>
                <p className="text-xs text-gray-400">Question Bank Structure ({previewSurvey.questions.length} prompts)</p>
              </div>
              <button
                onClick={() => setPreviewSurvey(null)}
                className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-white/[0.05]"
              >
                Done
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto no-scrollbar">
              {previewSurvey.questions.map((q, i) => (
                <div key={q.id} className="p-3 rounded-xl bg-black/30 border border-white/[0.06] text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-gray-400">
                    <span className="font-bold text-purple-300">Question {i + 1}</span>
                    <span className="uppercase text-[10px] px-2 py-0.5 rounded bg-white/[0.06]">
                      {q.type.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-gray-200 font-medium">{q.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
