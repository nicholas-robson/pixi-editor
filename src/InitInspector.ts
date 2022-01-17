import { dispatch, EditorState, Item, subscribe } from 'State';
import { createSelector } from 'reselect';
import $ from 'jquery';
import 'bootstrap';
import { updateItemAction } from 'Actions';
import "numscrubberjs";

declare const Numscrubber:any;


Numscrubber.init();

export function initInspector(state: EditorState) {
    const typeSelector = bindItemProperty('type', (value) => {
        $(`#item-type`).val(value ?? '');
    });

    const nameSelector = bindItemProperty('name', (value) => {
        $(`#item-name`).val(value ?? '');
    });

    const idSelector = bindItemProperty('id', (value) => {
        $(`#item-id`).val(value ?? '');
    });

    const visibleSelector = bindItemProperty('visible', (value) => {
        $(`#item-visible`).prop('checked', value);
    });

    const tintSelector = bindItemProperty('tint', (value) => {
        $(`#item-tint`).val(isNaN(value) ? '' : '#' + decimalToHex(value));
    });

    const positionSelector = bindItemProperty('position', (value) => {
        $(`#item-position-x`).val(value ? value.x : '');
        $(`#item-position-y`).val(value ? value.y : '');
    });

    const scaleSelector = bindItemProperty('scale', (value) => {
        $(`#item-scale-x`).val(value ? value.x : '');
        $(`#item-scale-y`).val(value ? value.y : '');
    });

    const rotationSelector = bindItemProperty('rotation', (value) => {
        $(`#item-rotation`).val(isNaN(value) ? '' : value);
    });

    subscribe(typeSelector);
    subscribe(nameSelector);
    subscribe(idSelector);
    subscribe(visibleSelector);
    subscribe(tintSelector);
    subscribe(positionSelector);
    subscribe(scaleSelector);
    subscribe(rotationSelector);

    typeSelector(state);
    nameSelector(state);
    idSelector(state);
    visibleSelector(state);
    tintSelector(state);
    positionSelector(state);
    scaleSelector(state);
    rotationSelector(state);

    $(`#item-position-x`).on('input', updatePosition);
    $(`#item-position-y`).on('input', updatePosition);

    $(`#item-scale-x`).on('input', () => {
        let x = parseFloat($(`#item-scale-x`).val() as string);
        if (!isNaN(x)) {
            updateScale();
        }
    });
    $(`#item-scale-y`).on('input', () => {
        let y = parseFloat($(`#item-scale-y`).val() as string);
        if (!isNaN(y)) {
            updateScale();
        }
    });
}

function updateScale() {
    const id = getCurrentItemID();
    if (id === undefined || id === '') return;

    let x = parseFloat($(`#item-scale-x`).val() as string);
    let y = parseFloat($(`#item-scale-y`).val() as string);

    dispatch(
        updateItemAction(id, {
            scale: {
                ...{
                    x: isNaN(x) ? undefined : x,
                    y: isNaN(y) ? undefined : y,
                }
            },
        })
    );
}

function updatePosition() {
    const id = getCurrentItemID();
    if (id === undefined || id === '') return;

    let x = parseFloat($(`#item-position-x`).val() as string);
    let y = parseFloat($(`#item-position-y`).val() as string);


    dispatch(
        updateItemAction(id, {
            position: {
                ...{
                    x: isNaN(x) ? undefined : x,
                    y: isNaN(y) ? undefined : y,
                }
            },
        })
    );
}

function getCurrentItemID() {
    return $(`#item-id`).val() as string | undefined;
}

function bindItemProperty<T extends keyof Item>(property: T, callback: (value: Item[T]) => void) {
    return createSelector((state: EditorState) => {
        const id = state.items.find((item) => item.selected)?.id;
        if (id === undefined) return null;
        const item = state.items.find((item) => item.id === id);
        if (!item) return null;
        return item[property];
    }, callback);
}

function decimalToHex(d: number, padding: number = 6) {
    var hex = Number(d).toString(16);
    padding = typeof padding === 'undefined' || padding === null ? (padding = 2) : padding;

    while (hex.length < padding) {
        hex = '0' + hex;
    }

    return hex;
}
