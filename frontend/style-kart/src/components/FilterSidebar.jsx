function FilterSidebar({
  category,
  brand,
  minPrice,
  maxPrice,
  onCategoryChange,
  onBrandChange,
  onMinPriceChange,
  onMaxPriceChange,
}) {
  return (
    <aside className="w-full lg:w-64 lg:shrink-0">

      <div className="rounded-lg border bg-white p-5">

        <div>
          <h3 className="font-semibold">
            Category
          </h3>

          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="mt-3 w-full rounded border px-3 py-2"
          >
            <option value="">All Categories</option>
            <option value="T-Shirts">T-Shirts</option>
            <option value="Shirts">Shirts</option>
            <option value="Jeans">Jeans</option>
            <option value="Jackets">Jackets</option>
            <option value="Hoodies">Hoodies</option>
          </select>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">
            Brand
          </h3>

          <select
            value={brand}
            onChange={(e) => onBrandChange(e.target.value)}
            className="mt-3 w-full rounded border px-3 py-2"
          >
            <option value="">All Brands</option>
            <option value="StyleKart">StyleKart</option>
            <option value="UrbanFit">UrbanFit</option>
            <option value="DenimCo">DenimCo</option>
            <option value="StreetWear">StreetWear</option>
            <option value="FormalEdge">FormalEdge</option>
          </select>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">
            Price
          </h3>

          <input
            type="number"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            placeholder="Min price"
            className="mt-3 w-full rounded border px-3 py-2"
          />

          <input
            type="number"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            placeholder="Max price"
            className="mt-3 w-full rounded border px-3 py-2"
          />
        </div>

      </div>

    </aside>
  );
}

export default FilterSidebar;