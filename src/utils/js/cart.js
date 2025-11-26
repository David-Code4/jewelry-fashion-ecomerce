// Cart client API (clean implementation)
const CART_KEY = 'jf_cart_v2';

function safeParse(raw){ try{ return JSON.parse(raw); }catch(e){ return null; } }

function readCart(){ const raw = localStorage.getItem(CART_KEY); const data = safeParse(raw); return Array.isArray(data) ? data : []; }

function saveCart(cart){ try{ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }catch(e){ console.error('cart save failed', e); } dispatchCartChange(); }

function dispatchCartChange(){ const count = getCount(); window.dispatchEvent(new CustomEvent('cartchange',{ detail: { count } })); }

function getCount(){ const cart = readCart(); return cart.reduce((s,item)=> s + (Number(item.quantity)||0), 0); }

function addItem(item){
  if(!item || !item.id) return;
  const cart = readCart();
  const idx = cart.findIndex(c=> String(c.id) === String(item.id));
  if(idx >= 0){ cart[idx].quantity = (Number(cart[idx].quantity)||0) + (Number(item.quantity)||1); }
  else { cart.push({ id: String(item.id), name: item.name||'', price: Number(item.price||0), image: item.image||'', quantity: Number(item.quantity||1) }); }
  saveCart(cart);
}

function removeItem(id){ const cart = readCart().filter(c=> String(c.id) !== String(id)); saveCart(cart); }

function updateQty(id, qty){ const cart = readCart(); const idx = cart.findIndex(c=> String(c.id) === String(id)); if(idx === -1) return; cart[idx].quantity = Math.max(0, Number(qty)||0); saveCart(cart.filter(i=> i.quantity > 0)); }

function clearCart(){ saveCart([]); }

function getCart(){ return readCart(); }

// expose API
window.cartApi = { addItem, removeItem, updateQty, clearCart, getCart, getCount };

// initial dispatch so UI can pick up count on load
setTimeout(dispatchCartChange,0);

export default window.cartApi;
