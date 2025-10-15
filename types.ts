
// FIX: Import React to use React.FC
import React from 'react';

export type View = 'dashboard' | 'reports' | 'healthAI' | 'alerts' | 'profile' | 'addData' | 'connectDevice' | 'editProfile';

export type VitalSign = 'Heart Rate' | 'SpO2' | 'Blood Pressure' | 'Temperature' | 'Glucose';
export type RiskLevel = 'Low' | 'Moderate' | 'Critical';
export type Gender = 'male' | 'female' | 'other';

export interface Vital {
    icon: React.FC<any>;
    name: VitalSign;
    value: string;
    unit: string;
    color: string;
    bgColor: string;
    history?: HealthDataPoint[];
}

export interface Alert {
    id: number;
    title: string;
    detail: string;
    timestamp: string;
    risk: RiskLevel;
}

export interface HealthDataPoint {
    date: string;
    name: string;
    value: number;
}

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}

// FIX: Added Friend type for HomeScreen
export interface Friend {
    name: string;
    avatar: string;
}

// FIX: Added CaloriesData type for ProgressScreen
export interface CaloriesData {
    name: string;
    calories: number;
}

// FIX: Added Workout type for WorkoutScreen
export interface Workout {
    image: string;
    name: string;
    reps: string | number;
}

export interface Metric {
  name: string;
  unit: string;
}

export interface MetricCategory {
  category: string;
  metrics: Metric[];
}
