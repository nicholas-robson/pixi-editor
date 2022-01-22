import { EditorState } from 'State/EditorState';
import { getUndoState } from 'State/GetUndoState';

export function pushUndoState(state: EditorState) {
    let undo = [...state.undo, getUndoState(state)];
    if (undo.length > 10) {
        undo.shift();
    }
    return {
        ...state,
        undo,
        redo: [],
    };
}
