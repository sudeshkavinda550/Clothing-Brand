import { CartItem } from "../types";

export function cleanPhoneNumber(phone: string): string {
  // Strip any non-digit characters except for leading '+'
  return phone.replace(/[^\d+]/g, "");
}

export function generateSingleProductOrderUrl(
  whatsappNumber: string,
  productName: string,
  color: string,
  size: string,
  quantity: number,
  price: number,
  currency: string,
  template: string
): string {
  const finalPhone = cleanPhoneNumber(whatsappNumber);
  
  // Format price
  const formattedPrice = `${currency}${price * quantity} (${currency}${price} each)`;

  // Replace placeholders in template
  let message = template
    .replace(/{productName}/g, productName)
    .replace(/{color}/g, color)
    .replace(/{size}/g, size)
    .replace(/{quantity}/g, quantity.toString())
    .replace(/{price}/g, formattedPrice);

  return `https://wa.me/${finalPhone}?text=${encodeURIComponent(message)}`;
}

export function generateCartOrderUrl(
  whatsappNumber: string,
  cartItems: CartItem[],
  currency: string
): string {
  const finalPhone = cleanPhoneNumber(whatsappNumber);
  
  let itemsList = "";
  let total = 0;

  cartItems.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    total += itemTotal;
    
    itemsList += `\n${index + 1}. *${item.product.name}*\n`;
    itemsList += `   Color: ${item.selectedColor.name}\n`;
    itemsList += `   Size: ${item.selectedSize}\n`;
    itemsList += `   Qty: ${item.quantity}\n`;
    itemsList += `   Price: ${currency}${itemTotal} (${currency}${item.product.price} each)\n`;
  });

  const message = `Hello, I want to order the following items from *AURA Noir*:\n${itemsList}\n*Total Order Price:* ${currency}${total}\n\nPlease confirm availability. Thank you!`;

  return `https://wa.me/${finalPhone}?text=${encodeURIComponent(message)}`;
}
