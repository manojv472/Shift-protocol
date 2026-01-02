
export type ShiftType = 'A' | 'B' | 'C' | 'OFF';

export interface ScheduleItem {
  time: string;
  activity: string;
  duration: string;
  notes: string;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  tempo: string;
  rpe: string;
  rest: string;
  notes: string;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: WorkoutExercise[];
}

export interface DailyLog {
  date: string;
  shift: ShiftType;
  sleepHours: number;
  sleepQuality: number; // 1-10
  energy: number; // 1-10
  mood: number; // 1-10
  proteinHit: boolean;
  hydration: boolean;
  caffeineCutoff: boolean;
  habits: {
    noAlcohol: boolean;
    noNicotine: boolean;
    cleanPMO: boolean;
  };
}

export interface TrainingLog {
  id: string;
  date: string;
  workoutId: string;
  exercises: {
    exerciseId: string;
    sets: { weight: number; reps: number; completed: boolean }[];
  }[];
}

export interface AppState {
  logs: DailyLog[];
  trainingLogs: TrainingLog[];
  completedTasks: Record<string, number[]>; // Key: YYYY-MM-DD
  currentShift: ShiftType;
  settings: {
    themeIntensity: number;
    textSize: 'small' | 'medium' | 'large';
    timeFormat: '12h' | '24h';
  };
}
