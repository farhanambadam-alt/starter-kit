import { Star, ShieldCheck, Clock } from 'lucide-react';
import type { Professional } from '@/types/salon';

interface ProfessionalCardProps {
  professional: Professional;
  onBook: (id: string) => void;
}

const ProfessionalCard = ({ professional, onBook }: ProfessionalCardProps) => {
  return (
    <div className="bg-card rounded-2xl overflow-hidden card-shadow animate-fade-in-up">
      <div className="relative">
        <img
          src={professional.avatar}
          alt={professional.name}
          className="w-full aspect-[4/3] object-cover"
        />
        {professional.verified && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-success/90 backdrop-blur-sm text-success-foreground text-[9px] font-heading font-semibold px-2 py-1 rounded-lg">
            <ShieldCheck size={10} />
            Verified
          </div>
        )}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-card/90 backdrop-blur-sm text-foreground text-[10px] font-heading font-semibold px-2 py-1 rounded-lg">
          <Star size={10} className="text-accent fill-accent" />
          {professional.rating}
        </div>
      </div>
      <div className="p-3">
        <h4 className="font-heading font-semibold text-sm text-foreground truncate">{professional.name}</h4>
        <p className="text-[11px] font-body text-muted-foreground mt-0.5">{professional.specialty}</p>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center gap-1 text-[10px] font-body text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            <Clock size={9} />
            {professional.arrivalTime}
          </div>
          {professional.tags.slice(0, 1).map(tag => (
            <span key={tag} className="text-[10px] font-body text-accent bg-accent/10 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-border">
          <span className="text-xs font-body text-muted-foreground">From <span className="font-heading font-semibold text-foreground">₹{professional.startingPrice}</span></span>
          <button
            onClick={() => onBook(professional.id)}
            className="bg-primary text-primary-foreground text-[11px] font-heading font-semibold px-4 py-2 rounded-xl active:scale-95 transition-transform"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;
