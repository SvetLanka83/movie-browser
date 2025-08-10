type Props = { value: number | undefined; className?: string };

// Simple 5-star visual based on TMDB 0..10 scale
export default function StarsRating({ value, className = '' }: Props) {
    if (typeof value !== 'number') return null;
    const filled = Math.round((value / 10) * 5);
    const stars = '★★★★★'.slice(0, filled).padEnd(5, '☆');
    return (
        <span
            className={`text-sm leading-none ${className}`}
            aria-label={`Rating ${value.toFixed(1)} of 10`}
            title={value.toFixed(1)}
        >
      {stars}
    </span>
    );
}
