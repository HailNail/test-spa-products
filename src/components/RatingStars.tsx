import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating: number;
}
const RatingStars = ({ rating }: RatingStarsProps) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex gap-1 text-primary">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={1.5}
        />
      ))}
      {hasHalf && (
        <StarHalf
          key="half"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={1.5}
        />
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
};

export default RatingStars;
