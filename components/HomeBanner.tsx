import { client } from "@/sanity/lib/client";
import HomeBannerCarousel, { Slide } from "./HomeBannerCarousel";

const HOME_BANNERS_QUERY = `
*[_type == "homeBanner" && isActive != false] | order(order asc) {
  _id,
  bannerType,
  href,
  "imageUrl": image.asset->url,
  "alt": image.alt,
  "videoUrl": video.asset->url
}
`;

export default async function HomeBanner() {
  const banners = await client.fetch(
    HOME_BANNERS_QUERY,
    {}, // no params
    { cache: "no-store" } // 👈 always fetch fresh from Sanity, never use cached result
  );

  const slides: Slide[] = (banners || []).map((b: any) =>
    b.bannerType === "video"
      ? { type: "video", src: b.videoUrl, href: b.href }
      : { type: "image", src: b.imageUrl, alt: b.alt || "Banner", href: b.href }
  );

  if (slides.length === 0) return null;

  return <HomeBannerCarousel slides={slides} />;
}