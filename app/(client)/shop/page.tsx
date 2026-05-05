"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import { client } from "@/sanity/lib/client";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";

// ✅ MATCH ProductCard TYPE
type ProductType = {
  _id: string;
  name?: string;
  slug?: { current?: string };
  price?: number;
  images?: any[];
  categories?: (string | null)[];
  stock?: number;
  status?: "new" | "hot" | "sale";
  discount?: number;
};

export default function ShopPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filtered, setFiltered] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("latest");
  const [search, setSearch] = useState("");

  // 🔥 FETCH PRODUCTS (FIXED)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "product"] | order(_createdAt desc) {
            _id,
            name,
            price,
            images,
            stock,
            status,
            discount,
            slug,
            "categories": categories[]->title
          }
        `);

        setProducts(data || []);
        setFiltered(data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔥 FILTER + SEARCH + SORT
  useEffect(() => {
    let temp = [...products];

    // 🔍 SEARCH
    if (search.trim() !== "") {
      temp = temp.filter((p) =>
        (p.name || "").toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🏷 CATEGORY
    if (category !== "all") {
      temp = temp.filter((p) =>
        p.categories?.some(
          (c) => c?.toLowerCase() === category.toLowerCase()
        )
      );
    }

    // 💰 SORT
    if (sort === "low") {
      temp.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sort === "high") {
      temp.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    setFiltered(temp);
  }, [search, category, sort, products]);

  const categories = [
    "all",
    "rings",
    "earrings",
    "bracelets",
    "necklaces",
  ];

  return (
    <div className="bg-shop-light-bg min-h-screen pb-20">
      <Container>

        {/* 🔥 HERO */}
        <div className="py-10 border-b border-black/5">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-darkColor">
            Shop Collection
          </h1>
          <p className="text-lightColor mt-2 text-sm md:text-base">
            Minimal. Elegant. Handmade for you ✨
          </p>
        </div>

        {/* 🔥 SEARCH + SORT */}
        <div className="flex flex-col md:flex-row gap-4 mt-6 md:items-center md:justify-between">
          <SearchBar value={search} onChange={setSearch} />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-black/10 px-4 py-2 rounded-full bg-white text-sm shadow-sm"
          >
            <option value="latest">Newest</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>

        {/* 🔥 CATEGORY */}
        <div className="flex gap-2 overflow-x-auto mt-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm capitalize transition-all hoverEffect ${
                category === cat
                  ? "bg-shop-dark-green text-white shadow"
                  : "bg-white border border-black/10 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 🔥 GRID */}
        <div className="mt-8">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-white animate-pulse rounded-2xl"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-500 mt-20">
              No products found 😔
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <div
                  key={product._id}
                  className="group transition-transform duration-300 hover:-translate-y-1"
                >
                  <ProductCard product={product as any} />
                </div>
              ))}
            </div>
          )}
        </div>

      </Container>
    </div>
  );
}