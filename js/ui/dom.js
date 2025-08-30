window.$ = (sel) => document.querySelector(sel);
window.$all = (sel) => Array.from(document.querySelectorAll(sel));

window.hooks = {
  productos() { return $("#productos"); },
  carrito() { return $("#carrito"); },
  totales() { return $("#totales"); },
  form() { return $("#checkout-form"); },
  nombre() { return $("#cliente-nombre"); },
  telefono() { return $("#cliente-telefono"); },
  fecha() { return $("#cliente-fecha"); },
  btnConfirmar() { return $("#btn-confirmar"); },
  ticket() { return $("#ticket"); },
  toast() { return $("#toast"); }
};

window.toast = function (msg) {
  const t = hooks.toast();
  t.textContent = msg;
  t.classList.add("is-visible");
  setTimeout(() => t.classList.remove("is-visible"), 2200);
};