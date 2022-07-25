import { types } from "./types";

let initialState = {
  allProducts: [],
  userWishlistProducts: [],
  products: [],
  categoryProducts: [],
  categories: [],
  totalProducts: 0,
  searchData: {
    products: [],
    categories: [],
  },
};
export const productReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: [...action.payload.products],
        totalProducts: action.payload.totalProducts,
      };
    case "GET_ALL_PRODUCTS_SUCCESS":
      return {
        ...state,
        allProducts: [...action.payload.products],
      };
    case "GET_SEARCH_LIST_SUCCESS":
      return {
        ...state,
        searchData: { ...action.payload.searchData },
      };
    case "GET_WISHLIST_SUCCESS":
      return {
        ...state,
        userWishlistProducts: [...action.payload.wishlist],
      };
    case types.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: [
          ...action.payload.categories?.sort(
            (a, b) => a.order - b.order
          ),
        ],
      };
    case types.GET_CATEGORY_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: [...action.payload.products],
        totalProducts: action.payload.totalProducts,
      };
    case "GET_ALL_CATEGORY_PRODUCTS_SUCCESS":
      // debugger;
      return {
        ...state,
        categoryProducts: [...action.payload.products],
      };
    default: {
      return state;
    }
  }
};
