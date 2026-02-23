import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Salon } from '@/types/salon';

interface NearbySalonCardProps {
  salon: Salon;
}

const NearbySalonCard = ({ salon }: NearbySalonCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/salon/${salon.id}`)}
      className="flex-shrink-0 w-44 sm:w-52 bg-card border border-border rounded-xl overflow-hidden card-shadow transition-all duration-200 active:scale-[0.97] cursor-pointer"
    >
      <div className="relative h-28 sm:h-32">
        <img src={salon.image} alt={salon.name} className="w-full h-full object-cover" loading="lazy" />
        <span className={`absolute top-2 right-2 text-[9px] font-semibold font-body px-2 py-0.5 rounded-full ${
          salon.isOpen ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'
        }`}>
          {salon.isOpen ? 'Open' : 'Closed'}
        </span>
      </div>
      <div className="p-2.5">
        <h4 className="font-body font-semibold text-[13px] text-foreground truncate">{salon.name}</h4>
        <div className="flex items-center gap-1 mt-0.5">
          <Star size={11} className="text-primary fill-primary" />
          <span className="text-[11px] font-body text-foreground">{salon.rating}</span>
          <span className="text-[11px] text-muted-foreground">· {salon.distance}</span>
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[11px] text-muted-foreground font-body">₹{salon.startingPrice}+</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/salon/${salon.id}`);
            }}
            className="text-[10px] font-body font-bold text-primary-foreground bg-primary px-2.5 py-1 rounded-md active:scale-95 transition-transform"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default NearbySalonCard;
