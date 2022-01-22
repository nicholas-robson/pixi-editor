import { dispatch, getState } from 'State/State';
import { createSelector } from 'reselect';
import { updateItemAction } from 'State/Actions';
import $ from 'jquery';
import { Item } from 'State/Item';
import { EditorState } from 'State/EditorState';

export type ControlOptions<T extends Item[keyof Item]> = {
    label?: string;
    step?: number;
    readonly?: boolean;
};

export type Control<T> = {
    element: JQuery<HTMLElement>;
    onAttach: () => void;
    selector: (state: EditorState) => void;
};

export function getSelected(state: EditorState) {
    return state.items.find((item) => item.selected);
}

export function isNumeric(inputString: unknown) {
    if (typeof inputString !== 'string') return false;
    return !isNaN(inputString as unknown as number) && !isNaN(parseFloat(inputString));
}

export function onVector2Input(key: keyof Item, idX: any, idY: any) {
    const x = $(`#${idX}`).val() as Item['position']['x'];
    const y = $(`#${idY}`).val() as Item['position']['y'];

    if (!isNumeric(x) || !isNumeric(y)) return;

    onChange({ [key]: { x, y } });
}

export function onNumberInput(key: keyof Item) {
    const value = $(`#${key}`).val();

    if (!isNumeric(value)) return;

    onChange({ [key]: value });
}

export function onChange<T extends keyof Item>(values: Partial<Item>): void {
    const selected = getSelected(getState());
    if (selected !== undefined) {
        dispatch(updateItemAction(selected.id, values));
    }
}

export function getSelector<T extends keyof Item>(
    key: T,
    callback: (item: Item | undefined, value: Item[T] | undefined) => void
) {
    return createSelector(getSelected, (state: EditorState) => getSelected(state)?.[key], callback);
}
