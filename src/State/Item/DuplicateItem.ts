import { EditorState } from 'State/EditorState';
import { copyItem } from 'State/Item/CopyItem';

export function duplicateItem(
    state: EditorState,
    { id, position, parent, idMap }: { id: string; position: number; parent: string; idMap: Record<string, string> },
): EditorState {
    const newItems = copyItem(state, id, parent, position, idMap);

    return {
        ...state,
        items: [
            ...state.items.map((item) => {
                if (item.parent === parent && item.childIndex >= position) {
                    return {
                        ...item,
                        // Bump index.
                        childIndex: item.childIndex + 1,
                    };
                }
                return item;
            }),
            ...newItems,
        ],
    };
}
