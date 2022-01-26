import { EditorState } from 'State/EditorState';
import { Item } from 'State/Item';
import { getItem } from 'State/GetItem';

export function createItem(state: EditorState, item: Partial<Item>): { state: EditorState; id: string } {
    const newItem = getItem(item);

    // Push to end of children.
    newItem.childIndex = state.items.filter((i) => i.parent === newItem.parent).length;

    return {
        state: {
            ...state,
            items: [...state.items, newItem],
        },
        id: newItem.id as string,
    };
}
