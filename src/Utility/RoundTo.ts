import { Sides } from 'Utility/Sides';

export function roundTo(num: number, digits: number) {
    const order = Math.pow(10, digits);
    return parseFloat((Math.round(num * order) / order).toFixed(digits));
}

export function roundSides(value: Sides, digits: number) {
    return {
        top: roundTo(value.top, digits),
        right: roundTo(value.right, digits),
        left: roundTo(value.left, digits),
        bottom: roundTo(value.bottom, digits),
    };
}
