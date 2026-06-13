import { Star } from "lucide-react";
import ScrollReveal from "@/components/home/ScrollReveal";

const reviews = [
  {
    name: "Aanya Sharma",
    text: "The quality genuinely surprised me. It looks far more expensive than what I paid for.",
    product: "Charm Bracelet",
  },
  {
    name: "Priya Verma",
    text: "Beautiful packaging and such elegant designs. Already ordered another one for gifting.",
    product: "Pearl Earrings",
  },
  {
    name: "Riya Kapoor",
    text: "Exactly the Pinterest aesthetic jewelry I've been searching for. Absolutely love it.",
    product: "Layered Necklace",
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-20">
      <ScrollReveal className="text-center mb-12">
        <p className="uppercase tracking-[0.3em] text-xs text-shop-dark-green">
          Customer Love
        </p>
        <h2 className="text-4xl font-semibold mt-3">What Our Customers Say</h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Trusted by jewelry lovers who appreciate timeless style and everyday luxury.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((review, i) => (
          <ScrollReveal key={review.name} delay={i * 100}>
            <div className="bg-white border border-gray-100 rounded-3xl p-8 hover:-translate-y-1 hoverEffect shadow-sm hover:shadow-xl">
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="currentColor"
                    className="text-yellow-500"
                  />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                "{review.text}"
              </p>
              <div className="border-t pt-4">
                <h4 className="font-semibold">{review.name}</h4>
                <p className="text-sm text-gray-500">
                  Purchased: {review.product}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}