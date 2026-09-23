import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  PlusCircle, 
  Check, 
  ArrowRight, 
  Activity, 
  Zap 
} from 'lucide-react';
import { Department, ActionableInsight } from '../types';

interface AIDiagnosticCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  department: Department;
  onAddInsightFromAI: (insight: Omit<ActionableInsight, 'id' | 'detectedDate'>) => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  actionCardData?: Omit<ActionableInsight, 'id' | 'detectedDate'>;
}

export const AIDiagnosticCopilotModal: React.FC<AIDiagnosticCopilotModalProps> = ({
  isOpen,
  onClose,
  department,
  onAddInsightFromAI,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-init',
      sender: 'ai',
      text: "Hello! I am your PulseHealth Diagnostic Neural Copilot. I analyze continuous pulse streams, blameless retrospective cadence, and cross-team sentiment signals. How can I assist leadership today?",
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [addedCards, setAddedCards] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const quickPrompts = [
    {
      label: 'Why is Product Design strained?',
      query: 'Why is Product Design showing elevated burnout risk (+4.2%) and what is the root cause?',
    },
    {
      label: 'Replicate Engineering Trust',
      query: 'How can we replicate Engineering’s 95% psychological safety score into Sales and Operations?',
    },
    {
      label: 'Executive Board Briefing',
      query: 'Draft a concise 3-bullet executive briefing on company-wide health for our upcoming board review.',
    },
    {
      label: 'Deep Work Deprivation',
      query: 'What specific policy addresses the meeting fragmentation signal affecting 64% of contributors?',
    },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate intelligent diagnostic synthesis response
    setTimeout(() => {
      let replyText = '';
      let actionCard: Omit<ActionableInsight, 'id' | 'detectedDate'> | undefined;

      const lower = text.toLowerCase();
      if (lower.includes('product design') || lower.includes('burnout')) {
        replyText = `**Diagnostic Synthesis for Product Design:**\n\n1. **Root Driver:** Over-allocation of sprint scope by 125% combined with 4 mid-sprint requirement shifts from enterprise account deals.\n2. **Signal Correlation:** Uninterrupted focus blocks have degraded to 1.8 hours/day.\n3. **Recommended Action:** Enforce a 2-week scope freeze and 1-in-1-out prioritization protocol.`;
        actionCard = {
          title: 'Enforce Scope Freeze for Product Design Sprints',
          department: 'product_design',
          departmentName: 'Product & Design',
          priority: 'Elevated',
          status: 'Open',
          what: 'Sprint scope changes causing 32% burnout index in Product Design.',
          why: 'Mid-sprint enterprise deal commitments bypassing engineering estimation buffers.',
          where: 'Product Design & Core UI Guild',
          priorityReason: 'Risk of senior designer attrition during critical Q4 design system rollout.',
          next: 'Implement immediate 2-week sprint scope lock and establish standard 1-in-1-out trade-off rubric.',
          owner: 'Marcus Vance & VP of Product',
          impactScore: 91,
          confidence: 96,
          tags: ['Scope Lock', 'AI Recommended', 'Burnout Prevention'],
        };
      } else if (lower.includes('engineering') || lower.includes('safety')) {
        replyText = `**Organizational Transferability Analysis:**\n\nEngineering's 95% Psychological Safety benchmark stems from three codified practices:\n- **Blameless Post-Mortems:** Focus on systemic failure points with zero individual culpability.\n- **Paired Architecture Reviews:** 88% of PRs have joint ownership, lowering review anxiety.\n- **Actionable Transfer:** Replicate the blameless post-mortem framework into Sales deal losses and Marketing campaign reviews.`;
        actionCard = {
          title: 'Deploy Blameless Review Framework to Sales & Operations',
          department: 'all',
          departmentName: 'All Departments',
          priority: 'Positive',
          status: 'Open',
          what: 'Engineering achieves 95% psychological safety through institutionalized blameless retrospectives.',
          why: 'Psychological safety habits in engineering are currently siloed and not practiced in revenue teams.',
          where: 'Sales Operations & Enterprise Account Teams',
          priorityReason: 'Standardizing blameless reviews improves cross-department alignment by an estimated +12%.',
          next: 'Run a 3-week blameless retro pilot with the Mid-Market Sales leadership team.',
          owner: 'David Sterling & Elena Rostova',
          impactScore: 86,
          confidence: 93,
          tags: ['Psychological Safety', 'Silo Breaker', 'Best Practice'],
        };
      } else if (lower.includes('board') || lower.includes('briefing')) {
        replyText = `**Executive Health Briefing (Q3 Benchmark):**\n\n- **Stability:** Predictive Retention Stability sits at 89% (+1.2% QoQ) with voluntary tech turnover projected under 4.1%.\n- **Culture:** Psychological Safety is in the 94th percentile (91%), driven by high-trust engineering squads.\n- **Intervention Needed:** Product Design workload compression is our single elevated risk; leadership intervention has been scheduled.`;
      } else {
        replyText = `Diagnostic telemetry confirms that overall company velocity remains resilient at 84% with strong psychological safety (91%). To optimize focus across squads, telemetry indicates implementing structured calendar buffers ("Focus Wednesdays") will yield immediate cognitive relief.`;
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        actionCardData: actionCard,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleAddCard = (msgId: string, card: Omit<ActionableInsight, 'id' | 'detectedDate'>) => {
    onAddInsightFromAI(card);
    setAddedCards((prev) => ({ ...prev, [msgId]: true }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#1d1230] border border-white/[0.12] rounded-3xl shadow-2xl flex flex-col h-[650px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-900/60 via-[#1d1230] to-[#06b6d4]/20 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-600 to-[#ec4899] text-white shadow-md">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">AI Diagnostic Copilot</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  PulseNeural Model
                </span>
              </div>
              <p className="text-xs text-gray-400">Context: {department === 'all' ? 'Company-wide' : department} telemetry</p>
            </div>
          </div>

          <button
            id="close-copilot-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Prompts Bar */}
        <div className="p-3 bg-black/30 border-b border-white/[0.04] overflow-x-auto no-scrollbar flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider flex-shrink-0">
            Suggested:
          </span>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qp.query)}
              className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-cyan-300 border border-white/[0.06] whitespace-nowrap transition-colors flex-shrink-0"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 no-scrollbar">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed space-y-3 ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-[#06b6d4] text-white shadow-md'
                    : 'bg-black/40 border border-white/[0.08] text-gray-200'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>

                {/* If AI generated an Action Card suggestion */}
                {m.actionCardData && (
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-2 mt-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-purple-300 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-yellow-300" />
                        AI Recommended Leadership Action Card
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-semibold">
                        {m.actionCardData.priority}
                      </span>
                    </div>

                    <p className="font-semibold text-white">{m.actionCardData.title}</p>
                    <p className="text-[11px] text-gray-300">Next: {m.actionCardData.next}</p>

                    <button
                      disabled={addedCards[m.id]}
                      onClick={() => handleAddCard(m.id, m.actionCardData!)}
                      className={`w-full py-1.5 px-2.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                        addedCards[m.id]
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-purple-600 hover:bg-purple-500 text-white shadow-sm'
                      }`}
                    >
                      {addedCards[m.id] ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Actionable Insights Board</span>
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>Add to Actionable Insights Board</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#06b6d4]/30 border border-[#06b6d4]/40 flex items-center justify-center text-cyan-300 flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-purple-400 pl-11">
              <Bot className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing cross-department telemetry signals...</span>
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 bg-black/40 border-t border-white/[0.08] flex items-center gap-2"
        >
          <input
            id="copilot-input-field"
            type="text"
            placeholder="Ask about team trust, burnout indicators, or executive summaries..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 text-xs bg-black/50 border border-white/[0.1] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#06b6d4]"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-[#06b6d4] text-white disabled:opacity-40 hover:opacity-95 shadow-md flex items-center justify-center cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
