import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import FavoriteButton from "@/components/FavoriteButton";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import ShareButton from "@/components/ShareButton";
import { getProductBySlug } from "@/sanity/queries";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";

type ProductUI = Awaited<ReturnType<typeof getProductBySlug>>;

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product: ProductUI = await getProductBySlug(slug);

  if (!product) return notFound();

  return (
    <div className="bg-shop-light-bg min-h-screen py-10">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 bg-white p-6 rounded-3xl shadow-sm">

          {/* IMAGE */}
          <div className="bg-shop-light-bg rounded-2xl overflow-hidden">
            {product?.images && (
              <ImageView images={product.images} isStock={product.stock} />
            )}
          </div>

          {/* DETAILS */}
          <div className="flex flex-col gap-6">

            {/* CATEGORY */}
            {product?.categories && (
              <p className="text-xs uppercase text-gray-400">
                {product.categories.filter(Boolean).join(" • ")}
              </p>
            )}

            {/* TITLE */}
            <h1 className="text-3xl font-bold text-darkColor">
              {product?.name}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="text-shop-light-green fill-shop-light-green"
                />
              ))}
              <span className="text-sm text-gray-400">(120 reviews)</span>
            </div>

            {/* PRICE */}
            <div className="border-y py-5">
              <PriceView
                price={product?.price ?? 0}
                discount={product?.discount}
                className="text-2xl font-bold text-shop-dark-green"
              />

              <p
                className={`mt-2 inline-block px-3 py-1 text-xs rounded-full ${
                  (product?.stock ?? 0) > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {(product?.stock ?? 0) > 0
                  ? "In Stock"
                  : "Out of Stock"}
              </p>
            </div>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {product?.description}
            </p>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">
              <AddToCartButton
                product={product as any}
                className="flex-1 rounded-full bg-shop-dark-green text-white hover:opacity-90"
              />
              <FavoriteButton
                showProduct
                product={product as any}
              />
              <ShareButton
                productName={product?.name ?? ""}
                productSlug={slug}
              />
            </div>

            {/* EXTRA */}
            <ProductCharacteristics product={product as any} />

            {/* TRUST */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="p-4 rounded-xl bg-shop-light-pink text-center">
                <p className="font-semibold text-sm">Free Delivery</p>
                <p className="text-xs text-gray-500">On all orders</p>
              </div>

              <div className="p-4 rounded-xl bg-shop-light-pink text-center">
                <p className="text-xs text-gray-500">7-day policy</p>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleProductPage;