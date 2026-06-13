import Link from "next/link";
import Image from "next/image";

const vibes = [
  {
    title: "Coquette Girl",
    desc: "Pearls, bows & feminine charms",
    image: "/vibes/coquette.jpg",
    link: "/category/cute-jewelry",
  },
  {
    title: "Minimal Muse",
    desc: "Timeless everyday luxury",
    image: "/vibes/minimal.jpg",
    link: "/category/minimalist",
  },
  {
    title: "Ethnic Elegance",
    desc: "Traditional & oxidised treasures",
    image: "/vibes/ethnic.jpg",
    link: "/category/oxidised",
  },
  {
    title: "Gift Worthy",
    desc: "Perfect presents they'll adore",
    image: "/vibes/gifting.jpg",
    link: "/category/gifts",
  },
  {
    title: "Statement Queen",
    desc: "Bold jewelry that stands out",
    image: "/vibes/statement.jpg",
    link: "/category/statement",
  },
  {
    title: "Everyday Chic",
    desc: "Made for daily styling",
    image: "/vibes/everyday.jpg",
    link: "/category/everyday",
  },
];

export default function ShopByVibe() {
  return (
    <section className="py-20">
      <div className="text-center mb-12">
        <p className="uppercase tracking-[0.3em] text-xs text-shop-dark-green">
          Find Your Style
        </p>

        <h2 className="text-4xl font-semibold mt-3">
          Shop By Vibe
        </h2>

        <p className="text-gray-500 mt-3">
          Discover jewelry that matches your aesthetic.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {vibes.map((vibe) => (
          <Link
            href={vibe.link}
            key={vibe.title}
            className="group"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={vibe.image}
                alt={vibe.title}
                width={600}
                height={700}
                className="h-96 w-full object-cover group-hover:scale-105 hoverEffect"
              />

              <div className="absolute inset-0 bg-black/25 flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-semibold">
                  {vibe.title}
                </h3>

                <p className="text-white/90 text-sm mt-2">
                  {vibe.desc}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}