import { useState } from "react";
import PricingToggle from "@/components/PricingToggle";
import PricingCard from "@/components/PricingCard";

const baseFeatures = (extraMonths: boolean) => [
  { text: "Plus Extra 2 Maanden", included: extraMonths },
  { text: "Directe Activering!", included: true },
  { text: "+15.000 Kanalen", included: true },
  { text: "+80.000 Films en Series (VOD)", included: true },
  { text: "RTL - Viaplay - Videoland", included: true },
  { text: "Terugkijken en EPG", included: true },
  { text: "FHD, HD, Kanalen", included: true },
  { text: "24/7 Live Chat Ondersteuning", included: true },
  { text: "7-dagen geld-terug-garantie", included: true, highlight: true },
];

const plans = [
  { title: "1 Maand", price: "11.99", originalPrice: "24", extraMonths: false },
  { title: "3 Maanden", price: "25.99", originalPrice: "50", extraMonths: false },
  { title: "6 Maanden", price: "35.99", originalPrice: "70", extraMonths: false },
  { title: "12 Maanden", price: "45.99", originalPrice: "90", extraMonths: true, popular: true },
];

const Index = () => {
  const [isStandard, setIsStandard] = useState(true);

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-10">
          <PricingToggle isStandard={isStandard} onToggle={setIsStandard} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <PricingCard
              key={plan.title}
              title={plan.title}
              price={plan.price}
              originalPrice={plan.originalPrice}
              features={baseFeatures(plan.extraMonths)}
              popular={plan.popular}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
