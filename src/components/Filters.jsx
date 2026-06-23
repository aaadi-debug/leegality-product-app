function Filters({
    categories,
    brands,
    selectedCategories,
    selectedBrands,
    minPrice,
    maxPrice,
    onCategoryChange,
    onClearCategories,
    onBrandChange,
    onMinPriceChange,
    onMaxPriceChange,
    onClearFilters,
}) {
    return (
        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800">Filters</h2>

                <button
                    onClick={onClearFilters}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                    Clear
                </button>
            </div>

            {/* Category */}
            <div className="border-b border-slate-200 pb-5">
                <h3 className="mb-3 font-semibold text-slate-800">Categories</h3>

                <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                        <input
                            type="checkbox"
                            checked={selectedCategories.length === 0}
                            onChange={onClearCategories}
                            className="accent-blue-600"
                        />
                        All Categories
                    </label>

                    {categories.map((category) => (
                        <label
                            key={category.slug}
                            className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                        >
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category.slug)}
                                onChange={() => onCategoryChange(category.slug)}
                                className="accent-blue-600"
                            />
                            {category.name}
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="border-b border-slate-200 py-5">
                <h3 className="mb-3 font-semibold text-slate-800">Price Range</h3>

                <div className="flex gap-2">
                    <input
                        type="number"
                        min="0"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(event) => onMinPriceChange(event.target.value)}
                        className="w-1/2 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                    <input
                        type="number"
                        min="0"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(event) => onMaxPriceChange(event.target.value)}
                        className="w-1/2 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Brands */}
            <div className="pt-5">
                <h3 className="mb-3 font-semibold text-slate-800">Brands</h3>

                <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                    {brands.map((brand) => (
                        <label
                            key={brand}
                            className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                        >
                            <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand)}
                                onChange={() => onBrandChange(brand)}
                                className="accent-blue-600"
                            />
                            {brand}
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
}

export default Filters;