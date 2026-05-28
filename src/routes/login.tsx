import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Admin Login · It's Lit Neon" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/orders" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return toast.error(error.message);
      navigate({ to: "/admin/orders" });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin/orders` },
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Account created. Check your email to confirm, then ask Joe to grant admin access.");
      setMode("signin");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{mode === "signin" ? "Admin Login" : "Create Admin Account"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Staff access only</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Working…" : mode === "signin" ? "Sign in" : "Create account"}
          </Button>
        </form>
        <div className="text-center text-xs text-muted-foreground space-x-3">
          <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="hover:underline">
            {mode === "signin" ? "Create account" : "Have an account? Sign in"}
          </button>
          <span>·</span>
          <Link to="/" className="hover:underline">← Back to site</Link>
        </div>
      </div>
    </div>
  );
}
