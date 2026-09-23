import React from 'react';
import { Filter, Calendar, Layers, Search, RefreshCw } from 'lucide-react';
import { Department, TimeRange } from '../types';

interface DepartmentTimeFilterProps {
  department: Department;
  setDepartment: (dept: Department) => void;
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const DepartmentTimeFilter: React.FC<DepartmentTimeFilterProps> = ({
  department,
  setDepartment,
  timeRange,
  setTimeRange,
  searchQuery,
  setSearchQuery,
  onRefresh,
  isRefreshing = false,
}) => {
  const departments: { key: Department; label: string; count: string }[] = [
    { key: 'all', label: 'All Departments', count: '480 Personnel' },
    { key: 'engineering', label: 'Engineering', count: '185 ICs & Leads' },
    { key: 'product_design', label: 'Product & Design', count: '64 Staff' },
    { key: 'sales_marketing', label: 'Sales & Marketing', count: '142 Staff' },
    { key: 'operations', label: 'Operations', count: '89 Staff' },
  ];

  const timeRanges: { key: TimeRange; label: string }[] = [
    { key: '7d', label: 'Last 7 Days' },
    { key: '30d', label: 'Last 30 Days' },
    { key: 'q3', label: 'Q3 Benchmark' },
    { key: 'ytd', label: 'Year-to-Date' },
  ];

  return (
    <div className="bg-[#1b122c]/90 backdrop-blur-md rounded-2xl p-4 border border-white/[0.08] shadow-xl space-y-3">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Department Pills / Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          <div className="flex items-center gap-1 text-xs text-gray-400 font-medium mr-1.5 flex-shrink-0">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Scope:</span>
          </div>
          {departments.map((d) => {
            const isSelected = department === d.key;
            return (
              <button
                key={d.key}
                id={`dept-filter-${d.key}`}
                onClick={() => setDepartment(d.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600/40 to-[#06b6d4]/30 text-white border-purple-500/50 shadow-md shadow-purple-950/50'
                    : 'bg-white/[0.03] text-gray-400 hover:text-gray-200 hover:bg-white/[0.06] border-white/[0.06]'
                }`}
              >
                <span>{d.label}</span>
                {isSelected && (
                  <span className="ml-1.5 text-[10px] text-cyan-300 font-normal hidden lg:inline">
                    ({d.count.split(' ')[0]})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Time Horizon Selector & Search */}
        <div className="flex items-center gap-2 flex-wrap md:flex-nowrap justify-between md:justify-end">
          {/* Time Filter Pills */}
          <div className="flex items-center bg-black/30 p-1 rounded-xl border border-white/[0.06]">
            <Calendar className="w-3 h-3 text-gray-400 ml-1.5 mr-1" />
            {timeRanges.map((t) => (
              <button
                key={t.key}
                id={`time-filter-${t.key}`}
                onClick={() => setTimeRange(t.key)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-colors whitespace-nowrap ${
                  timeRange === t.key
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[150px] sm:min-w-[180px]">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="global-search-input"
              type="text"
              placeholder="Filter signals or teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-black/40 border border-white/[0.08] rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4]/40"
            />
          </div>

          {/* Refresh Diagnostics */}
          {onRefresh && (
            <button
              id="refresh-diagnostics-btn"
              onClick={onRefresh}
              title="Recalculate dynamic diagnostic models"
              className="p-1.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-xl text-gray-300 hover:text-white transition-colors flex-shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#06b6d4]' : ''}`} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
