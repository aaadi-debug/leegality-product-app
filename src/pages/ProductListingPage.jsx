import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import Header from "../components/Header";
import Filters from "../components/Filters";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { getCategories, getProducts } from "../api/productsApi";
import { filterProducts } from "../utils/filterProducts";

const PRODUCTS_PER_PAGE = 8;

function ProductListingPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // const [selectedCategories, setSelectedCategories] = useState([]);
    // const [selectedBrands, setSelectedBrands] = useState([]);
    // const [minPrice, setMinPrice] = useState("");
    // const [maxPrice, setMaxPrice] = useState("");
    // const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState(() =>
        searchParams.get("categories")
            ? searchParams.get("categories").split(",").filter(Boolean)
            : []
    );

    const [selectedBrands, setSelectedBrands] = useState(() =>
        searchParams.get("brands")
            ? searchParams.get("brands").split(",").filter(Boolean)
            : []
    );

    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

    const [currentPage, setCurrentPage] = useState(() => {
        const pageFromUrl = Number(searchParams.get("page"));
        return pageFromUrl > 0 ? pageFromUrl : 1;
    });

    const [searchTerm, setSearchTerm] = useState(
        searchParams.get("search") || ""
    );

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchInitialData() {
            try {
                setLoading(true);
                setError("");

                const [productsData, categoriesData] = await Promise.all([
                    getProducts(),
                    getCategories(),
                ]);

                setProducts(productsData.products);
                setCategories(categoriesData);
            } catch (err) {
                setError(err.message || "Something went wrong while loading products.");
            } finally {
                setLoading(false);
            }
        }

        fetchInitialData();
    }, []);

    useEffect(() => {
        const params = {};

        if (selectedCategories.length > 0) {
            params.categories = selectedCategories.join(",");
        }

        if (selectedBrands.length > 0) {
            params.brands = selectedBrands.join(",");
        }

        if (minPrice !== "") {
            params.minPrice = minPrice;
        }

        if (maxPrice !== "") {
            params.maxPrice = maxPrice;
        }

        if (currentPage > 1) {
            params.page = String(currentPage);
        }

        if (searchTerm.trim() !== "") {
            params.search = searchTerm;
        }

        setSearchParams(params);
    }, [
        selectedCategories,
        selectedBrands,
        minPrice,
        maxPrice,
        currentPage,
        searchTerm,
        setSearchParams,
    ]);

    const brands = useMemo(() => {
        return [...new Set(products.map((product) => product.brand))]
            .filter(Boolean)
            .sort();
    }, [products]);

    const filteredProducts = useMemo(() => {
        return filterProducts(
            products,
            //   selectedCategory,
            searchTerm,
            selectedCategories,
            minPrice,
            maxPrice,
            selectedBrands
        );
    }, [products, searchTerm, selectedCategories, minPrice, maxPrice, selectedBrands]);

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [currentPage, totalPages]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

        return filteredProducts.slice(
            startIndex,
            startIndex + PRODUCTS_PER_PAGE
        );
    }, [filteredProducts, currentPage]);

    function resetToFirstPage() {
        setCurrentPage(1);
    }

    function handleSearchChange(value) {
        setSearchTerm(value);
        resetToFirstPage();
    }

    // function handleCategoryChange(category) {
    //     setSelectedCategory(category);
    //     resetToFirstPage();
    // }
    function handleCategoryChange(category) {
        setSelectedCategories((previousCategories) => {
            if (previousCategories.includes(category)) {
                return previousCategories.filter((item) => item !== category);
            }

            return [...previousCategories, category];
        });

        resetToFirstPage();
    }

    function handleClearCategories() {
        setSelectedCategories([]);
        resetToFirstPage();
    }

    function handleMinPriceChange(value) {
        setMinPrice(value);
        resetToFirstPage();
    }

    function handleMaxPriceChange(value) {
        setMaxPrice(value);
        resetToFirstPage();
    }

    function handleBrandChange(brand) {
        setSelectedBrands((previousBrands) => {
            if (previousBrands.includes(brand)) {
                return previousBrands.filter((item) => item !== brand);
            }

            return [...previousBrands, brand];
        });

        resetToFirstPage();
    }

    function handleClearFilters() {
        // setSelectedCategory("");
        setSearchTerm("");
        setSelectedCategories([]);
        setSelectedBrands([]);
        setMinPrice("");
        setMaxPrice("");
        resetToFirstPage();
    }

    if (loading) {
        return (
            <>
                <Header
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                />
                <Loader />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                />
                <main className="mx-auto max-w-7xl px-4 py-8">
                    <ErrorMessage message={error} />
                </main>
            </>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Header
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
            />

            <main className="mx-auto max-w-7xl px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Explore Products
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            {filteredProducts.length} products found
                        </p>
                    </div>

                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm lg:hidden"
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                    </button>
                </div>

                <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
                    <div className="hidden lg:block">
                        <Filters
                            categories={categories}
                            brands={brands}
                            // selectedCategory={selectedCategory}
                            selectedCategories={selectedCategories}
                            selectedBrands={selectedBrands}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            onCategoryChange={handleCategoryChange}
                            onClearCategories={handleClearCategories}
                            onBrandChange={handleBrandChange}
                            onMinPriceChange={handleMinPriceChange}
                            onMaxPriceChange={handleMaxPriceChange}
                            onClearFilters={handleClearFilters}
                        />
                    </div>

                    <section>
                        <ProductGrid products={paginatedProducts} onClearFilters={handleClearFilters} />

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </section>
                </div>
            </main>

            {/* Mobile filter drawer */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 lg:hidden">
                    <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-slate-50 p-4 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-800">Filters</h2>

                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200"
                            >
                                Close
                            </button>
                        </div>

                        <Filters
                            categories={categories}
                            brands={brands}
                            // selectedCategory={selectedCategory}
                            selectedCategories={selectedCategories}
                            selectedBrands={selectedBrands}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            onCategoryChange={handleCategoryChange}
                            onClearCategories={handleClearCategories}
                            onBrandChange={handleBrandChange}
                            onMinPriceChange={handleMinPriceChange}
                            onMaxPriceChange={handleMaxPriceChange}
                            onClearFilters={handleClearFilters}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductListingPage;