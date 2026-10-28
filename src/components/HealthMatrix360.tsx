import React, { useState } from 'react';
import { 
  UserCheck, 
  Users, 
  Compass, 
  Sparkles, 
  TrendingUp, 
  Globe, 
  ArrowUpRight, 
  X, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Info, 
  Layers,
  Sparkle
} from 'lucide-react';
import { HealthLens, Department } from '../types';
import { INITIAL_HEALTH_LENSES } from '../data/mockData';

interface HealthMatrix360Props {
  department: Department;
  onSelectActionCard?: (lensId: string) => void;
}

export const HealthMatrix360: React.FC<HealthMatrix360Props> = ({ department }) => {
  const [selectedLens, setSelectedLens] = useState<HealthLens | null>(null);

  // Modulate scores slightly if department is selected
  const lenses: HealthLens[] = INITIAL_HEALTH_LENSES.map((lens) => {
    let scoreMod = 0;
    if (department === 'engineering') {
      if (lens.id === 'lens-teams') scoreMod = +4;
      if (lens.id === 'lens-employees') scoreMod = +3;
    } else if (department === 'product_design') {
      if (lens.id === 'lens-employees') scoreMod = -8;
      if (lens.id === 'lens-leadership') scoreMod = -4;
    } else if (department === 'sales_marketing') {
      if (lens.id === 'lens-business') scoreMod = +3;
      if (lens.id === 'lens-employees') scoreMod = -3;
    } else if (department === 'operations') {
      if (lens.id === 'lens-business') scoreMod = +4;
      if (lens.id === 'lens-teams') scoreMod = +1;
    }
    const finalScore = Math.min(99, Math.max(50, lens.score + scoreMod));
    return {
      ...lens,
      score: finalScore,
    };
  });

  const getLensIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-[#10b981]" />;
      case 'Users': return <Users className="w-5 h-5 text-[#06b6d4]" />;
      case 'Compass': return <Compass className="w-5 h-5 text-purple-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#ec4899]" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-blue-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-amber-400" />;
      default: return <Compass className="w-5 h-5 text-purple-400" />;
    }
  };

  const getLensColorBorder = (color: string) => {
    switch (color) {
      case 'mint': return 'hover:border-[#10b981]/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]';
      case 'cyan': return 'hover:border-[#06b6d4]/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]';
      case 'pink': return 'hover:border-[#ec4899]/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]';
      case 'purple': return 'hover:border-[#9c5295]/60 hover:shadow-[0_0_20px_rgba(156,82,149,0.3)]';
      case 'blue': return 'hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]';
      case 'amber': return 'hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]';
      default: return 'hover:border-[#9c5295]/50';
    }
  };

  const getScoreColorText = (score: number) => {
    if (score >= 90) return 'text-[#06b6d4]';
    if (score >= 80) return 'text-[#10b981]';
    if (score >= 70) return 'text-purple-300';
    return 'text-amber-400';
  };

  return (
    <div className="space-y-6">
      {/* Header and Explanation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#381a46]/70 p-4 rounded-2xl border border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight">360° Organizational Health Matrix</h2>
            <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-[#9c5295]/20 text-[#f0b8dc] border border-[#9c5295]/30">
              6 Diagnostic Lenses
            </span>
          </div>
          <p className="text-xs text-[#cfbfdb] mt-0.5">
            Holistic structural telemetry synthesized from employee sentiment, team collaboration rhythms, and leadership resonance.
          </p>
        </div>
        <div className="text-xs text-[#cfbfdb] flex items-center gap-2">
          <Info className="w-4 h-4 text-[#f0b8dc]" />
          <span>Click any lens to expand sub-metrics & benchmarks</span>
        </div>
      </div>

      {/* The 6 Lenses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {lenses.map((lens) => {
          const borderClass = getLensColorBorder(lens.color);
          const scoreClass = getScoreColorText(lens.score);

          return (
            <div
              key={lens.id}
              id={`lens-card-${lens.id}`}
              onClick={() => setSelectedLens(lens)}
              className={`group relative bg-[#381a46]/85 backdrop-blur-xl rounded-2xl p-5 border border-white/[0.1] hover:bg-[#432053]/90 transition-all duration-300 cursor-pointer ${borderClass} hover:-translate-y-1 shadow-xl flex flex-col justify-between`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:bg-white/[0.08] transition-colors">
                      {getLensIcon(lens.icon)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                        {lens.title}
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                      </h3>
                      <p className="text-[11px] text-gray-400 line-clamp-1">{lens.subtitle}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-2xl font-black tracking-tight ${scoreClass}`}>
                      {lens.score}
                      <span className="text-xs font-semibold text-gray-500">/100</span>
                    </div>
                  </div>
                </div>

                {/* Status and Trend */}
                <div className="flex items-center justify-between text-xs mb-3 pb-2 border-b border-white/[0.05]">
                  <span className="px-2 py-0.5 rounded-md bg-white/[0.05] text-gray-300 text-[11px] font-medium border border-white/[0.06]">
                    {lens.statusLabel}
                  </span>
                  <span className="text-[11px] text-gray-400">{lens.trend}</span>
                </div>

                {/* Summary */}
                <p className="text-xs text-gray-300 leading-relaxed line-clamp-2 mb-4">
                  {lens.summary}
                </p>

                {/* Sub-metrics mini indicators */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                    Core Signals
                  </span>
                  <div className="space-y-1.5">
                    {lens.subMetrics.slice(0, 3).map((sub, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px]">
                        <span className="text-gray-400 truncate max-w-[170px]">{sub.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-[#06b6d4]"
                              style={{ width: `${sub.score}%` }}
                            />
                          </div>
                          <span className="font-semibold text-gray-200 text-[10px] w-6 text-right">
                            {sub.score}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#f0b8dc] group-hover:text-white">
                <span className="font-medium">Explore full breakdown & radar</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Lens Drilldown Detail Modal */}
      {selectedLens && (
        <div
          id="lens-drilldown-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-3xl bg-[#2c1337] border border-white/[0.14] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-[#9c5295]/30 via-[#3d1c4a] to-[#25102f] border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/[0.1]">
                  {getLensIcon(selectedLens.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">{selectedLens.title} Lens Diagnostic</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.08] text-xs font-semibold text-gray-300 border border-white/[0.08]">
                      {selectedLens.statusLabel}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{selectedLens.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-3xl font-extrabold text-[#06b6d4]">{selectedLens.score}</span>
                  <span className="text-sm font-semibold text-gray-400">/100</span>
                  <div className="text-[10px] text-gray-400">{selectedLens.trend}</div>
                </div>
                <button
                  id="close-lens-modal-btn"
                  onClick={() => setSelectedLens(null)}
                  className="p-2 rounded-xl text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto no-scrollbar">
              {/* Executive Summary Quote */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-sm text-gray-200 leading-relaxed">
                <p className="font-medium italic text-purple-200">"{selectedLens.summary}"</p>
              </div>

              {/* Sub-Metrics Detailed Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    Sub-Metric Telemetry & Industry Benchmark
                  </h4>
                  <span className="text-[11px] text-gray-500">Benchmark Scale (Tech SaaS 500+)</span>
                </div>

                <div className="space-y-3">
                  {selectedLens.subMetrics.map((sub, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-black/20 border border-white/[0.06] space-y-2 hover:bg-black/30 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">{sub.name}</span>
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                              sub.status === 'Optimal'
                                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                : sub.status === 'Strong'
                                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                                : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {sub.status}
                          </span>
                          <span className="text-sm font-bold text-gray-100">{sub.score}%</span>
                        </div>
                      </div>

                      {/* Progress Bar & Benchmark Indicator */}
                      <div className="space-y-1">
                        <div className="relative w-full h-2 rounded-full bg-white/[0.08] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-[#06b6d4]"
                            style={{ width: `${sub.score}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-500">
                          <span>Org Score: {sub.score}%</span>
                          <span>Peer Industry Benchmark: {sub.benchmark}%</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-400 pt-1 border-t border-white/[0.04]">
                        {sub.analysis}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths and Vulnerabilities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    Key Health Strengths
                  </div>
                  <ul className="space-y-1.5 text-xs text-emerald-200/90 list-disc list-inside">
                    {selectedLens.keyStrengths.map((str, i) => (
                      <li key={i}>{str}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4" />
                    Vulnerabilities & Friction
                  </div>
                  <ul className="space-y-1.5 text-xs text-amber-200/90 list-disc list-inside">
                    {selectedLens.vulnerabilities.map((vul, i) => (
                      <li key={i}>{vul}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-black/40 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-gray-400">
                Pulse Health Diagnostics Model v4.2 · Updated continuously
              </span>
              <button
                onClick={() => setSelectedLens(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.08] hover:bg-white/[0.12] text-white transition-colors"
              >
                Close Diagnostic View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
