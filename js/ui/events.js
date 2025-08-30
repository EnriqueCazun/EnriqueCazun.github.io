window.bindEvents = function ({ inventory, cart }) {

  hooks.productos().addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-add");
    if (!btn) return;
    const card = e.target.closest(".card");
    const id = card?.dataset?.id;
    const qtyInput = card.querySelector(".qty-input");
    const qty = fmt.clampInt(qtyInput?.value || 1, 1);
    const p = inventory.find(id);
    if (!p) return;

    cart.add(p, qty);
  });

  hooks.carrito().addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-remove");
    if (!btn) return;
    const tr = e.target.closest("tr");
    const id = tr?.dataset?.id;
    if (!id) return;
    cart.remove(id);
  });

  hooks.form().addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = hooks.nombre().value.trim();
    const telefono = hooks.telefono().value.trim();
    const fecha = hooks.fecha().value;

    if (!nombre || !telefono || !fecha) {
      toast("Completa todos los campos del pedido.");
      return;
    }

    const result = cart.checkout({ nombre, telefono, fecha, taxRate: 0.13 });
    if (!result.ok) {
      toast(result.error || "No se pudo procesar el pedido");
      return;
    }

    renderTicket(result.ticket);
    renderProducts(inventory.all());
    renderCart(cart.items());
    renderTotals({ subtotal: 0, tax: 0, total: 0 });
    toast("Operación exitosa");
  });
};