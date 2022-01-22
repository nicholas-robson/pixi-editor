import { EditorState } from 'State/EditorState';

export function moveItems(
    state: EditorState,
    payload: { parent: string | null; ids: string[]; position: number },
    updateFromTree: boolean,
) {
    return {
        ...state,
        updateFromTree,
        items: state.items.map((item) => {
            if (!payload.ids.includes(item.id)) {
                if (item.parent === payload.parent && item.childIndex >= payload.position) {
                    return {
                        ...item,
                        // Bump indexes.
                        childIndex: item.childIndex + payload.ids.length,
                    };
                }

                return item;
            }

            return {
                ...item,
                childIndex: payload.position + payload.ids.indexOf(item.id),
                parent: payload.parent,
            };
        }),
    };
}
