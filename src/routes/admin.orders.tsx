import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getAdminOrders, type AdminOrder } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, LogOut, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrdersPage,
  head: () => ({
    meta: [
      { title: "Orders · Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function AdminOrdersPage() {
  const navigate = useNavigate();
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        navigate({ to: "/login" });
        return;
      }
      setSessionReady(true);
    });
  }, [navigate]);

  const fetchOrders = useServerFn(getAdminOrders);
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => fetchOrders(),
    enabled: sessionReady,
  });

  const logout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  if (!sessionReady) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading…</div>;
  }

  if (data && "error" in data) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 p-8">
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {data.error}
        </p>
        <p className="text-sm text-muted-foreground">
          You're signed in but not an admin. Ask Joe to grant you access.
        </p>
        <Button variant="outline" onClick={logout}><LogOut className="mr-2 h-4 w-4" />Sign out</Button>
      </div>
    );
  }

  const orders: AdminOrder[] = data?.orders || [];

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-sm text-muted-foreground">
            {orders.length} total — paid Stripe checkouts + custom-order inquiries
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/">View site</Link>
          </Button>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />Sign out
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-md border p-8 text-center text-muted-foreground">Loading orders…</div>
      ) : orders.length === 0 ? (
        <div className="rounded-md border p-8 text-center text-muted-foreground">No orders yet.</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={`${o.source}-${o.id}`}>
                  <TableCell className="whitespace-nowrap text-xs">
                    {new Date(o.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={o.source === "stripe" ? "default" : "secondary"}>
                      {o.source === "stripe" ? "Paid" : "Inquiry"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{o.customerName || "—"}</TableCell>
                  <TableCell className="text-xs">
                    <div>{o.customerEmail}</div>
                    {o.customerPhone && <div className="text-muted-foreground">{o.customerPhone}</div>}
                  </TableCell>
                  <TableCell className="text-xs">{o.product}</TableCell>
                  <TableCell className="max-w-xs text-xs">
                    {o.designSummary && <div className="truncate">{o.designSummary}</div>}
                    {o.shippingAddress && <div className="truncate text-muted-foreground">{o.shippingAddress}</div>}
                    {o.notes && <div className="truncate text-muted-foreground italic">"{o.notes}"</div>}
                    {o.photoUrl && (
                      <a href={o.photoUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                        View photo
                      </a>
                    )}
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-medium">{o.amount || "—"}</TableCell>
                  <TableCell>
                    {o.stripeUrl && (
                      <a href={o.stripeUrl} target="_blank" rel="noreferrer"
                         className="inline-flex items-center text-xs text-primary hover:underline">
                        Stripe <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
