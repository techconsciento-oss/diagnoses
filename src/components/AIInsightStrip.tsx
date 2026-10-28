import React from 'react';
import { Sparkles, ArrowRight, AlertTriangle, ShieldCheck, Zap, Bot } from 'lucide-react';
import { Department } from '../types';
import { getAIInsightSummary } from '../data/mockData';

interface AIInsightStripProps {
  department: Department;
  onOpenCopilot: () => void;
  onNavigateToInsights: () => void;
}

export const AIInsightStrip: React.FC<AIInsightStripProps> = ({
  department,
  onOpenCopilot,
  onNavigateToInsights,
}) => {
  const insight = getAIInsightSummary(department);

  return (
    <div
      id="ai-insight-strip"
      className="relative overflow-hidden rounded-2xl p-[1.5px] bg-gradient-to-r from-[#9c5295]/60 via-[#f0b8dc]/40 to-[#9c5295]/60 shadow-2xl shadow-[#9c5295]/20"
    >
      <div className="relative bg-[#381a46]/95 backdrop-blur-2xl rounded-[15px] p-5">
        {/* Ambient background glow dots */}
        <div className="absolute top-0 right-1/4 w-72 h-20 bg-[#9c5295]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-48 h-16 bg-[#f0b8dc]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Left section: Icon + Alert Category + Text */}
          <div className="flex items-start gap-3.5 flex-1">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#9c5295]/40 to-[#f0b8dc]/30 border border-[#9c5295]/50 text-[#f0b8dc] shadow-md flex-shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#9c5295]/25 text-[#f0b8dc] border border-[#9c5295]/40 flex items-center gap-1.5">
                  <Bot className="w-3 h-3 text-[#f0b8dc]" />
                  Consciento Diagnostic Telemetry Engine
                </span>

                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                    insight.severity === 'warning'
                      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                      : 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30'
                  }`}
                >
                  {insight.severity === 'warning' ? (
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                  ) : (
                    <ShieldCheck className="w-3 h-3 text-[#10b981]" />
                  )}
                  {insight.departmentAlert}
                </span>
              </div>

              {/* Main synthesized insight sentence */}
              <p className="text-sm font-medium text-gray-100 leading-relaxed max-w-4xl">
                {insight.text}
              </p>
            </div>
          </div>

          {/* Right section: Action Buttons */}
          <div className="flex items-center gap-2.5 self-end lg:self-center flex-shrink-0">
            <button
              id="ai-insight-details-btn"
              onClick={onNavigateToInsights}
              className="px-4 py-2 text-xs font-semibold rounded-full text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.16] transition-all flex items-center gap-1.5"
            >
              <span>View Action Cards</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-300" />
            </button>

            <button
              id="ai-insight-copilot-btn"
              onClick={onOpenCopilot}
              className="px-5 py-2 text-xs font-bold rounded-full text-white bg-[#9c5295] hover:bg-[#b05fa8] shadow-lg shadow-[#9c5295]/35 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-yellow-300 group-hover:scale-110 transition-transform" />
              <span>Ask Diagnostic Copilot</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
