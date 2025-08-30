window.Cart = function ({ inventory }) {
  const items = new Map();
  const listeners = new Set();

  this.onUpdate = function (fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  };

  const emit = () => {
    const snapshot = this.items();
    const total = this.total();
    listeners.forEach(fn => fn({ items: snapshot, total }));
  };

  this.add = function (product, qty = 1) {
    qty = fmt.clampInt(qty, 1);
    const id = product.id;
    if (!items.has(id)) {
      items.set(id, new CartItem({ product, qty }));
    } else {
      items.get(id).add(qty);
    }
    emit();
  };

  this.remove = function (productId) {
    items.delete(String(productId));
    emit();
  };

  this.clear = function () {
    items.clear();
    emit();
  };

  this.items = function () {
    return Array.from(items.values());
  };

  this.total = function () {
    return this.items().reduce((acc, it) => acc + it.total(), 0);
  };

  this.checkout = function ({ nombre, telefono, fecha, taxRate = 0.13 }) {
    const lines = this.items().map(it => ({ id: it.product.id, qty: it.qty, name: it.product.name, price: it.product.price }));
    if (lines.length === 0) {
      return { ok: false, error: "Carrito vacío" };
    }
    const r = inventory.reduceStock(lines);
    if (!r.ok) {
      return { ok: false, error: `Stock insuficiente para el producto ${r.fail.id}` };
    }

    const subtotal = this.total();
    const impuesto = Math.round((subtotal * taxRate) * 100) / 100;
    const total = Math.round((subtotal + impuesto) * 100) / 100;

    const ticket = {
      id: fmt.id(),
      cliente: { nombre, telefono, fecha },
      items: lines,
      subtotal, impuesto, total,
      emitidoEn: new Date().toISOString()
    };

    this.clear();
    return { ok: true, ticket };
  };
};