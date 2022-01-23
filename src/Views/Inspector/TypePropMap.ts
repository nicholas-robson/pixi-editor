import { PixiType } from 'State/PixiType';
import { defaultProps } from 'Views/Inspector/DefaultProps';
import { Prop } from 'Views/Inspector/Prop';
import { ControlType } from 'Views/Inspector/ControlType';

const tint: Prop<any> = { id: 'tint', control: ControlType.COLOR };
const texture: Prop<any> = { id: 'texture', control: ControlType.TEXTURE };

export const typePropMap: Record<PixiType, Prop<any>[]> = {
    [PixiType.DISPLAY_OBJECT]: [],
    [PixiType.CONTAINER]: [...defaultProps],
    [PixiType.SPRITE]: [
        ...defaultProps,
        { id: 'anchor', control: ControlType.VECTOR2, controlOptions: { step: 0.1 } },
        tint,
        texture,
    ],
    [PixiType.NINE_SLICE]: [
        ...defaultProps,
        tint,
        texture,
        {
            id: 'size',
            control: ControlType.VECTOR2,
            itemToValue: (item) => ({ x: item?.width, y: item?.height }),
            valueToItem: (value) => ({ width: value.x, height: value.y }),
        },
        {
            id: 'edges',
            control: ControlType.SIDES,
            controlOptions: { label: '9-Slice Edges' },
            itemToValue: (item) => ({
                top: item?.topHeight,
                left: item?.leftWidth,
                right: item?.rightWidth,
                bottom: item?.bottomHeight,
            }),
            valueToItem: (value) => ({
                topHeight: value.top,
                leftWidth: value.left,
                rightWidth: value.right,
                bottomHeight: value.bottom,
            }),
        },
    ],
    [PixiType.TEXT]: [
        ...defaultProps,
        { id: 'anchor', control: ControlType.VECTOR2, controlOptions: { step: 0.1 } },
        tint,
        { id: 'text', control: ControlType.TEXTAREA },
        {
            id: 'fontsize',
            control: ControlType.NUMBER,
            controlOptions: { label: 'Font Size' },
            valueToItem: (value) => ({ textStyle: { fontSize: value } }),
            itemToValue: (item) => item?.textStyle.fontSize ?? 12,
        },
        {
            id: 'align',
            control: ControlType.RADIOBUTTONS,
            inputOptions: [
                { icon: 'bi-text-left', value: 'left' },
                { icon: 'bi-text-center', value: 'center' },
                { icon: 'bi-text-right', value: 'right' },
            ],
            valueToItem: (value) => ({ textStyle: { align: value } }),
            itemToValue: (item) => item?.textStyle.align ?? 'left',
        },
    ],
};
