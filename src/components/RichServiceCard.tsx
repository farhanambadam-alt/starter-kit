import { useState } from 'react';
import { Plus, Check, Clock } from 'lucide-react';
import type { ServiceWithImage } from '@/types/salon';

interface RichServiceCardProps {
  service: ServiceWithImage;
  isAdded: boolean;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  qty: number;
}

const RichServiceCard = ({ service, isAdded, onAdd, onRemove, qty }: RichServiceCardProps) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAdd(service.id);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 600);
  };

  return (
    <div className="flex gap-3 bg-card rounded-2xl p-3 card-shadow animate-fade-in-up">
      <img
        src={service.image}
        alt={service.name}
        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h4 className="font-heading font-semibold text-sm text-foreground leading-tight">{service.name}</h4>
          <p className="text-[10px] font-body text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">{service.description}</p>
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[10px] font-body text-muted-foreground">
              <Clock size={10} />
              {service.duration}
            </div>
            <div className="flex items-center gap-1.5">
              {service.originalPrice && (
                <span className="text-[11px] text-muted-foreground line-through">₹{service.originalPrice}</span>
              )}
              <span className="font-heading font-semibold text-sm text-foreground">₹{service.price}</span>
            </div>
          </div>
          {isAdded ? (
            <div className="flex items-center gap-1.5 bg-primary/10 rounded-xl px-1.5">
              <button onClick={() => onRemove(service.id)} className="p-1 text-primary font-bold text-sm">−</button>
              <span className="text-xs font-heading font-semibold text-primary w-4 text-center">{qty}</span>
              <button onClick={handleAdd} className="p-1 text-primary font-bold text-sm">+</button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className={`flex items-center gap-1 text-[11px] font-heading font-semibold px-3.5 py-1.5 rounded-xl active:scale-95 transition-all duration-200 ${
                justAdded
                  ? 'bg-success text-success-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              {justAdded ? <Check size={12} /> : <Plus size={12} />}
              {justAdded ? 'Added' : 'Add'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RichServiceCard;
