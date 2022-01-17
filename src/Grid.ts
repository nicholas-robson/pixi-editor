import { Graphics } from 'pixi.js';

type GridOptions = {
    gridWidth: number;
    gridHeight: number;
    rowHeight: number;
    columnWidth: number;
    offsetX: number;
    offsetY: number;
    lineWidth: number;
    lineColor: number;
    lineAlpha: number;
    lineAlignment: number;
    lineNative: boolean;
};

const defaultGridOptions: GridOptions = {
    gridWidth: 1000,
    gridHeight: 1000,
    rowHeight: 100,
    columnWidth: 100,
    offsetX: 0,
    offsetY: 0,
    lineWidth: 1,
    lineColor: 0xffffff,
    lineAlpha: 1,
    lineAlignment: 0.5,
    lineNative: true,
};

export function drawGrid(graphics: Graphics, options: Partial<GridOptions> = {}, clear: boolean = true) {
    const newOptions = {
        ...defaultGridOptions,
        ...options,
    };

    if (clear) {
        graphics.clear();
    }

    graphics.lineStyle(
        newOptions.lineWidth,
        newOptions.lineColor,
        newOptions.lineAlpha,
        newOptions.lineAlignment,
        newOptions.lineNative
    );

    const verticalLines = Math.ceil(newOptions.gridWidth / newOptions.columnWidth);
    const horizontalLines = Math.ceil(newOptions.gridHeight / newOptions.rowHeight);

    for (let i = 0; i < verticalLines + 1; i++) {
        const x = i * newOptions.columnWidth + wrap(newOptions.offsetX, newOptions.columnWidth);
        graphics.moveTo(x, 0);
        graphics.lineTo(x, newOptions.gridHeight);
    }

    for (let i = 0; i < horizontalLines; i++) {
        const y = i * newOptions.rowHeight + wrap(newOptions.offsetY, newOptions.rowHeight);
        graphics.moveTo(0, y);
        graphics.lineTo(newOptions.gridWidth, y);
    }
}
function wrap(value: number, max: number) {
    //return ((value % max) + max) % max;

    value = value%max;
    return value<0 ? value+max : value;
}
