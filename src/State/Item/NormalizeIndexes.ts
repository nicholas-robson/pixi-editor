import { EditorState } from 'State/EditorState';

/**
 * Adjust `childIndex`s so they start from 0 and increment by 1 for distinct `parent`s.
 * @param state
 */
export function normalizeIndexes(state: EditorState): EditorState {
    return {
        ...state,
        items: [...state.items].map((item) => {
            return {
                ...item,
                childIndex: state.items
                    .filter((i) => i.parent === item.parent)
                    .sort((a, b) => a.childIndex - b.childIndex)
                    .indexOf(item),
            };
        }),
    };
}
