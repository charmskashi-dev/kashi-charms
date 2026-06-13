import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ScrollReveal from "@/components/home/ScrollReveal";

// ── Vibe collections (curated) ──────────────────────────────────────────────
const VIBE_SLUGS = [
  "cute-and-coquette",
  "everyday-elegance",
  "resin-dreams",
  "desi-and-oxidised",
  "statement-earrings",
  "gifts-under-inr299",
];

// ── Product categories ───────────────────────────────────────────────────────
const CATEGORY_SLUGS = ["earrings", "necklaces", "rings", "bracelets"];

async function getVibeCollections() {
  return await client.fetch(
    `*[_type == "category" && slug.current in $slugs] | order(title asc) {
      _id, title, slug, image, range
    }`,
    { slugs: VIBE_SLUGS }
  );
}

async function getProductCategories() {
  return await client.fetch(
    `*[_type == "category" && slug.current in $slugs] | order(title asc) {
      _id, title, slug, image
    }`,
    { slugs: CATEGORY_SLUGS }
  );
}

// ── Shared card component ────────────────────────────────────────────────────
function CollectionCard({
  item,
  showRange = false,
}: {
  item: any;
  showRange?: boolean;
}) {
  return (
    <Link href={`/category/${item.slug.current}`} className="group">
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="aspect-4/5 overflow-hidden">
          {item.image ? (
            <Image
              src={urlFor(item.image).url()}
              alt={item.title}
              width={800}
              height={1000}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white text-xl md:text-2xl font-semibold">
            {item.title}
          </h3>
          {showRange && item.range && (
            <p className="text-white/80 text-sm mt-1">Starting ₹{item.range}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── Section header ───────────────────────────────────────────────────────────
function SectionHeader({
  eyebrow,
  heading,
  subtext,
}: {
  eyebrow: string;
  heading: string;
  subtext: string;
}) {
  return (
    <ScrollReveal className="text-center mb-12">
      <p className="uppercase tracking-[4px] text-shop-dark-green text-sm font-medium mb-3">
        {eyebrow}
      </p>
      <h2 className="text-4xl md:text-5xl font-semibold text-darkColor">
        {heading}
      </h2>
      <p className="text-lightColor mt-4 max-w-2xl mx-auto">{subtext}</p>
    </ScrollReveal>
  );
}

// ── Shop By Vibe ─────────────────────────────────────────────────────────────
export async function ShopByVibe() {
  const vibes = await getVibeCollections();

  return (
    <section className="py-20 bg-shop-light-bg">
      <SectionHeader
        eyebrow="Shop By Vibe"
        heading="Find Your Vibe"
        subtext="Six moods. Infinite ways to wear them."
      />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {vibes.map((item: any, i: number) => (
          <ScrollReveal key={item._id} delay={i * 80}>
            <CollectionCard item={item} showRange />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

// ── Find Your Style ──────────────────────────────────────────────────────────
export async function FindYourStyle() {
  const categories = await getProductCategories();

  return (
    <section className="py-20">
      <SectionHeader
        eyebrow="Find Your Style"
        heading="Shop By Category"
        subtext="Discover jewellery curated for every mood, occasion and personality."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((item: any, i: number) => (
          <ScrollReveal key={item._id} delay={i * 80}>
            <CollectionCard item={item} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

// ── Default export (kept for backward compat) ────────────────────────────────
export default async function CollectionsGrid() {
  return (
    <>
      <ShopByVibe />
      <FindYourStyle />
    </>
  );
}