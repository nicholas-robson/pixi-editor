import { EditorState } from 'State/EditorState';
import { getItem } from 'State/GetItem';
import { PixiType } from 'State/PixiType';
import { normalizeIndexes } from 'State/Item/NormalizeIndexes';

export const preloadedState: EditorState = normalizeIndexes({
    undo: [],
    redo: [],
    focus: { itemID: 'text_1' },
    viewport: {
        x: 0,
        y: 0,
        width: 800,
        height: 600,
        zoom: 1,
    },
    items: [
        // getItem({
        //     id: 'root_1',
        // }),
        // getItem({
        //     id: 'root_2',
        //     position: { x: 0, y: 0 },
        // }),
        getItem({
            id: 'sprite_1',
            // parent: 'root_1',
            type: PixiType.SPRITE,
            texture: 'audiosfx_1_2.png',
        }),
        // getItem({
        //     id: 'sprite_2',
        //     parent: 'root_2',
        //     type: PixiType.SPRITE,
        //     texture: 'nine-slice-test.png',
        // }),
        getItem({
            id: 'nine_slice_1',
            type: PixiType.NINE_SLICE,
            texture: 'nine-slice-test.png',
            position: { x: 200, y: 100 },
            nineSliceSize: { top: 30, left: 25, right: 25, bottom: 45 },
            width: 350,
            height: 350,
        }),
        getItem({
            selected: true,
            id: 'text_1',
            // parent: 'nine_slice_1',
            type: PixiType.TEXT,
            text: 'Some nice text',
            textStyle: {
                fill: 0xffffff,
                fontSize: 24,
            },
            position: { x: 100, y: 100 },
        }),
    ],
});
