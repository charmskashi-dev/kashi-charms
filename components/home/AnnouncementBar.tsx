"use client";

export default function AnnouncementBar() {
  return (
    <div className="bg-shop-dark-green text-white overflow-hidden h-10 flex items-center">
      <div className="whitespace-nowrap animate-marquee font-medium text-sm">
        <span className="mx-8">
          ✨ Flat 25% OFF On Bracelets ✨
        </span>

        <span className="mx-8">
          Free Shipping Above ₹499
        </span>

        <span className="mx-8">
          Handmade With Love ❤️
        </span>

        <span className="mx-8">
          COD Available
        </span>
      </div>
    </div>
  );
}