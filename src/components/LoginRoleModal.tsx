import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  UserCheck, 
  Users, 
  Eye, 
  Activity, 
  Check, 
  X 
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface LoginRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  allRoles: UserProfile[];
  onSelectRole: (role: UserRole) => void;
}

export const LoginRoleModal: React.FC<LoginRoleModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  allRoles,
  onSelectRole,
}) => {
  const [emailInput, setEmailInput] = useState(currentUser.email);
  const [passwordInput, setPasswordInput] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default to the matching role or super admin
    const matched = allRoles.find((u) => u.email.toLowerCase() === emailInput.toLowerCase());
    if (matched) {
      onSelectRole(matched.role);
    } else {
      onSelectRole('super_admin');
    }
    onClose();
  };

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return 'Full unrestricted administrative access, diagnostic neural tuning, company-wide interventions & export rights.';
      case 'org_admin':
        return 'Create and deploy continuous assessment pulses, manage action card assignees, track department health.';
      case 'leadership':
        return 'Executive read-only access to 360° Health Matrix, composite KPIs, benchmark comparisons, and summaries.';
      case 'employee':
        return 'Direct participant experience: take anonymous active pulses, submit confidential friction signals, view team pulse.';
    }
  };

  return (
    <div
      id="login-role-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#21153b] to-[#150d24] border border-white/[0.12] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden">
        {/* Glow ambient effects */}
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#06b6d4]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#06b6d4] via-[#8b5cf6] to-[#ec4899] p-[1.5px] shadow-lg">
              <div className="w-full h-full bg-[#1b122c] rounded-[10px] flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#06b6d4]" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                PulseHealth Enterprise Authentication
              </h2>
              <p className="text-xs text-gray-400">
                Switch role persona or sign in to verify scoped permissions
              </p>
            </div>
          </div>

          <button
            id="close-login-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick-Switch Demo Role Pills Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ec4899]" />
              Quick-Switch Demo Role Personas
            </span>
            <span className="text-[11px] text-gray-400">Click to instantly test access level</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {allRoles.map((roleUser) => {
              const isSelected = currentUser.role === roleUser.role;
              return (
                <button
                  key={roleUser.id}
                  id={`quick-role-${roleUser.role}`}
                  onClick={() => {
                    onSelectRole(roleUser.role);
                    setEmailInput(roleUser.email);
                    onClose();
                  }}
                  className={`p-3 rounded-2xl text-left border transition-all duration-200 group flex items-start gap-3 ${
                    isSelected
                      ? 'bg-gradient-to-br from-purple-900/40 to-[#06b6d4]/20 border-[#06b6d4]/60 shadow-lg shadow-purple-950/50'
                      : 'bg-black/30 border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15]'
                  }`}
                >
                  <img
                    src={roleUser.avatar}
                    alt={roleUser.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/[0.1] mt-0.5 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate">
                        {roleUser.name}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-pulse" />
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-purple-300 block truncate">
                      {roleUser.roleTitle.split('(')[1]?.replace(')', '') || roleUser.role}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                      {getRoleDescription(roleUser.role)}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider with subtle line */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-white/[0.08]"></div>
          <span className="flex-shrink mx-4 text-[10px] uppercase font-bold text-gray-500 tracking-wider">
            Or Manual Credentials Login
          </span>
          <div className="flex-grow border-t border-white/[0.08]"></div>
        </div>

        {/* Traditional Enterprise Login Form */}
        <form onSubmit={handleCustomLogin} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Corporate Single Sign-On (SSO) Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="name@enterprise.com"
                className="w-full pl-9 pr-3 py-2 text-xs bg-black/40 border border-white/[0.1] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#06b6d4]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Security Token / Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-black/40 border border-white/[0.1] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#06b6d4]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded bg-black/50 border-white/[0.2] text-purple-600 focus:ring-0"
              />
              <span>Remember diagnostic session</span>
            </label>
            <span className="text-purple-300 hover:underline cursor-pointer">
              SAML / Okta Active
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-[#8b5cf6] to-[#06b6d4] hover:opacity-95 rounded-xl shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Authenticate Diagnostic Session</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
