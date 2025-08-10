import type { ReactNode } from 'react';

type Props = { label: string; children: ReactNode };

// Generic info row: label + content (text or badges)
export default function MovieInfo({ label, children }: Props) {
    return (
        <div className="mb-2">
            <div className="text-xs uppercase tracking-wide text-black/60">{label}</div>
            <div>{children}</div>
        </div>
    );
}
