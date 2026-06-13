import ProductCard from "@/components/ProductCard";
import { client } from "@/sanity/lib/client";

async function getFeaturedProducts() {
  return await client.fetch(`
    *[
      _type=="product" &&
      isFeatured == true
    ] | order(_createdAt desc)[0...8]{
      ...,
      "categories": categories[]->title
    }
  `);
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  if (!products?.length) return null;

  return (
    <section className="py-20">
      <div className="text-center mb-12">
        <p className="uppercase tracking-[4px] text-shop-dark-green text-sm font-medium mb-3">
          Handpicked For You
        </p>

        <h2 className="text-4xl md:text-5xl font-semibold text-darkColor">
          Featured Picks
        </h2>

        <p className="text-lightColor mt-4 max-w-2xl mx-auto">
          Our favourite pieces that customers keep coming back for.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: any) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}