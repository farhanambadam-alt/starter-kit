import type { Category } from '@/types/salon';

interface CategoryChipsProps {
  categories: Category[];
  selected: string | null;
  onSelect: (id: string) => void;
}

const CategoryChips = ({ categories, selected, onSelect }: CategoryChipsProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto px-4 py-2.5 scrollbar-hide snap-x snap-mandatory">
      {categories.map((cat) => {
        const isActive = selected === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className="flex flex-col items-center gap-1 flex-shrink-0 snap-center"
          >
            <div
              className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all duration-200 ${
                isActive
                  ? 'border-primary scale-105 shadow-md'
                  : 'border-transparent opacity-70'
              }`}
            >
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <span className={`text-[10px] font-body font-medium whitespace-nowrap transition-colors ${
              isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
            }`}>
              {cat.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryChips;
