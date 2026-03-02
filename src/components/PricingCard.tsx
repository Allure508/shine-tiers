import { Check, Ban } from "lucide-react";
import PaymentIcons from "./PaymentIcons";

interface PricingCardProps {
  title: string;
  price: string;
  originalPrice: string;
  features: { text: string; included: boolean; highlight?: boolean }[];
  popular?: boolean;
  premium?: boolean;
  badges?: string[];
}

const PricingCard = ({ title, price, originalPrice, features, popular, premium, badges = ["HD", "FHD"] }: PricingCardProps) => {
  const badgeColor = popular && premium
    ? "bg-amber-400 text-foreground"
    : popular
    ? "bg-primary text-primary-foreground"
    : "";

  const buttonClass = premium
    ? "bg-amber-400 text-foreground hover:bg-amber-500"
    : "bg-foreground text-card";

  return (
    <div
      className={`relative flex flex-col rounded-lg bg-card border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
        popular ? (premium ? "ring-2 ring-amber-400" : "ring-2 ring-primary") : ""
      }`}
    >
      {popular && (
        <div className={`${badgeColor} text-center text-xs font-bold uppercase tracking-wider py-2`}>
          Most Popular
        </div>
      )}

      <div className="p-6 pb-4 text-center border-b border-border">
        <h3 className="text-lg font-bold uppercase tracking-wide text-primary italic">
          {title}
        </h3>
        <p className="text-4xl font-extrabold text-foreground mt-2">€ {price}</p>
        <p className="text-xs font-bold mt-2">
          <span className="text-destructive">ORIGINELE PRIJS €{originalPrice}</span>
          <span className="text-muted-foreground mx-1">|</span>
          <span className="text-destructive">50% KORTING</span>
        </p>
        <div className="flex justify-center gap-2 mt-3">
          {badges.map((b) => (
            <span key={b} className="inline-flex items-center justify-center border border-foreground rounded px-2 py-0.5 text-xs font-bold text-foreground">
              {b}
            </span>
          ))}
        </div>
      </div>

      <ul className="flex-1 p-6 space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            {f.included ? (
              <Check className="w-4 h-4 mt-0.5 shrink-0 text-success" strokeWidth={3} />
            ) : (
              <Ban className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" strokeWidth={2} />
            )}
            <span className={f.highlight ? "text-success font-medium" : f.included ? "text-foreground" : "text-muted-foreground"}>
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      <div className="p-6 pt-2">
        <button className={`w-full ${buttonClass} font-semibold py-3 rounded-lg hover:scale-[1.03] hover:shadow-lg transition-all duration-200`}>
          Abonneer je nu
        </button>
        <PaymentIcons />
      </div>
    </div>
  );
};

export default PricingCard;
