import React, { useState, useEffect } from 'react';
import { QuizState, QuestionType } from './types';
import { ASSESSMENT_QUESTIONS } from './constants';

const App: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    view: 'landing',
    currentStep: 0,
    score: 0,
    selectedOptionId: null,
    isAnswered: false,
    isCorrect: null,
  });

  const currentQuestion = ASSESSMENT_QUESTIONS[state.currentStep];
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const progress = ((state.currentStep + 1) / totalQuestions) * 100;

  const startQuiz = () => setState(prev => ({ ...prev, view: 'quiz' }));

  const handleSelect = (id: string) => {
    if (state.isAnswered) return;
    setState(prev => ({ ...prev, selectedOptionId: id }));
  };

  const submitAnswer = () => {
    const correct = state.selectedOptionId === currentQuestion.correctOptionId;
    setState(prev => ({
      ...prev,
      isAnswered: true,
      isCorrect: correct,
      score: correct ? prev.score + 100 : prev.score
    }));
  };

  const nextQuestion = () => {
    if (state.currentStep < totalQuestions - 1) {
      setState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1,
        selectedOptionId: null,
        isAnswered: false,
        isCorrect: null
      }));
    } else {
      setState(prev => ({ ...prev, view: 'result' }));
    }
  };

  const restart = () => {
    setState({
      view: 'landing',
      currentStep: 0,
      score: 0,
      selectedOptionId: null,
      isAnswered: false,
      isCorrect: null
    });
  };

  // -----------------------------------------------------------------
  // View Components
  // -----------------------------------------------------------------

  if (state.view === 'landing') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#800000]"></div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotPattern" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#800000" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>
        </div>

        <div className="z-10 flex flex-col items-center max-w-4xl w-full animate-[fadeIn_0.8s_ease-out] space-y-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#800000]/5 rounded-full blur-2xl transition-all duration-1000 group-hover:bg-[#D4AF37]/5"></div>
            <img 
              src="https://storage.googleapis.com/static.mira.ai/user_upload/20250221/1740118898145.png" 
              alt="Phishing Simulation Logo" 
              className="w-64 md:w-80 h-auto relative z-10 animate-float drop-shadow-xl"
            />
          </div>

          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-heading text-[#800000] tracking-tight uppercase">
                SETTING THE GROUND
              </h1>
              <h2 className="text-xl md:text-2xl font-heading text-gray-400 tracking-[0.2em] uppercase">
                Email Phishing in Real Life
              </h2>
            </div>
            
            <p className="max-w-2xl mx-auto text-gray-500 font-medium leading-relaxed text-sm md:text-base px-4">
              A comprehensive validation exercise. Master the art of detecting deception across 15 real-world scenarios designed to test your cybersecurity instincts.
            </p>

            <div className="pt-8">
              <button 
                onClick={startQuiz}
                className="bg-[#800000] text-white px-12 py-4 font-heading text-2xl transition-all hover:bg-black hover:scale-105 active:scale-95 shadow-xl group relative overflow-hidden rounded-sm"
              >
                <span className="relative z-10">VALIDATE MY SKILLS</span>
                <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        <footer className="fixed bottom-4 w-full text-center text-[9px] text-gray-300 font-bold uppercase tracking-[0.5em] pointer-events-none">
          © AI Engineering Team - 2025<br />
          <span className="opacity-30">Operational Awareness Assessment Module</span>
        </footer>
      </div>
    );
  }

  if (state.view === 'result') {
    const passed = state.score >= 1000;
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#800000" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-3xl w-full animate-[fadeIn_0.6s_ease-out]">
          <div className={`w-24 h-24 rounded-full border-[4px] ${passed ? 'border-green-500 text-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)]' : 'border-red-600 text-red-600 shadow-[0_0_30px_rgba(220,38,38,0.2)]'} flex items-center justify-center mb-8 animate-[bounceIn_0.8s_ease-out]`}>
             {passed ? (
               <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
             ) : (
               <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
             )}
          </div>

          <h1 className="text-4xl md:text-5xl font-heading text-[#800000] mb-2 tracking-wider uppercase">
            {passed ? 'SIMULATION VALIDATED' : 'SIMULATION FAILED'}
          </h1>
          <p className="text-[10px] text-gray-400 font-bold tracking-[0.3em] uppercase mb-10">Defense Validation Summary</p>
          
          <div className="bg-white border border-gray-100 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-8 md:p-12 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 mb-12 w-full relative group">
             <div className="absolute top-0 left-0 w-full h-1 bg-gray-50"></div>
             <div className="absolute top-0 left-0 h-1 bg-[#D4AF37] transition-all duration-[1.5s] ease-out" style={{width: `${(state.score/1500)*100}%`}}></div>
             
             <div className="text-center">
               <div className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-2">Efficiency</div>
               <div className={`text-5xl font-bold ${passed ? 'text-green-500' : 'text-red-600'} tabular-nums`}>{Math.round((state.score / 1500) * 100)}%</div>
             </div>
             <div className="hidden md:block w-[1px] h-16 bg-gray-100"></div>
             <div className="text-center">
               <div className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-2">Total Points</div>
               <div className="text-5xl font-bold text-[#D4AF37] tabular-nums">{state.score}</div>
             </div>
          </div>

          <button 
            onClick={restart}
            className="px-10 py-4 border-2 border-[#800000] text-[#800000] font-heading text-xl transition-all hover:bg-[#800000] hover:text-white active:scale-95 bg-white rounded-sm"
          >
            ↺ RESTART SIMULATION
          </button>
        </div>

        <footer className="fixed bottom-4 w-full text-center text-[9px] text-gray-300 font-bold uppercase tracking-[0.5em] pointer-events-none">
          © AI Engineering Team - 2025<br />
          <span className="opacity-30">Operational Awareness Assessment Module</span>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Quiz Header - Reduced Height */}
      <div className="fixed top-0 w-full bg-white border-b border-gray-200 z-50 h-16 flex flex-col shadow-sm">
        <div className="h-1 bg-gray-100 w-full overflow-hidden">
          <div className="h-full bg-[#D4AF37] transition-all duration-700 ease-in-out" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex-1 px-8 flex justify-between items-center">
          <div className="font-heading text-xl text-[#800000] tracking-widest">LEVEL {state.currentStep + 1}/15</div>
          <div className="flex items-center space-x-3 text-[#D4AF37]">
            <span className="text-base">🏆</span>
            <span className="font-heading text-2xl tracking-widest">{state.score} PTS</span>
          </div>
        </div>
      </div>

      <main className="flex-1 pt-24 pb-44 px-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl text-center space-y-10">
          <div className="space-y-2 animate-[fadeIn_0.4s_ease-out]">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.4em] block opacity-70">
              {currentQuestion.category}
            </span>
            <h2 className="text-2xl md:text-3xl font-heading text-[#800000] leading-snug max-w-2xl mx-auto uppercase">
              {currentQuestion.title}
            </h2>
          </div>

          <div className="w-full animate-[fadeIn_0.5s_ease-out_delay-100]">
            {currentQuestion.type === QuestionType.MCQ && (
              <div className="space-y-3 max-w-xl mx-auto">
                {currentQuestion.options?.map(opt => {
                  const isSelected = state.selectedOptionId === opt.id;
                  const isCorrect = state.isAnswered && opt.id === currentQuestion.correctOptionId;
                  const isWrong = state.isAnswered && isSelected && opt.id !== currentQuestion.correctOptionId;
                  
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt.id)}
                      disabled={state.isAnswered}
                      className={`w-full p-4 text-left border rounded-xl transition-all flex items-center justify-between group
                        ${isSelected ? 'border-[#800000] bg-white shadow-md' : 'border-gray-100 bg-white hover:border-gray-300'}
                        ${isCorrect ? '!border-green-500 !bg-green-50/20' : ''}
                        ${isWrong ? '!border-red-500 !bg-red-50/20' : ''}
                        ${state.isAnswered && !isSelected && !isCorrect ? 'opacity-40 grayscale-[0.5]' : ''}
                      `}
                    >
                      <span className="text-sm md:text-base font-medium text-gray-600 group-hover:text-gray-900">{opt.text}</span>
                      {isCorrect && <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px] shadow-sm">✓</div>}
                      {isWrong && <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] shadow-sm">✕</div>}
                    </button>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === QuestionType.TRUE_FALSE && (
              <div className="max-w-xl mx-auto">
                <div className="grid grid-cols-2 gap-6">
                  {['true', 'false'].map(val => {
                    const isSelected = state.selectedOptionId === val;
                    const isCorrect = state.isAnswered && val === currentQuestion.correctOptionId;
                    const isWrong = state.isAnswered && isSelected && val !== currentQuestion.correctOptionId;
                    
                    return (
                      <button
                        key={val}
                        onClick={() => handleSelect(val)}
                        disabled={state.isAnswered}
                        className={`flex flex-col items-center justify-center p-8 md:p-12 border rounded-2xl transition-all bg-white group
                          ${isSelected ? 'border-[#800000] shadow-lg' : 'border-gray-100 hover:border-gray-200'}
                          ${isCorrect ? '!border-green-500 !bg-green-50/40' : ''}
                          ${isWrong ? '!border-red-500 !bg-red-50/40' : ''}
                          ${state.isAnswered && !isSelected && !isCorrect ? 'opacity-40' : ''}
                        `}
                      >
                        <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center mb-6 transition-all
                          ${isSelected ? 'border-[#800000] text-[#800000] bg-[#800000]/5' : 'border-gray-100 text-gray-200 group-hover:text-gray-400'}`}>
                           {val === 'true' ? (
                             <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                           ) : (
                             <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                           )}
                        </div>
                        <span className="font-heading text-2xl tracking-widest uppercase">{val}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {currentQuestion.type === QuestionType.EMAIL_ID && (
              <div className="space-y-8">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden text-left mx-auto max-w-3xl flex flex-col">
                  <div className="bg-gray-50 px-5 py-2.5 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">Outlook Secure Sandbox</span>
                  </div>
                  <div className="p-5 border-b border-gray-100 space-y-2 bg-[#FAFBFC]">
                    <div className="flex items-center space-x-4">
                       <span className="text-[9px] font-bold text-gray-400 w-12 text-right uppercase tracking-wider">From</span>
                       <div className="bg-white px-3 py-1.5 border border-gray-100 text-[11px] font-bold text-gray-700 flex-1">
                         {currentQuestion.emailData?.from} <span className="text-gray-400 font-normal ml-2">&lt;{currentQuestion.emailData?.email}&gt;</span>
                       </div>
                    </div>
                    <div className="flex items-center space-x-4">
                       <span className="text-[9px] font-bold text-gray-400 w-12 text-right uppercase tracking-wider">Subject</span>
                       <div className="text-[11px] font-bold text-gray-900 flex-1 px-2">{currentQuestion.emailData?.subject}</div>
                    </div>
                  </div>
                  <div className="p-8 text-[13px] text-gray-700 leading-relaxed whitespace-pre-line bg-white min-h-[200px]">
                    {currentQuestion.emailData?.body}
                    <div className="mt-8">
                      <div className="inline-block text-blue-600 underline cursor-pointer relative group/link">
                        <span className="flex items-center space-x-3 bg-blue-50/30 px-4 py-2 rounded-lg border border-blue-100 transition-all hover:bg-blue-100/30">
                          <span className="font-semibold text-sm">{currentQuestion.emailData?.linkText}</span>
                        </span>
                        <div className="absolute -top-10 left-0 bg-gray-900 text-white px-3 py-1.5 rounded text-[10px] opacity-0 group-hover/link:opacity-100 transition-all z-50 shadow-xl font-mono">
                          {currentQuestion.emailData?.hoverUrl}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  {['phishing', 'legitimate'].map(type => {
                    const isSelected = state.selectedOptionId === type;
                    const isCorrect = state.isAnswered && type === currentQuestion.correctOptionId;
                    const isWrong = state.isAnswered && isSelected && type !== currentQuestion.correctOptionId;
                    
                    return (
                      <button
                        key={type}
                        onClick={() => handleSelect(type)}
                        disabled={state.isAnswered}
                        className={`flex items-center justify-center space-x-3 p-4 border rounded-xl transition-all bg-white
                          ${isSelected ? 'border-[#800000] shadow-md' : 'border-gray-100 hover:border-gray-200'}
                          ${isCorrect ? '!border-green-500 !bg-green-50/50' : ''}
                          ${isWrong ? '!border-red-500 !bg-red-50/50' : ''}
                          ${state.isAnswered && !isSelected && !isCorrect ? 'opacity-40' : ''}
                        `}
                      >
                        <span className="text-xl">{type === 'phishing' ? '🛡️' : '✅'}</span>
                        <span className="font-heading text-sm tracking-widest uppercase text-gray-700">{type}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {!state.isAnswered && (
            <div className="pt-6">
              <button 
                onClick={submitAnswer}
                disabled={!state.selectedOptionId}
                className={`px-16 py-4 font-heading text-2xl tracking-widest transition-all shadow-lg active:scale-95 uppercase rounded-sm
                  ${state.selectedOptionId 
                    ? 'bg-[#800000] text-white hover:bg-black' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                `}
              >
                Submit Response
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Floating Feedback Banner - Tighter and Cleaner */}
      {state.isAnswered && (
        <div className="fixed bottom-0 left-0 w-full p-6 z-[100] animate-[slideUp_0.4s_ease-out]">
          <div className={`max-w-4xl mx-auto bg-white border-2 rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col md:flex-row items-center p-6 md:p-8 gap-8 relative
            ${state.isCorrect ? 'border-green-500/30' : 'border-red-700/30'}`}>
            
            <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0
              ${state.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {state.isCorrect ? (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              )}
            </div>

            <div className="flex-1 text-center md:text-left space-y-1">
              <h4 className={`font-heading text-2xl tracking-widest ${state.isCorrect ? 'text-green-800' : 'text-red-900'}`}>
                {state.isCorrect ? 'SUCCESS' : 'THREAT DETECTED'}
              </h4>
              <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed italic">
                "{currentQuestion.explanation}"
              </p>
            </div>

            <button 
              onClick={nextQuestion}
              className="bg-[#800000] hover:bg-black text-white px-10 py-4 font-heading text-xl flex items-center space-x-3 transition-all active:scale-95 shadow-lg group rounded-sm"
            >
              <span>CONTINUE</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      )}

      <footer className="fixed bottom-4 w-full text-center text-[9px] text-gray-300 font-bold uppercase tracking-[0.5em] pointer-events-none">
        © AI Engineering Team - 2025<br />
        <span className="opacity-30">Operational Awareness Assessment Module</span>
      </footer>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes floating {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: floating 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
