(function () {
  const TAX_RATE = 0.13;

  const inventory = new Inventory([
    new Product({ id: 1, name: "Tenis Clásicos", price: 34.99, stock: 8 }),
    new Product({ id: 2, name: "Botas Urbanas", price: 54.50, stock: 5 }),
    new Product({ id: 3, name: "Running Pro", price: 75.00, stock: 10 }),
    new Product({ id: 4, name: "Casuales Canvas", price: 28.25, stock: 12 })
  ]);

  const cart = new Cart({ inventory });

  renderProducts(inventory.all());
  renderCart(cart.items());
  renderTotals({ subtotal: 0, tax: 0, total: 0 });

  cart.onUpdate(({ items }) => {
    renderCart(items);
    const subtotal = items.reduce((acc, it) => acc + it.total(), 0);
    const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;
    renderTotals({ subtotal, tax, total });
  });

  bindEvents({ inventory, cart });

  window.__APP__ = { inventory, cart };
})();