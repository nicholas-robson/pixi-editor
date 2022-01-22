import { EditorState } from 'State/EditorState';
import { getAllChildren } from 'State/Item/GetAllChildren';

export function deleteItems(state: EditorState, ids: string[]): EditorState {
    // Unique deletion ids.
    const deleteIds = [...new Set(ids.flatMap((id) => getAllChildren(state, id))).values()];
    return {
        ...state,
        items: state.items.filter((item) => !deleteIds.includes(item.id)),
    };
}
