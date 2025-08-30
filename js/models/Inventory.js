window.Inventory = function (items = []) {
  const byId = new Map();
  items.forEach(p => byId.set(String(p.id), p));

  this.all = function () {
    return Array.from(byId.values());
  };

  this.find = function (id) {
    return byId.get(String(id)) || null;
  };

  this.reduceStock = function (lines /* [{id, qty}] */) {
    for (const line of lines) {
      const p = this.find(line.id);
      if (!p || !p.canFulfill(line.qty)) {
        return { ok: false, fail: { id: line.id, requested: line.qty, stock: p ? p.stock : 0 } };
      }
    }
    for (const line of lines) {
      const p = this.find(line.id);
      p.reduceStock(line.qty);
    }
    return { ok: true };
  };
};