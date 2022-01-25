import { Item } from 'State/Item';
import { UndoState } from 'State/State';

export type EditorState = {
    undo: UndoState[];
    redo: UndoState[];
    items: Item[];
    focus: { itemID: string | null };
    viewport: {
        x: number;
        y: number;
        width: number;
        height: number;
        zoom: number;
    };
};
