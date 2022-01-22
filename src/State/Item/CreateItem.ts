import { EditorState } from 'State/EditorState';
import { Item } from 'State/Item';
import { getItem } from 'State/GetItem';

export function createItem(state: EditorState, item: Partial<Item>): EditorState {
    return {
        ...state,
        items: [...state.items, getItem(item)],
    };
}
