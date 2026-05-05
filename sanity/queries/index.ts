import { sanityFetch } from "../lib/live";
import {
  BLOG_CATEGORIES,
  BRAND_QUERY,
  BRANDS_QUERY,
  DEAL_PRODUCTS,
  GET_ALL_BLOG,
  LATEST_BLOG_QUERY,
  MY_ORDERS_QUERY,
  OTHERS_BLOG_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  SINGLE_BLOG_QUERY,
} from "./query";

// ✅ Categories
const getCategories = async (quantity?: number) => {
  try {
    const query = quantity
      ? `*[_type == 'category'] | order(name asc) [0...$quantity] {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`
      : `*[_type == 'category'] | order(name asc) {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`;

    const { data } = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    });

    return data ?? [];
  } catch (error) {
    console.log("Error fetching categories", error);
    return [];
  }
};

// ✅ Brands
const getAllBrands = async () => {
  try {
    const { data } = await sanityFetch({ query: BRANDS_QUERY });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

// ✅ Blogs
const getLatestBlogs = async () => {
  try {
    const { data } = await sanityFetch({ query: LATEST_BLOG_QUERY });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching latest blogs:", error);
    return [];
  }
};

const getAllBlogs = async (quantity: number) => {
  try {
    const { data } = await sanityFetch({
      query: GET_ALL_BLOG,
      params: { quantity },
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all blogs:", error);
    return [];
  }
};

// ✅ 🔥 FIXED SINGLE BLOG (MOST IMPORTANT)
const getSingleBlog = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: SINGLE_BLOG_QUERY, // MUST have [0] inside query
      params: { slug },
    });

    return data ?? null; // ✅ NOT []
  } catch (error) {
    console.log("Error fetching single blog:", error);
    return null; // ✅ NOT []
  }
};

// ✅ Blog Categories
const getBlogCategories = async () => {
  try {
    const { data } = await sanityFetch({
      query: BLOG_CATEGORIES,
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching blog categories:", error);
    return [];
  }
};

// ✅ Other Blogs
const getOthersBlog = async (slug: string, quantity: number) => {
  try {
    const { data } = await sanityFetch({
      query: OTHERS_BLOG_QUERY,
      params: { slug, quantity },
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching other blogs:", error);
    return [];
  }
};

// ✅ Products
const getDealProducts = async () => {
  try {
    const { data } = await sanityFetch({ query: DEAL_PRODUCTS });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching deal products:", error);
    return [];
  }
};

import { PRODUCT_BY_SLUG_QUERY_RESULT } from "@/sanity.types";

const getProductBySlug = async (
  slug: string
): Promise<PRODUCT_BY_SLUG_QUERY_RESULT> => {
  try {
    const { data } = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });

    return data ?? null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// ✅ Brand
const getBrand = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: BRAND_QUERY,
      params: { slug },
    });
    return data ?? null;
  } catch (error) {
    console.error("Error fetching brand:", error);
    return null;
  }
};

// ✅ Orders
const getMyOrders = async (userId: string) => {
  try {
    const { data } = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return data ?? null;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
};

export {
  getCategories,
  getAllBrands,
  getLatestBlogs,
  getDealProducts,
  getProductBySlug,
  getBrand,
  getMyOrders,
  getAllBlogs,
  getSingleBlog,
  getBlogCategories,
  getOthersBlog,
};