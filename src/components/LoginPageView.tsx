import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  UserCheck, 
  Activity, 
  CheckCircle2, 
  Users, 
  Compass, 
  Eye, 
  KeyRound,
  Building2
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface LoginPageViewProps {
  currentUser: UserProfile;
  allRoles: UserProfile[];
  onSelectRole: (role: UserRole) => void;
  onContinueToDashboard: () => void;
}

export const LoginPageView: React.FC<LoginPageViewProps> = ({
  currentUser,
  allRoles,
  onSelectRole,
  onContinueToDashboard,
}) => {
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginSuccessNotice, setLoginSuccessNotice] = useState(false);

  const getRoleBadgeStyle = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/40';
      case 'org_admin':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'leadership':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'employee':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  const getRoleDetails = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return {
          title: 'Super Admin',
          sub: 'Enterprise-wide governance, system telemetry tuning & full intervention authoring.',
          permissions: ['Global Organization Health Access', 'AI Neural Diagnostic Fine-tuning', 'Cross-department Interventions', 'Survey Engine Admin'],
        };
      case 'org_admin':
        return {
          title: 'Org Admin / HR Lead',
          sub: 'Design and deploy assessment pulses, manage question banks, and assign action owners.',
          permissions: ['Survey & Assessment Engine Task Management', 'Add/Schedule Pulse Surveys', 'Manage Actionable Insight Assignees', 'View Filtered Telemetry'],
        };
      case 'leadership':
        return {
          title: 'Leadership Viewer',
          sub: 'Executive access to aggregated 360° Health Matrix, composite KPIs, and trend summaries.',
          permissions: ['360° Health Matrix Full Drilldown', 'Composite KPI Risk Monitoring', 'AI Diagnostic Summary Briefings', 'Read-Only Anonymized Cohorts'],
        };
      case 'employee':
        return {
          title: 'Employee Respondent',
          sub: 'Direct participant experience: take live anonymous pulse surveys, submit feedback, view team pulse.',
          permissions: ['Take Active Diagnostic Pulses', '100% Cryptographic Anonymity', 'Submit Workplace Friction Signals', 'View Department Equilibrium'],
        };
    }
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const matched = allRoles.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      onSelectRole(matched.role);
    } else {
      onSelectRole('super_admin');
    }
    // Directly open the app dashboard
    onContinueToDashboard();
  };

  const handleRoleQuickSelect = (roleUser: UserProfile) => {
    onSelectRole(roleUser.role);
    setEmail(roleUser.email);
    // Directly open the app dashboard immediately
    onContinueToDashboard();
  };

  const currentRoleInfo = getRoleDetails(currentUser.role);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto py-4">
      {/* Page Title & Direct Open CTA */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#ec4899] animate-pulse" />
          <span>Core Page 1 of 5: Enterprise Access & Persona Simulation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Login & Role Selection Portal
        </h1>
        <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Select any persona below to directly launch and experience the platform, or enter credentials.
        </p>

        {/* Direct Open App Button */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            id="direct-open-app-dashboard-btn"
            onClick={onContinueToDashboard}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#06b6d4] via-purple-600 to-[#ec4899] text-white font-bold text-sm shadow-xl shadow-purple-900/50 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-cyan-200" />
            <span>Directly Open App Dashboard</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Success Notice if switched */}
      {loginSuccessNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>
              Persona switched to <strong>{currentUser.name}</strong> ({currentRoleInfo.title}). Scoped permissions applied!
            </span>
          </div>
          <button
            onClick={onContinueToDashboard}
            className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg text-xs transition-colors"
          >
            Launch Diagnostics →
          </button>
        </div>
      )}

      {/* Grid: Left = Quick-Switch Demo Role Cards, Right = Credentials Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 4 Demo Role Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-[#06b6d4]" />
              Quick-Switch Demo Role Pills (Instant Test)
            </h2>
            <span className="text-xs text-gray-500">1-Click Role Switch</span>
          </div>

          <div className="space-y-3">
            {allRoles.map((roleUser) => {
              const isSelected = currentUser.role === roleUser.role;
              const details = getRoleDetails(roleUser.role);
              const badgeStyle = getRoleBadgeStyle(roleUser.role);

              return (
                <div
                  key={roleUser.id}
                  id={`login-role-card-${roleUser.role}`}
                  onClick={() => handleRoleQuickSelect(roleUser)}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-900/40 via-[#1e1335] to-[#06b6d4]/20 border-[#06b6d4]/60 shadow-xl shadow-purple-950/50'
                      : 'bg-[#1b122c]/80 hover:bg-[#21153b] border-white/[0.08] hover:border-white/[0.16]'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={roleUser.avatar}
                      alt={roleUser.name}
                      className="w-12 h-12 rounded-xl object-cover border border-white/[0.1] shadow-md flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {roleUser.name}
                          </h3>
                          {isSelected && (
                            <span className="flex h-2 w-2 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06b6d4] opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#06b6d4]"></span>
                            </span>
                          )}
                        </div>

                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badgeStyle}`}>
                          {details.title}
                        </span>
                      </div>

                      <p className="text-xs text-gray-300 font-medium">
                        {roleUser.roleTitle}
                      </p>

                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        {details.sub}
                      </p>

                      {/* Permissions Mini Badges */}
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {details.permissions.map((perm, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-gray-300 border border-white/[0.04]"
                          >
                            ✓ {perm}
                          </span>
                        ))}
                      </div>

                      {/* Direct Enter App CTA */}
                      <div className="pt-2.5 flex items-center justify-between text-xs font-semibold text-[#06b6d4] group-hover:text-cyan-200 border-t border-white/[0.06] mt-2">
                        <span>Click to Directly Open App as {details.title}</span>
                        <span className="flex items-center gap-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-lg border border-cyan-500/30">
                          Launch App <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Traditional Enterprise Credentials Box */}
        <div className="lg:col-span-5 bg-[#1b122c]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/[0.08] shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                  <Lock className="w-4 h-4 text-[#ec4899]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Enterprise SSO Login</h3>
                  <p className="text-[11px] text-gray-400">Okta / SAML / Microsoft Entra</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                256-Bit SSL
              </span>
            </div>

            <form onSubmit={handleManualLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Corporate Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@pulsehealth.enterprise"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-black/40 border border-white/[0.1] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#06b6d4]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Password or Passkey
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-black/40 border border-white/[0.1] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#06b6d4]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-black/50 border-white/[0.2] text-purple-600 focus:ring-0"
                  />
                  <span>Remember session</span>
                </label>
                <span className="text-cyan-400 hover:underline cursor-pointer">
                  Reset credentials
                </span>
              </div>

              <button
                type="submit"
                id="login-page-submit-btn"
                className="w-full py-3 text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-[#8b5cf6] to-[#06b6d4] hover:opacity-95 rounded-xl shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Sign In & Open App Directly</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Active Context Card */}
          <div className="p-4 rounded-2xl bg-black/30 border border-white/[0.06] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400 font-medium">Currently Selected Profile:</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${getRoleBadgeStyle(currentUser.role)}`}>
                {currentUser.role.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-purple-400/40"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                <p className="text-[11px] text-gray-400 truncate">{currentUser.roleTitle}</p>
              </div>
            </div>
            <button
              onClick={onContinueToDashboard}
              className="w-full mt-2 py-2.5 text-xs font-bold text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Directly Open App Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
