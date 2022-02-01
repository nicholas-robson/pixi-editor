import { EditorState } from 'State/EditorState';
import { getItem } from 'State/GetItem';
import { PixiType } from 'State/PixiType';
import { normalizeIndexes } from 'State/Item/NormalizeIndexes';
import { Align, defaultFlex, FlexWrap, JustifyContent } from '../../../pixi-flex';

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
        // getItem({
        //     id: 'sprite_1',
        //     // parent: 'root_1',
        //     type: PixiType.SPRITE,
        //     texture: 'audiosfx_1_2.png',
        // }),
        // getItem({
        //     id: 'sprite_2',
        //     parent: 'root_2',
        //     type: PixiType.SPRITE,
        //     texture: 'nine-slice-test.png',
        // }),
        getItem({
            selected: false,
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
        getItem({
            selected: true,
            id: 'nine_slice_1',
            type: PixiType.NINE_SLICE,
            texture: 'nine-slice-test.png',
            position: { x: 200, y: 100 },
            nineSliceSize: { top: 30, left: 32, right: 32, bottom: 45 },
            width: 350,
            height: 350,
            tint: 4236922,
            flexEnabled: true,
            flex: {
                ...defaultFlex,
                width: undefined,
                height: undefined,
                flexWrap:FlexWrap.no_wrap,
                alignItems: Align.flex_start,
                justifyContent: JustifyContent.flex_start,
                alignContent: Align.flex_start,
                alignSelf: Align.flex_start
            },
        }),
        getItem({
            id: 'sprite_2',
            parent: 'nine_slice_1',
            type: PixiType.SPRITE,
            texture: 'audiosfx_1_2.png',
            flexEnabled: true,
            flex: {
                ...defaultFlex,
                width: 50,
                height: 50,
            },
        }),
        getItem({
            id: 'sprite_3',
            parent: 'nine_slice_1',
            type: PixiType.SPRITE,
            texture: 'audiosfx_1_2.png',
            flexEnabled: true,
            flex: {
                ...defaultFlex,
                marginLeft: 10,
                marginRight: 10,
                width: 50,
                height: 50,
            },
        }),
    ],
});
