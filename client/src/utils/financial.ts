// PV, FV, NPV, IRR (simple implementations)

export function fv(pv: number, rate: number, n: number) {
  return pv * Math.pow(1 + rate, n);
}

export function pv(fv: number, rate: number, n: number) {
  return fv / Math.pow(1 + rate, n);
}

export function npv(rate: number, cashflows: number[]) {
  let total = 0;
  for (let t = 0; t < cashflows.length; t++) {
    total += cashflows[t] / Math.pow(1 + rate, t + 1);
  }
  return total;
}

export function irr(cashflows: number[], guess = 0.1, maxIter = 1000, tol = 1e-6) {
  // Newton-Raphson
  let x0 = guess;
  for (let i = 0; i < maxIter; i++) {
    const f = cashflows.reduce((acc, cf, idx) => acc + cf / Math.pow(1 + x0, idx), 0);
    // derivative
    const df = cashflows.reduce((acc, cf, idx) => acc - (idx * cf) / Math.pow(1 + x0, idx + 1), 0);
    if (Math.abs(df) < 1e-9) break;
    const x1 = x0 - f / df;
    if (Math.abs(x1 - x0) < tol) return x1;
    x0 = x1;
  }
  return NaN;
}
