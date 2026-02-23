import { useState, useEffect, useRef, useCallback } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import type { Artist, Review } from '@/types/salon';

interface ReviewsSectionProps {
  artists: Artist[];
  reviews: Review[];
  selectedArtist: string | null;
  onSelectArtist: (id: string | null) => void;
}

const CONTAINER_BG = '#F8F1E9';
const PILL_BORDER = '#EEE6E2';
const MUTED_BRONZE = '#9A7B6D';
const MUTED_TEXT = '#D1C2BA';
const DEEP_TRUFFLE = '#2C1E1A';
const EMPTY_STAR = '#EEE6E2';
const PAGE_BG = '#F2ECE7';
const REVIEW_TEXT = '#5C5450';

const reviewPhotos = [
  'https://images.unsplash.com/photo-1585747860019-8e8e13c2e4f2?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1622288432450-277d0fef5ed6?w=300&h=300&fit=crop',
];

const ReviewsSection = ({ artists, reviews, selectedArtist, onSelectArtist }: ReviewsSectionProps) => {
  const [isJiggling, setIsJiggling] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  // All artists including "All" at index 0
  const allItems = [{ id: null, name: 'All', avatar: '' }, ...artists.map(a => ({ id: a.id as string | null, name: a.name, avatar: a.avatar }))];
  const selectedIndex = selectedArtist ? allItems.findIndex(a => a.id === selectedArtist) : 0;

  const filteredReviews = reviews.filter((r) => {
    if (selectedArtist && r.artistId !== selectedArtist) return false;
    return true;
  });

  const currentArtist = artists.find((a) => a.id === selectedArtist);
  const avgRating = filteredReviews.length > 0
    ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(1)
    : '0.0';

  const triggerJelly = useCallback(() => {
    setIsJiggling(true);
    const timer = setTimeout(() => setIsJiggling(false), 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cleanup = triggerJelly();
    return cleanup;
  }, [selectedArtist, triggerJelly]);

  // Calculate pill position — each item is 20% width (for 5 items)
  const itemCount = allItems.length;
  const pillWidthPercent = 100 / Math.min(itemCount, 5);
  // If more than 5, we need scroll — but spec says 5 barbers + All = 6, let's use flexible width
  const pillLeft = `${selectedIndex * pillWidthPercent}%`;

  return (
    <div className="animate-fade-in-up" style={{ animationDuration: '300ms', background: PAGE_BG }}>
      {/* Section Header */}
      <div className="px-5 pt-5 pb-2">
        <h2 style={{ fontFamily: 'Playfair Display, serif', color: DEEP_TRUFFLE }} className="text-xl italic font-semibold">
          Our Stylists
        </h2>
      </div>

      {/* Barber Avatars Row — positioned above the jelly pill */}
      <div className="relative px-3" style={{ zIndex: 30 }}>
        <div ref={rowRef} className="flex justify-around items-end pb-1">
          {allItems.map((item, index) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={item.id ?? 'all'}
                onClick={() => onSelectArtist(item.id)}
                className="flex flex-col items-center gap-1 transition-all duration-300"
                style={{
                  flex: `0 0 ${pillWidthPercent}%`,
                  transform: isSelected ? 'scale(1.1)' : 'scale(0.9)',
                  opacity: isSelected ? 1 : 0.4,
                  filter: isSelected ? 'none' : 'grayscale(100%)',
                }}
              >
                {item.avatar ? (
                  <div
                    className="rounded-full overflow-hidden transition-all duration-300"
                    style={{
                      width: isSelected ? 56 : 48,
                      height: isSelected ? 56 : 48,
                      border: isSelected ? `2px solid ${MUTED_BRONZE}` : '2px solid transparent',
                      boxShadow: isSelected ? `0 4px 16px ${MUTED_BRONZE}40` : 'none',
                    }}
                  >
                    <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div
                    className="rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      width: isSelected ? 56 : 48,
                      height: isSelected ? 56 : 48,
                      background: isSelected ? MUTED_BRONZE : CONTAINER_BG,
                      border: isSelected ? `2px solid ${MUTED_BRONZE}` : `1.5px solid ${PILL_BORDER}`,
                      fontFamily: 'Playfair Display, serif',
                      color: isSelected ? '#FFFFFF' : DEEP_TRUFFLE,
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    ALL
                  </div>
                )}
                <span
                  className="truncate whitespace-nowrap text-center w-full"
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: 9,
                    fontWeight: 700,
                    color: isSelected ? DEEP_TRUFFLE : MUTED_TEXT,
                    maxWidth: 56,
                  }}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Layer 1: Jelly Pill — slides behind the selected avatar */}
        <div
          className="absolute top-0 transition-all"
          style={{
            left: pillLeft,
            width: `${pillWidthPercent}%`,
            height: 135,
            background: CONTAINER_BG,
            borderRadius: '38px 38px 0 0',
            zIndex: -1,
            transitionProperty: 'left',
            transitionDuration: '0.6s',
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            animation: isJiggling ? 'jelly 0.7s ease' : 'none',
            transformOrigin: 'bottom center',
          }}
        />
      </div>

      {/* Layer 2: Reviews Container — overlaps jelly pill bottom */}
      <div
        className="mx-3 mb-4 relative"
        style={{
          background: CONTAINER_BG,
          borderRadius: '55px 55px 28px 28px',
          marginTop: -24,
          zIndex: 20,
          boxShadow: '0 4px 16px rgba(44,30,26,0.04)',
          border: `1px solid ${PILL_BORDER}`,
          animation: isJiggling ? 'jelly-container 0.7s ease' : 'none',
          transformOrigin: 'top center',
        }}
      >
        {/* Artist Info + Reviews Header */}
        <div className="px-6 pt-8 pb-4">
          {currentArtist ? (
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0"
                style={{ border: `1.5px solid ${PILL_BORDER}` }}
              >
                <img src={currentArtist.avatar} alt={currentArtist.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-bold text-[15px] block truncate" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: DEEP_TRUFFLE }}>
                  {currentArtist.name}
                </span>
                <span className="text-[11px] block" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: MUTED_TEXT }}>
                  {currentArtist.specialty}
                </span>
                <div className="flex items-center gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11} style={i < Math.round(Number(avgRating)) ? { color: MUTED_BRONZE, fill: MUTED_BRONZE } : { color: EMPTY_STAR, fill: EMPTY_STAR }} />
                  ))}
                  <span className="text-[11px] font-semibold ml-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: MUTED_BRONZE }}>{avgRating}</span>
                </div>
              </div>
            </div>
          ) : null}

          <div className="flex items-center justify-between">
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 19 }}>
              {currentArtist ? (
                <span className="italic" style={{ color: MUTED_BRONZE }}>Reviews</span>
              ) : (
                <>
                  <span className="font-bold" style={{ color: DEEP_TRUFFLE }}>All</span>{' '}
                  <span className="italic" style={{ color: MUTED_BRONZE }}>Reviews</span>
                </>
              )}
            </h3>
            <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5" style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <Star size={13} style={{ color: MUTED_BRONZE, fill: MUTED_BRONZE }} />
              <span className="text-sm font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: DEEP_TRUFFLE }}>{avgRating}</span>
            </div>
          </div>
        </div>

        {/* Review Cards */}
        <div className="space-y-3 px-3 pb-4">
          {filteredReviews.map((review, index) => (
            <div
              key={review.id}
              className="p-6"
              style={{
                background: '#FFFFFF',
                borderRadius: 40,
                boxShadow: '0 10px 40px rgba(44,30,26,0.04)',
                border: `1px solid ${PILL_BORDER}30`,
                animation: `fade-in-up 0.4s ease-out ${index * 80}ms both`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: PAGE_BG, border: `1px solid ${PILL_BORDER}` }}
                  >
                    <span style={{ fontFamily: 'Playfair Display, serif', color: DEEP_TRUFFLE, fontSize: 16, fontWeight: 600 }}>
                      {review.userName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-[13px]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: DEEP_TRUFFLE }}>{review.userName}</span>
                      <CheckCircle2 size={13} style={{ color: MUTED_BRONZE }} />
                    </div>
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={11} style={i < review.rating ? { color: MUTED_BRONZE, fill: MUTED_BRONZE } : { color: EMPTY_STAR, fill: EMPTY_STAR }} />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-[9px] uppercase tracking-widest whitespace-nowrap pt-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: MUTED_TEXT }}>
                  {review.date}
                </span>
              </div>

              <div className="mb-3">
                <span
                  className="inline-block text-[9px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full"
                  style={{ background: CONTAINER_BG, color: MUTED_BRONZE, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  {review.service}
                </span>
              </div>

              <p className="text-[13px] leading-relaxed italic" style={{ fontFamily: 'Playfair Display, serif', color: REVIEW_TEXT }}>
                "{review.text}"
              </p>

              {review.hasPhoto && (
                <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
                  {reviewPhotos.map((photo, i) => (
                    <div key={i} className="flex-shrink-0 overflow-hidden" style={{ width: 208, height: 208, borderRadius: 32, border: '4px solid #FFFFFF', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                      <img src={photo} alt={`Review photo ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {filteredReviews.length === 0 && (
            <div className="text-center py-16">
              <div
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4"
                style={{ border: `2px dashed ${MUTED_TEXT}` }}
              >
                <Star size={28} style={{ color: MUTED_TEXT }} />
              </div>
              <p className="text-base italic" style={{ fontFamily: 'Playfair Display, serif', color: MUTED_BRONZE }}>
                Be the first to review{currentArtist ? ` ${currentArtist.name}` : ''}
              </p>
              <p className="text-[10px] mt-2 tracking-wide" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: MUTED_TEXT }}>
                Share your experience
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
