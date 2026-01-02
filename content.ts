
import { ShiftType, ScheduleItem, Workout } from '../types';

export const SHIFT_SCHEDULES: Record<ShiftType, ScheduleItem[]> = {
  A: [
    { time: '05:15', activity: 'Wake', duration: '-', notes: "Don't snooze. 500ml water first." },
    { time: '05:15', activity: 'Toilet + Face Wash', duration: '20 min', notes: 'Quick hygiene stack.' },
    { time: '05:35', activity: 'Bath #1 (Morning)', duration: '20 min', notes: 'Warm water. Energizes you for the day.' },
    { time: '06:00', activity: 'Leave Home', duration: '-', notes: 'Commute ~30 min. Sunrise exposure.' },
    { time: '06:00', activity: 'Work (A Shift)', duration: '8 hours', notes: 'Meal provided by company canteen. Hydrate hourly. Caffeine cutoff: 2:00 PM.' },
    { time: '14:00', activity: 'Shift End', duration: '-', notes: 'Commute back home.' },
    { time: '15:30', activity: 'Reach Home + Reset', duration: '15 min', notes: 'Meal 2 (Big Carbs - Cook at home). 10-Min Cleaning.' },
    { time: '15:45', activity: 'Strength Training', duration: '50 min', notes: 'Home Protocol: Barbell & DB only.' },
    { time: '16:35', activity: 'Bath #2 (Post Training)', duration: '20 min', notes: 'Warm water rinse. Removes sweat.' },
    { time: '17:00', activity: 'Cook Dinner', duration: '30 min', notes: 'Protein Anchor (Fish/Chicken). Fresh home meal.' },
    { time: '17:30', activity: 'Dinner', duration: '30 min', notes: 'High protein, rice, vegetables. Relaxed meal.' },
    { time: '18:15', activity: 'Study Block (Reading)', duration: '90 min', notes: 'WILP coursework. Deep focus window.' },
    { time: '19:45', activity: 'Light Chores', duration: '60 min', notes: 'Laundry, dishes, fill water containers.' },
    { time: '20:45', activity: 'Wind-Down', duration: '45 min', notes: 'Dim lights, screens off, fan on.' },
    { time: '21:30', activity: 'Sleep Target', duration: '8 hours', notes: 'Aim for consistent 9:30 PM sleep.' },
  ],
  B: [
    { time: '08:00', activity: 'Wake + Light', duration: '-', notes: 'Immediate sunrise exposure sets day-mode.' },
    { time: '08:00', activity: 'Hygiene + Bath #1', duration: '30 min', notes: 'Warm water. Energizing morning ritual.' },
    { time: '08:30', activity: 'Cook Breakfast', duration: '30 min', notes: 'Home cooked breakfast.' },
    { time: '09:00', activity: 'Meal 1 (Breakfast)', duration: '30 min', notes: 'Eggs + rice/poha. Protein first.' },
    { time: '09:30', activity: 'Home Reset (Cleaning)', duration: '15 min', notes: 'Bed, dishes, quick sweep.' },
    { time: '10:15', activity: 'Strength Training', duration: '60 min', notes: 'Home Protocol: Barbell & DB only.' },
    { time: '11:15', activity: 'Bath #2 (Post Training)', duration: '20 min', notes: 'Prepares for study focus.' },
    { time: '11:40', activity: 'Study Block (Reading)', duration: '45 min', notes: 'WILP coursework. Focused work only.' },
    { time: '12:25', activity: 'Meal 2 (Bigger Carbs)', duration: '25 min', notes: 'Rice + protein (Cooked at home).' },
    { time: '12:50', activity: 'Leave Home', duration: '10 min', notes: 'Commute ~15-20 min.' },
    { time: '13:00', activity: 'Work (B Shift)', duration: '9 hours', notes: 'Meal provided by company canteen. Caffeine cutoff: 5:00 PM.' },
    { time: '22:00', activity: 'Return Home', duration: '30 min', notes: 'Eat Meal 3 (Home cooked, high protein).' },
    { time: '23:30', activity: 'Quick Tidy + Wash', duration: '15 min', notes: 'Signals body that sleep is coming.' },
    { time: '23:45', activity: 'Wind-Down', duration: '30 min', notes: 'Dark room, minimal phone.' },
    { time: '00:15', activity: 'Sleep Target', duration: '8 hours', notes: 'Consistent 12:15 AM sleep on B days.' },
  ],
  C: [
    { time: '16:30', activity: 'Wake (Day 1)', duration: '-', notes: 'Treat this as your "Morning".' },
    { time: '16:30', activity: 'Bath #1 (Wake-Up)', duration: '30 min', notes: 'Warm water helps night-shift alertness.' },
    { time: '17:00', activity: 'Cook & Reset', duration: '30 min', notes: 'Quick cleaning + cook Meal 1 at home.' },
    { time: '17:30', activity: 'Meal 1 (Home)', duration: '45 min', notes: 'Fish curry + rice. Not greasy.' },
    { time: '18:15', activity: 'Short Workout', duration: '45 min', notes: 'Moderate RPE (6-7). No maxing.' },
    { time: '19:00', activity: 'Bath #2 (Post Training)', duration: '20 min', notes: 'Removes sweat. Prepares for study.' },
    { time: '19:20', activity: 'Meal 2 (Home)', duration: '45 min', notes: 'Chicken + rice (Cooked at home).' },
    { time: '20:05', activity: 'Study Block (Reading)', duration: '30 min', notes: 'Anki flashcards/light tasks only.' },
    { time: '20:35', activity: 'Leave for Work', duration: '25 min', notes: 'Commute to site. Last caffeine max 1:00 AM.' },
    { time: '21:00', activity: 'Work (Night Shift)', duration: '11.5 hours', notes: 'Overnight meal provided by company canteen. Early shift: bright light. Late: dim.' },
    { time: '08:30', activity: 'Return (Day 2 AM)', duration: '-', notes: 'DROWSY DRIVING RULE: Pull over if struggling.' },
    { time: '08:30', activity: 'Quick Rinse + Tidy', duration: '25 min', notes: 'Home reset after shift. Curtains ON.' },
    { time: '08:55', activity: 'Meal 4 (Post-Shift)', duration: '20 min', notes: 'Eggs + rice (Cooked at home). Low sugar.' },
    { time: '09:15', activity: 'MAIN SLEEP BLOCK', duration: '6 hours', notes: 'Blackout curtains sealed. Sacred rest.' },
  ],
  OFF: [
    { time: '08:30', activity: 'Return from Night Shift', duration: '-', notes: 'Rotation complete. Avoid screens on commute.' },
    { time: '08:45', activity: 'Post-Rotation Meal', duration: '30 min', notes: 'High protein + moderate fats. No caffeine.' },
    { time: '09:30', activity: 'Hygiene + Quick Rinse', duration: '15 min', notes: 'Signals brain that shift is over.' },
    { time: '10:00', activity: 'Strategic Recovery Nap', duration: '120 min', notes: 'Limit to 2 hours max to reset circadian clock.' },
    { time: '12:30', activity: 'Wake + Sun Reset', duration: '20 min', notes: 'CRITICAL: Get direct sunlight. Signals "Day Mode".' },
    { time: '13:00', activity: 'Home Reset (Deep Clean)', duration: '60 min', notes: 'Clear the week\'s clutter. Mental reset.' },
    { time: '14:30', activity: 'Meal 2 (Anchor Lunch)', duration: '45 min', notes: 'Home cooked. Fresh vegetables + protein.' },
    { time: '16:00', activity: 'Active Recovery / Mobility', duration: '45 min', notes: 'Yoga or long walk. Flush the system.' },
    { time: '17:30', activity: 'Grocery / Errand Run', duration: '60 min', notes: 'Stock up for the next rotation.' },
    { time: '19:00', activity: 'Meal 3 (Social Dinner)', duration: '60 min', notes: 'Re-sync with world/family/friends.' },
    { time: '21:00', activity: 'Wind-Down Ritual', duration: '60 min', notes: 'Magnesium bath. No tech.' },
    { time: '22:00', activity: 'Primary Sleep (Target)', duration: '9 hours', notes: 'The big reset. Aim for deep REM.' },
  ]
};

export const WORKOUTS: Record<string, Workout> = {
  upperA: {
    id: 'upperA',
    name: 'Home Upper A (Strength)',
    description: 'Barbell & DB Focus. 5-8 Reps for Power.',
    exercises: [
      { id: 'u1', name: 'Barbell Floor Press', sets: 4, reps: '5-8', tempo: '31X1', rpe: '7-8', rest: '120s', notes: 'Safe home alternative to bench press.' },
      { id: 'u2', name: 'Barbell Bent Over Row', sets: 4, reps: '8-10', tempo: '2111', rpe: '7-8', rest: '90s', notes: 'Keep back flat, pull to belly button.' },
      { id: 'u3', name: 'Barbell Overhead Press', sets: 3, reps: '8-10', tempo: '2010', rpe: '6-8', rest: '90s', notes: 'Strict standing press.' },
      { id: 'u4', name: 'Dumbbell Lateral Raises', sets: 3, reps: '12-15', tempo: '2011', rpe: '9', rest: '60s', notes: 'Control the descent.' },
    ]
  },
  lowerA: {
    id: 'lowerA',
    name: 'Home Lower A (Hypertrophy)',
    description: 'Barbell & DB Focus. RPE 6-8.',
    exercises: [
      { id: 'l1', name: 'Barbell Zercher Squat', sets: 4, reps: '8-10', tempo: '3010', rpe: '7-8', rest: '180s', notes: 'Great for homes without a squat rack.' },
      { id: 'l2', name: 'Barbell Romanian Deadlift', sets: 3, reps: '10-12', tempo: '3010', rpe: '6-7', rest: '120s', notes: 'Focus on the hamstring stretch.' },
      { id: 'l3', name: 'Dumbbell Goblet Squat', sets: 3, reps: '12-15', tempo: '2011', rpe: '8', rest: '90s', notes: 'Hold one heavy DB close to chest.' },
      { id: 'l4', name: 'Barbell Calf Raises', sets: 4, reps: '15-20', tempo: '1112', rpe: '8', rest: '45s', notes: 'Standing with bar on traps.' },
    ]
  },
  upperB: {
    id: 'upperB',
    name: 'Home Upper B (Hypertrophy)',
    description: 'High volume DB & Barbell.',
    exercises: [
      { id: 'ub1', name: 'Dumbbell Floor Press (Volume)', sets: 4, reps: '10-12', tempo: '3010', rpe: '8', rest: '90s', notes: 'High chest activation on floor.' },
      { id: 'ub2', name: 'Single Arm DB Row', sets: 4, reps: '10-12', tempo: '2011', rpe: '8', rest: '60s', notes: 'Brace on a sturdy chair or bed.' },
      { id: 'ub3', name: 'Dumbbell Arnold Press', sets: 3, reps: '12-15', tempo: '2111', rpe: '7', rest: '60s', notes: 'Full rotation at bottom.' },
      { id: 'ub4', name: 'Barbell Bicep Curls', sets: 3, reps: '10-12', tempo: '2010', rpe: '8', rest: '60s', notes: 'No swinging.' },
    ]
  }
};

export const WARMUP_PROTOCOL = [
  '5m Dynamic Cardio (Jump rope/Walk)',
  'Arm Circles (Small & Large)',
  'Leg Swings (Lateral & Front)',
  'Cat-Cow (10 reps)',
  'Bird-Dog (10 reps each side)',
  'Thoracic Bridges (5 each side)'
];

export const LIBRARY_SECTIONS = [
  {
    id: 'global-rules',
    title: '1.2 Global Rules',
    content: `
### Light & Circadian rhythm
* Night shifts require strategic light management.
* Morning sunlight is your reset tool (6:00 AM–9:00 AM).
* Driving home in sunlight? Wear blue-light blockers.

### Caffeine Cutoffs
* A Shift: 2:00 PM
* B Shift: 5:00 PM
* C Shift: 1:00 AM (latest)

### Hydration
* Upon waking: 500 ml water + pinch of salt + lemon.
* Irritable? Headache? Cravings? → Hydrate first.
    `
  },
  {
    id: 'training-rules',
    title: '2.1 Training Rules (Home)',
    content: `
### The Rules
1. Perfect reps beat heavy reps. Form first.
2. Leave 2–3 reps in the tank (RPE 6–8).
3. Progressive overload: +1 rep or +1.25kg each week.
4. Never destroy sleep for a workout.
5. C-shift: Keep workouts short, moderate RPE.
6. Safety First: Without a rack, use Floor Presses and Zercher Squats for heavy compound loading.
    `
  }
];
