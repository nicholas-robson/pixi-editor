import { Item } from 'State/Item';
import { UndoState } from 'State/State';

export type EditorState = {
    undo: UndoState[];
    redo: UndoState[];
    items: Item[];
};
