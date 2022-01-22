import { EditorState } from 'State/EditorState';
import { UndoState } from 'State/State';

export function getUndoState(state: EditorState): UndoState {
    const undoState = { ...state } as Partial<EditorState>;
    delete undoState['undo'];
    delete undoState['redo'];

    return undoState as UndoState;
}
