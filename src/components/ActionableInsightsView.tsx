import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  User, 
  Clock, 
  Plus, 
  Filter, 
  ShieldAlert, 
  Sparkles, 
  Tag, 
  Check, 
  RotateCcw, 
  Flame, 
  Share2 
} from 'lucide-react';
import { ActionableInsight, Department, UserRole } from '../types';

interface ActionableInsightsViewProps {
  insights: ActionableInsight[];
  onUpdateStatus: (id: string, newStatus: 'Open' | 'In Progress' | 'Resolved') => void;
  onAddInsight: (insight: Omit<ActionableInsight, 'id' | 'detectedDate'>) => void;
  department: Department;
  userRole: UserRole;
}

export const ActionableInsightsView: React.FC<ActionableInsightsViewProps> = ({
  insights,
  onUpdateStatus,
  onAddInsight,
  department,
  userRole,
}) => {
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'Critical' | 'Elevated' | 'Moderate' | 'Positive'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Open' | 'In Progress' | 'Resolved'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Insight Form State
  const [newTitle, setNewTitle] = useState('');
  const [newWhat, setNewWhat] = useState('');
  const [newWhy, setNewWhy] = useState('');
  const [newWhere, setNewWhere] = useState('Product Design Guild');
  const [newPriority, setNewPriority] = useState<'Critical' | 'Elevated' | 'Moderate' | 'Positive'>('Elevated');
  const [newNext, setNewNext] = useState('');
  const [newOwner, setNewOwner] = useState('Elena Rostova (Super Admin)');
  const [newDept, setNewDept] = useState<Department>('product_design');

  const filteredInsights = insights.filter((item) => {
    if (department !== 'all' && item.department !== 'all' && item.department !== department) {
      return false;
    }
    if (priorityFilter !== 'all' && item.priority !== priorityFilter) {
      return false;
    }
    if (statusFilter !== 'all' && item.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return {
          pill: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          border: 'border-l-4 border-l-rose-500',
          badge: 'Critical Risk',
        };
      case 'Elevated':
        return {
          pill: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          border: 'border-l-4 border-l-amber-500',
          badge: 'Elevated Risk',
        };
      case 'Moderate':
        return {
          pill: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
          border: 'border-l-4 border-l-cyan-500',
          badge: 'Moderate',
        };
      case 'Positive':
      default:
        return {
          pill: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          border: 'border-l-4 border-l-emerald-500',
          badge: 'Positive Benchmark',
        };
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newWhat.trim() || !newNext.trim()) return;

    onAddInsight({
      title: newTitle,
      department: newDept,
      departmentName: newDept === 'engineering' ? 'Engineering' : newDept === 'product_design' ? 'Product & Design' : 'All Departments',
      priority: newPriority,
      status: 'Open',
      what: newWhat,
      why: newWhy || 'Detected via pulse survey feedback and organizational telemetry correlation.',
      where: newWhere,
      priorityReason: 'Identified as a high-leverage intervention target for team stability.',
      next: newNext,
      owner: newOwner,
      impactScore: 85,
      confidence: 93,
      tags: ['Leadership', 'Intervention', 'Diagnostic'],
    });

    setIsAddModalOpen(false);
    // Reset
    setNewTitle('');
    setNewWhat('');
    setNewWhy('');
    setNewNext('');
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1b122c]/60 p-4 rounded-2xl border border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Actionable Diagnostic Cards
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {filteredInsights.length} Active Findings
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Structured leadership insights breaking down observations into <span className="text-cyan-300 font-semibold">What</span>, <span className="text-purple-300 font-semibold">Why</span>, <span className="text-pink-300 font-semibold">Where</span>, <span className="text-amber-300 font-semibold">Priority</span>, and <span className="text-emerald-300 font-semibold">Next</span>.
          </p>
        </div>

        {/* Action button */}
        {(userRole === 'super_admin' || userRole === 'org_admin') && (
          <button
            id="add-intervention-card-btn"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 text-xs font-bold rounded-xl text-white bg-gradient-to-r from-purple-600 to-[#06b6d4] hover:opacity-90 shadow-md shadow-purple-950 flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Actionable Intervention</span>
          </button>
        )}
      </div>

      {/* Filter Row: Priority & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-black/20 rounded-xl border border-white/[0.04]">
        {/* Priority Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-xs text-gray-500 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Priority:
          </span>
          {(['all', 'Critical', 'Elevated', 'Moderate', 'Positive'] as const).map((p) => (
            <button
              key={p}
              id={`filter-priority-${p}`}
              onClick={() => setPriorityFilter(p)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                priorityFilter === p
                  ? 'bg-purple-600/40 text-purple-200 border border-purple-500/40'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]'
              }`}
            >
              {p === 'all' ? 'All Priorities' : p}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500 font-medium mr-1">Status:</span>
          {(['all', 'Open', 'In Progress', 'Resolved'] as const).map((s) => (
            <button
              key={s}
              id={`filter-status-${s}`}
              onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                statusFilter === s
                  ? 'bg-[#06b6d4]/20 text-[#06b6d4] border border-[#06b6d4]/40'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]'
              }`}
            >
              {s === 'all' ? 'All Status' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Action Cards List */}
      <div className="space-y-4">
        {filteredInsights.length === 0 ? (
          <div className="p-8 text-center bg-[#1b122c]/50 rounded-2xl border border-white/[0.06] text-gray-400">
            No diagnostic findings match the selected filters.
          </div>
        ) : (
          filteredInsights.map((card) => {
            const style = getPriorityStyle(card.priority);
            return (
              <div
                key={card.id}
                id={`insight-card-${card.id}`}
                className={`bg-[#1b122c]/90 backdrop-blur-xl rounded-2xl p-5 border border-white/[0.08] shadow-xl hover:border-white/[0.16] transition-all space-y-4 ${style.border}`}
              >
                {/* Top Row: Title, Priority Pill, Status Badge & Owner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${style.pill}`}>
                      {style.badge}
                    </span>
                    <h3 className="text-base font-bold text-white tracking-tight">{card.title}</h3>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {/* Status Pill with Quick Switch */}
                    <div className="flex items-center bg-black/30 rounded-lg p-1 border border-white/[0.06] text-xs">
                      {(['Open', 'In Progress', 'Resolved'] as const).map((st) => (
                        <button
                          key={st}
                          id={`card-status-btn-${card.id}-${st}`}
                          onClick={() => onUpdateStatus(card.id, st)}
                          className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                            card.status === st
                              ? st === 'Resolved'
                                ? 'bg-emerald-500 text-white font-bold'
                                : st === 'In Progress'
                                ? 'bg-cyan-500 text-black font-bold'
                                : 'bg-purple-600 text-white font-bold'
                              : 'text-gray-400 hover:text-gray-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Structured Breakdown: What / Why / Where / Next */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  {/* WHAT */}
                  <div className="p-3.5 rounded-xl bg-black/20 border border-white/[0.04] space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-300 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> What (Observation)
                    </span>
                    <p className="text-gray-200 leading-relaxed font-normal">{card.what}</p>
                  </div>

                  {/* WHY */}
                  <div className="p-3.5 rounded-xl bg-black/20 border border-white/[0.04] space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Why (Root Cause)
                    </span>
                    <p className="text-gray-200 leading-relaxed font-normal">{card.why}</p>
                  </div>

                  {/* WHERE & PRIORITY REASON */}
                  <div className="p-3.5 rounded-xl bg-black/20 border border-white/[0.04] space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-pink-300 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400" /> Where (Locus)
                    </span>
                    <p className="text-gray-200 font-semibold">{card.where}</p>
                    <p className="text-[11px] text-gray-400 mt-1">{card.priorityReason}</p>
                  </div>

                  {/* NEXT (ACTION) */}
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Next (Leadership Action)
                    </span>
                    <p className="text-emerald-100 font-medium leading-relaxed">{card.next}</p>
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-[11px] text-gray-400 border-t border-white/[0.04]">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-purple-400" />
                      <span>Owner: <strong className="text-gray-300 font-semibold">{card.owner}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <span>Detected: {card.detectedDate}</span>
                    </div>
                    <div className="flex items-center gap-1 text-cyan-300">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Confidence: {card.confidence}%</span>
                    </div>
                  </div>

                  {/* Tag pills */}
                  <div className="flex items-center gap-1.5">
                    {card.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-white/[0.04] text-gray-400 text-[10px]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Custom Action Card Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#1d1230] border border-white/[0.12] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#06b6d4]" />
                <h3 className="text-lg font-bold text-white">Create Leadership Intervention Card</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-white text-sm"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Card Title / Headline
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Cross-functional PR backlog in Core Platform"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-black/40 border border-white/[0.1] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#06b6d4]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Priority Level
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-black/40 border border-white/[0.1] rounded-xl text-white focus:outline-none focus:border-[#06b6d4]"
                  >
                    <option value="Critical">Critical</option>
                    <option value="Elevated">Elevated</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Positive">Positive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Department Locus
                  </label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-black/40 border border-white/[0.1] rounded-xl text-white focus:outline-none focus:border-[#06b6d4]"
                  >
                    <option value="all">All Departments</option>
                    <option value="engineering">Engineering</option>
                    <option value="product_design">Product & Design</option>
                    <option value="sales_marketing">Sales & Marketing</option>
                    <option value="operations">Operations</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  <span className="text-cyan-300">WHAT:</span> Observed Symptom / Signal
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Describe the detected signal or workload friction..."
                  value={newWhat}
                  onChange={(e) => setNewWhat(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-black/40 border border-white/[0.1] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#06b6d4]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  <span className="text-purple-300">WHY:</span> Root Cause Hypothesis
                </label>
                <textarea
                  rows={2}
                  placeholder="Why is this occurring? (e.g. calendar fragmentation, unclear OKRs)..."
                  value={newWhy}
                  onChange={(e) => setNewWhy(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-black/40 border border-white/[0.1] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#06b6d4]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  <span className="text-emerald-300">NEXT:</span> Recommended Leadership Action
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Institute Focus Wednesday and audit recurring 45-min syncs"
                  value={newNext}
                  onChange={(e) => setNewNext(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-black/40 border border-white/[0.1] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#06b6d4]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-300 hover:text-white rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-[#06b6d4] rounded-xl shadow-lg hover:opacity-95"
                >
                  Publish Action Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
