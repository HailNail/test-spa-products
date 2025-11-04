import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating: number;
}
const RatingStars = ({ rating }: RatingStarsProps) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex gap-1 text-yellow-400">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          fill="currentColor"
          stroke="oklch(37.543% 0.09415 46.647)"
          strokeWidth={1.5}
        />
      ))}
      {hasHalf && (
        <StarHalf
          key="half"
          fill="currentColor"
          stroke="oklch(37.543% 0.09415 46.647)"
          strokeWidth={1.5}
        />
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          fill="none"
          stroke="oklch(37.543% 0.09415 46.647)"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
};

export default RatingStars;
