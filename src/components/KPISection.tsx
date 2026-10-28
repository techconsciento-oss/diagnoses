import React from 'react';
import { 
  Flame, 
  ShieldAlert, 
  Zap, 
  UserCheck, 
  TrendingUp, 
  TrendingDown, 
  Info 
} from 'lucide-react';
import { KPICardData } from '../types';

interface KPISectionProps {
  kpiList: KPICardData[];
  onCardClick?: (kpi: KPICardData) => void;
}

export const KPISection: React.FC<KPISectionProps> = ({ kpiList, onCardClick }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'kpi-burnout':
        return <Flame className="w-5 h-5 text-[#10b981]" />;
      case 'kpi-safety':
        return <ShieldAlert className="w-5 h-5 text-[#06b6d4]" />;
      case 'kpi-velocity':
        return <Zap className="w-5 h-5 text-[#ec4899]" />;
      case 'kpi-retention':
      default:
        return <UserCheck className="w-5 h-5 text-purple-400" />;
    }
  };

  const getColorStyles = (color: string) => {
    switch (color) {
      case 'mint':
        return {
          badge: 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30',
          barGradient: 'from-[#10b981] to-[#34d399]',
          glow: 'group-hover:shadow-[0_0_25px_rgba(16,185,129,0.18)]',
          borderHover: 'group-hover:border-[#10b981]/40',
          numberColor: 'text-[#10b981]',
        };
      case 'cyan':
        return {
          badge: 'bg-[#06b6d4]/15 text-[#06b6d4] border-[#06b6d4]/30',
          barGradient: 'from-[#06b6d4] to-[#38bdf8]',
          glow: 'group-hover:shadow-[0_0_25px_rgba(6,182,212,0.18)]',
          borderHover: 'group-hover:border-[#06b6d4]/40',
          numberColor: 'text-[#06b6d4]',
        };
      case 'pink':
        return {
          badge: 'bg-[#ec4899]/15 text-[#ec4899] border-[#ec4899]/30',
          barGradient: 'from-[#ec4899] to-[#f472b6]',
          glow: 'group-hover:shadow-[0_0_25px_rgba(236,72,153,0.18)]',
          borderHover: 'group-hover:border-[#ec4899]/40',
          numberColor: 'text-[#ec4899]',
        };
      case 'purple':
        return {
          badge: 'bg-[#9c5295]/20 text-[#f0b8dc] border-[#9c5295]/35',
          barGradient: 'from-[#9c5295] to-[#f0b8dc]',
          glow: 'group-hover:shadow-[0_0_25px_rgba(156,82,149,0.35)]',
          borderHover: 'group-hover:border-[#9c5295]/60',
          numberColor: 'text-[#f0b8dc]',
        };
      case 'amber':
      default:
        return {
          badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          barGradient: 'from-amber-500 to-orange-400',
          glow: 'group-hover:shadow-[0_0_25px_rgba(245,158,11,0.18)]',
          borderHover: 'group-hover:border-amber-500/40',
          numberColor: 'text-amber-300',
        };
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiList.map((kpi) => {
        const styles = getColorStyles(kpi.statusColor);
        return (
          <div
            key={kpi.id}
            id={`kpi-card-${kpi.id}`}
            onClick={() => onCardClick && onCardClick(kpi)}
            className={`group relative bg-[#381a46]/85 backdrop-blur-xl rounded-2xl p-5 border border-white/[0.1] hover:bg-[#432053]/90 transition-all duration-300 cursor-pointer ${styles.borderHover} ${styles.glow} hover:-translate-y-0.5 shadow-xl`}
          >
            {/* Top row: Title and Icon */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] group-hover:bg-white/[0.08] transition-colors">
                  {getIcon(kpi.id)}
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 group-hover:text-gray-200 transition-colors">
                    {kpi.title}
                  </h3>
                  <span className="text-[10px] text-gray-500">{kpi.benchmark}</span>
                </div>
              </div>

              {/* Status Badge */}
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${styles.badge}`}>
                {kpi.statusLabel}
              </span>
            </div>

            {/* Middle row: Big Metric & Trend */}
            <div className="flex items-baseline justify-between mb-3">
              <div className="flex items-baseline gap-1">
                <span className={`text-3xl font-extrabold tracking-tight ${styles.numberColor}`}>
                  {kpi.value}
                </span>
                <span className="text-lg font-bold text-gray-400">{kpi.unit}</span>
              </div>

              {/* Trend Pill */}
              <div
                className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-lg border ${
                  kpi.trend.isPositive
                    ? 'text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20'
                    : 'text-[#ec4899] bg-[#ec4899]/10 border-[#ec4899]/20'
                }`}
              >
                {kpi.trend.direction === 'up' ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                <span>
                  {kpi.trend.percentage}%
                </span>
              </div>
            </div>

            {/* Smooth Progress Bar */}
            <div className="space-y-1.5 mb-2">
              <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden p-[1px]">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${styles.barGradient} transition-all duration-700 ease-out`}
                  style={{ width: `${Math.min(100, Math.max(8, kpi.value))}%` }}
                />
              </div>
            </div>

            {/* Bottom description */}
            <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-white/[0.04]">
              <span className="truncate pr-2">{kpi.description}</span>
              <Info className="w-3.5 h-3.5 flex-shrink-0 text-gray-500 hover:text-gray-300" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
