import { EditorState } from 'State/EditorState';
import { getItem } from 'State/GetItem';
import { PixiType } from 'State/PixiType';

export const preloadedState: EditorState = {
    undo: [],
    redo: [],
    items: [
        getItem({
            id: 'root_1',
        }),
        getItem({
            id: 'root_2',
            position: { x: 0, y: 0 },
        }),
        getItem({
            id: 'sprite_1',
            parent: 'root_1',
            type: PixiType.SPRITE,
        }),
        getItem({
            id: 'sprite_2',
            parent: 'root_2',
            type: PixiType.SPRITE,
        }),
    ],
};
