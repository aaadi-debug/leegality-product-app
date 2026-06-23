function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  function getPageNumbers() {
    const pages = [];

    // For small page counts, show all pages
    if (totalPages <= 7) {
      for (let page = 1; page <= totalPages; page++) {
        pages.push(page);
      }

      return pages;
    }

    // Always show first page
    pages.push(1);

    // Show left ellipsis when current page is far from start
    if (currentPage > 4) {
      pages.push("left-ellipsis");
    }

    // Show pages around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    // Show right ellipsis when current page is far from end
    if (currentPage < totalPages - 3) {
      pages.push("right-ellipsis");
    }

    // Always show last page
    pages.push(totalPages);

    return pages;
  }

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        ← Previous
      </button>

      {pageNumbers.map((page) => {
        if (typeof page === "string") {
          return (
            <span
              key={page}
              className="px-2 py-2 text-sm font-semibold text-slate-500"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={`min-w-10 rounded-md border px-3 py-2 text-sm font-medium transition cursor-pointer ${
              currentPage === page
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        Next →
      </button>
    </nav>
  );
}

export default Pagination;