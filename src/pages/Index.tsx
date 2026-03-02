import { useState } from "react";
import PricingToggle from "@/components/PricingToggle";
import PricingCard from "@/components/PricingCard";

const standardFeatures = (extraMonths: boolean) => [
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

const premiumFeatures = (extraMonths: boolean) => [
  { text: "Plus Extra 3 Maanden", included: extraMonths },
  { text: "Directe Activering!", included: true },
  { text: "+30.000 Kanalen", included: true },
  { text: "+180k Films en Series (VOD)", included: true },
  { text: "RTL - Viaplay - Videoland", included: true },
  { text: "Terugkijken en EPG", included: true },
  { text: "4K, UHD, FHD, HD, Kanalen", included: true },
  { text: "24/7 Live Chat Ondersteuning", included: true },
  { text: "7-dagen geld-terug-garantie", included: true, highlight: true },
];

const standardPlans = [
  { title: "1 Maand", price: "11.99", originalPrice: "24", extraMonths: false },
  { title: "3 Maanden", price: "25.99", originalPrice: "50", extraMonths: false },
  { title: "6 Maanden", price: "35.99", originalPrice: "70", extraMonths: false },
  { title: "12 Maanden", price: "45.99", originalPrice: "90", extraMonths: true, popular: true },
];

const premiumPlans = [
  { title: "1 Maand", price: "19.99", originalPrice: "25", extraMonths: false },
  { title: "3 Maanden", price: "29.99", originalPrice: "60", extraMonths: false },
  { title: "6 Maanden", price: "49.99", originalPrice: "100", extraMonths: false },
  { title: "12 Maanden", price: "69.99", originalPrice: "140", extraMonths: true, popular: true },
];

const Index = () => {
  const [isStandard, setIsStandard] = useState(true);
  const plans = isStandard ? standardPlans : premiumPlans;
  const getFeatures = isStandard ? standardFeatures : premiumFeatures;
  const isPremium = !isStandard;

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-10">
          <PricingToggle isStandard={isStandard} onToggle={setIsStandard} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <PricingCard
              key={plan.title + (isStandard ? "s" : "p")}
              title={plan.title}
              price={plan.price}
              originalPrice={plan.originalPrice}
              features={getFeatures(plan.extraMonths)}
              popular={plan.popular}
              premium={isPremium}
              badges={isPremium ? ["HD", "FHD", "4K"] : ["HD", "FHD"]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
