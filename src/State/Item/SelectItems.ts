import { EditorState } from 'State/EditorState';

export function selectItems(state: EditorState, ids: string[], deselect: boolean) {
    return {
        ...state,
        items: state.items.map((item) => {
            if (!ids.includes(item.id)) {
                if (deselect) {
                    return { ...item, selected: false };
                }
                return item;
            }

            return {
                ...item,
                selected: true,
            };
        }),
    };
}
