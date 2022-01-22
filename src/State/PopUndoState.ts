import { EditorState } from 'State/EditorState';
import { getUndoState } from 'State/GetUndoState';

export function popUndoState(state: EditorState): EditorState {
    const undo = [...state.undo];
    const previousState = undo.pop();

    if (previousState === undefined) return state;

    return { ...previousState, undo, redo: [...state.redo, getUndoState(state)] };
}
