import { API } from "../../http/API";

export async function getAllProducts(page) {
  return API.get(`/products?page=${page}`);
}

export async function getAllCategories() {
  return API.get(`/categories`);
}
export async function getCategoryProducts(category, page, subcategory, filter) {
  return API.get(`/filteredProduct/${category || null}/${subcategory || null}/${filter || null}?page=${page || 1}`);
}
