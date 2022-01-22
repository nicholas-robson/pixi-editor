export function roundTo(num: number, digits: number) {
    const order = Math.pow(10, digits);
    return parseFloat((Math.round(num * order) / order).toFixed(digits));
}
