window.renderProducts = function (products) {
  const wrap = hooks.productos();
  wrap.innerHTML = products.map(p => `
    <article class="card" data-id="${p.id}">
      <h3>${p.name}</h3>
      <p class="muted">${fmt.money(p.price)}</p>
      <p><span class="badge">Stock: ${p.stock}</span></p>
      <div class="row">
        <input type="number" min="1" value="1" class="qty-input" />
        <button class="btn-add">Agregar</button>
      </div>
    </article>
  `).join("");
};

window.renderCart = function (items) {
  const el = hooks.carrito();
  if (items.length === 0) {
    el.innerHTML = `<p class="muted">Tu carrito está vacío.</p>`;
    return;
  }
  el.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cant.</th>
          <th>Precio</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${items.map(it => `
          <tr data-id="${it.product.id}">
            <td>${it.product.name}</td>
            <td>${it.qty}</td>
            <td>${fmt.money(it.product.price)}</td>
            <td>${fmt.money(it.total())}</td>
            <td><button class="btn-remove">Quitar</button></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
};

window.renderTotals = function ({ subtotal, tax, total }) {
  const el = hooks.totales();
  el.innerHTML = `
    <div class="row-between">
      <span>Subtotal</span>
      <span>${fmt.money(subtotal)}</span>
    </div>
    <div class="row-between">
      <span>Impuesto (13%)</span>
      <span>${fmt.money(tax)}</span>
    </div>
    <div class="row-between total">
      <span>Total</span>
      <span>${fmt.money(total)}</span>
    </div>
  `;
};

window.renderTicket = function (ticket) {
  const el = hooks.ticket();
  const lines = ticket.items.map(it => `
    <tr>
      <td>${it.name}</td>
      <td>${it.qty}</td>
      <td>${fmt.money(it.price)}</td>
      <td>${fmt.money(it.price * it.qty)}</td>
    </tr>
  `).join("");

  el.innerHTML = `
    <h3>Operación exitosa</h3>
    <p><strong>Ticket:</strong> ${ticket.id}</p>
    <p class="small">
      <strong>Cliente:</strong> ${ticket.cliente.nombre} &nbsp;|&nbsp;
      <strong>Tel:</strong> ${ticket.cliente.telefono} &nbsp;|&nbsp;
      <strong>Recoger:</strong> ${ticket.cliente.fecha}
    </p>
    <table class="table">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cant.</th>
          <th>Precio</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>${lines}</tbody>
      <tfoot>
        <tr><td colspan="3" class="row-between"><strong>Subtotal</strong></td><td>${fmt.money(ticket.subtotal)}</td></tr>
        <tr><td colspan="3" class="row-between"><strong>Impuesto</strong></td><td>${fmt.money(ticket.impuesto)}</td></tr>
        <tr><td colspan="3" class="row-between total"><strong>Total</strong></td><td>${fmt.money(ticket.total)}</td></tr>
      </tfoot>
    </table>
    <p class="small muted">Conserve su número de ticket para cualquier consulta.</p>
  `;
  el.classList.remove("hidden");
};