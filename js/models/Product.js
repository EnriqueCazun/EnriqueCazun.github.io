window.Product = function ({ id, name, price, stock }) {
  this.id = String(id);
  this.name = name;
  this.price = Number(price || 0);
  this.stock = fmt.clampInt(stock ?? 0, 0);

  this.canFulfill = function (qty) {
    qty = fmt.clampInt(qty, 1);
    return this.stock >= qty;
  };

  this.reduceStock = function (qty) {
    qty = fmt.clampInt(qty, 1);
    if (!this.canFulfill(qty)) return false;
    this.stock -= qty;
    return true;
  };

  this.addStock = function (qty) {
    qty = fmt.clampInt(qty, 1);
    this.stock += qty;
  };
};
