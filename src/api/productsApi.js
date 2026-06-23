const BASE_URL = "https://dummyjson.com";

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products?limit=0`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/products/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }

  return response.json();
};