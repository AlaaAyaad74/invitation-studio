/** wa.me link that opens a chat with `number` and a prefilled `text`. */
export function whatsappUrl(number: string, text: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
