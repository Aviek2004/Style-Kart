function SearchBar({ value, onChange }) {
  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for products..."
        className="w-full rounded border px-4 py-3 outline-none focus:border-black"
      />
    </div>
  );
}

export default SearchBar;