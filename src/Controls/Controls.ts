import { dispatch, getState } from 'State/State';
import { createSelector } from 'reselect';
import { updateItemAction } from 'State/Actions';
import { Item } from 'State/Item';
import { EditorState } from 'State/EditorState';
import { Prop } from 'Views/Inspector/Prop';

export type ControlOptions = {
    label?: string;
    step?: number;
    readonly?: boolean;
};

export type Control = {
    element: JQuery<HTMLElement>;
    onAttach: () => void;
    selector: (state: EditorState) => void;
};

export function getSelected(state: EditorState) {
    const selected = state.items.filter((item) => item.selected);
    if (selected.length > 1) return undefined;
    return selected[0];
}

export function isNumeric(inputString: unknown): inputString is number {
    if (typeof inputString !== 'string') return false;
    return !isNaN(inputString as unknown as number) && !isNaN(parseFloat(inputString));
}

export function onChange<T>(prop: Prop<T>, value: T): void {
    const valueToItem = prop.valueToItem ?? ((value) => ({ [prop.id]: value }));
    const partialItem = valueToItem(value);

    const selected = getSelected(getState());
    if (selected !== undefined) {
        dispatch(updateItemAction(selected.id, partialItem));
    }
}

export function getSelector<T>(prop: Prop<T>, callback: (item: Item | undefined, value: T | undefined) => void) {
    const itemToValue = prop.itemToValue ?? ((item) => item?.[prop.id as keyof Item]);
    return createSelector(getSelected, (state: EditorState) => itemToValue(getSelected(state)), callback);
}
