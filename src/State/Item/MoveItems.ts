import { EditorState } from 'State/EditorState';
import { normalizeIndexes } from 'State/Item/NormalizeIndexes';

export function moveItems(
    state: EditorState,
    payload: { parent: string | null; ids: string[]; position: number }
): EditorState {
    const moveItems = state.items.filter((item) => payload.ids.includes(item.id));

    // Remove items about to move.
    state = {
        ...state,
        items: state.items.filter((item) => !moveItems.includes(item)),
    };

    // Fix indexes.
    state = normalizeIndexes(state);

    // Bump indexes with same parent.
    state = {
        ...state,
        items: state.items.map((item) => {
            if (item.parent === payload.parent && item.childIndex >= payload.position) {
                return {
                    ...item,
                    childIndex: item.childIndex + payload.ids.length,
                };
            }
            return item;
        }),
    };

    // Insert new items.
    return {
        ...state,
        items: [
            ...state.items,
            ...moveItems.map((item, index) => ({
                ...item,
                parent: payload.parent,
                childIndex: payload.position + index,
            })),
        ],
    };
}
