import React from 'react';

const Logo: React.FC = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="58" stroke="white" strokeWidth="4"/>
    <path d="M35 60H45L50 45L60 75L65 60L70 68H85" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface SplashScreenProps {
  isFadingOut: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isFadingOut }) => {
  return (
    <div className={`
      absolute inset-0 z-50 flex flex-col items-center justify-center bg-primary-blue
      transition-opacity duration-700 ease-in-out
      ${isFadingOut ? 'opacity-0' : 'opacity-100'}
    `}>
      <div className="animate-fade-in-scale">
        <Logo />
      </div>
      <h1 className="text-5xl font-bold text-white mt-6 font-poppins animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        HealthSense
      </h1>
      <p className="text-lg text-white/80 mt-2 font-poppins animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        Your Health, Monitored.
      </p>
      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.8s ease-out forwards;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
