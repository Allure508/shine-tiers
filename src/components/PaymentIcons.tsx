import applePay from "@/assets/payment/apple-pay.png";
import mastercard from "@/assets/payment/mastercard.png";
import paypal from "@/assets/payment/paypal.png";

const VisaSvg = () => (
  <svg viewBox="0 0 750 471" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
    <path d="M278.198 334.228l33.36-195.763h53.358l-33.384 195.763H278.198zm246.11-191.54c-10.569-3.966-27.135-8.222-47.822-8.222-52.726 0-89.863 26.551-90.18 64.604-.634 28.14 26.524 43.822 46.754 53.186 20.77 9.57 27.752 15.716 27.652 24.267-.133 13.107-16.586 19.09-31.924 19.09-21.355 0-32.701-2.967-50.225-10.274l-6.878-3.112-7.487 43.822c12.463 5.467 35.509 10.199 59.438 10.444 56.09 0 92.501-26.248 92.916-66.884.199-22.27-14.016-39.216-44.801-53.188-18.65-9.056-30.072-15.099-29.951-24.269 0-8.137 9.668-16.838 30.559-16.838 17.467-.271 30.113 3.534 39.965 7.5l4.797 2.268 7.186-42.394zm137.181-4.223h-41.23c-12.772 0-22.332 3.486-27.94 16.234l-79.245 179.404h56.031s9.159-24.121 11.231-29.418c6.124 0 60.555.084 68.336.084 1.596 6.854 6.492 29.334 6.492 29.334h49.524l-43.199-195.638zm-65.417 126.408c4.414-11.279 21.26-54.724 21.26-54.724-.317.521 4.38-11.334 7.074-18.684l3.606 16.878s10.217 46.729 12.353 56.53h-44.293zM209.394 138.465l-52.239 133.496-5.565-27.129c-9.726-31.274-40.025-65.157-73.898-82.12l47.767 171.203 56.455-.064 84.004-195.386h-56.524" fill="#1A1F71"/>
    <path d="M131.92 138.465H49.132l-.682 4.073c66.939 16.204 111.232 55.363 129.618 102.415l-18.709-89.96c-3.229-12.396-12.597-16.095-27.439-16.528" fill="#F9A533"/>
  </svg>
);

const IdealSvg = () => (
  <svg viewBox="0 0 80 50" className="h-8 w-auto" xmlns="http://www.w3.org/2000/svg">
    <rect width="80" height="50" rx="6" fill="white" stroke="#CC0066" strokeWidth="2"/>
    <rect x="3" y="3" width="74" height="44" rx="4" fill="white"/>
    {/* iDEAL logo mark */}
    <circle cx="22" cy="25" r="10" fill="#CC0066"/>
    <circle cx="22" cy="25" r="6" fill="white"/>
    <circle cx="22" cy="25" r="3.5" fill="#CC0066"/>
    {/* Text */}
    <text x="50" y="21" textAnchor="middle" fill="#CC0066" fontSize="9" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="0.5">iDEAL</text>
    <rect x="35" y="26" width="30" height="2" rx="1" fill="#CC0066" opacity="0.3"/>
  </svg>
);

const PaymentIcons = () => {
  return (
    <div className="flex items-center justify-center gap-3 mt-4">
      <img src={applePay} alt="Apple Pay" className="h-6 w-auto opacity-70" />
      <VisaSvg />
      <img src={mastercard} alt="Mastercard" className="h-6 w-auto" />
      <IdealSvg />
      <img src={paypal} alt="PayPal" className="h-6 w-auto" />
    </div>
  );
};

export default PaymentIcons;
