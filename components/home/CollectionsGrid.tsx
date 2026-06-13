import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

async function getCollections() {
  return await client.fetch(`
    *[_type=="category"] | order(title asc)[0...6]{
      _id,
      title,
      slug,
      image,
      range
    }
  `);
}

export default async function CollectionsGrid() {
  const collections = await getCollections();

  return (
    <section className="py-20 bg-shop-light-bg">
      <div className="text-center mb-12">
        <p className="uppercase tracking-[4px] text-shop-dark-green text-sm font-medium mb-3">
          Find Your Style
        </p>

        <h2 className="text-4xl md:text-5xl font-semibold text-darkColor">
          Shop By Collection
        </h2>

        <p className="text-lightColor mt-4 max-w-2xl mx-auto">
          Discover jewellery curated for every mood, occasion and personality.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {collections.map((item: any) => (
          <Link
            key={item._id}
            href={`/category/${item.slug.current}`}
            className="group"
          >
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
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">
                      No Image
                    </span>
                  </div>
                )}
              </div>

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white text-xl md:text-2xl font-semibold">
                  {item.title}
                </h3>

                {item.range && (
                  <p className="text-white/80 text-sm mt-1">
                    Starting ₹{item.range}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}