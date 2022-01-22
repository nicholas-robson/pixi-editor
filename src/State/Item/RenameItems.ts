import { EditorState } from 'State/EditorState';

/**
 * TODO: Replace with `updateItem` or `updateItems`?
 * @param state
 * @param id
 * @param name
 */
export function renameItems(state: EditorState, id: string, name: string) {
    return { ...state, items: state.items.map((item) => (item.id === id ? { ...item, name } : item)) };
}
