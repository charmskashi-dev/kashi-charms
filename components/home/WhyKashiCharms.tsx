import {
  Heart,
  Gift,
  Truck,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Handpicked With Love",
    description:
      "Every piece is carefully selected before reaching you.",
  },
  {
    icon: Sparkles,
    title: "Affordable Luxury",
    description:
      "Cute and stylish jewellery without the premium price tag.",
  },
  {
    icon: ShieldCheck,
    title: "Comfortable To Wear",
    description:
      "Designed for everyday confidence and comfort.",
  },
  {
    icon: Gift,
    title: "Gift Ready",
    description:
      "Perfect for birthdays, surprises and self-love gifts.",
  },
  {
    icon: Truck,
    title: "PAN India Shipping",
    description:
      "Secure delivery to your doorstep across India.",
  },
  {
    icon: Star,
    title: "Customer Favourite",
    description:
      "Jewellery that earns compliments wherever you go.",
  },
];

export default function WhyKashiCharms() {
  return (
    <section className="py-20 bg-shop-light-bg">
      <div className="text-center mb-12">
        <p className="uppercase tracking-[4px] text-shop-dark-green text-sm font-medium mb-3">
          Why Choose Us
        </p>

        <h2 className="text-4xl md:text-5xl font-semibold text-darkColor">
          Why Kashi Charms?
        </h2>

        <p className="text-lightColor mt-4 max-w-2xl mx-auto">
          Jewellery that is cute, affordable and made to make you feel special.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl hoverEffect"
            >
              <div className="w-12 h-12 rounded-full bg-shop-light-pink flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-shop-dark-green" />
              </div>

              <h3 className="font-semibold text-lg text-darkColor mb-2">
                {feature.title}
              </h3>

              <p className="text-sm text-lightColor">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}