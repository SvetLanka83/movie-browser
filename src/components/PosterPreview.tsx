import { poster } from '../api/tmdb';

type Props = {
    path: string | null;                       // TMDB poster_path
    alt: string;                               // Accessible alt text
    size?: 'w200' | 'w300' | 'w500';           // TMDB image size
    className?: string;
};

// Small poster with 2:3 ratio and rounded corners
export default function PosterPreview({ path, alt, size = 'w300', className = '' }: Props) {
    return (
        <img
            src={poster(path, size)}
            alt={alt}
            loading="lazy"
            className={`aspect-[2/3] w-full rounded-md bg-gray-200 object-cover ${className}`}
        />
    );
}
