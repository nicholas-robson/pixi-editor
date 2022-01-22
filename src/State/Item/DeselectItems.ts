import { EditorState } from 'State/EditorState';

export function deselectItems(state: EditorState, ids: string[]) {
    return {
        ...state,
        items: state.items.map((item) => {
            if (!ids.includes(item.id)) return item;

            return {
                ...item,
                selected: false,
            };
        }),
    };
}
