import { defineQuery } from "next-sanity";

/* ======================================================
   BRANDS
====================================================== */

const BRANDS_QUERY = defineQuery(`
  *[_type == "brand"] | order(name asc)
`);

/* ======================================================
   BLOGS
====================================================== */

// ✅ Latest Blogs
const LATEST_BLOG_QUERY = defineQuery(`
  *[
    _type == "blog"
    && isLatest == true
  ]
  | order(publishedAt desc)[0...4]{
    _id,
    title,
    excerpt,
    slug,
    publishedAt,
    mainImage,

    author->{
      name,
      image,
    },

    blogcategories[]->{
      title,
      "slug": slug.current,
    }
  }
`);

// ✅ All Blogs
const GET_ALL_BLOG = defineQuery(`
  *[_type == "blog"]
  | order(publishedAt desc)[0...$quantity]{
    _id,
    title,
    excerpt,
    slug,
    publishedAt,
    mainImage,

    author->{
      name,
      image,
    },

    blogcategories[]->{
      title,
      "slug": slug.current,
    }
  }
`);

// ✅ Single Blog
const SINGLE_BLOG_QUERY = defineQuery(`
  *[
    _type == "blog"
    && slug.current == $slug
  ][0]{
    _id,
    title,
    excerpt,
    body,
    publishedAt,
    mainImage,
    isLatest,

    author->{
      name,
      image,
    },

    blogcategories[]->{
      title,
      "slug": slug.current,
    }
  }
`);

// ✅ Blog Categories with REAL COUNT
const BLOG_CATEGORIES = defineQuery(`
  *[_type == "blogcategory"]{
    _id,
    title,
    description,
    "slug": slug.current,

    "count": count(
      *[
        _type == "blog"
        && references(^._id)
      ]
    )
  }
`);

// ✅ Other Blogs
const OTHERS_BLOG_QUERY = defineQuery(`
  *[
    _type == "blog"
    && defined(slug.current)
    && slug.current != $slug
  ]
  | order(publishedAt desc)[0...$quantity]{
    _id,
    title,
    excerpt,
    publishedAt,
    slug,
    mainImage,

    author->{
      name,
      image,
    },

    blogcategories[]->{
      title,
      "slug": slug.current,
    }
  }
`);

/* ======================================================
   PRODUCTS
====================================================== */

// ✅ Deal / Hot Products
const DEAL_PRODUCTS = defineQuery(`
  *[
    _type == "product"
    && status == "hot"
  ]
  | order(name asc){
    ...,

    "categories": categories[]->title
  }
`);

// ✅ Product By Slug
const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "product"
    && slug.current == $slug
  ][0]{
    ...,

    "categories": categories[]->title
  }
`);

// ✅ Related Products
const RELATED_PRODUCTS_QUERY = defineQuery(`
  *[
    _type == "product"
    && _id != $currentId
    && variant == $variant
  ][0...4]{
    ...,

    "categories": categories[]->title
  }
`);

// ✅ Product Brand
const BRAND_QUERY = defineQuery(`
  *[
    _type == "product"
    && slug.current == $slug
  ]{
    "brandName": brand->title
  }
`);

/* ======================================================
   ORDERS
====================================================== */

// ✅ My Orders
const MY_ORDERS_QUERY = defineQuery(`
  *[
    _type == "order"
    && clerkUserId == $userId
  ]
  | order(orderDate desc){
    ...,

    products[]{
      ...,

      product->
    }
  }
`);

/* ======================================================
   EXPORTS
====================================================== */

export {
  BRANDS_QUERY,

  // BLOGS
  LATEST_BLOG_QUERY,
  GET_ALL_BLOG,
  SINGLE_BLOG_QUERY,
  BLOG_CATEGORIES,
  OTHERS_BLOG_QUERY,

  // PRODUCTS
  DEAL_PRODUCTS,
  PRODUCT_BY_SLUG_QUERY,
  RELATED_PRODUCTS_QUERY,
  BRAND_QUERY,

  // ORDERS
  MY_ORDERS_QUERY,
};