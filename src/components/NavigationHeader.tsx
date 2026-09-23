import React from 'react';
import { 
  Activity, 
  ChevronDown, 
  Sparkles, 
  Bell, 
  UserCheck, 
  ShieldCheck, 
  LogOut, 
  BarChart3, 
  Compass, 
  ClipboardList, 
  Lightbulb, 
  Building2,
  KeyRound
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';

export type AppPageTab = 'login' | 'dashboard' | 'surveys' | 'matrix' | 'insights';

interface NavigationHeaderProps {
  currentTab: AppPageTab;
  setCurrentTab: (tab: AppPageTab) => void;
  currentUser: UserProfile;
  onOpenRoleModal: () => void;
  onOpenCopilot: () => void;
  allRoles: UserProfile[];
  onSelectRole: (role: UserRole) => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  onOpenRoleModal,
  onOpenCopilot,
  allRoles,
  onSelectRole,
}) => {
  const [showOrgDropdown, setShowOrgDropdown] = React.useState(false);
  const [selectedOrg, setSelectedOrg] = React.useState('Acme Global Technologies');
  const [showRoleDropdown, setShowRoleDropdown] = React.useState(false);

  const orgs = [
    'Acme Global Technologies',
    'Nova Cloud Systems',
    'Starlight Health Enterprise',
  ];

  const getRoleBadgeStyle = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
      case 'org_admin':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'leadership':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'employee':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    }
  };

  const getRoleShortName = (role: UserRole) => {
    switch (role) {
      case 'super_admin': return 'Super Admin';
      case 'org_admin': return 'Org Admin / HR';
      case 'leadership': return 'Leadership Viewer';
      case 'employee': return 'Employee Respondent';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#140d21]/85 border-b border-white/[0.08] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tier: Logo, Org Selector, Live Status, Profile */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <div 
              id="brand-logo" 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setCurrentTab('dashboard')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#06b6d4] via-[#8b5cf6] to-[#ec4899] p-[1.5px] shadow-lg shadow-purple-900/40">
                <div className="w-full h-full bg-[#1b122c] rounded-[10px] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#06b6d4] transition-transform duration-300 group-hover:scale-110" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
                    PulseHealth
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/[0.08] text-purple-200 border border-white/[0.06]">
                    Enterprise
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-normal">Organizational Health Diagnostics</p>
              </div>
            </div>

            {/* Organization Selector */}
            <div className="relative hidden md:block">
              <button
                id="org-selector-btn"
                onClick={() => setShowOrgDropdown(!showOrgDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-lg transition-colors"
              >
                <Building2 className="w-3.5 h-3.5 text-purple-400" />
                <span>{selectedOrg}</span>
                <ChevronDown className="w-3 h-3 text-gray-400 ml-1" />
              </button>

              {showOrgDropdown && (
                <div className="absolute left-0 mt-2 w-56 bg-[#21153b] border border-white/[0.12] rounded-xl shadow-2xl py-1 z-50 backdrop-blur-xl">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                    Select Organization
                  </div>
                  {orgs.map((org) => (
                    <button
                      key={org}
                      onClick={() => {
                        setSelectedOrg(org);
                        setShowOrgDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-white/[0.08] transition-colors ${
                        selectedOrg === org ? 'text-[#06b6d4] font-semibold bg-white/[0.04]' : 'text-gray-300'
                      }`}
                    >
                      {org}
                      {selectedOrg === org && <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Live Status Badge */}
            <div 
              id="live-status-badge"
              className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] text-xs font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
              </span>
              <span>Live Diagnostics Active</span>
            </div>
          </div>

          {/* Right Area: AI Copilot trigger, Quick Role Switcher, Profile */}
          <div className="flex items-center gap-3">
            {/* AI Diagnostics Copilot Button */}
            <button
              id="ai-copilot-header-btn"
              onClick={onOpenCopilot}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-purple-600/30 via-pink-600/20 to-cyan-600/30 hover:from-purple-600/40 hover:to-cyan-600/40 border border-purple-500/40 text-purple-200 transition-all shadow-sm hover:shadow-purple-500/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ec4899] animate-pulse" />
              <span className="hidden sm:inline">AI Copilot</span>
            </button>

            {/* Quick Role Switcher Pill */}
            <div className="relative">
              <button
                id="role-switch-pill-btn"
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors ${getRoleBadgeStyle(
                  currentUser.role
                )}`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="max-w-[120px] sm:max-w-none truncate">{getRoleShortName(currentUser.role)}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-[#21153b] border border-white/[0.12] rounded-xl shadow-2xl py-2 z-50 backdrop-blur-xl">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                    Quick Switch Demo Role
                  </div>
                  {allRoles.map((roleUser) => (
                    <button
                      key={roleUser.id}
                      onClick={() => {
                        onSelectRole(roleUser.role);
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center gap-3 hover:bg-white/[0.08] transition-colors ${
                        currentUser.role === roleUser.role ? 'bg-white/[0.06] text-white font-medium' : 'text-gray-300'
                      }`}
                    >
                      <img
                        src={roleUser.avatar}
                        alt={roleUser.name}
                        className="w-7 h-7 rounded-full object-cover border border-white/[0.1]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold truncate">{roleUser.name}</p>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded border ${getRoleBadgeStyle(roleUser.role)}`}>
                            {getRoleShortName(roleUser.role)}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 truncate">{roleUser.roleTitle}</p>
                      </div>
                    </button>
                  ))}
                  <div className="border-t border-white/[0.08] mt-1 pt-1">
                    <button
                      onClick={() => {
                        setShowRoleDropdown(false);
                        setCurrentTab('login');
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-purple-300 hover:text-purple-200 hover:bg-white/[0.06] flex items-center gap-2"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      View Full Login & Role Page
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar / Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/[0.08]">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-purple-400/40 shadow-sm"
              />
              <button
                id="sign-out-btn"
                title="Go to Login & Roles Page"
                onClick={() => setCurrentTab('login')}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 5 Core Pages Navigation Tabs Bar */}
        <nav className="flex items-center space-x-1 sm:space-x-2 py-2 overflow-x-auto no-scrollbar border-t border-white/[0.04]">
          {/* 1. Login & Role Selection Page */}
          <button
            id="nav-tab-login"
            onClick={() => setCurrentTab('login')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              currentTab === 'login'
                ? 'bg-gradient-to-r from-purple-600/40 to-pink-600/30 text-white border border-purple-500/40 shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]'
            }`}
          >
            <KeyRound className="w-4 h-4 text-pink-400" />
            <span>1. Login & Roles</span>
          </button>

          {/* 2. Live Diagnostic Dashboard */}
          <button
            id="nav-tab-dashboard"
            onClick={() => setCurrentTab('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              currentTab === 'dashboard'
                ? 'bg-gradient-to-r from-purple-600/40 to-[#06b6d4]/30 text-white border border-purple-500/40 shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-[#06b6d4]" />
            <span>2. Live Diagnostics</span>
          </button>

          {/* 3. Survey & Assessment Engine (Task Management) */}
          <button
            id="nav-tab-surveys"
            onClick={() => setCurrentTab('surveys')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              currentTab === 'surveys'
                ? 'bg-gradient-to-r from-purple-600/40 to-emerald-600/30 text-white border border-emerald-500/40 shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]'
            }`}
          >
            <ClipboardList className="w-4 h-4 text-emerald-400" />
            <span>3. Survey & Assessment Engine</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Task Mgmt
            </span>
          </button>

          {/* 4. 360° Organizational Health Matrix */}
          <button
            id="nav-tab-matrix"
            onClick={() => setCurrentTab('matrix')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              currentTab === 'matrix'
                ? 'bg-gradient-to-r from-purple-600/40 to-[#06b6d4]/30 text-white border border-purple-500/40 shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]'
            }`}
          >
            <Compass className="w-4 h-4 text-[#ec4899]" />
            <span>4. 360° Health Matrix</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#ec4899]/20 text-[#ec4899] border border-[#ec4899]/30">
              6 Lenses
            </span>
          </button>

          {/* 5. Actionable Insight Cards */}
          <button
            id="nav-tab-insights"
            onClick={() => setCurrentTab('insights')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              currentTab === 'insights'
                ? 'bg-gradient-to-r from-purple-600/40 to-[#06b6d4]/30 text-white border border-purple-500/40 shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-[#10b981]" />
            <span>5. Actionable Insights</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30">
              What/Why/Next
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};
