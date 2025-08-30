window.fmt = {
  money(n) {
    try {
      return new Intl.NumberFormat("es-SV", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
      }).format(Number(n || 0));
    } catch {
      return `$${Number(n || 0).toFixed(2)}`;
    }
  },
  clampInt(n, min = 1, max = Number.MAX_SAFE_INTEGER) {
    let v = Number(n);
    if (!Number.isFinite(v)) return min;
    v = Math.floor(v);
    if (v < min) return min;
    if (v > max) return max;
    return v;
  },
  id() {
    const d = new Date();
    const pad = (x)=>String(x).padStart(2,"0");
    const ts = `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
    const rnd = Math.floor(Math.random()*900)+100;
    return `T-${ts}-${rnd}`;
  }
};