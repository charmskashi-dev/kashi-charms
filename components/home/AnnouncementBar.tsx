"use client";

const messages = [
  "✨ Flat 25% OFF On Bracelets ✨",
  "Free Shipping Above ₹499",
  "Handmade With Love ❤️",
  "COD Available",
  "New Arrivals Every Week 🌸",
  "Gift Wrapping Available 🎁",
];

export default function AnnouncementBar() {
  const repeated = [...messages, ...messages, ...messages];

  return (
    <div className="sticky top-0 z-50 bg-shop-dark-green text-white h-9 flex items-center overflow-hidden">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
          will-change: transform;
        }
      `}</style>

      <div className="marquee-track">
        {repeated.map((msg, i) => (
          <span
            key={i}
            className="mx-10 text-sm font-medium whitespace-nowrap"
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}