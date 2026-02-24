import { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Artist, Review } from '@/types/salon';

interface ReviewsSectionProps {
  artists: Artist[];
  reviews: Review[];
  selectedArtist: string | null;
  onSelectArtist: (id: string | null) => void;
}

const CONTAINER_BG = '#F8F1E9';
const PILL_BORDER = '#E8DED6';
const MUTED_TAUPE = '#9C918C';
const MUTED_BRONZE = '#9A7B6D';
const EMPTY_STAR = '#E8DED6';
const PAGE_BG = '#F2ECE7';

const ReviewsSection = ({ artists, reviews, selectedArtist, onSelectArtist }: ReviewsSectionProps) => {
  const [reviewFilter] = useState<string>('all');
  const [isJiggling, setIsJiggling] = useState(false);

  const filteredReviews = reviews.filter((r) => {
    if (selectedArtist && r.artistId !== selectedArtist) return false;
    if (reviewFilter === 'all') return true;
    if (reviewFilter === '5') return r.rating === 5;
    if (reviewFilter === '4') return r.rating >= 4;
    if (reviewFilter === 'photos') return r.hasPhoto;
    return true;
  });

  const currentArtist = artists.find((a) => a.id === selectedArtist);
  const avgRating = filteredReviews.length > 0
    ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(1)
    : '0.0';

  const reviewPhotos = [
    'https://images.unsplash.com/photo-1585747860019-8e8e13c2e4f2?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1622288432450-277d0fef5ed6?w=300&h=300&fit=crop',
  ];

  useEffect(() => {
    setIsJiggling(true);
    const timer = setTimeout(() => setIsJiggling(false), 700);
    return () => clearTimeout(timer);
  }, [selectedArtist]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    updateScrollButtons();
  }, []);

  const scrollBy = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 160, behavior: 'smooth' });
  };

  return (
    <div className="animate-fade-in-up" style={{ animationDuration: '300ms', background: PAGE_BG }}>
      {/* Our Stylists Header */}
      <div className="px-5 pt-5 pb-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl text-truffle italic">Our Stylists</h2>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-20 active:scale-90"
              style={{ background: '#FFFFFF', border: `1.5px solid ${canScrollLeft ? MUTED_BRONZE : PILL_BORDER}`, boxShadow: canScrollLeft ? '0 2px 8px rgba(0,0,0,0.08)' : 'none' }}
            >
              <ChevronLeft size={16} style={{ color: canScrollLeft ? MUTED_BRONZE : MUTED_TAUPE }} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={!canScrollRight}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-20 active:scale-90"
              style={{ background: canScrollRight ? MUTED_BRONZE : '#FFFFFF', border: `1.5px solid ${canScrollRight ? MUTED_BRONZE : PILL_BORDER}`, boxShadow: canScrollRight ? '0 2px 8px rgba(0,0,0,0.1)' : 'none' }}
            >
              <ChevronRight size={16} style={{ color: canScrollRight ? '#FFFFFF' : MUTED_TAUPE }} />
            </button>
          </div>
        </div>

        {/* Artist Selector — horizontally scrollable with arrows */}
        <div
          ref={scrollRef}
          onScroll={updateScrollButtons}
          className="flex overflow-x-auto scrollbar-hide pb-3 items-end gap-3"
        >
          {/* All button */}
          <button
            onClick={() => onSelectArtist(null)}
            className="flex flex-col items-center flex-shrink-0"
          >
            <div
              className={`rounded-xl flex items-center justify-center font-sans font-bold text-truffle transition-all duration-300 ease-out ${
                !selectedArtist
                  ? 'w-14 h-14 sm:w-16 sm:h-16 text-xs ring-2 ring-bronze/50 shadow-md'
                  : 'w-12 h-12 sm:w-14 sm:h-14 text-[11px]'
              }`}
              style={{
                background: CONTAINER_BG,
                border: `1.5px solid ${!selectedArtist ? MUTED_BRONZE : PILL_BORDER}`,
                ...((!selectedArtist && isJiggling) ? { animation: 'jelly 0.55s ease', transformOrigin: 'bottom center' } : {}),
              }}
            >
              ALL
            </div>
            {!selectedArtist && (
              <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ background: MUTED_BRONZE }} />
            )}
          </button>

          {artists.map((artist) => {
            const isSelected = selectedArtist === artist.id;
            return (
              <button
                key={artist.id}
                onClick={() => onSelectArtist(isSelected ? null : artist.id)}
                className="flex flex-col items-center flex-shrink-0"
              >
                <div
                  className={`rounded-xl overflow-hidden transition-all duration-300 ease-out ${
                    isSelected
                      ? 'w-14 h-14 sm:w-16 sm:h-16 ring-2 ring-bronze/50 shadow-md'
                      : 'w-12 h-12 sm:w-14 sm:h-14'
                  }`}
                  style={{
                    border: `${isSelected ? '2px' : '1px'} solid ${isSelected ? MUTED_BRONZE : PILL_BORDER}`,
                    ...(isSelected && isJiggling ? { animation: 'jelly 0.55s ease', transformOrigin: 'bottom center' } : {}),
                  }}
                >
                  <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover" />
                </div>
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ background: MUTED_BRONZE }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Unified Reviews Container — single bordered card */}
      <div
        className="mx-3 mb-4"
        style={{
          background: CONTAINER_BG,
          borderRadius: '1.25rem',
          border: `1px solid ${PILL_BORDER}`,
          boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          animation: isJiggling ? 'jelly-container 0.5s ease' : 'none',
          transformOrigin: 'top center',
        }}
      >
        {/* Artist Info Bar + Reviews Header */}
        <div className="px-5 pt-5 pb-3">
          {currentArtist ? (
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0"
                style={{ border: `1.5px solid ${PILL_BORDER}` }}
              >
                <img src={currentArtist.avatar} alt={currentArtist.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-sans font-bold text-[15px] block truncate" style={{ color: '#2C1E1A' }}>
                  {currentArtist.name}
                </span>
                <div className="flex items-center gap-1 mt-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={11}
                      style={
                        i < Math.round(Number(avgRating))
                          ? { color: MUTED_BRONZE, fill: MUTED_BRONZE }
                          : { color: EMPTY_STAR, fill: EMPTY_STAR }
                      }
                    />
                  ))}
                  <span className="text-[11px] font-sans font-semibold ml-1" style={{ color: MUTED_BRONZE }}>
                    {avgRating}
                  </span>
                </div>
              </div>
            </div>
          ) : null}
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-[19px]">
              {currentArtist ? (
                <span className="italic font-serif" style={{ color: MUTED_BRONZE }}>Reviews</span>
              ) : (
                <>
                  <span className="font-bold" style={{ color: '#2C1E1A' }}>All</span>{' '}
                  <span className="italic font-serif" style={{ color: MUTED_BRONZE }}>Reviews</span>
                </>
              )}
            </h3>
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              <Star size={13} style={{ color: MUTED_BRONZE, fill: MUTED_BRONZE }} />
              <span className="text-sm font-sans font-bold text-truffle">{avgRating}</span>
            </div>
          </div>
        </div>

        {/* Review Cards */}
        <div className="space-y-3 px-2 pb-3">
          {filteredReviews.map((review, index) => (
            <div
              key={review.id}
              className="rounded-[28px] p-5"
              style={{
                background: '#FFFFFF',
                boxShadow: '0 8px 30px rgb(0 0 0 / 0.04)',
                animation: `fade-in-up 0.4s ease-out ${index * 80}ms both`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: CONTAINER_BG, border: `1px solid ${PILL_BORDER}` }}
                  >
                    <span className="font-serif text-base font-semibold text-truffle">
                      {review.userName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans font-semibold text-[13px] text-truffle">{review.userName}</span>
                      <CheckCircle2 size={13} style={{ color: MUTED_BRONZE }} className="fill-bronze/10" />
                    </div>
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          style={
                            i < review.rating
                              ? { color: MUTED_BRONZE, fill: MUTED_BRONZE }
                              : { color: EMPTY_STAR, fill: EMPTY_STAR }
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span
                  className="text-[9px] font-sans uppercase tracking-widest whitespace-nowrap pt-1"
                  style={{ color: MUTED_TAUPE }}
                >
                  {review.date}
                </span>
              </div>

              <div className="mb-3">
                <span
                  className="inline-block text-[9px] font-sans font-bold text-truffle uppercase tracking-widest px-3.5 py-1 rounded-full"
                  style={{ background: CONTAINER_BG, border: `1px solid ${PILL_BORDER}` }}
                >
                  {review.service}
                </span>
              </div>

              <p className="text-[13px] font-sans text-truffle/75 leading-relaxed italic">
                "{review.text}"
              </p>

              {review.hasPhoto && (
                <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
                  {reviewPhotos.map((photo, i) => (
                    <div key={i} className="w-36 h-36 flex-shrink-0 rounded-2xl overflow-hidden">
                      <img src={photo} alt={`Review photo ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {filteredReviews.length === 0 && (
            <div className="text-center py-14">
              <p className="font-serif text-base italic" style={{ color: MUTED_BRONZE }}>
                No reviews yet for this stylist...
              </p>
              <p className="text-[10px] font-sans mt-2 tracking-wide" style={{ color: MUTED_TAUPE }}>
                Be the first to share your experience
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
