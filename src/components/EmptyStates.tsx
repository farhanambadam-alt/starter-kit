import { CalendarX, MapPinOff, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  onAction: () => void;
}

export const FullyBookedState = ({ onAction }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-12 px-6 text-center animate-fade-in-up">
    <div className="w-20 h-20 rounded-full bg-accent/15 flex items-center justify-center mb-5">
      <CalendarX size={36} className="text-accent" />
    </div>
    <h3 className="font-heading font-bold text-lg text-foreground mb-2">
      Oops! We're totally booked today.
    </h3>
    <p className="text-sm font-body text-muted-foreground mb-6 max-w-[260px]">
      This date is fully reserved. Let us find the next available slot for you.
    </p>
    <button
      onClick={onAction}
      className="flex items-center gap-2 bg-primary text-primary-foreground font-heading font-semibold text-sm px-6 py-3 rounded-2xl active:scale-95 transition-transform"
    >
      <Sparkles size={16} />
      Show Next Available Slot
    </button>
  </div>
);

export const NoCoverageState = ({ onAction }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-12 px-6 text-center animate-fade-in-up">
    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
      <MapPinOff size={36} className="text-primary" />
    </div>
    <h3 className="font-heading font-bold text-lg text-foreground mb-2">
      We haven't reached your neighborhood yet!
    </h3>
    <p className="text-sm font-body text-muted-foreground mb-6 max-w-[260px]">
      At-home services aren't available in your area yet. Explore nearby salons instead.
    </p>
    <button
      onClick={onAction}
      className="flex items-center gap-2 bg-primary text-primary-foreground font-heading font-semibold text-sm px-6 py-3 rounded-2xl active:scale-95 transition-transform"
    >
      Explore Nearby Salons
      <ArrowRight size={16} />
    </button>
  </div>
);

export const EmptyCartState = ({ onAction }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-12 px-6 text-center animate-fade-in-up">
    <div className="w-20 h-20 rounded-full bg-accent/15 flex items-center justify-center mb-5">
      <ShoppingBag size={36} className="text-accent" />
    </div>
    <h3 className="font-heading font-bold text-lg text-foreground mb-2">
      Your pampering session awaits
    </h3>
    <p className="text-sm font-body text-muted-foreground mb-6 max-w-[260px]">
      Browse our curated services and treat yourself to something special.
    </p>
    <button
      onClick={onAction}
      className="flex items-center gap-2 bg-primary text-primary-foreground font-heading font-semibold text-sm px-6 py-3 rounded-2xl active:scale-95 transition-transform"
    >
      <Sparkles size={16} />
      Browse Trending Services
    </button>
  </div>
);
