
export default function Pagination({
                                       page,
                                       total,
                                       onChange,
                                   }: {
    page: number;
    total: number;
    onChange: (p: number) => void;
}) {
    // Go to the previous page if not on the first page
    const prev = () => page > 1 && onChange(page - 1);

    // Go to the next page if not on the last page
    const next = () => page < total && onChange(page + 1);

    return (
        // Container: flex layout, center-aligned with spacing and padding
        <div className="flex gap-2 items-center justify-center p-4">
            {/* Previous page button, disabled on first page */}
            <button
                className="px-3 py-1 border rounded"
                onClick={prev}
                disabled={page <= 1}
            >
                ‹ Prev
            </button>

            {/* Page info text */}
            <span className="text-sm">
        Page {page} / {total}
      </span>

            {/* Next page button, disabled on last page */}
            <button
                className="px-3 py-1 border rounded"
                onClick={next}
                disabled={page >= total}
            >
                Next ›
            </button>
        </div>
    );
}
