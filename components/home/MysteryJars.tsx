import Link from "next/link";
import { client } from "@/sanity/lib/client";
import ScrollReveal from "@/components/home/ScrollReveal";
import ProductCard from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/ui/carousel";

// ── Mystery Jewelry Jars ─────────────────────────────────────────────────────
// This is ONE category in Sanity ("Mystery Jewelry Jars", slug below).
// The 4 variants (Y2K, Cutesy, Silver Oxidised Desi, Golden Luxury) are
// individual PRODUCTS tagged with that category — not separate categories.
const MYSTERY_JAR_CATEGORY_SLUG = "mystery-jewelry-jars";

async function getMysteryJarProducts() {
  return await client.fetch(
    `*[
      _type == "product" &&
      references(*[_type == "category" && slug.current == $slug]._id)
    ] | order(name asc){
      ...,
      "categories": categories[]->title
    }`,
    { slug: MYSTERY_JAR_CATEGORY_SLUG }
  );
}

export default async function MysteryJars() {
  const products = await getMysteryJarProducts();

  if (!products?.length) return null;

  return (
    <section className="py-14 md:py-20">
      <ScrollReveal className="text-center mb-8 md:mb-10">
        <p className="uppercase tracking-[4px] text-shop-dark-green text-sm font-medium mb-3">
          New &amp; Trending
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold text-darkColor">
          Mystery Jewelry Jars
        </h2>
        <p className="text-lightColor mt-4 max-w-2xl mx-auto">
          Surprise yourself. Pick a vibe, unbox your mystery.
        </p>
      </ScrollReveal>

      <Carousel
        opts={{ align: "start", loop: false }}
        className="w-full px-1 md:px-10"
      >
        <CarouselContent>
          {products.map((product: any) => (
            <CarouselItem
              key={product._id}
              className="basis-[78%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows: desktop only. Auto-disable once all cards are visible / at an edge. */}
        <CarouselPrevious className="hidden md:flex -left-4" />
        <CarouselNext className="hidden md:flex -right-4" />
      </Carousel>

      <div className="text-center mt-6 md:mt-8">
        <Link
          href={`/category/${MYSTERY_JAR_CATEGORY_SLUG}`}
          className="inline-flex items-center gap-1.5 text-shop-dark-green font-medium hover:gap-2.5 transition-all duration-300"
        >
          Shop All Mystery Jars
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}