import { defineQuery } from "next-sanity";

/* ------------------ BRANDS ------------------ */
const BRANDS_QUERY = defineQuery(
  `*[_type=='brand'] | order(name asc)`
);

/* ------------------ BLOG ------------------ */
const LATEST_BLOG_QUERY = defineQuery(`
*[_type == 'blog' && isLatest == true] | order(name asc){
  ...,
  blogcategories[]->{
    title
  }
}`);

const GET_ALL_BLOG = defineQuery(`
*[_type == 'blog'] | order(publishedAt desc)[0...$quantity]{
  ...,
  blogcategories[]->{
    title
  }
}`);

const SINGLE_BLOG_QUERY = defineQuery(`
*[_type == "blog" && slug.current == $slug][0]{
  ...,
  author->{
    name,
    image,
  },
  blogcategories[]->{
    title,
    "slug": slug.current,
  }
}`);

const BLOG_CATEGORIES = defineQuery(`
*[_type == "blog"]{
  blogcategories[]->{
    ...
  }
}`);

const OTHERS_BLOG_QUERY = defineQuery(`
*[
  _type == "blog"
  && defined(slug.current)
  && slug.current != $slug
] | order(publishedAt desc)[0...$quantity]{
  ...,
  publishedAt,
  title,
  mainImage,
  slug,
  author->{
    name,
    image,
  },
  categories[]->{
    title,
    "slug": slug.current,
  }
}`);

/* ------------------ PRODUCTS ------------------ */

// 🔥 Deal / Hot products
const DEAL_PRODUCTS = defineQuery(`
*[_type == 'product' && status == 'hot'] | order(name asc){
  ...,
  "categories": categories[]->title
}`);

// ✅ Improved product by slug (clean + includes categories)
const PRODUCT_BY_SLUG_QUERY = defineQuery(`
*[_type == "product" && slug.current == $slug][0]{
  ...,
  "categories": categories[]->title
}`);

// 🔥 Related products (NEW)
const RELATED_PRODUCTS_QUERY = defineQuery(`
*[_type == "product" && _id != $currentId && variant == $variant][0...4]{
  ...,
  "categories": categories[]->title
}`);

// 🔹 Brand name for product
const BRAND_QUERY = defineQuery(`
*[_type == "product" && slug.current == $slug]{
  "brandName": brand->title
}`);

/* ------------------ ORDERS ------------------ */

// ✅ FIXED (orderDate instead of wrong orderData)
const MY_ORDERS_QUERY = defineQuery(`
*[_type == 'order' && clerkUserId == $userId] | order(orderDate desc){
  ...,
  products[]{
    ...,
    product->
  }
}`);

export {
  BRANDS_QUERY,
  LATEST_BLOG_QUERY,
  DEAL_PRODUCTS,
  PRODUCT_BY_SLUG_QUERY,
  RELATED_PRODUCTS_QUERY, // ✅ NEW
  BRAND_QUERY,
  MY_ORDERS_QUERY,
  GET_ALL_BLOG,
  SINGLE_BLOG_QUERY,
  BLOG_CATEGORIES,
  OTHERS_BLOG_QUERY,
};