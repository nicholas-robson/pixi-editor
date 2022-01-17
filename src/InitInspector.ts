import { dispatch, EditorState, getState, Item, subscribe } from 'State';
import { createSelector, OutputSelector } from 'reselect';
import $ from 'jquery';
import 'bootstrap';
import { updateItemAction } from 'Actions';
import Split from 'split.js';

Split(['#left-panel', '#center-panel', '#right-panel'], {
    sizes: [20, 60, 20],
    gutterStyle: function (dimension, gutterSize) {
        return {
            'flex-basis': gutterSize + 'px',
        };
    },
    onDragEnd: function (sizes) {
        window.dispatchEvent(new Event('resize'));
    },
});

export function initInspector(state: EditorState) {
    const typeSelector = bindItemProperty('type', (itemSelected, value) => {
        $(`#item-type`).prop('disabled', itemSelected);
        $(`#item-type`).val(value ?? '');
    });

    const nameSelector = bindItemProperty('name', (itemSelected, value) => {
        $(`#item-name`).prop('disabled', itemSelected);
        $(`#item-name`).val(value ?? '');
    });

    const idSelector = bindItemProperty('id', (itemSelected, value) => {
        $(`#item-id`).prop('disabled', itemSelected);
        $(`#item-id`).val(value ?? '');
    });

    const visibleSelector = bindItemProperty('visible', (itemSelected, value) => {
        $(`#item-visible`).prop('disabled', itemSelected);
        $(`#item-visible`).prop('checked', value);
    });

    const tintSelector = bindItemProperty('tint', (itemSelected, value) => {
        $(`#item-tint`).prop('disabled', itemSelected);
        $(`#item-tint`).val(isNaN(value) ? '' : '#' + decimalToHex(value));
    });

    const positionSelector = bindItemProperty('position', (itemSelected, value) => {
        $(`#item-position-x`).prop('disabled', itemSelected);
        $(`#item-position-y`).prop('disabled', itemSelected);

        $(`#item-position-x`).val(value ? value.x : '');
        $(`#item-position-y`).val(value ? value.y : '');
    });

    const scaleSelector = bindItemProperty('scale', (itemSelected, value) => {
        $(`#item-scale-x`).prop('disabled', itemSelected);
        $(`#item-scale-y`).prop('disabled', itemSelected);

        $(`#item-scale-x`).val(value ? value.x : '');
        $(`#item-scale-y`).val(value ? value.y : '');
    });

    const angleSelector = bindItemProperty('angle', (itemSelected, value) => {
        $(`#item-angle`).prop('disabled', itemSelected);
        $(`#item-angle`).val(isNaN(value) ? '' : value);
    });

    const alphaSelector = bindItemProperty('alpha', (itemSelected, value) => {
        $(`#item-alpha`).prop('disabled', itemSelected);
        $(`#item-alpha`).val(isNaN(value) ? '' : value);
    });

    const pivotSelector = bindItemProperty('pivot', (itemSelected, value) => {
        $(`#item-pivot-x`).prop('disabled', itemSelected);
        $(`#item-pivot-y`).prop('disabled', itemSelected);

        $(`#item-pivot-x`).val(value ? value.x : '');
        $(`#item-pivot-y`).val(value ? value.y : '');
    });

    const anchorSelector = bindItemProperty('anchor', (itemSelected, value) => {
        $(`#item-anchor-x`).prop('disabled', itemSelected);
        $(`#item-anchor-y`).prop('disabled', itemSelected);

        $(`#item-anchor-x`).val(value ? value.x : '');
        $(`#item-anchor-y`).val(value ? value.y : '');
    });

    bind(state, typeSelector);
    bind(state, nameSelector);
    bind(state, idSelector);
    bind(state, visibleSelector);
    bind(state, tintSelector);
    bind(state, positionSelector);
    bind(state, scaleSelector);
    bind(state, angleSelector);
    bind(state, alphaSelector);
    bind(state, pivotSelector);
    bind(state, anchorSelector);

    $(`#item-position-x`).on('input', updatePosition);
    $(`#item-position-y`).on('input', updatePosition);

    $(`#item-scale-x`).on('input', updateScale);
    $(`#item-scale-y`).on('input', updateScale);

    $(`#item-visible`).on('change', () => {
        const id = getCurrentItemID();
        if (id === undefined || id === '') return;

        const checked = $(`#item-visible`).prop('checked');

        dispatch(
            updateItemAction(id, {
                visible: checked,
            })
        );
    });

    $(`#item-angle`).on('input', () => {
        let angle = parseFloat($(`#item-angle`).val() as string);
        const id = getCurrentItemID();
        if (id === undefined || id === '') return;

        if (!isNaN(angle)) {
            dispatch(
                updateItemAction(id, {
                    angle,
                })
            );
        }
    });
}

function bind(state: EditorState, selector: OutputSelector<any, any, any>) {
    subscribe(selector);
    selector(state);
}

function updateScale() {
    const id = getCurrentItemID();
    if (id === undefined || id === '') return;

    const item = getState().items.find((item) => item.id === id);
    if (item === undefined) return;

    let x = parseFloat($(`#item-scale-x`).val() as string);
    let y = parseFloat($(`#item-scale-y`).val() as string);

    if (isNaN(x) || isNaN(y)) return;

    dispatch(
        updateItemAction(id, {
            scale: {
                x,
                y,
            },
        })
    );
}

function updatePosition() {
    const id = getCurrentItemID();
    if (id === undefined || id === '') return;

    const item = getState().items.find((item) => item.id === id);
    if (item === undefined) return;

    let x = parseFloat($(`#item-position-x`).val() as string);
    let y = parseFloat($(`#item-position-y`).val() as string);

    if (isNaN(x) || isNaN(y)) return;

    dispatch(
        updateItemAction(id, {
            position: {
                x,
                y,
            },
        })
    );
}

function getCurrentItemID() {
    return $(`#item-id`).val() as string | undefined;
}

function bindItemProperty<T extends keyof Item>(
    property: T,
    callback: (itemSelected: boolean, value: Item[T]) => void
) {
    return createSelector(
        (state: EditorState) => state.items.find((item) => item.selected) === undefined,
        (state: EditorState) => state.items.find((item) => item.selected)?.[property],
        callback
    );
}

function decimalToHex(d: number, padding: number = 6) {
    var hex = Number(d).toString(16);
    padding = typeof padding === 'undefined' || padding === null ? (padding = 2) : padding;

    while (hex.length < padding) {
        hex = '0' + hex;
    }

    return hex;
}
