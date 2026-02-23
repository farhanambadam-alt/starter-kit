import { Home, Search, CalendarDays, Tag, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Explore', path: '/explore' },
  { icon: CalendarDays, label: 'Bookings', path: '/bookings' },
  { icon: Tag, label: 'Offers', path: '/offers' },
  { icon: User, label: 'Profile', path: '/profile' },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname.startsWith('/salon/')) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-foreground" style={{ boxShadow: 'var(--shadow-bottom-bar)' }}>
      <div className="flex justify-around items-center h-14 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-primary'
                  : 'text-background/50'
              }`}
            >
              <tab.icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[9px] font-medium font-body">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
