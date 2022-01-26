import { Prop, PropGroup } from 'Views/Inspector/Prop';
import { ControlType } from 'Views/Inspector/ControlType';
import { PixiType } from 'State/PixiType';
import { Item, Layout } from 'State/Item';

const allTypes: PixiType[] = [
    PixiType.DISPLAY_OBJECT,
    PixiType.CONTAINER,
    PixiType.SPRITE,
    PixiType.NINE_SLICE,
    PixiType.TEXT,
];

export const allProps: PropGroup[] = [
    {
        id: 'info',
        types: allTypes,
        props: [
            { id: 'type', control: ControlType.STRING, controlOptions: { readonly: true } },
            { id: 'id', control: ControlType.STRING, controlOptions: { readonly: true } },
            { id: 'name', control: ControlType.STRING },
            { id: 'layoutEnabled', control: ControlType.BOOLEAN },
        ],
    },
    {
        id: 'transform',
        types: allTypes,
        props: [
            { id: 'position', control: ControlType.VECTOR2 },
            { id: 'scale', control: ControlType.VECTOR2 },
            { id: 'angle', control: ControlType.NUMBER },
            { id: 'skew', control: ControlType.VECTOR2, controlOptions: { step: 0.1 } },
            { id: 'pivot', control: ControlType.VECTOR2 },
        ],
    },

    {
        id: 'display',
        types: allTypes,
        props: [
            { id: 'visible', control: ControlType.BOOLEAN },
            { id: 'alpha', control: ControlType.NUMBER, controlOptions: { step: 0.1 } },
            { id: 'tint', control: ControlType.COLOR },

            { id: 'interactive', control: ControlType.BOOLEAN },
            { id: 'buttonMode', control: ControlType.BOOLEAN },
        ],
    },

    {
        id: 'sprite',
        types: [PixiType.SPRITE],
        props: [
            {
                id: 'spriteTexture',
                controlOptions: { label: 'Texture' },
                control: ControlType.TEXTURE,
                valueToItem: (value) => ({ texture: value }),
                itemToValue: (item) => item?.texture,
            },
            { id: 'anchor', control: ControlType.VECTOR2, controlOptions: { step: 0.1 } },
        ],
    },

    {
        id: 'nineSlice',
        types: [PixiType.NINE_SLICE],
        props: [
            {
                id: 'nineSliceTexture',
                controlOptions: { label: 'Texture' },
                control: ControlType.TEXTURE,
                valueToItem: (value) => ({ texture: value }),
                itemToValue: (item) => item?.texture,
            },
            {
                id: 'nineSliceSize',
                control: ControlType.VECTOR2,
                itemToValue: (item) => ({ x: item?.width, y: item?.height }),
                valueToItem: (value) => ({ width: value.x, height: value.y }),
            },
            {
                id: 'edges',
                control: ControlType.SIDES,
                controlOptions: { label: '9-Slice Edges' },
                itemToValue: (item) => ({
                    top: item?.nineSliceSize.top,
                    left: item?.nineSliceSize.left,
                    right: item?.nineSliceSize.right,
                    bottom: item?.nineSliceSize.bottom,
                }),
                valueToItem: (value) => ({
                    nineSliceSize: {
                        top: value.top,
                        left: value.left,
                        right: value.right,
                        bottom: value.bottom,
                    },
                }),
            },
        ],
    },

    {
        id: 'text',
        types: [PixiType.TEXT],
        props: [
            { id: 'text', control: ControlType.TEXTAREA },
            {
                id: 'fontSize',
                control: ControlType.NUMBER,
                valueToItem: (value) => ({ textStyle: { fontSize: value } }),
                itemToValue: (item) => item?.textStyle.fontSize ?? 12,
            },
            {
                id: 'fontFamily',
                control: ControlType.SELECT,
                inputOptions: [{ value: 'Arial' }, { value: 'Georgia' }],
                valueToItem: (value) => ({ textStyle: { fontFamily: value } }),
                itemToValue: (item) => item?.textStyle.fontFamily ?? 'Arial',
            },

            {
                id: 'textAlign',
                control: ControlType.RADIOBUTTONS,
                inputOptions: [
                    { icon: 'bi-text-left', value: 'left' },
                    { icon: 'bi-text-center', value: 'center' },
                    { icon: 'bi-text-right', value: 'right' },
                ],
                valueToItem: (value) => ({ textStyle: { align: value } }),
                itemToValue: (item) => item?.textStyle.align ?? 'left',
            },
            {
                id: 'fontStyle',
                control: ControlType.SELECT,
                inputOptions: [{ value: 'normal' }, { value: 'italic' }, { value: 'oblique' }],
                valueToItem: (value) => ({ textStyle: { fontStyle: value } }),
                itemToValue: (item) => item?.textStyle.fontStyle ?? 'normal',
            },
            {
                id: 'fontWeight',
                control: ControlType.SELECT,
                inputOptions: [
                    { value: 'normal' },
                    { value: 'bold' },
                    { value: 'bolder' },
                    { value: 'lighter' },
                    { value: '100' },
                    { value: '200' },
                    { value: '300' },
                    { value: '400' },
                    { value: '500' },
                    { value: '600' },
                    { value: '700' },
                    { value: '800' },
                    { value: '900' },
                ],
                valueToItem: (value) => ({ textStyle: { fontWeight: value } }),
                itemToValue: (item) => item?.textStyle.fontWeight ?? 'normal',
            },
            {
                id: 'fontVariant',
                control: ControlType.SELECT,
                inputOptions: [{ value: 'normal' }, { value: 'small-caps' }],
                valueToItem: (value) => ({ textStyle: { fontVariant: value } }),
                itemToValue: (item) => item?.textStyle.fontVariant ?? 'normal',
            },
            {
                id: 'lineJoin',
                control: ControlType.SELECT,
                inputOptions: [{ value: 'miter' }, { value: 'round' }, { value: 'bevel' }],
                valueToItem: (value) => ({ textStyle: { lineJoin: value } }),
                itemToValue: (item) => item?.textStyle.lineJoin ?? 'miter',
            },
            {
                id: 'whiteSpace',
                control: ControlType.SELECT,
                inputOptions: [{ value: 'normal' }, { value: 'pre' }, { value: 'pre-line' }],
                valueToItem: (value) => ({ textStyle: { whiteSpace: value } }),
                itemToValue: (item) => item?.textStyle.whiteSpace ?? 'normal',
            },

            {
                id: 'trim',
                control: ControlType.BOOLEAN,
                valueToItem: (value) => ({ textStyle: { trim: value } }),
                itemToValue: (item) => item?.textStyle.trim ?? false,
            },
            {
                id: 'wordWrap',
                control: ControlType.BOOLEAN,
                valueToItem: (value) => ({ textStyle: { wordWrap: value } }),
                itemToValue: (item) => item?.textStyle.wordWrap ?? false,
            },
            {
                id: 'wordWrapWidth',
                control: ControlType.NUMBER,
                valueToItem: (value) => ({ textStyle: { wordWrapWidth: value } }),
                itemToValue: (item) => item?.textStyle.wordWrapWidth ?? 0,
            },
            {
                id: 'breakWords',
                control: ControlType.BOOLEAN,
                valueToItem: (value) => ({ textStyle: { breakWords: value } }),
                itemToValue: (item) => item?.textStyle.breakWords ?? 0,
            },
            {
                id: 'leading',
                control: ControlType.NUMBER,
                valueToItem: (value) => ({ textStyle: { leading: value } }),
                itemToValue: (item) => item?.textStyle.leading ?? 0,
            },
            {
                id: 'lineHeight',
                control: ControlType.NUMBER,
                valueToItem: (value) => ({ textStyle: { lineHeight: value } }),
                itemToValue: (item) => item?.textStyle.lineHeight ?? 0,
            },
            {
                id: 'miterLimit',
                control: ControlType.NUMBER,
                valueToItem: (value) => ({ textStyle: { miterLimit: value } }),
                itemToValue: (item) => item?.textStyle.miterLimit ?? 0,
            },
            {
                id: 'padding',
                control: ControlType.NUMBER,
                valueToItem: (value) => ({ textStyle: { padding: value } }),
                itemToValue: (item) => item?.textStyle.padding ?? 0,
            },

            {
                id: 'textBaseline',
                control: ControlType.SELECT,
                inputOptions: [
                    { value: 'alphabetic' },
                    { value: 'bottom' },
                    { value: 'middle' },
                    { value: 'top' },
                    { value: 'hanging' },
                ],
                valueToItem: (value) => ({ textStyle: { textBaseline: value } }),
                itemToValue: (item) => item?.textStyle.textBaseline ?? 'alphabetic',
            },
        ],
    },

    {
        id: 'textColor',
        types: [PixiType.TEXT],
        props: [
            {
                id: 'fill',
                control: ControlType.COLOR,
                valueToItem: (value) => ({ textStyle: { fill: value } }),
                itemToValue: (item) => item?.textStyle.fill ?? 0xffffff,
            },

            {
                id: 'stroke',
                control: ControlType.COLOR,
                valueToItem: (value) => ({ textStyle: { stroke: value } }),
                itemToValue: (item) => item?.textStyle.stroke ?? 0,
            },
            {
                id: 'strokeThickness',
                control: ControlType.NUMBER,
                valueToItem: (value) => ({ textStyle: { strokeThickness: value } }),
                itemToValue: (item) => item?.textStyle.strokeThickness ?? 0,
            },

            {
                id: 'dropShadow',
                control: ControlType.BOOLEAN,
                valueToItem: (value) => ({ textStyle: { dropShadow: value } }),
                itemToValue: (item) => item?.textStyle.dropShadow ?? 0,
            },
            {
                id: 'dropShadowAlpha',
                control: ControlType.NUMBER,
                controlOptions: {
                    step: 0.1,
                },
                valueToItem: (value) => ({ textStyle: { dropShadowAlpha: value } }),
                itemToValue: (item) => item?.textStyle.dropShadowAlpha ?? 0,
            },
            {
                id: 'dropShadowAngle',
                control: ControlType.NUMBER,
                valueToItem: (value) => ({ textStyle: { dropShadowAngle: value } }),
                itemToValue: (item) => item?.textStyle.dropShadowAngle ?? 0,
            },
            {
                id: 'dropShadowBlur',
                control: ControlType.NUMBER,
                valueToItem: (value) => ({ textStyle: { dropShadowBlur: value } }),
                itemToValue: (item) => item?.textStyle.dropShadowBlur ?? 0,
            },
            {
                id: 'dropShadowColor',
                control: ControlType.COLOR,
                valueToItem: (value) => ({ textStyle: { dropShadowColor: value } }),
                itemToValue: (item) => item?.textStyle.dropShadowColor ?? 0,
            },
            {
                id: 'dropShadowDistance',
                control: ControlType.NUMBER,
                valueToItem: (value) => ({ textStyle: { dropShadowDistance: value } }),
                itemToValue: (item) => item?.textStyle.dropShadowDistance ?? 0,
            },

            {
                id: 'fillGradientType',
                control: ControlType.NUMBER,
                valueToItem: (value) => ({ textStyle: { fillGradientType: value } }),
                itemToValue: (item) => item?.textStyle.fillGradientType ?? 0,
            },
            {
                id: 'fillGradientStops',
                control: ControlType.STRING,
                valueToItem: (value) => ({ textStyle: { fillGradientStops: value.split(',') } }),
                itemToValue: (item) => item?.textStyle.fillGradientStops ?? '',
            },
        ],
    },
    {
        id: 'flex',
        types: allTypes,
        condition: (item) => item !== undefined && (item as any).layoutEnabled,
        props: [
            {
                id: 'flex',
                control: ControlType.RADIOBUTTONS,
                inputOptions: [
                    { value: 'inherit', label: 'inherit' },
                    { value: 'ltr', label: 'ltr' },
                    { value: 'rtl', label: 'rtl' },
                ],
                valueToItem: (value) => ({ layout: { flex: value } }),
                itemToValue: (item) => item?.layout.flex ?? '',
            },
            {
                id: 'flexDirection',
                control: ControlType.SELECT,
                inputOptions: [
                    { value: 'row' },
                    { value: 'row-reverse' },
                    { value: 'column' },
                    { value: 'column-reverse' },
                ],
                valueToItem: (value) => ({ layout: { flexDirection: value } }),
                itemToValue: (item) => item?.layout.flexDirection ?? '',
            },
            {
                id: 'basisAuto',
                control: ControlType.BOOLEAN,

                valueToItem: (value) => ({ layout: { basisAuto: value } }),
                itemToValue: (item) => item?.layout.basisAuto ?? '',
            },
            {
                id: 'basis',
                condition: (item) => (item as any)?.basisAuto === false,
                control: ControlType.NUMBER,

                valueToItem: (value) => ({ layout: { basis: value } }),
                itemToValue: (item) => item?.layout.basis ?? '',
            },
            {
                id: 'grow',
                control: ControlType.NUMBER,

                valueToItem: (value) => ({ layout: { grow: value } }),
                itemToValue: (item) => item?.layout.grow ?? '',
            },
            {
                id: 'shrink',
                control: ControlType.NUMBER,

                valueToItem: (value) => ({ layout: { shrink: value } }),
                itemToValue: (item) => item?.layout.shrink ?? '',
            },
            {
                id: 'flexWrap',
                control: ControlType.RADIOBUTTONS,
                inputOptions: [{ value: 'no-wrap' }, { value: 'wrap' }, { value: 'wrap-reverse' }],

                valueToItem: (value) => ({ layout: { flexWrap: value } }),
                itemToValue: (item) => item?.layout.flexWrap ?? '',
            },
        ],
    },
    {
        id: 'alignment',
        types: allTypes,
        condition: (item) => item !== undefined && (item as any).layoutEnabled,
        props: [
            {
                id: 'justifyContent',
                control: ControlType.SELECT,
                inputOptions: [
                    { value: 'flex-start', label: 'flex start' },
                    { value: 'center', label: 'center' },
                    { value: 'flex-end', label: 'flex end' },
                    { value: 'space-between', label: 'space between' },
                    { value: 'space-around', label: 'space around' },
                    { value: 'space-evenly', label: 'space evenly' },
                ],

                valueToItem: (value) => ({ layout: { justifyContent: value } }),
                itemToValue: (item) => item?.layout.justifyContent ?? '',
            },
            {
                id: 'alignItems',
                control: ControlType.SELECT,
                inputOptions: [
                    { value: 'auto', label: 'auto' },
                    { value: 'flex-start', label: 'flex start' },
                    { value: 'center', label: 'center' },
                    { value: 'flex-end', label: 'flex end' },
                    { value: 'stretch', label: 'stretch' },
                    { value: 'baseline', label: 'baseline' },
                    { value: 'space-between', label: 'space between' },
                    { value: 'space-around', label: 'space around' },
                ],

                valueToItem: (value) => ({ layout: { alignItems: value } }),
                itemToValue: (item) => item?.layout.alignItems ?? '',
            },
            {
                id: 'alignSelf',
                control: ControlType.SELECT,
                inputOptions: [
                    { value: 'auto', label: 'auto' },
                    { value: 'flex-start', label: 'flex start' },
                    { value: 'center', label: 'center' },
                    { value: 'flex-end', label: 'flex end' },
                    { value: 'stretch', label: 'stretch' },
                    { value: 'baseline', label: 'baseline' },
                    { value: 'space-between', label: 'space between' },
                    { value: 'space-around', label: 'space around' },
                ],

                valueToItem: (value) => ({ layout: { alignSelf: value } }),
                itemToValue: (item) => item?.layout.alignSelf ?? '',
            },
            {
                id: 'alignContent',
                control: ControlType.SELECT,
                inputOptions: [
                    { value: 'auto', label: 'auto' },
                    { value: 'flex-start', label: 'flex start' },
                    { value: 'center', label: 'center' },
                    { value: 'flex-end', label: 'flex end' },
                    { value: 'stretch', label: 'stretch' },
                    { value: 'baseline', label: 'baseline' },
                    { value: 'space-between', label: 'space between' },
                    { value: 'space-around', label: 'space around' },
                ],

                valueToItem: (value) => ({ layout: { alignContent: value } }),
                itemToValue: (item) => item?.layout.alignContent ?? '',
            },
        ],
    },
    {
        id: 'layout',
        types: allTypes,
        condition: (item) => item !== undefined && (item as any).layoutEnabled,
        props: [
            {
                id: 'positionType',
                control: ControlType.RADIOBUTTONS,
                inputOptions: [
                    {
                        value: 'relative',
                    },
                    {
                        value: 'absolute',
                    },
                ],

                valueToItem: (value) => ({ layout: { positionType: value } }),
                itemToValue: (item) => item?.layout.positionType ?? '',
            },
            {
                id: 'absolutePosition',
                condition: (item) => (item as any)?.positionType === 'absolute',
                control: ControlType.SIDES,

                valueToItem: (value) => ({ layout: { absolutePosition: value } }),
                itemToValue: (item) => item?.layout.absolutePosition ?? '',
            },
            {
                id: 'margin',
                control: ControlType.SIDES,

                valueToItem: (value) => ({ layout: { margin: value } }),
                itemToValue: (item) => item?.layout.margin ?? '',
            },
            {
                id: 'padding',
                control: ControlType.SIDES,

                valueToItem: (value) => ({ layout: { padding: value } }),
                itemToValue: (item) => item?.layout.padding ?? '',
            },
            {
                id: 'border',
                control: ControlType.SIDES,

                valueToItem: (value) => ({ layout: { border: value } }),
                itemToValue: (item) => item?.layout.border ?? '',
            },
            {
                id: 'aspectRatioAuto',
                control: ControlType.BOOLEAN,

                valueToItem: (value) => ({ layout: { aspectRatioAuto: value } }),
                itemToValue: (item) => item?.layout.aspectRatioAuto ?? '',
            },
            {
                id: 'aspectRatio',
                condition: (item) => (item as any)?.aspectRatioAuto === false,
                control: ControlType.NUMBER,
                controlOptions: { step: 0.1 },

                valueToItem: (value) => ({ layout: { aspectRatio: value } }),
                itemToValue: (item) => item?.layout.aspectRatio ?? '',
            },
            {
                id: 'size',
                control: ControlType.VECTOR2,

                valueToItem: (value) => ({ layout: { size: value } }),
                itemToValue: (item) => item?.layout.size ?? '',
            },
            {
                id: 'maxSize',
                control: ControlType.VECTOR2,

                valueToItem: (value) => ({ layout: { maxSize: value } }),
                itemToValue: (item) => item?.layout.maxSize ?? '',
            },
            {
                id: 'minSize',
                control: ControlType.VECTOR2,

                valueToItem: (value) => ({ layout: { minSize: value } }),
                itemToValue: (item) => item?.layout.minSize ?? '',
            },
        ],
    },
];
