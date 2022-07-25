import { API } from "../../http/API";

export async function getAllProducts(page) {
  return API.get(`/products?page=${page}`);
}

export async function getAllCategories() {
  return API.get(`/categories`);
}
export async function getCategoryProducts(category, page, subcategory, filter) {
  return API.get(`/filteredProduct/${category || null}/${subcategory || null}/${filter || null}?page=${page || 1}`);
  
  // if (category && !subcategory && !filter) {
  //   return API.get(`/filteredProduct?search=${category}&page=${page || 1}`);
  // }
  // if (category && subcategory && !filter) {
  //   return API.get(
  //     `/filteredProduct?search=${category}&sub_category=${subcategory}&page=${
  //       page || 1
  //     }`
  //   );
  // }
  // if (category && subcategory && filter) {
  //   return API.get(
  //     `/filteredProduct?search=${category}&sub_category=${subcategory}&filter=${filter}&page=${
  //       page || 1
  //     }`
  //   );
  // }
  // if (!category && !subcategory && filter) {
  //   return API.get(`/filteredProduct?filter=${filter}&page=${page || 1}`);
  // }
  // if (category && !subcategory && filter) {
  //   return API.get(
  //     `/filteredProduct?search=${category}&filter=${filter}&page=${page || 1}`
  //   );
  // }
  // return API.get(`/filteredProduct?search=${category}&page=${page || 1}`);
}

export async function getSearchRecords() {
  return API.get(`/search`);
}
