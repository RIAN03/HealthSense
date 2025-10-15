import React from 'react';
// FIX: Import newly added types
import { Vital, Alert, HealthDataPoint, Friend, CaloriesData, Workout, MetricCategory } from './types';

export const MOCK_VITALS: Vital[] = [
  { name: 'Heart Rate', value: '78', unit: 'bpm', icon: (props) => ICONS.Heart(props), color: 'text-red-500', bgColor: 'bg-red-100' },
  { name: 'SpO2', value: '98', unit: '%', icon: (props) => ICONS.Lungs(props), color: 'text-sky-500', bgColor: 'bg-sky-100' },
  { name: 'Blood Pressure', value: '120/80', unit: 'mmHg', icon: (props) => ICONS.BloodPressure(props), color: 'text-purple-500', bgColor: 'bg-purple-100' },
  { name: 'Temperature', value: '36.8', unit: '°C', icon: (props) => ICONS.Thermometer(props), color: 'text-orange-500', bgColor: 'bg-orange-100' },
  { name: 'Glucose', value: '90', unit: 'mg/dL', icon: (props) => ICONS.BloodDrop(props), color: 'text-green-500', bgColor: 'bg-green-100' },
];

export const MOCK_ALERTS: Alert[] = [
    { id: 1, title: 'High Heart Rate', detail: 'Heart rate reached 125 bpm while at rest.', timestamp: '10 min ago', risk: 'Moderate' },
    { id: 2, title: 'Low SpO2 Detected', detail: 'Oxygen saturation dropped to 92%.', timestamp: '1 hour ago', risk: 'Critical' },
    { id: 3, title: 'Irregular Heartbeat', detail: 'Possible arrhythmia detected during sleep.', timestamp: 'Yesterday', risk: 'Moderate' },
    { id: 4, title: 'Blood Pressure Elevated', detail: 'Reading of 145/92 mmHg detected.', timestamp: 'Yesterday', risk: 'Low' },
];

// FIX: Added MOCK_FRIENDS for HomeScreen
export const MOCK_FRIENDS: Friend[] = [
    { name: 'Alice', avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Bob', avatar: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Charlie', avatar: 'https://i.pravatar.cc/150?img=3' },
    { name: 'David', avatar: 'https://i.pravatar.cc/150?img=4' },
];

// FIX: Added MOCK_CALORIES_DATA for ProgressScreen
export const MOCK_CALORIES_DATA: CaloriesData[] = [
    { name: 'Sun', calories: 220 },
    { name: 'Mon', calories: 250 },
    { name: 'Tue', calories: 210 },
    { name: 'Wed', calories: 280 },
    { name: 'Thu', calories: 260 },
    { name: 'Fri', calories: 300 },
    { name: 'Sat', calories: 290 },
];

// FIX: Added MOCK_WORKOUTS for WorkoutScreen
export const MOCK_WORKOUTS: Workout[] = [
    { name: 'Push Ups', reps: 15, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=100&q=80' },
    { name: 'Squats', reps: 20, image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=100&q=80' },
    { name: 'Plank', reps: '60s', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=100&q=80' },
    { name: 'Jumping Jacks', reps: 30, image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=100&q=80' },
    { name: 'Burpees', reps: 12, image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=100&q=80' },
];

export const ICONS = {
    Heart: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>,
    Lungs: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>,
    BloodPressure: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75v16.5M7.5 12.75h9" /></svg>,
    Thermometer: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM12 9.75a3 3 0 110 6 3 3 0 010-6z" /></svg>,
    BloodDrop: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25-2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" /></svg>,
    Warning: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>,
    Bluetooth: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75l3.75 3.75-3.75 3.75M11.25 3v18m-4.5-9h13.5L15 6.75l-3.75-3.75" /></svg>,
    // FIX: Add missing icons
    Plus: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>,
    Water: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2c-4.418 0-8 3.582-8 8 0 5.25 8 12 8 12s8-6.75 8-12c0-4.418-3.582-8-8-8z" /></svg>,
    Calories: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664l.143.258a1.107 1.107 0 001.664.57l.143-.048a2.25 2.25 0 011.161.886l.51.766c.319.48.126 1.121-.216 1.49l-1.068.89a1.125 1.125 0 00-.405.864v.568m-6 0v-.568c0-.334-.148-.65-.405-.864l-1.068-.89c-.442-.369-.535-1.01-.216-1.49l.51-.766a2.25 2.25 0 001.161-.886l.143-.048a1.107 1.107 0 01.57-1.664l-.143-.258a1.107 1.107 0 01-1.664-.57l-.143.048a2.25 2.25 0 00-1.161-.886l-.51-.766c-.319.48-.126-1.121.216-1.49l1.068-.89a1.125 1.125 0 01.405-.864v-.568" /></svg>,
    Sleep: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>,
    Steps: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5l3-3m0 0l3 3m-3-3v6m0-6H3m3 0h3m4.5 0l3-3m0 0l3 3m-3-3v6m0-6h-3m3 0h3m-3 6.75h3m-3 0H9m3 0v-6m0 6H3.75m16.5 0H20.25m0 0H18m2.25 0v-6m0 6h-3" /></svg>,
    Home: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" /></svg>,
    Chart: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" /><path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" /></svg>,
    HealthAI: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.456-2.456L12.75 18l1.178-.398a3.375 3.375 0 002.456-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456L20.25 18l-1.178.398a3.375 3.375 0 00-2.456 2.456z" /></svg>,
    Alerts: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>,
    Profile: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" /></svg>,
    ChevronRight: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>,
    ChevronLeft: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>,
    ChevronDown: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>,
    Send: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>,
    Smartwatch: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18h3" /></svg>,
    Scale: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52v1.666c0 .414-.162.79-.448 1.076a1.875 1.875 0 01-2.102.448M3 5.47c1.01-.203 2.01-.377 3-.52m-3 .52v1.666a1.875 1.875 0 002.102.448 1.875 1.875 0 00.448-1.076V4.97M4.5 12.75a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 0115 0" /></svg>,
    FitnessBand: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75H6.75a4.5 4.5 0 000 9h10.5a4.5 4.5 0 000-9z" /></svg>,
    Settings: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 12h9.75M10.5 18h9.75M3.75 6H7.5m-3.75 6H7.5m-3.75 6H7.5" /></svg>,
    Help: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>,
    Logout: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>,
};

export const AVATARS = {
  female: [
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iI2U5MWU2MyIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik01MCA1OCBBIDIwIDIwIDAgMCAwIDMwIDc4IEwgNzAgNzggQSAyMCAyMCAwIDAgMCA1MCA1OCBaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzljMjdiMCIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik01MCA1OCBBIDIwIDIwIDAgMCAwIDMwIDc4IEwgNzAgNzggQSAyMCAyMCAwIDAgMCA1MCA1OCBaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzY3M2FiNyIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik01MCA1OCBBIDIwIDIwIDAgMCAwIDMwIDc4IEwgNzAgNzggQSAyMCAyMCAwIDAgMCA1MCA1OCBaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iI2Y0NDMzNiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik01MCA1OCBBIDIwIDIwIDAgMCAwIDMwIDc4IEwgNzAgNzggQSAyMCAyMCAwIDAgMCA1MCA1OCBaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
  ],
  male: [
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzIxOTZmMyIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik01MCA1OCBBIDIwIDIwIDAgMCAwIDMwIDc4IEwgNzAgNzggQSAyMCAyMCAwIDAgMCA1MCA1OCBaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzRjYWY1MCIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik01MCA1OCBBIDIwIDIwIDAgMCAwIDMwIDc4IEwgNzAgNzggQSAyMCAyMCAwIDAgMCA1MCA1OCBaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzAwOTY4OCIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik01MCA1OCBBIDIwIDIwIDAgMCAwIDMwIDc4IEwgNzAgNzggQSAyMCAyMCAwIDAgMCA1MCA1OCBaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzAzYTlmNCIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik01MCA1OCBBIDIwIDIwIDAgMCAwIDMwIDc4IEwgNzAgNzggQSAyMCAyMCAwIDAgMCA1MCA1OCBaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
  ],
  other: [
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzc5NTU0OCIvPjxyZWN0IHg9IjMwIiB5PSIzMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzllOWU5ZSIvPjxwYXRoIGQ9Ik01MCAzMCBMIDcwIDcwIEwgMzAgNzAgWiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=',
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iI2ZmYzEwNyIvPjxwYXRoIGQ9Ik00NSAzMCBIIDU1IFYgNDUgSCA3MCBWIDU1IEggNTUgViA3MCBIIDQ1IFYgNTUgSCAzMCBWIDQ1IEggNDUgWiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=',
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzYwN2Q4YiIvPjxwYXRoIGQ9Ik01MCAyNSBMIDc1IDUwIEwgNTAgNzUgTCAyNSA1MCBaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
  ],
};

export const EXTRA_METRICS: MetricCategory[] = [
  {
    category: 'Cardiovascular',
    metrics: [
      { name: 'HRV', unit: 'ms' },
      { name: 'ECG', unit: 'mV' }
    ],
  },
  {
    category: 'Respiratory',
    metrics: [
      { name: 'Respiration Rate', unit: 'br/min' },
      { name: 'Sleep Apnea', unit: 'events/hr' }
    ],
  },
  {
    category: 'Metabolic',
    metrics: [
      { name: 'BMI', unit: 'kg/m²' },
      { name: 'Body Fat %', unit: '%' },
      { name: 'Hydration', unit: 'L' }
    ],
  },
  {
    category: 'Stress & Sleep',
    metrics: [
      { name: 'Stress Level', unit: '1-10' },
      { name: 'Sleep Stages', unit: 'hrs' }
    ],
  },
  {
    category: 'Activity',
    metrics: [
      { name: 'Steps', unit: 'steps' },
      { name: 'Calories Burned', unit: 'kcal' },
      { name: 'GPS Tracking', unit: 'km' },
      { name: 'Gait Analysis', unit: 'm/s' }
    ],
  },
  {
    category: 'Environmental',
    metrics: [
      { name: 'UV Index', unit: 'index' },
      { name: 'Air Quality (AQI)', unit: 'AQI' },
      { name: 'Noise Level', unit: 'dB' }
    ],
  },
  {
    category: 'Predictive / AI',
    metrics: [
      { name: 'Health Score', unit: '/100' },
      { name: 'Fall Detection', unit: 'events' }
    ],
  },
];

export const METRIC_UNITS: Record<string, string> = {
    ...MOCK_VITALS.reduce((acc, vital) => ({ ...acc, [vital.name]: vital.unit }), {}),
    ...EXTRA_METRICS.flatMap(cat => cat.metrics).reduce((acc, metric) => ({ ...acc, [metric.name]: metric.unit }), {})
};

export const METRIC_ICONS: Record<string, React.FC<any>> = {
  'HRV': (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>,
  'ECG': (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /></svg>,
  'Respiration Rate': (props) => ICONS.Lungs,
  'Sleep Apnea': (props) => ICONS.Sleep,
  'BMI': (props) => ICONS.Scale,
  'Body Fat %': (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  'Hydration': (props) => ICONS.Water(props),
  'Stress Level': (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  'Sleep Stages': (props) => ICONS.Sleep(props),
  'Steps': (props) => ICONS.Steps(props),
  'Calories Burned': (props) => ICONS.Calories(props),
  'GPS Tracking': (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>,
  'Gait Analysis': (props) => ICONS.Steps(props),
  'UV Index': (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>,
  'Air Quality (AQI)': (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" /></svg>,
  'Noise Level': (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>,
  'Health Score': (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z" /></svg>,
  'Fall Detection': (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v.01m0 16.49v.01" /></svg>,
  'Default': (props) => ICONS.Chart(props),
};