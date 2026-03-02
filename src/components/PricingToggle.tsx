interface PricingToggleProps {
  isStandard: boolean;
  onToggle: (standard: boolean) => void;
}

const PricingToggle = ({ isStandard, onToggle }: PricingToggleProps) => {
  return (
    <div className="inline-flex items-center rounded-full bg-card border border-border p-1 shadow-sm">
      <button
        onClick={() => onToggle(true)}
        className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
          isStandard
            ? "bg-foreground text-card shadow-md"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Standard
      </button>
      <button
        onClick={() => onToggle(false)}
        className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
          !isStandard
            ? "bg-foreground text-card shadow-md"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Premium 🔥
      </button>
    </div>
  );
};

export default PricingToggle;
