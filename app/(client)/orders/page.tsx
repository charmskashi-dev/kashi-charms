import Container from "@/components/Container";
import OrdersComponent from "@/components/OrdersComponent";
import { Button } from "@/components/ui/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/ui/scroll-area";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/ui/table";
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
        <Card className="w-full border-0 shadow-none bg-transparent">
          <CardHeader className="px-0">
  <div className="flex items-center gap-3">
    <div className="bg-black text-white p-3 rounded-2xl">
      📦
    </div>

    <div>
      <CardTitle className="text-3xl font-semibold tracking-tight">
        My Orders
      </CardTitle>

      <p className="text-sm text-gray-500 mt-1">
        Track all your Kashi Charms orders ✨
      </p>
    </div>
  </div>
</CardHeader>

          <CardContent>
            <ScrollArea>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>

                <OrdersComponent orders={orders} />
              </Table>

              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <FileX className="h-24 w-24 text-gray-400 mb-4" />

          <h2 className="text-2xl font-semibold">No orders found</h2>

          <p className="mt-2 text-sm text-gray-600 text-center max-w-md">
            You haven’t placed any orders yet. Start shopping now!
          </p>

          <Button asChild className="mt-6">
            <Link href="/">Browse Products</Link>
          </Button>
        </div>
      )}
    </Container>
  );
};

export default OrdersPage;