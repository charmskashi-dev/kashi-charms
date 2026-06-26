"use client";

import { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

interface ShareButtonProps {
  productName: string;
  productSlug: string;
}

export default function ShareButton({ productName, productSlug }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const getProductUrl = () =>
    `${window.location.origin}/product/${productSlug}`;

  const handleShare = async () => {
    const url = getProductUrl();

    // Native share (mobile browsers, Android/iOS)
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: `Check out ${productName} on Kashi Charms! 🌸`,
          url,
        });
      } catch (err) {
        // User dismissed share sheet — that's fine
      }
      return;
    }

    // Fallback: copy to clipboard (desktop)
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Last resort
      prompt("Copy this link:", url);
    }
  };

  return (
    <button
      onClick={handleShare}
      title="Share this product"
      className="flex items-center justify-center w-10 h-10 rounded-full border border-pink-200 bg-white text-pink-400 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-400 transition-all duration-200 shadow-sm"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Share2 className="w-4 h-4" />
      )}
    </button>
  );
}