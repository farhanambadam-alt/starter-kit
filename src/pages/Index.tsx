import { useState, useEffect, useCallback } from 'react';
import { Search, MapPin, Bell, SlidersHorizontal, Mic, Map, TrendingUp, Sparkles } from 'lucide-react';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import CategoryChips from '@/components/CategoryChips';
import NearbySalonCard from '@/components/NearbySalonCard';
import { maleCategories, femaleCategories, featuredSalons, nearbySalons } from '@/data/mockData';

const searchSuggestions = ['Haircut near me', 'Bridal makeup', 'Hair coloring', 'Beard trim', 'Spa packages'];

const HomePage = () => {
  const [gender, setGender] = useState<'male' | 'female'>(() => {
    return (localStorage.getItem('preferred_gender') as 'male' | 'female') || 'male';
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
    return localStorage.getItem('preferred_category') || '1';
  });
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('preferred_gender', gender);
  }, [gender]);

  useEffect(() => {
    if (selectedCategory) localStorage.setItem('preferred_category', selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const SkeletonCard = () => (
    <div className="flex-shrink-0 w-44 sm:w-52 bg-card rounded-2xl overflow-hidden card-shadow">
      <div className="h-28 sm:h-32 skeleton-shimmer rounded-t-2xl" />
      <div className="p-3 space-y-2">
        <div className="h-4 w-3/4 skeleton-shimmer rounded-full" />
        <div className="h-3 w-1/2 skeleton-shimmer rounded-full" />
        <div className="h-3 w-2/3 skeleton-shimmer rounded-full" />
      </div>
    </div>
  );

  const SkeletonCarousel = () => (
    <div className="mx-4 aspect-[16/10] skeleton-shimmer rounded-2xl" />
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-primary/30">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-body leading-none">Hello,</p>
              <p className="font-body font-semibold text-sm text-foreground leading-tight">Aarav</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 bg-card border border-border px-2.5 py-1.5 rounded-full">
              <MapPin size={13} className="text-primary" />
              <span className="text-[11px] font-body font-medium text-foreground">Bangalore</span>
            </button>
            <button className="relative p-2 bg-card border border-border rounded-full">
              <Bell size={17} className="text-foreground" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="px-4 pt-2 pb-1">
        <h1 className="font-heading font-semibold text-[22px] text-foreground leading-tight tracking-tight">
          Find Your Perfect
        </h1>
        <p className="font-heading text-lg text-primary italic">
          Salon Experience
        </p>
      </div>

      {/* Search */}
      <div className="px-4 py-2.5 relative">
        <div className={`flex items-center gap-2 bg-card border rounded-xl px-3.5 py-2.5 transition-all duration-250 ${
          searchFocused ? 'border-primary shadow-md' : 'border-border card-shadow'
        }`}>
          <Search size={16} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search salon, service..."
            className="flex-1 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
          />
          <Mic size={16} className="text-muted-foreground flex-shrink-0 cursor-pointer active:text-primary transition-colors" />
          <div className="w-px h-4 bg-border" />
          <SlidersHorizontal size={16} className="text-muted-foreground flex-shrink-0 cursor-pointer" />
        </div>

        {searchFocused && !searchQuery && (
          <div className="absolute left-4 right-4 top-full mt-1 bg-card border border-border rounded-xl shadow-lg z-30 overflow-hidden animate-fade-in-up" style={{ animationDuration: '200ms' }}>
            <p className="text-[10px] font-body font-semibold text-muted-foreground px-3.5 pt-2.5 pb-1 uppercase tracking-wider">Recent</p>
            {searchSuggestions.map((s) => (
              <button
                key={s}
                onMouseDown={() => setSearchQuery(s)}
                className="w-full text-left px-3.5 py-2 text-sm font-body text-foreground hover:bg-muted/50 flex items-center gap-2 transition-colors"
              >
                <Search size={13} className="text-muted-foreground" />
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Gender Toggle — compact inline toggle */}
      <div className="px-4 pb-1">
        <div className="inline-flex bg-card border border-border rounded-lg p-0.5">
          <button
            onClick={() => setGender('male')}
            className={`px-4 py-1.5 rounded-md text-xs font-body font-semibold transition-all duration-200 ${
              gender === 'male'
                ? 'bg-foreground text-background shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Men
          </button>
          <button
            onClick={() => setGender('female')}
            className={`px-4 py-1.5 rounded-md text-xs font-body font-semibold transition-all duration-200 ${
              gender === 'female'
                ? 'bg-foreground text-background shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Women
          </button>
        </div>
      </div>

      {/* Categories */}
      <CategoryChips
        categories={gender === 'male' ? maleCategories : femaleCategories}
        selected={selectedCategory}
        onSelect={(id) => setSelectedCategory(id === selectedCategory ? null : id)}
      />

      {/* Featured */}
      <div className="pt-3">
        <div className="flex items-center justify-between px-4 mb-2.5">
          <h2 className="font-heading font-semibold text-base text-foreground flex items-center gap-1.5">
            <Sparkles size={14} className="text-primary" /> Top Picks
          </h2>
          <button className="text-[11px] font-body font-medium text-primary">See all</button>
        </div>
        {isLoading ? <SkeletonCarousel /> : <FeaturedCarousel salons={featuredSalons} />}
      </div>

      {/* Trending */}
      <div className="pt-5">
        <div className="flex items-center justify-between px-4 mb-2.5">
          <h2 className="font-heading font-semibold text-base text-foreground flex items-center gap-1.5">
            <TrendingUp size={14} className="text-primary" /> Trending Now
          </h2>
          <button className="text-[11px] font-body font-medium text-primary">See all</button>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-3 scrollbar-hide">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            featuredSalons.map((salon) => (
              <NearbySalonCard key={salon.id} salon={salon} />
            ))
          )}
        </div>
      </div>

      {/* Nearby */}
      <div className="pt-2">
        <div className="flex items-center justify-between px-4 mb-2.5">
          <h2 className="font-heading font-semibold text-base text-foreground">Nearby</h2>
          <button className="text-[11px] font-body font-medium text-primary">See all</button>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-3 scrollbar-hide">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            nearbySalons.map((salon) => (
              <NearbySalonCard key={salon.id} salon={salon} />
            ))
          )}
        </div>
      </div>

      {/* Map CTA */}
      <div className="px-4 pb-3">
        <button className="w-full flex items-center justify-center gap-2 bg-card border border-border text-foreground font-body font-semibold text-sm py-2.5 rounded-xl active:scale-[0.98] transition-transform">
          <Map size={16} className="text-primary" />
          Explore on Map
        </button>
      </div>

      {/* Suggested */}
      <div className="pt-1 pb-4">
        <div className="flex items-center justify-between px-4 mb-2.5">
          <h2 className="font-heading font-semibold text-base text-foreground">Suggested</h2>
        </div>
        <div className="px-4 space-y-2.5">
          {isLoading ? (
            <div className="h-20 skeleton-shimmer rounded-xl" />
          ) : (
            [...featuredSalons, ...nearbySalons].slice(0, 3).map((salon) => (
              <div key={salon.id} className="flex items-center gap-3 bg-card border border-border rounded-xl p-2.5 card-shadow">
                <img src={salon.image} alt={salon.name} className="w-14 h-14 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-body font-semibold text-sm text-foreground truncate">{salon.name}</h4>
                  <p className="text-[11px] font-body text-muted-foreground">{salon.address} · {salon.distance}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[11px] text-primary font-semibold">★ {salon.rating}</span>
                    <span className="text-[10px] text-muted-foreground">· From ₹{salon.startingPrice}</span>
                  </div>
                </div>
                <button className="text-[11px] font-body font-bold text-primary-foreground bg-primary px-3 py-1.5 rounded-lg active:scale-95 transition-transform flex-shrink-0">
                  Book
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
