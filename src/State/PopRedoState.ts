import { EditorState } from 'State/EditorState';
import { getUndoState } from 'State/GetUndoState';

export function popRedoState(state: EditorState): EditorState {
    const redo = [...state.redo];
    const nextState = redo.pop();

    if (nextState === undefined) return state;

    return { ...nextState, redo, undo: [...state.undo, getUndoState(state)] };
}
