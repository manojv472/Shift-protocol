
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Home, 
  Calendar, 
  Dumbbell, 
  Activity, 
  BookOpen, 
  Settings as SettingsIcon,
  ChevronRight,
  Plus,
  Moon,
  Zap,
  Coffee,
  CheckCircle2,
  MoreVertical,
  ArrowRight,
  FileText,
  Download,
  Upload,
  RefreshCcw,
  Search,
  Timer,
  X,
  Info,
  User,
  Utensils,
  Trash2,
  Book,
  ArrowLeft,
  Clock,
  Flame,
  Target
} from 'lucide-react';
import { ShiftType, AppState, DailyLog, TrainingLog } from './types';
import { SHIFT_SCHEDULES, WORKOUTS, LIBRARY_SECTIONS, WARMUP_PROTOCOL } from './data/content';

// --- Utilities ---

const formatTime = (time24: string, format: '12h' | '24h'): string => {
  if (format === '24h') return time24;
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const getAutoShift = (): ShiftType => {
  const day = new Date().getDay();
  const pattern: ShiftType[] = ['B', 'B', 'A', 'A', 'C', 'C', 'OFF'];
  return pattern[day];
};

// --- Components ---

const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void; stagger?: number }> = ({ children, className, onClick, stagger }) => (
  <div 
    onClick={onClick}
    style={stagger !== undefined ? { animationDelay: `${stagger * 0.05}s` } : {}}
    className={`bg-[#0F1623] border border-[#1B2A22] rounded-2xl overflow-hidden active-press ${stagger !== undefined ? 'stagger-item' : ''} ${className}`}
  >
    {children}
  </div>
);

const Badge: React.FC<{ children: React.ReactNode; color?: string; active?: boolean }> = ({ children, color = 'var(--neon-green)', active = true }) => (
  <span 
    className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.1em] border transition-all duration-300 ${active ? 'border-current' : 'border-gray-700 text-gray-700'}`} 
    style={active ? { color } : {}}
  >
    {children}
  </span>
);

const Button: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; 
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, variant = 'primary', className = '', disabled }) => {
  const variants = {
    primary: 'bg-[#00FF41] text-[#0D1117] font-black shadow-[0_0_20px_rgba(0,255,65,0.15)] hover:brightness-110 active:scale-90',
    secondary: 'bg-transparent border border-[#00FF41] text-[#00FF41] font-bold hover:bg-[#00FF41]/10 active:scale-90',
    danger: 'bg-transparent border border-[#FF2E88] text-[#FF2E88] font-bold hover:bg-[#FF2E88]/10 active:scale-90',
    ghost: 'bg-transparent text-[#E6FBEA] font-medium hover:bg-white/5 active:scale-90',
  };
  return (
    <button 
      disabled={disabled}
      onClick={onClick} 
      className={`px-5 py-3 rounded-2xl transition-all duration-250 active-press disabled:opacity-50 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// --- Screens ---

const Dashboard: React.FC<{ state: AppState; toggleTask: (idx: number) => void; updateShift: (s: ShiftType) => void; setTab: (t: string) => void }> = ({ state, toggleTask, updateShift, setTab }) => {
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);
  const schedule = SHIFT_SCHEDULES[state.currentShift];
  const completedToday = state.completedTasks[today] || [];
  
  const completionRate = schedule ? Math.round((completedToday.length / schedule.length) * 100) : 0;

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-start animate-spring-up" style={{ animationDelay: '0.04s' }}>
        <div>
          <h1 className="text-2xl font-black neon-text uppercase leading-none italic">
            LIVE: <span className="text-[#00FF41]">{state.currentShift}</span>
          </h1>
          <p className="text-gray-500 text-[10px] mt-2 uppercase tracking-[0.25em] font-bold font-mono">Terminal Input Activated</p>
        </div>
        <div className="w-12 h-12 bg-[#00FF41]/10 border border-[#00FF41]/30 rounded-2xl flex items-center justify-center neon-glow animate-glow-pulse">
          <User className="text-[#00FF41] w-6 h-6" />
        </div>
      </header>

      <Card className="p-6 bg-gradient-to-br from-[#0F1623] to-[#121c2e] border-[#00FF41]/15 animate-spring-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex justify-between items-center mb-6">
           <div className="flex items-center gap-2">
             <Target className="text-[#00D9FF]" size={16}/>
             <span className="text-[10px] font-black text-[#00D9FF] uppercase tracking-[0.3em]">Operational Readiness</span>
           </div>
           <span className="font-mono text-sm text-[#00FF41] font-bold">{completionRate}%</span>
        </div>
        <div className="relative w-full h-4 bg-[#0D1117] rounded-full overflow-hidden mb-6 border border-[#1B2A22]">
          <div 
            className="absolute top-0 left-0 h-full bg-[#00FF41] transition-all duration-1000 ease-[var(--spring-easing)] shimmer"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-3 border-t border-[#1B2A22] pt-6">
           <div className="text-center">
             <div className="text-base font-mono font-bold text-white">31</div>
             <div className="text-[9px] text-gray-600 uppercase font-black tracking-widest mt-1">Age</div>
           </div>
           <div className="text-center border-x border-[#1B2A22]">
             <div className="text-base font-mono font-bold text-white">75.2</div>
             <div className="text-[9px] text-gray-600 uppercase font-black tracking-widest mt-1">Mass</div>
           </div>
           <div className="text-center">
             <div className="text-base font-mono font-bold text-white">{completedToday.length}/{schedule?.length || 0}</div>
             <div className="text-[9px] text-gray-600 uppercase font-black tracking-widest mt-1">Ops</div>
           </div>
        </div>
      </Card>

      <section>
        <h2 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-4 animate-spring-slide" style={{ animationDelay: '0.15s' }}>Fast Access</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card stagger={4} className="p-5 flex flex-col items-center justify-center gap-3 text-center border-l-4 border-l-[#00FF41] group" onClick={() => setTab('train')}>
            <Dumbbell className="text-[#00FF41] group-hover:scale-110 transition-transform duration-300 ease-[var(--spring-easing)]" size={24} />
            <span className="text-xs font-bold uppercase tracking-tight">Strength OS</span>
          </Card>
          <Card stagger={5} className="p-5 flex flex-col items-center justify-center gap-3 text-center border-l-4 border-l-[#00D9FF] group" onClick={() => setTab('track')}>
            <Activity className="text-[#00D9FF] group-hover:scale-110 transition-transform duration-300 ease-[var(--spring-easing)]" size={24} />
            <span className="text-xs font-bold uppercase tracking-tight">Bio-Metrics</span>
          </Card>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4 animate-spring-slide" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Daily Protocol</h2>
          <select 
            value={state.currentShift} 
            onChange={(e) => updateShift(e.target.value as ShiftType)}
            className="bg-[#0D1117] border border-[#1B2A22] text-[10px] text-[#00FF41] rounded-xl px-3 py-1.5 outline-none font-bold font-mono uppercase tracking-widest active:scale-95 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          >
            <option value="A">SHIFT-A</option>
            <option value="B">SHIFT-B</option>
            <option value="C">SHIFT-C</option>
            <option value="OFF">WEEK OFF</option>
          </select>
        </div>
        
        {schedule && schedule.length > 0 ? (
          <div className="space-y-4">
            {schedule.map((item, i) => {
              const isCompleted = completedToday.includes(i);
              return (
                <Card 
                  key={i} 
                  stagger={i + 8}
                  onClick={() => toggleTask(i)}
                  className={`p-5 flex gap-6 items-center transition-all duration-500 ease-[var(--spring-easing)] ${isCompleted ? 'opacity-30 grayscale-[0.7] scale-[0.98]' : 'opacity-100 scale-100'}`}
                >
                  <div className="w-24 shrink-0">
                     <div className={`font-mono text-xs font-bold transition-colors ${isCompleted ? 'text-gray-600' : 'text-[#00D9FF]'}`}>
                       {formatTime(item.time, state.settings.timeFormat)}
                     </div>
                     {item.duration !== '-' && (
                       <div className="text-[9px] text-gray-600 font-bold uppercase mt-1 flex items-center gap-1.5 font-mono">
                         <Clock size={10} /> {item.duration}
                       </div>
                     )}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-bold tracking-tight transition-all ${isCompleted ? 'text-gray-600 line-through' : 'text-white'}`}>
                      {item.activity}
                    </div>
                    {!isCompleted && item.notes && (
                      <div className="text-[10px] text-gray-500 leading-relaxed mt-1 font-medium italic opacity-70">{item.notes}</div>
                    )}
                  </div>
                  {isCompleted && <CheckCircle2 size={20} className="text-[#00FF41] animate-in zoom-in duration-500 ease-[var(--spring-easing)]" />}
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-16 text-center border-dashed border-2 border-[#1B2A22] animate-spring-up" style={{ animationDelay: '0.28s' }}>
            <Moon className="mx-auto text-[#00D9FF] mb-4 opacity-40 animate-pulse" size={40} />
            <div className="text-gray-400 italic text-[11px] font-black uppercase tracking-widest">Protocol Reset</div>
            <p className="text-[10px] text-gray-600 mt-3 font-medium">Sacred rest cycle initiated.</p>
          </Card>
        )}
      </section>
    </div>
  );
};

const Shifts: React.FC<{ state: AppState }> = ({ state }) => {
  const [activeShift, setActiveShift] = useState<ShiftType>(state.currentShift);

  return (
    <div className="space-y-8">
      <header className="animate-spring-up" style={{ animationDelay: '0.04s' }}>
        <h1 className="text-3xl font-black mb-2 uppercase italic leading-none">Architect</h1>
        <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold font-mono">Shift Structure v1.2</p>
      </header>

      <div className="flex bg-[#0F1623] p-1.5 rounded-2xl border border-[#1B2A22] animate-spring-up shadow-inner" style={{ animationDelay: '0.08s' }}>
        {(['A', 'B', 'C', 'OFF'] as ShiftType[]).map(s => (
          <button
            key={s}
            onClick={() => setActiveShift(s)}
            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black transition-all duration-300 uppercase tracking-widest font-mono relative overflow-hidden active-press ${activeShift === s ? 'bg-[#00FF41] text-[#0D1117] shadow-[0_0_15px_rgba(0,255,65,0.3)] z-10' : 'text-gray-600 hover:text-gray-400'}`}
          >
            {s === 'OFF' ? 'OFF' : s}
          </button>
        ))}
      </div>

      <div className="space-y-4" key={activeShift}>
        {SHIFT_SCHEDULES[activeShift].map((item, i) => {
          const isSleep = item.activity.toLowerCase().includes('sleep') || item.activity.toLowerCase().includes('wind-down') || item.activity.toLowerCase().includes('nap');
          const isWork = item.activity.toLowerCase().includes('work');
          const isFood = item.activity.toLowerCase().includes('meal') || item.activity.toLowerCase().includes('cook');
          const isStudy = item.activity.toLowerCase().includes('study') || item.activity.toLowerCase().includes('read');
          
          return (
            <Card 
              key={`${activeShift}-${i}`} 
              stagger={i} 
              className={`p-5 flex gap-6 border-l-4 transition-all duration-500 ease-[var(--spring-easing)] hover:translate-x-2 animate-spring-slide ${isSleep ? 'border-l-[#00D9FF]' : isWork ? 'border-l-[#FF2E88]' : isFood ? 'border-l-[#00FF41]' : isStudy ? 'border-l-[#FFD700]' : 'border-l-gray-700'}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex flex-col items-center justify-center w-28 border-r border-[#1B2A22] pr-6">
                <div className="font-mono text-xs text-[#00D9FF] font-bold">{formatTime(item.time, state.settings.timeFormat)}</div>
                <div className="text-[10px] text-gray-600 font-bold uppercase mt-2 flex items-center gap-1.5 font-mono">
                  <Clock size={10} /> {item.duration}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-2">
                   {isFood && <Utensils size={12} className="text-[#00FF41] animate-bounce" />}
                   {isStudy && <Book size={12} className="text-[#FFD700] animate-pulse" />}
                   <div className="text-sm font-black text-[#E6FBEA] uppercase tracking-tight leading-tight">{item.activity}</div>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed font-medium">{item.notes}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const Training: React.FC<{ state: AppState; onLog: (log: TrainingLog) => void }> = ({ state, onLog }) => {
  const [session, setSession] = useState<{ workoutId: string; startTime: number; progress: any[] } | null>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<'warmup' | 'conditioning' | null>(null);

  useEffect(() => {
    let interval: any;
    if (timer !== null && timer > 0) {
      interval = setInterval(() => setTimer(t => (t !== null ? t - 1 : null)), 1000);
    } else if (timer === 0) {
      setTimer(null);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const startWorkout = (id: string) => {
    const workout = WORKOUTS[id];
    if (!workout) return;
    setSession({
      workoutId: id,
      startTime: Date.now(),
      progress: workout.exercises.map(ex => ({
        exerciseId: ex.id,
        sets: Array(ex.sets).fill(0).map(() => ({ weight: 0, reps: 0, completed: false }))
      }))
    });
  };

  const finishWorkout = () => {
    if (!session) return;
    const log: TrainingLog = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      workoutId: session.workoutId,
      exercises: session.progress
    };
    onLog(log);
    setSession(null);
  };

  if (session) {
    const workout = WORKOUTS[session.workoutId];
    return (
      <div className="space-y-8 animate-spring-up duration-600">
        <header className="sticky top-0 bg-[#0D1117]/95 backdrop-blur-2xl pt-4 pb-3 z-10 border-b border-[#1B2A22] -mx-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button onClick={() => setSession(null)} className="p-2 text-gray-500 hover:text-white transition-colors active:scale-75 bg-white/5 rounded-xl duration-300 ease-[var(--spring-easing)]">
              <ArrowLeft size={22} />
            </button>
            <div>
              <h1 className="text-sm font-black text-[#00FF41] uppercase tracking-tighter italic">{workout.name}</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black font-mono">In-Progress</p>
            </div>
          </div>
          <Button variant="danger" className="py-2 px-4 text-[10px] h-9 uppercase font-black" onClick={finishWorkout}>EXTRACT</Button>
        </header>

        {timer !== null && (
          <div className="fixed top-24 right-4 z-[60] bg-[#00D9FF] text-[#0D1117] font-black px-5 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-spring-slide font-mono text-sm border-2 border-[#0D1117] neon-glow">
            <Timer size={18} className="animate-spin duration-[3s] linear infinite" /> {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
          </div>
        )}

        <div className="space-y-10">
          {workout.exercises.map((ex, exIdx) => (
            <div key={ex.id} className="space-y-4 animate-spring-up" style={{ animationDelay: `${exIdx * 0.08}s` }}>
              <div className="flex justify-between items-end border-b-2 border-[#1B2A22] pb-2">
                <h3 className="font-black text-white text-sm uppercase italic tracking-tight">{ex.name}</h3>
                <span className="text-[10px] text-[#00D9FF] font-mono font-bold tracking-widest">RPE: {ex.rpe}</span>
              </div>
              <Card className="divide-y divide-[#1B2A22] bg-[#0F1623]/40 shadow-inner">
                {session.progress[exIdx].sets.map((set: any, setIdx: number) => (
                  <div key={setIdx} className={`p-4 flex items-center gap-6 transition-all duration-400 ease-[var(--spring-easing)] ${set.completed ? 'bg-[#00FF41]/5 opacity-60' : ''}`}>
                    <div className="w-8 h-8 rounded-xl bg-[#1B2A22] flex items-center justify-center text-xs font-mono font-bold text-gray-500">{setIdx + 1}</div>
                    <div className="flex-1 grid grid-cols-2 gap-6">
                      <div className="relative">
                        <input 
                          type="number" 
                          placeholder="00" 
                          value={set.weight || ''}
                          onChange={(e) => {
                            const newProgress = [...session.progress];
                            newProgress[exIdx].sets[setIdx].weight = parseFloat(e.target.value);
                            setSession({...session, progress: newProgress});
                          }}
                          className="w-full bg-transparent border-b-2 border-[#1B2A22] text-sm text-center py-2 outline-none focus:border-[#00FF41] font-mono font-bold transition-all"
                        />
                        <span className="absolute -right-2 bottom-2 text-[8px] text-gray-700 font-black uppercase tracking-widest">KG</span>
                      </div>
                      <div className="relative">
                        <input 
                          type="number" 
                          placeholder="00" 
                          value={set.reps || ''}
                          onChange={(e) => {
                            const newProgress = [...session.progress];
                            newProgress[exIdx].sets[setIdx].reps = parseInt(e.target.value);
                            setSession({...session, progress: newProgress});
                          }}
                          className="w-full bg-transparent border-b-2 border-[#1B2A22] text-sm text-center py-2 outline-none focus:border-[#00FF41] font-mono font-bold transition-all"
                        />
                        <span className="absolute -right-2 bottom-2 text-[8px] text-gray-700 font-black uppercase tracking-widest">REPS</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        const newProgress = [...session.progress];
                        const isCompleting = !newProgress[exIdx].sets[setIdx].completed;
                        newProgress[exIdx].sets[setIdx].completed = isCompleting;
                        setSession({...session, progress: newProgress});
                        if (isCompleting) setTimer(parseInt(ex.rest) || 90);
                      }}
                      className={`p-3 rounded-2xl border-2 transition-all duration-300 active:scale-75 ${set.completed ? 'bg-[#00FF41] text-[#0D1117] border-[#00FF41] neon-glow' : 'border-[#1B2A22] text-gray-700'}`}
                    >
                      <CheckCircle2 size={22} className={set.completed ? 'scale-110' : ''} />
                    </button>
                  </div>
                ))}
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="animate-spring-up" style={{ animationDelay: '0.04s' }}>
        <h1 className="text-3xl font-black mb-2 uppercase italic leading-none tracking-normal">Volume</h1>
        <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold font-mono">Hypertrophy Engine</p>
      </header>

      <section className="space-y-4">
        {Object.values(WORKOUTS).map((w, i) => (
          <Card key={w.id} stagger={i + 2} className="p-6 flex justify-between items-center group border-l-4 border-l-transparent hover:border-l-[#00FF41] bg-gradient-to-r from-transparent to-[#0F1623]/40 animate-spring-slide" onClick={() => startWorkout(w.id)}>
            <div>
              <h3 className="font-black text-[#00FF41] group-hover:neon-text transition-all uppercase tracking-tight text-base italic">{w.name}</h3>
              <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-[0.15em] font-bold font-mono italic">{w.exercises.length} Exercises • Home Kit</p>
            </div>
            <ArrowRight className="text-gray-700 group-hover:text-[#00FF41] transition-transform duration-300 ease-[var(--spring-easing)] group-hover:translate-x-3" size={24} />
          </Card>
        ))}
      </section>

      <div className="grid grid-cols-2 gap-4 animate-spring-up" style={{ animationDelay: '0.3s' }}>
        <Card className="p-6 bg-gradient-to-br from-[#00D9FF]/10 to-transparent border-[#00D9FF]/30 active-press" onClick={() => setActiveModal('warmup')}>
          <h4 className="text-[11px] font-bold text-[#00D9FF] mb-2 uppercase tracking-widest font-mono">WARM-UP</h4>
          <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em]">Mobility Loop</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-[#FF2E88]/10 to-transparent border-[#FF2E88]/30 active-press" onClick={() => setActiveModal('conditioning')}>
          <h4 className="text-[11px] font-bold text-[#FF2E88] mb-2 uppercase tracking-widest font-mono">HIIT-CORE</h4>
          <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em]">Engine Work</p>
        </Card>
      </div>

      {activeModal && (
        <div className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-6 backdrop-blur-3xl animate-in fade-in zoom-in duration-500 ease-[var(--spring-easing)]">
           <Card className="w-full max-w-sm border-[#00FF41]/40 bg-[#0D1117] shadow-[0_0_80px_rgba(0,255,65,0.2)]">
             <div className="p-5 border-b border-[#1B2A22] flex justify-between items-center bg-[#0F1623]">
               <h3 className="font-black text-[#00FF41] uppercase text-xs tracking-widest">{activeModal === 'warmup' ? 'WARM-UP' : 'CONDITIONING'}</h3>
               <button onClick={() => setActiveModal(null)} className="p-2 text-gray-500 active:scale-50 transition-all bg-white/5 rounded-xl duration-300"><X size={24}/></button>
             </div>
             <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto no-scrollbar">
               {activeModal === 'warmup' ? (
                 WARMUP_PROTOCOL.map((item, i) => (
                   <div key={i} className="flex gap-4 text-xs text-gray-400 font-semibold uppercase tracking-tight leading-relaxed animate-spring-slide" style={{ animationDelay: `${i * 0.05}s` }}>
                     <span className="text-[#00FF41] font-mono font-bold">{i + 1}.</span>
                     <span>{item}</span>
                   </div>
                 ))
               ) : (
                 <div className="space-y-5">
                   <p className="text-xs text-gray-500 italic font-bold leading-relaxed opacity-60 animate-spring-up">"Density training. Minimal rest between cycles."</p>
                   <div className="p-4 bg-white/5 rounded-2xl border border-[#1B2A22] animate-spring-up" style={{ animationDelay: '0.08s' }}>
                     <h5 className="text-[10px] font-bold text-[#FF2E88] uppercase mb-2 tracking-widest font-mono underline">DB Thrusters</h5>
                     <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">20s ON / 10s OFF x 8 rounds</p>
                   </div>
                   <div className="p-4 bg-white/5 rounded-2xl border border-[#1B2A22] animate-spring-up" style={{ animationDelay: '0.12s' }}>
                     <h5 className="text-[10px] font-bold text-[#00D9FF] uppercase mb-2 tracking-widest font-mono underline">Barbell Complexes</h5>
                     <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Clean-Press-Row-RDL (5 rounds)</p>
                   </div>
                 </div>
               )}
               <Button className="w-full mt-6 text-xs uppercase font-black py-4" onClick={() => setActiveModal(null)}>CLOSE TERMINAL</Button>
             </div>
           </Card>
        </div>
      )}
    </div>
  );
};

const Tracking: React.FC<{ logs: DailyLog[]; onSave: (log: DailyLog) => void }> = ({ logs, onSave }) => {
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);
  const existingLog = logs.find(l => l.date === today);
  const [form, setForm] = useState<DailyLog>(existingLog || {
    date: today,
    shift: getAutoShift(),
    sleepHours: 0,
    sleepQuality: 7,
    energy: 7,
    mood: 7,
    proteinHit: false,
    hydration: false,
    caffeineCutoff: false,
    habits: { noAlcohol: true, noNicotine: true, cleanPMO: true }
  });

  return (
    <div className="space-y-8">
      <header className="animate-spring-up" style={{ animationDelay: '0.04s' }}>
        <h1 className="text-3xl font-black mb-2 uppercase italic leading-none">Status</h1>
        <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold font-mono">Metric Capture v4.2</p>
      </header>

      <Card className="p-6 space-y-8 bg-[#0F1623]/80 border-[#1B2A22] animate-spring-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex justify-between items-center border-b border-[#1B2A22] pb-6">
          <div className="flex items-center gap-3">
            <Flame className="text-[#FF2E88] animate-pulse" size={18}/>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] font-mono">Capture Phase</div>
          </div>
          <Badge active={true}>{form.date}</Badge>
        </div>
        
        <div className="flex justify-between items-center group">
          <span className="text-sm font-bold text-gray-300 uppercase tracking-[0.15em] group-hover:text-[#00FF41] transition-colors duration-300">Sleep Duration</span>
          <div className="flex items-center gap-3">
            <input 
              type="number" 
              step="0.5"
              value={form.sleepHours || ''} 
              onChange={e => setForm({...form, sleepHours: parseFloat(e.target.value) || 0})}
              className="w-20 bg-[#0D1117] border-2 border-[#1B2A22] rounded-xl px-2 py-2 text-center font-mono text-[#00FF41] font-bold text-base focus:border-[#00FF41] outline-none transition-all shadow-inner"
            />
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest font-mono">HRS</span>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex justify-between text-[11px] text-gray-500 font-bold uppercase tracking-[0.3em] font-mono">
            <span>Vital Energy</span>
            <span className="text-[#00D9FF] font-bold animate-pulse">{form.energy}/10</span>
          </div>
          <input 
            type="range" min="1" max="10" 
            value={form.energy} 
            onChange={e => setForm({...form, energy: parseInt(e.target.value)})}
            className="w-full accent-[#00D9FF] h-2 bg-[#0D1117] rounded-full appearance-none cursor-pointer border border-[#1B2A22] transition-all" 
          />
        </div>

        <div className="grid grid-cols-1 gap-3 pt-6 border-t border-[#1B2A22]">
          {[
            { label: 'Protein Targeted', key: 'proteinHit', icon: <Zap size={20}/> },
            { label: 'Deep Hydration (3L+)', key: 'hydration', icon: <Activity size={20}/> },
            { label: 'Caffeine Protocol', key: 'caffeineCutoff', icon: <Coffee size={20}/> },
          ].map((item, i) => {
            const active = form[item.key as keyof DailyLog];
            return (
              <button 
                key={item.key} 
                onClick={() => setForm({...form, [item.key]: !active})}
                className={`p-5 rounded-2xl border-2 flex items-center justify-between transition-all duration-500 ease-[var(--spring-easing)] animate-spring-slide ${active ? 'bg-[#00FF41]/10 border-[#00FF41]/40 text-[#00FF41] neon-glow scale-[1.02]' : 'bg-transparent border-[#1B2A22] text-gray-700'}`}
                style={{ animationDelay: `${0.2 + i * 0.08}s` }}
              >
                <div className="flex items-center gap-4">
                  {item.icon}
                  <span className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${active ? 'text-white' : ''}`}>{item.label}</span>
                </div>
                {active ? <CheckCircle2 size={24} className="animate-in zoom-in duration-500 ease-[var(--spring-easing)]" /> : <div className="w-6 h-6 border-2 border-gray-800 rounded-full"/>}
              </button>
            );
          })}
        </div>
      </Card>

      <Button className="w-full text-sm font-black uppercase tracking-[0.3em] py-5 mt-4 animate-spring-up" style={{ animationDelay: '0.5s' }} onClick={() => { onSave(form); alert('Metrics Synchronized to Core'); }}>
        SYNC DATA
      </Button>
    </div>
  );
};

const Settings: React.FC<{ state: AppState; dispatch: (a: any) => void; close: () => void }> = ({ state, dispatch, close }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0D1117] p-8 overflow-y-auto animate-in slide-in-from-right duration-500 ease-[var(--spring-easing)] no-scrollbar">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black neon-text uppercase tracking-tight italic">System</h1>
        <button onClick={close} className="p-3 text-gray-500 bg-[#0F1623] rounded-2xl active:scale-50 transition-all border border-[#1B2A22] duration-300"><X size={28}/></button>
      </header>

      <div className="space-y-10">
        <section className="animate-spring-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-[11px] uppercase tracking-[0.4em] text-gray-600 font-bold mb-5 font-mono">UI Preference</h2>
          <Card className="p-6 space-y-8 bg-[#0F1623]/80">
             <div className="flex justify-between items-center">
               <span className="text-sm font-bold uppercase tracking-widest">Neon Saturation</span>
               <input 
                 type="range" min="0" max="100" 
                 value={state.settings.themeIntensity} 
                 onChange={(e) => dispatch({ type: 'UPDATE_GLOW', payload: parseInt(e.target.value) })}
                 className="accent-[#00FF41] w-36 transition-all" 
               />
             </div>
             <div className="flex justify-between items-center">
               <span className="text-sm font-bold uppercase tracking-widest">Chronos Format</span>
               <div className="flex gap-3">
                 <button onClick={() => dispatch({type: 'UPDATE_TIME_FORMAT', payload: '12h'})} className="active:scale-75 transition-all duration-300">
                   <Badge active={state.settings.timeFormat === '12h'}>12H</Badge>
                 </button>
                 <button onClick={() => dispatch({type: 'UPDATE_TIME_FORMAT', payload: '24h'})} className="active:scale-75 transition-all duration-300">
                   <Badge active={state.settings.timeFormat === '24h'}>24H</Badge>
                 </button>
               </div>
             </div>
          </Card>
        </section>

        <section className="animate-spring-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-[11px] uppercase tracking-[0.4em] text-gray-600 font-bold mb-5 font-mono">Core Storage</h2>
          <div className="grid grid-cols-1 gap-4">
             <Button variant="secondary" className="justify-center text-xs uppercase font-black py-4" onClick={() => alert('Local Export Success')}>
               <Download size={20} className="animate-bounce" /> EXPORT_DB
             </Button>
             <Button variant="danger" className="justify-center text-xs uppercase font-black py-4" onClick={() => { if(confirm("Initiate Wipe?")) dispatch({type:'RESET'}); }}>
               <RefreshCcw size={20} className="hover:rotate-180 transition-transform duration-700" /> FACTORY_RESET
             </Button>
          </div>
        </section>
        
        <div className="text-center pt-16 text-gray-800 font-mono text-[10px] uppercase tracking-[0.5em] animate-pulse">
          BUILD-REL: v1.8.5-protocol
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSettings, setShowSettings] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('shift_protocol_v1_8_5');
    if (saved) return JSON.parse(saved);
    return {
      logs: [],
      trainingLogs: [],
      completedTasks: {},
      currentShift: getAutoShift(),
      settings: {
        themeIntensity: 100,
        textSize: 'medium',
        timeFormat: '12h'
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('shift_protocol_v1_8_5', JSON.stringify(state));
    document.documentElement.style.setProperty('--glow-strength', (state.settings.themeIntensity / 100).toString());
  }, [state]);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  const dispatch = (action: { type: string; payload?: any }) => {
    const today = new Date().toISOString().split('T')[0];
    switch (action.type) {
      case 'UPDATE_SHIFT': setState(s => ({ ...s, currentShift: action.payload })); break;
      case 'TOGGLE_TASK': {
        const idx = action.payload;
        const currentCompleted = state.completedTasks[today] || [];
        const newCompleted = currentCompleted.includes(idx) 
          ? currentCompleted.filter(i => i !== idx)
          : [...currentCompleted, idx];
        setState(s => ({ 
          ...s, 
          completedTasks: { ...s.completedTasks, [today]: newCompleted } 
        }));
        break;
      }
      case 'SAVE_LOG': setState(s => ({ ...s, logs: [...s.logs.filter(l => l.date !== action.payload.date), action.payload] })); break;
      case 'LOG_WORKOUT': setState(s => ({ ...s, trainingLogs: [...s.trainingLogs, action.payload] })); break;
      case 'UPDATE_GLOW': setState(s => ({ ...s, settings: { ...s.settings, themeIntensity: action.payload } })); break;
      case 'UPDATE_TIME_FORMAT': setState(s => ({ ...s, settings: { ...s.settings, timeFormat: action.payload } })); break;
      case 'RESET': setState({ logs: [], trainingLogs: [], completedTasks: {}, currentShift: getAutoShift(), settings: { themeIntensity: 100, textSize: 'medium', timeFormat: '12h' } }); break;
      case 'IMPORT': setState(action.payload); break;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'CMD', icon: Home },
    { id: 'shifts', label: 'OPS', icon: Calendar },
    { id: 'train', label: 'KIN', icon: Dumbbell },
    { id: 'track', label: 'BIO', icon: Activity },
    { id: 'library', label: 'DAT', icon: BookOpen },
  ];

  return (
    <div className="max-w-md mx-auto h-screen relative flex flex-col px-5 pt-8 bg-[#0D1117] text-white overflow-hidden selection:bg-[#00FF41] selection:text-[#0D1117]">
      <div className="flex justify-between items-center mb-10 relative z-10 animate-in slide-in-from-top duration-700 ease-[var(--spring-easing)]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#00FF41] rounded-2xl flex items-center justify-center font-black text-[#0D1117] transform animate-float text-lg border-2 border-[#00FF41]/30 shadow-[0_0_20px_rgba(0,255,65,0.2)]">SP</div>
          <div className="flex flex-col">
            <span className="font-black text-2xl tracking-tighter leading-none neon-text uppercase italic">SHIFT PROTOCOL</span>
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#00D9FF] mt-2 font-mono">System Core</span>
          </div>
        </div>
        <button onClick={() => setShowSettings(true)} className="p-3.5 text-gray-500 hover:text-white transition-all bg-[#0F1623] rounded-2xl border border-[#1B2A22] active:scale-75 hover:border-[#00FF41]/40 shadow-xl duration-300">
          <SettingsIcon size={20} className="hover:rotate-45 transition-transform duration-500" />
        </button>
      </div>

      <main 
        ref={mainRef}
        className="flex-1 overflow-y-auto no-scrollbar scroll-container relative z-10"
      >
        <div key={activeTab} className="pb-32 animate-spring-up">
          {activeTab === 'dashboard' && (
            <Dashboard 
              state={state} 
              toggleTask={(idx) => dispatch({type: 'TOGGLE_TASK', payload: idx})}
              updateShift={(s) => dispatch({type: 'UPDATE_SHIFT', payload: s})} 
              setTab={setActiveTab} 
            />
          )}
          {activeTab === 'shifts' && <Shifts state={state} />}
          {activeTab === 'train' && <Training state={state} onLog={(l) => dispatch({type: 'LOG_WORKOUT', payload: l})} />}
          {activeTab === 'track' && <Tracking logs={state.logs} onSave={(l) => dispatch({type: 'SAVE_LOG', payload: l})} />}
          {activeTab === 'library' && (
             <div className="space-y-8">
               <header className="animate-spring-up" style={{ animationDelay: '0.04s' }}>
                 <h1 className="text-3xl font-black mb-2 uppercase italic leading-none">Archives</h1>
                 <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold font-mono">Knowledge Protocol</p>
               </header>
               <div className="space-y-6">
                 {LIBRARY_SECTIONS.map((section, i) => (
                   <Card key={section.id} stagger={i + 2} className="p-6 bg-[#0F1623]/60 hover:bg-[#0F1623]/80 transition-all border-[#1B2A22] animate-spring-up">
                      <h3 className="font-black text-[#00FF41] mb-4 uppercase text-[11px] tracking-widest">{section.title}</h3>
                      <div className="text-[12px] leading-relaxed text-gray-500 space-y-4 font-semibold font-sans">
                        {section.content.split('\n').map((line, j) => {
                          if (line.trim().startsWith('###')) return <div key={j} className="text-[#00D9FF] font-black uppercase mt-6 mb-2 text-[11px] tracking-widest">{line.replace('###', '')}</div>;
                          if (line.trim().startsWith('*')) return <div key={j} className="flex gap-3"><span className="text-[#00FF41] font-mono">>></span><span>{line.replace('*', '').trim()}</span></div>;
                          return line.trim() ? <div key={j} className="font-medium text-gray-400 opacity-90">{line}</div> : null;
                        })}
                      </div>
                   </Card>
                 ))}
               </div>
             </div>
          )}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-24 bottom-nav-blur border-t border-[#1B2A22]/50 px-8 flex justify-between items-center z-50 animate-in slide-in-from-bottom duration-700 ease-[var(--spring-easing)]">
        {navItems.map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} className="flex flex-col items-center gap-2 group outline-none">
            <div className={`p-3 rounded-2xl transition-all duration-500 ease-[var(--spring-easing)] ${activeTab === item.id ? 'bg-[#00FF41]/20 text-[#00FF41] neon-glow scale-125 -translate-y-2 shadow-xl' : 'text-gray-600 group-active:scale-75'}`}>
              <item.icon size={22} className={`${activeTab === item.id ? 'animate-pulse' : ''}`} />
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-[0.2em] font-mono transition-all duration-500 ${activeTab === item.id ? 'text-[#00FF41] opacity-100 translate-y-0' : 'text-gray-700 opacity-60 translate-y-1'}`}>{item.label}</span>
          </button>
        ))}
      </nav>

      {showSettings && <Settings state={state} dispatch={dispatch} close={() => setShowSettings(false)} />}
    </div>
  );
}
