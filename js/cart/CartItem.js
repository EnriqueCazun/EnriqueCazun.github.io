window.CartItem = function ({ product, qty }) {
  this.product = product;
  this.qty = fmt.clampInt(qty, 1);

  this.add = function (n) {
    n = fmt.clampInt(n, 1);
    this.qty += n;
  };

  this.total = function () {
    return this.qty * this.product.price;
  };
};