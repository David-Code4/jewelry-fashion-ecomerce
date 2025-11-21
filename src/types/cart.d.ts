export {};

declare global {
  interface CartItem {
    id: string;
    name?: string;
    price?: number;
    image?: string;
    quantity?: number;
  }

  interface CartApi {
    addItem(item: Partial<CartItem> & { id: string; quantity?: number }): void;
    removeItem(id: string): void;
    updateQty(id: string, qty: number): void;
    clearCart(): void;
    getCart(): CartItem[];
    getCount(): number;
  }

  interface Window {
    cartApi?: CartApi;
  }

  // Minimal DOM augmentations to reduce inline-script TS warnings in Astro files
  interface HTMLElement {
    disabled?: boolean;
  }
  interface Element {
    focus?: () => void;
  }
  interface HTMLInputElement {
    value?: any;
  }
}
