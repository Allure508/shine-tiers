import { useState } from "react";
import { X } from "lucide-react";

interface SubscriptionModalProps {
  open: boolean;
  onClose: () => void;
  plan: string;
  price: string;
}

const SubscriptionModal = ({ open, onClose, plan, price }: SubscriptionModalProps) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  if (!open) return null;

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isValidPhone = phone.replace(/[\s+]/g, "").length >= 8;
  const canSubmit = isValidEmail && isValidPhone && status === "idle";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("loading");

    try {
      const res = await fetch("https://forms.voodportal.com/api/webhook/Koop_IPTV", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          phone: phone.trim(),
          plan,
          price: `€${price}`,
          form_type: "subscription_request",
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setEmail("");
      setPhone("");
      setTimeout(() => {
        setStatus("idle");
        onClose();
      }, 2000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
          aria-label="Sluiten"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold text-foreground">Abonnement aanvragen</h2>
        <p className="text-sm text-muted-foreground mt-1 mb-6">
          Vul je gegevens in en we activeren je direct.
        </p>

        {status === "success" ? (
          <div className="text-center py-8">
            <p className="text-success text-lg font-semibold">
              ✅ We hebben je aanvraag ontvangen.
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              We contacteren je zo snel mogelijk.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Read-only plan info */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Plan</label>
                <input
                  type="text"
                  value={plan}
                  readOnly
                  className="w-full px-3 py-2.5 rounded-lg bg-muted text-foreground text-sm font-medium border border-border cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Prijs</label>
                <input
                  type="text"
                  value={`€${price}`}
                  readOnly
                  className="w-full px-3 py-2.5 rounded-lg bg-muted text-foreground text-sm font-medium border border-border cursor-not-allowed"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">E-mailadres *</label>
              <input
                type="email"
                required
                placeholder="naam@voorbeeld.nl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-card text-foreground text-sm border border-border focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Telefoonnummer *</label>
              <input
                type="tel"
                required
                placeholder="+31 6 12345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-card text-foreground text-sm border border-border focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
              />
            </div>

            {status === "error" && (
              <p className="text-destructive text-sm font-medium">
                ❌ Er ging iets mis. Probeer opnieuw.
              </p>
            )}

            <button
              type="submit"
              disabled={!canSubmit && status !== "loading"}
              className="w-full bg-foreground text-card font-semibold py-3 rounded-lg hover:scale-[1.02] hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {status === "loading" ? "Verzenden…" : "Abonnement aanvragen"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SubscriptionModal;
