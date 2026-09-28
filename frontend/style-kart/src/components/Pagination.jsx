function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="mt-10 flex justify-center gap-2">

      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`h-10 w-10 rounded border ${
            currentPage === page
              ? "bg-black text-white"
              : "bg-white"
          }`}
        >
          {page}
        </button>
      ))}

    </div>
  );
}

export default Pagination;