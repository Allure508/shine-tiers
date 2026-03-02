import { useState } from "react";
import { X, Check, AlertTriangle, MessageCircle, ArrowLeft } from "lucide-react";

interface SubscriptionModalProps {
  open: boolean;
  onClose: () => void;
  plan: string;
  price: string;
}

const SuccessScreen = ({ onClose }: { onClose: () => void }) => (
  <div className="text-center px-2 py-4">
    {/* Glowing check icon */}
    <div className="flex justify-center mb-6">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl scale-150" />
        <div className="relative w-16 h-16 rounded-full border-2 border-emerald-500/40 flex items-center justify-center bg-emerald-500/10">
          <Check className="w-8 h-8 text-emerald-400" strokeWidth={2.5} />
        </div>
      </div>
    </div>

    {/* Title */}
    <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
      Bedankt! We hebben je aanvraag ontvangen ✅
    </h2>

    {/* Subtitle */}
    <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-sm mx-auto">
      Binnen enkele minuten ontvang je de betaalinformatie en je abonnementsgegevens via e-mail of WhatsApp.
    </p>

    {/* Warning box */}
    <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 px-5 py-4 mb-6 text-left">
      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" strokeWidth={2} />
      <p className="text-gray-300 text-sm">
        Controleer ook je spam-/ongewenste e-mailmap.
      </p>
    </div>

    {/* Bottom muted text */}
    <p className="text-gray-500 text-xs sm:text-sm mb-8">
      Als je binnen 15 minuten niets hebt ontvangen, neem dan contact met ons op via WhatsApp.
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href="https://wa.me/XXXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3.5 px-6 rounded-xl hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-200"
      >
        <MessageCircle className="w-5 h-5" />
        WhatsApp Support
      </a>
      <button
        onClick={() => {
          onClose();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3.5 px-6 rounded-xl border border-gray-700 hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
      >
        <ArrowLeft className="w-5 h-5" />
        Terug naar Home
      </button>
    </div>
  </div>
);

const SubscriptionModal = ({ open, onClose, plan, price }: SubscriptionModalProps) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  if (!open) return null;

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isValidPhone = phone.replace(/[\s+]/g, "").length >= 8;
  const canSubmit = isValidEmail && isValidPhone && status === "idle";

  const handleClose = () => {
    setStatus("idle");
    setEmail("");
    setPhone("");
    onClose();
  };

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
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const isSuccess = status === "success";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div
        className={`relative w-full ${isSuccess ? "max-w-lg" : "max-w-md"} rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200 ${
          isSuccess ? "bg-[#0f1419]" : "bg-card"
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 p-1.5 rounded-full transition-colors ${
            isSuccess ? "hover:bg-gray-800 text-gray-500 hover:text-gray-300" : "hover:bg-muted text-muted-foreground"
          }`}
          aria-label="Sluiten"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <SuccessScreen onClose={handleClose} />
        ) : (
          <>
            {/* Header */}
            <h2 className="text-xl font-bold text-foreground">Abonnement aanvragen</h2>
            <p className="text-sm text-muted-foreground mt-1 mb-6">
              Vul je gegevens in en we activeren je direct.
            </p>

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
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionModal;
