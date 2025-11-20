const CART_KEY = 'jf_cart_v1';

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to read cart', e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    dispatchCartChange();
  } catch (e) {
    console.error('Failed to save cart', e);
  }
}

function dispatchCartChange() {
  const count = getCount();
  window.dispatchEvent(new CustomEvent('cartchange', { detail: { count } }));
}

function getCount() {
  const cart = readCart();
  return cart.reduce((s, it) => s + (it.quantity || 0), 0);
}

function addItem(item) {
  if (!item || !item.id) return;
  const cart = readCart();
  const existing = cart.find((c) => c.id === item.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + (item.quantity || 1);
  } else {
    cart.push({
      id: item.id,
      name: item.name || item.product_name || '',
      price: item.price || 0,
      image: item.image || item.image_url || '',
      quantity: item.quantity || 1,
      metadata: item.metadata || {},
    });
  }
  saveCart(cart);
}

function removeItem(id) {
  const cart = readCart().filter((c) => c.id !== id);
  saveCart(cart);
}

function updateQty(id, qty) {
  const cart = readCart();
  const item = cart.find((c) => c.id === id);
  if (!item) return;
  item.quantity = Math.max(0, qty);
  const filtered = cart.filter((c) => c.quantity > 0);
  saveCart(filtered);
}

function clearCart() {
  saveCart([]);
}

function getCart() {
  return readCart();
}

// expose API
window.cartApi = {
  addItem,
  removeItem,
  updateQty,
  clearCart,
  getCart,
  getCount,
};

// initial dispatch so UI can pick up count on load
setTimeout(dispatchCartChange, 0);

export default window.cartApi;
