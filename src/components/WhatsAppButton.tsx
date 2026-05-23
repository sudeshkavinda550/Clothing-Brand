import React from "react";
import { useAppContext } from "../context/AppContext";
import { generateSingleProductOrderUrl } from "../utils/whatsapp";

interface WhatsAppButtonProps {
  productName: string;
  selectedColor: { name: string; hex: string };
  selectedSize: string;
  quantity: number;
  price: number;
  className?: string;
  onOrderSent?: () => void;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  productName,
  selectedColor,
  selectedSize,
  quantity,
  price,
  className = "",
  onOrderSent
}) => {
  const { adminSettings } = useAppContext();

  const handleOrder = () => {
    const url = generateSingleProductOrderUrl(
      adminSettings.whatsappNumber,
      productName,
      selectedColor.name,
      selectedSize,
      quantity,
      price,
      adminSettings.currencySymbol,
      adminSettings.greetingTemplate
    );

    window.open(url, "_blank", "noopener,noreferrer");
    if (onOrderSent) {
      onOrderSent();
    }
  };

  return (
    <button
      onClick={handleOrder}
      className={`flex items-center justify-center gap-2 w-full py-4 px-6 rounded-full font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all duration-300 cursor-pointer ${className}`}
    >
      <img
        src="https://res.cloudinary.com/dp1jwsapk/image/upload/v1779536203/vecteezy_whatsapp-logo-icon-isolated-on-transparent-background_24398617_1_oyp1ib.png"
        alt="WhatsApp"
        className="h-5 w-5 object-contain brightness-0 invert"
      />
      <span>Order on WhatsApp</span>
    </button>
  );
};
export default WhatsAppButton;
