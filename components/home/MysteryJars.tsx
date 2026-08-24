import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ScrollReveal from "@/components/home/ScrollReveal";
import { ArrowRight } from "lucide-react";

// ── Mystery Jewellery Jars ───────────────────────────────────────────────────
// Two sub-categories in Sanity: Mini and Med. jars. Each is its OWN category
// document (slug below) with its own products, image, description, and
// "range" (starting price). Tapping a card routes to that category's page,
// where CategoryProducts renders the filtered grid.
const JAR_SIZE_SLUGS = ["mini-mystery-jewellery-jars", "med-mystery-jewellery-jars"];

async function getJarSizeCategories() {
  return await client.fetch(
    `*[_type == "category" && slug.current in $slugs] | order(range asc){
      _id,
      title,
      description,
      range,
      image,
      "slug": slug.current
    }`,
    { slugs: JAR_SIZE_SLUGS }
  );
}

export default async function MysteryJars() {
  const jarSizes = await getJarSizeCategories();

  if (!jarSizes?.length) return null;

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
          Surprise yourself. Pick your size, pick a vibe, unbox your mystery.
        </p>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 gap-6 px-1 md:px-10 max-w-4xl mx-auto">
        {jarSizes.map((jar: any) => (
          <Link href={`/category/${jar.slug}`} key={jar._id} className="group">
            <div className="relative overflow-hidden rounded-2xl">
              {jar.image ? (
                <Image
                  src={urlFor(jar.image).url()}
                  alt={jar.title}
                  width={600}
                  height={700}
                  className="h-80 md:h-96 w-full object-cover group-hover:scale-105 hoverEffect"
                />
              ) : (
                <div className="h-80 md:h-96 w-full bg-shop-light-bg" />
              )}

              <div className="absolute inset-0 bg-black/25 flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-semibold">
                  {jar.title}
                </h3>
                {jar.description && (
                  <p className="text-white/90 text-sm mt-2 line-clamp-2">
                    {jar.description}
                  </p>
                )}
                {jar.range && (
                  <p className="text-white/90 text-xs mt-2 uppercase tracking-wide">
                    From ₹{jar.range}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-6 md:mt-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-shop-dark-green font-medium hover:gap-2.5 transition-all duration-300"
        >
          Shop All Mystery Jars
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}