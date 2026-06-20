import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ScrollReveal from "@/components/home/ScrollReveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/ui/carousel";

// ── Mystery Jar categories (curated) ─────────────────────────────────────────
// These are Sanity `category` documents, created the same way the
// "Shop By Vibe" categories are — just give each one this exact slug.
const MYSTERY_JAR_SLUGS = [
  "y2k-mystery-jewellery-jar",
  "cute-and-coquette-mystery-jewellery-jar",
  "desi-oxidised-mystery-jewellery-jar",
  "golden-luxury-mystery-jewellery-jar",
];

async function getMysteryJars() {
  return await client.fetch(
    `*[_type == "category" && slug.current in $slugs] | order(title asc) {
      _id, title, slug, image, range, description
    }`,
    { slugs: MYSTERY_JAR_SLUGS }
  );
}

function MysteryJarCard({ item }: { item: any }) {
  return (
    <Link href={`/category/${item.slug.current}`} className="group block">
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

        {/* Mystery badge */}
        <span className="absolute top-4 left-4 bg-shop-orange text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full shadow-sm">
          Mystery Jar
        </span>

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white text-xl md:text-2xl font-semibold">
            {item.title}
          </h3>
          {item.range && (
            <p className="text-white/80 text-sm mt-1">Starting ₹{item.range}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default async function MysteryJars() {
  const jars = await getMysteryJars();

  if (!jars?.length) return null;

  return (
    <section className="py-14 md:py-20">
      <ScrollReveal className="text-center mb-10">
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
        opts={{ align: "start", loop: true }}
        className="w-full px-4 md:px-10"
      >
        <CarouselContent>
          {jars.map((item: any) => (
            <CarouselItem
              key={item._id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <MysteryJarCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
}