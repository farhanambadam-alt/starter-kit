import { useState, useEffect, useCallback } from 'react';
import { Search, MapPin, Bell, SlidersHorizontal, ChevronDown, Mic, Map, TrendingUp, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import CategoryChips from '@/components/CategoryChips';
import NearbySalonCard from '@/components/NearbySalonCard';
import LocationModeToggle from '@/components/LocationModeToggle';
import ProfessionalCard from '@/components/ProfessionalCard';
import { NoCoverageState } from '@/components/EmptyStates';
import { categories, featuredSalons, nearbySalons, professionals } from '@/data/mockData';

const searchSuggestions = ['Haircut near me', 'Bridal makeup', 'Hair coloring', 'Beard trim', 'Spa packages'];

const HomePage = () => {
  const navigate = useNavigate();
  const [locationMode, setLocationMode] = useState<'home' | 'salon'>(() => {
    return (localStorage.getItem('location_mode') as 'home' | 'salon') || 'salon';
  });
  const [gender, setGender] = useState<'male' | 'female'>(() => {
    return (localStorage.getItem('preferred_gender') as 'male' | 'female') || 'male';
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
    return localStorage.getItem('preferred_category') || '1';
  });
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { localStorage.setItem('preferred_gender', gender); }, [gender]);
  useEffect(() => { if (selectedCategory) localStorage.setItem('preferred_category', selectedCategory); }, [selectedCategory]);
  useEffect(() => { localStorage.setItem('location_mode', locationMode); }, [locationMode]);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleModeChange = (mode: 'home' | 'salon') => {
    setLocationMode(mode);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 600);
  };

  const SkeletonCard = () => (
    <div className="flex-shrink-0 w-52 bg-card rounded-2xl overflow-hidden card-shadow">
      <div className="h-32 skeleton-shimmer rounded-t-2xl" />
      <div className="p-3 space-y-2">
        <div className="h-4 w-3/4 skeleton-shimmer rounded-full" />
        <div className="h-3 w-1/2 skeleton-shimmer rounded-full" />
        <div className="h-3 w-2/3 skeleton-shimmer rounded-full" />
      </div>
    </div>
  );

  const SkeletonProfessional = () => (
    <div className="bg-card rounded-2xl overflow-hidden card-shadow">
      <div className="aspect-[4/3] skeleton-shimmer" />
      <div className="p-3 space-y-2">
        <div className="h-4 w-3/4 skeleton-shimmer rounded-full" />
        <div className="h-3 w-1/2 skeleton-shimmer rounded-full" />
        <div className="h-8 w-full skeleton-shimmer rounded-xl mt-3" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-body">Hello,</p>
              <p className="font-heading font-semibold text-sm text-foreground">Aarav</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 bg-secondary px-3 py-1.5 rounded-full">
              <MapPin size={14} className="text-primary" />
              <span className="text-xs font-body font-medium text-foreground">Bangalore</span>
              <ChevronDown size={12} className="text-muted-foreground" />
            </button>
            <button className="relative p-2">
              <Bell size={20} className="text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* Location Mode Toggle */}
      <div className="px-4 pt-3 pb-1 flex justify-center">
        <LocationModeToggle mode={locationMode} onModeChange={handleModeChange} />
      </div>

      {/* Hero Text */}
      <div className="px-4 pt-3 pb-1">
        <h1 className="font-heading font-bold text-2xl text-foreground leading-tight">
          {locationMode === 'home' ? 'Expert Stylists,' : 'Premium Salons,'}
        </h1>
        <p className="font-heading font-light text-lg text-muted-foreground italic">
          {locationMode === 'home' ? 'At your doorstep.' : 'Handpicked for you.'}
        </p>
      </div>

      {/* Search */}
      <div className="px-4 py-3 relative">
        <div className={`flex items-center gap-2 bg-card border rounded-2xl px-4 py-3 transition-all duration-250 ${
          searchFocused ? 'border-primary shadow-md' : 'border-border card-shadow'
        }`}>
          <Search size={18} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={locationMode === 'home' ? 'Search professionals, services...' : 'Search salon, service...'}
            className="flex-1 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
          />
          <Mic size={18} className="text-muted-foreground flex-shrink-0 cursor-pointer active:text-primary transition-colors" />
          <SlidersHorizontal size={18} className="text-muted-foreground flex-shrink-0 cursor-pointer" />
        </div>
        {searchFocused && !searchQuery && (
          <div className="absolute left-4 right-4 top-full mt-1 bg-card border border-border rounded-2xl shadow-lg z-30 overflow-hidden animate-fade-in-up" style={{ animationDuration: '200ms' }}>
            <p className="text-[10px] font-heading font-semibold text-muted-foreground px-4 pt-3 pb-1">RECENT SEARCHES</p>
            {searchSuggestions.map((s) => (
              <button key={s} onMouseDown={() => setSearchQuery(s)} className="w-full text-left px-4 py-2.5 text-sm font-body text-foreground hover:bg-secondary/50 flex items-center gap-2 transition-colors">
                <Search size={14} className="text-muted-foreground" />
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Gender Toggle */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-body text-muted-foreground mr-1">Select Gender</span>
          <div className="relative flex bg-secondary rounded-xl p-0.5">
            <div
              className="absolute top-0.5 bottom-0.5 rounded-lg bg-primary transition-transform duration-250 ease-out"
              style={{
                width: 'calc(50% - 2px)',
                transform: gender === 'male' ? 'translateX(2px)' : 'translateX(calc(100% + 2px))',
              }}
            />
            {(['male', 'female'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`relative z-10 px-5 py-1.5 text-xs font-heading font-medium rounded-lg transition-colors duration-200 capitalize ${
                  gender === g ? 'text-primary-foreground' : 'text-muted-foreground'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <CategoryChips
        categories={categories}
        selected={selectedCategory}
        onSelect={(id) => setSelectedCategory(id === selectedCategory ? null : id)}
      />

      {/* CONDITIONAL CONTENT BASED ON MODE */}
      {locationMode === 'salon' ? (
        <>
          {/* Featured Section */}
          <div className="pt-4">
            <h2 className="font-heading font-semibold text-base text-foreground px-4 mb-3">Best Salons in Your City</h2>
            {isLoading ? <div className="mx-4 aspect-[16/10] skeleton-shimmer rounded-2xl" /> : <FeaturedCarousel salons={featuredSalons} />}
          </div>

          {/* Trending */}
          <div className="pt-6">
            <div className="flex items-center justify-between px-4 mb-3">
              <h2 className="font-heading font-semibold text-base text-foreground flex items-center gap-1.5">
                <TrendingUp size={16} className="text-accent" /> Trending Now
              </h2>
              <button className="text-xs font-body font-medium text-primary">View All →</button>
            </div>
            <div className="flex gap-3 overflow-x-auto px-4 pb-4 scrollbar-hide">
              {isLoading ? <><SkeletonCard /><SkeletonCard /><SkeletonCard /></> : featuredSalons.map((salon) => <NearbySalonCard key={salon.id} salon={salon} />)}
            </div>
          </div>

          {/* Nearby Salons */}
          <div className="pt-2">
            <div className="flex items-center justify-between px-4 mb-3">
              <h2 className="font-heading font-semibold text-base text-foreground">Nearby Salons</h2>
              <button className="text-xs font-body font-medium text-primary">View All →</button>
            </div>
            <div className="flex gap-3 overflow-x-auto px-4 pb-4 scrollbar-hide">
              {isLoading ? <><SkeletonCard /><SkeletonCard /></> : nearbySalons.map((salon) => <NearbySalonCard key={salon.id} salon={salon} />)}
            </div>
          </div>

          {/* Explore on Map */}
          <div className="px-4 pb-4">
            <button className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary font-heading font-semibold text-sm py-3 rounded-2xl active:scale-[0.98] transition-transform">
              <Map size={18} />
              Explore Salons on Map
            </button>
          </div>

          {/* Suggested */}
          <div className="pt-2 pb-4">
            <div className="flex items-center justify-between px-4 mb-3">
              <h2 className="font-heading font-semibold text-base text-foreground">Suggested for You</h2>
            </div>
            <div className="px-4 space-y-3">
              {isLoading ? (
                <div className="h-24 skeleton-shimmer rounded-2xl" />
              ) : (
                [...featuredSalons, ...nearbySalons].slice(0, 3).map((salon) => (
                  <div key={salon.id} className="flex items-center gap-3 bg-card rounded-2xl p-3 card-shadow" onClick={() => navigate(`/salon/${salon.id}`)}>
                    <img src={salon.image} alt={salon.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-semibold text-sm text-foreground truncate">{salon.name}</h4>
                      <p className="text-[11px] font-body text-muted-foreground">{salon.address} • {salon.distance}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-accent">⭐ {salon.rating}</span>
                        <span className="text-[10px] text-muted-foreground">• From ₹{salon.startingPrice}</span>
                      </div>
                    </div>
                    <button className="text-[11px] font-heading font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-lg active:scale-95 transition-transform flex-shrink-0">
                      Book
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* At Home: Top Rated Professionals */}
          <div className="pt-4">
            <div className="flex items-center justify-between px-4 mb-3">
              <h2 className="font-heading font-semibold text-base text-foreground">
                Top Rated Professionals Near You
              </h2>
            </div>
            <div className="px-4 grid grid-cols-2 gap-3 pb-4">
              {isLoading ? (
                <><SkeletonProfessional /><SkeletonProfessional /><SkeletonProfessional /><SkeletonProfessional /></>
              ) : (
                professionals.map((pro) => (
                  <ProfessionalCard key={pro.id} professional={pro} onBook={(id) => navigate(`/salon/${id}`)} />
                ))
              )}
            </div>
          </div>

          {/* Quick Rebook FAB */}
          <button
            className="fixed bottom-24 right-4 z-40 bg-primary text-primary-foreground w-14 h-14 rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform"
            style={{ boxShadow: '0 4px 20px hsl(var(--primary) / 0.4)' }}
          >
            <RotateCcw size={22} />
          </button>
        </>
      )}
    </div>
  );
};

export default HomePage;
