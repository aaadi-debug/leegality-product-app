export function filterProducts(
  products,
  searchTerm,
  selectedCategories,
  minPrice,
  maxPrice,
  selectedBrands
) {
  return products.filter((product) => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const searchMatch =
      normalizedSearch === "" ||
      product.title.toLowerCase().includes(normalizedSearch) ||
      product.description.toLowerCase().includes(normalizedSearch) ||
      product.brand?.toLowerCase().includes(normalizedSearch);

    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const minPriceMatch =
      minPrice === "" || product.price >= Number(minPrice);

    const maxPriceMatch =
      maxPrice === "" || product.price <= Number(maxPrice);

    const brandMatch =
      selectedBrands.length === 0 ||
      selectedBrands.includes(product.brand);

    return (
      searchMatch &&
      categoryMatch &&
      minPriceMatch &&
      maxPriceMatch &&
      brandMatch
    );
  });
}