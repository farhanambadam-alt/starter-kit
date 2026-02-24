import { Home, Scissors } from 'lucide-react';

interface LocationModeToggleProps {
  mode: 'home' | 'salon';
  onModeChange: (mode: 'home' | 'salon') => void;
}

const LocationModeToggle = ({ mode, onModeChange }: LocationModeToggleProps) => {
  return (
    <div className="relative flex bg-secondary rounded-2xl p-1 w-full max-w-[260px]">
      <div
        className="absolute top-1 bottom-1 rounded-xl bg-primary transition-all duration-300 ease-out"
        style={{
          width: 'calc(50% - 4px)',
          left: mode === 'home' ? '4px' : 'calc(50% + 0px)',
        }}
      />
      <button
        onClick={() => onModeChange('home')}
        className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-heading font-semibold transition-colors duration-200 ${
          mode === 'home' ? 'text-primary-foreground' : 'text-muted-foreground'
        }`}
      >
        <Home size={14} />
        At Home
      </button>
      <button
        onClick={() => onModeChange('salon')}
        className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-heading font-semibold transition-colors duration-200 ${
          mode === 'salon' ? 'text-primary-foreground' : 'text-muted-foreground'
        }`}
      >
        <Scissors size={14} />
        At Salon
      </button>
    </div>
  );
};

export default LocationModeToggle;
