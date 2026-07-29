import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, Lock, Mail, User, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { AlhLogo } from "@/components/site/AlhLogo";
import { IMAGES } from "@/lib/catalog";

export const Route = createFileRoute("/register")({
  beforeLoad: async ({ context }) => {
    if (context.session) throw redirect({ to: "/" });
  },
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<"retail" | "trade">("retail");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, account_type: accountType } },
    });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.user) {
      await supabase.from("user_profiles").insert({
        id: data.user.id,
        full_name: fullName,
        account_type: accountType,
      });
    }
    navigate({ to: "/" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Image side */}
      <div className="relative hidden overflow-hidden lg:block">
        <img
          src={IMAGES.wholesale}
          alt=""
          aria-hidden="true"
          className="size-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, oklch(0.4 0.15 27 / 0.88), oklch(0.2 0.1 27 / 0.92))",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <p className="text-[11px] font-bold tracking-[0.3em] text-gold uppercase">
            Join the trade network
          </p>
          <h2 className="font-display mt-3 max-w-md text-3xl font-extrabold leading-tight text-white">
            Open a trade or retail account in under a minute.
          </h2>
          <ul className="mt-6 space-y-2">
            {[
              "Unlock pallet-tier wholesale pricing",
              "Same-day delivery inside 5 km",
              "Order history and re-order in one tap",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-[14px] text-white/80">
                <span className="size-1.5 rounded-full bg-gold" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Form side */}
      <div className="surface-ink flex items-center justify-center px-5 py-12 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel w-full max-w-sm rounded-3xl p-8 sm:p-10"
        >
          <div className="flex flex-col items-center text-center">
            <AlhLogo className="size-16 text-gold" variant="mark" />
            <h1 className="font-display mt-5 text-2xl font-extrabold text-foreground">Create your account</h1>
            <p className="text-muted-foreground mt-2 text-[13px]">
              Trade or retail — switch anytime
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-[12px] text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="mt-8 space-y-5">
            <div>
              <label className="text-muted-foreground block text-[12px] font-semibold">Full name</label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-gold/25 bg-white/5 px-4 transition focus-within:border-gold/50 focus-within:gold-glow">
                <User className="size-4 text-gold/60" />
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="flex-1 bg-transparent py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground/60"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <label className="text-muted-foreground block text-[12px] font-semibold">Email</label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-gold/25 bg-white/5 px-4 transition focus-within:border-gold/50 focus-within:gold-glow">
                <Mail className="size-4 text-gold/60" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground/60"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-muted-foreground block text-[12px] font-semibold">Password</label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-gold/25 bg-white/5 px-4 transition focus-within:border-gold/50 focus-within:gold-glow">
                <Lock className="size-4 text-gold/60" />
                <input
                  type={show ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground/60"
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="text-gold/60 transition hover:text-gold"
                >
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-muted-foreground block text-[12px] font-semibold">Account type</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(["retail", "trade"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setAccountType(t)}
                    className={`rounded-xl border px-4 py-3 text-[13px] font-bold capitalize transition-all ${
                      accountType === t
                        ? "border-gold bg-gold/15 text-gold gold-glow"
                        : "border-gold/20 bg-white/5 text-muted-foreground hover:border-gold/40"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="surface-emerald hover:shadow-emerald-lg group inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[14px] font-bold tracking-wide transition-all duration-500 hover:-translate-y-0.5 disabled:opacity-50"
            >
              {loading ? "Creating…" : "Create account"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <p className="text-muted-foreground mt-8 text-center text-[13px]">
            Already have an account?{" "}
            <Link to="/login" className="text-gold font-semibold transition hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
