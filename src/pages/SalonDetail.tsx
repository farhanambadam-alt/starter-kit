import { useState } from 'react';
import { ArrowLeft, Share2, Star, MapPin, Clock, ChevronRight, ThumbsUp, Plus, Minus, Navigation, Heart, ShieldCheck, ChevronLeft } from 'lucide-react';
import ReviewsSection from '@/components/ReviewsSection';
import { useNavigate, useParams } from 'react-router-dom';
import { featuredSalons, nearbySalons, services, artists, reviews } from '@/data/mockData';

const SalonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const salon = [...featuredSalons, ...nearbySalons].find((s) => s.id === id) || featuredSalons[0];

  const [activeTab, setActiveTab] = useState<'services' | 'about' | 'reviews' | 'gallery'>('services');
  const [serviceTab, setServiceTab] = useState<'men' | 'women' | 'packages' | 'outside'>('men');
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [reviewFilter, setReviewFilter] = useState<string>('all');

  const filteredServices = services.filter((s) => s.category === (serviceTab === 'outside' ? 'men' : serviceTab));
  const filteredReviews = reviews.filter((r) => {
    if (selectedArtist && r.artistId !== selectedArtist) return false;
    if (reviewFilter === 'all') return true;
    if (reviewFilter === '5') return r.rating === 5;
    if (reviewFilter === '4') return r.rating >= 4;
    if (reviewFilter === 'photos') return r.hasPhoto;
    return true;
  });

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((total, [sId, qty]) => {
    const service = services.find((s) => s.id === sId);
    return total + (service?.price || 0) * qty;
  }, 0);

  const addToCart = (serviceId: string) => {
    setCart((c) => ({ ...c, [serviceId]: (c[serviceId] || 0) + 1 }));
  };

  const removeFromCart = (serviceId: string) => {
    setCart((c) => {
      const n = { ...c };
      if (n[serviceId] > 1) n[serviceId]--;
      else delete n[serviceId];
      return n;
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <div className="relative h-64">
        <img src={salon.image} alt={salon.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center">
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
            >
              <Heart size={16} className={isFavorite ? 'text-destructive fill-destructive' : 'text-foreground'} />
            </button>
            <button className="w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center">
              <Share2 size={16} className="text-foreground" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-3 right-3 bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1">
          <Star size={14} className="text-accent fill-accent" />
          <span className="text-sm font-semibold font-heading text-foreground">{salon.rating}</span>
          <span className="text-xs text-muted-foreground">({salon.reviewCount})</span>
        </div>
      </div>

      {/* Salon Info */}
      <div className="px-4 pt-4 pb-3 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
        <h1 className="font-heading font-bold text-xl text-foreground">{salon.name}</h1>
        <div className="flex items-center gap-2 mt-1.5">
          <MapPin size={13} className="text-muted-foreground" />
          <span className="text-xs font-body text-muted-foreground">{salon.address}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Clock size={13} className="text-muted-foreground" />
          <span className={`text-xs font-body font-medium ${salon.isOpen ? 'text-success' : 'text-destructive'}`}>
            {salon.isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {salon.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-body font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              {tag === 'Verified' && <ShieldCheck size={10} />}
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 mt-3 pt-3 border-t border-border">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200 active:scale-[0.97] group">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
              <Navigation size={14} className="text-primary" />
            </div>
            <span className="text-xs font-heading font-semibold text-foreground">Direction</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200 active:scale-[0.97] group">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
              <Share2 size={14} className="text-primary" />
            </div>
            <span className="text-xs font-heading font-semibold text-foreground">Share</span>
          </button>
        </div>
      </div>

      {/* Tab Nav */}
      <div className="mx-4 my-3 p-1 bg-secondary/60 rounded-2xl flex gap-1">
        {(['services', 'about', 'reviews', 'gallery'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-heading font-semibold capitalize transition-all duration-200 ${
              activeTab === tab
                ? 'bg-card text-foreground shadow-sm border border-border/50'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'services' && (
        <div className="animate-fade-in-up" style={{ animationDuration: '300ms' }}>
          {/* Artists - grid layout */}
          <div className="px-4 pt-4">
            <h3 className="font-heading font-semibold text-sm text-foreground mb-3">Our Artists</h3>
            <div className="grid grid-cols-5 gap-2 pb-2">
              {artists.map((artist) => (
                <div key={artist.id} className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-border">
                    <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[9px] font-body leading-tight truncate w-full text-center text-muted-foreground">{artist.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs + Service List in glass */}
          <div className="mx-3 glass-orange p-1">
            <div className="flex gap-2 px-3 pt-3 pb-2">
              {(['men', 'women', 'packages', 'outside'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setServiceTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-heading font-medium capitalize transition-all ${
                    serviceTab === tab ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="px-3 space-y-2 pt-1 pb-3">
              {filteredServices.map((service) => (
                <div key={service.id} className="flex items-center justify-between bg-card rounded-2xl p-3 card-shadow">
                  <div className="flex-1">
                    <h4 className="font-heading font-medium text-sm text-foreground">{service.name}</h4>
                    <span className="text-[10px] font-body text-muted-foreground bg-secondary px-2 py-0.5 rounded-full inline-block mt-1">
                      {service.duration}
                    </span>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="font-heading font-semibold text-sm text-foreground">₹{service.price}</span>
                      {service.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">₹{service.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  {cart[service.id] ? (
                    <div className="flex items-center gap-2 bg-primary/10 rounded-xl px-1">
                      <button onClick={() => removeFromCart(service.id)} className="p-1.5 text-primary">
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-heading font-semibold text-primary w-4 text-center">{cart[service.id]}</span>
                      <button onClick={() => addToCart(service.id)} className="p-1.5 text-primary">
                        <Plus size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(service.id)}
                      className="bg-primary text-primary-foreground text-xs font-heading font-medium px-4 py-2 rounded-xl active:scale-95 transition-transform animate-bounce-in"
                    >
                      Add
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <ReviewsSection
          artists={artists}
          reviews={reviews}
          selectedArtist={selectedArtist}
          onSelectArtist={setSelectedArtist}
        />
      )}

      {activeTab === 'about' && (
        <div className="px-4 pt-4 animate-fade-in-up" style={{ animationDuration: '300ms' }}>
          <h3 className="font-heading font-semibold text-sm text-foreground mb-2">About {salon.name}</h3>
          <p className="text-xs font-body text-muted-foreground leading-relaxed">
            A premium salon experience with expert stylists, modern equipment, and a relaxing ambiance.
            We specialize in haircuts, coloring, skin care, and bridal services. Our team of certified
            professionals ensures you leave looking and feeling your best.
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
              <Clock size={14} /> Mon-Sat: 9:00 AM - 9:00 PM
            </div>
            <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
              <MapPin size={14} /> {salon.address}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'gallery' && (
        <div className="px-4 pt-4 grid grid-cols-2 gap-2 animate-fade-in-up" style={{ animationDuration: '300ms' }}>
          {[salon.image, 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=300&fit=crop', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop', 'https://images.unsplash.com/photo-1521590832167-7228fcaeb733?w=300&h=300&fit=crop'].map((img, i) => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden">
              <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      )}

      {/* Sticky Bottom Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 z-50" style={{ boxShadow: 'var(--shadow-bottom-bar)', animation: 'slide-up 0.3s ease-out' }}>
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <div>
              <span className="text-xs font-body text-muted-foreground">{cartCount} service{cartCount > 1 ? 's' : ''}</span>
              <p className="font-heading font-bold text-lg text-foreground">₹{cartTotal}</p>
            </div>
            <button
              onClick={() => navigate(`/booking/${id}`, { state: { cart } })}
              className="bg-primary text-primary-foreground font-heading font-semibold text-sm px-6 py-3 rounded-2xl active:scale-95 transition-transform"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalonDetail;
