import Container from "@/components/Container";

import OrdersComponent from "@/components/OrdersComponent";

import { Button } from "@/components/ui/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/ui/card";

import { getMyOrders } from "@/sanity/queries";

import { auth } from "@clerk/nextjs/server";

import { FileX } from "lucide-react";

import Link from "next/link";

import { redirect } from "next/navigation";

const OrdersPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const orders = await getMyOrders(userId);

  return (
    <Container className="py-10">
      {orders?.length ? (
        <Card
          className="
          w-full
          border-0
          shadow-none
          bg-transparent
        "
        >
          {/* HEADER */}

          <CardHeader className="px-0 pb-8">
            <div className="flex items-center gap-4">
              <div
                className="
                bg-black
                text-white
                p-4
                rounded-3xl
                shadow-lg
              "
              >
                📦
              </div>

              <div>
                <CardTitle
                  className="
                  text-3xl
                  md:text-4xl
                  font-semibold
                  tracking-tight
                "
                >
                  My Orders
                </CardTitle>

                <p className="text-sm text-gray-500 mt-2">
                  Track all your Kashi Charms
                  orders ✨
                </p>
              </div>
            </div>
          </CardHeader>

          {/* ORDERS */}

          <CardContent className="px-0">
            <OrdersComponent orders={orders} />
          </CardContent>
        </Card>
      ) : (
        <div
          className="
          flex
          flex-col
          items-center
          justify-center
          py-24
        "
        >
          <div
            className="
            bg-gray-100
            p-6
            rounded-full
            mb-6
          "
          >
            <FileX className="h-16 w-16 text-gray-400" />
          </div>

          <h2 className="text-3xl font-semibold">
            No orders yet
          </h2>

          <p
            className="
            mt-3
            text-gray-500
            text-center
            max-w-md
            leading-relaxed
          "
          >
            Looks like you haven’t placed
            any orders from Kashi Charms
            yet ✨
          </p>

          <Button asChild className="mt-8 h-12 px-8 rounded-xl">
            <Link href="/shop">
              Start Shopping
            </Link>
          </Button>
        </div>
      )}
    </Container>
  );
};

export default OrdersPage;