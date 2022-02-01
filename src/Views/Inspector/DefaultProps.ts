import { PropGroup } from 'Views/Inspector/Prop';
import { ControlType } from 'Views/Inspector/ControlType';
import { PixiType } from 'State/PixiType';
import { Align, FlexDirection, FlexWrap, JustifyContent, PositionType } from 'pixi-flex';

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
            { id: 'flexEnabled', control: ControlType.BOOLEAN },
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
        condition: (item) => item !== undefined && (item as any).flexEnabled,
        props: [
            // {
            //     id: 'direction',
            //     control: ControlType.RADIOBUTTONS,
            //     inputOptions: [
            //         { value: Direction.inherit, label: 'inherit' },
            //         { value: Direction.ltr, label: 'ltr' },
            //         { value: Direction.rtl, label: 'rtl' },
            //     ],
            //     valueToItem: (value) => ({ flex: { dir: value } }),
            //     itemToValue: (item) => item?.flex.flexDirection ?? '',
            // },
            {
                id: 'flexDirection',
                control: ControlType.SELECT,
                inputOptions: [
                    { value: FlexDirection.row, label: 'row' },
                    { value: FlexDirection.row_reverse, label: 'row_reverse' },
                    { value: FlexDirection.column, label: 'column' },
                    { value: FlexDirection.column_reverse, label: 'column_reverse' },
                ],
                valueToItem: (value) => ({ flex: { flexDirection: value } }),
                itemToValue: (item) => item?.flex.flexDirection ?? '',
            },
            {
                id: 'basis',
                control: ControlType.NUMBER,
                controlOptions: {
                    placeholder: 'auto',
                    allowEmpty: true,
                },
                valueToItem: (value) => ({ flex: { flexBasis: value } }),
                itemToValue: (item) => item?.flex.flexBasis ?? '',
            },
            {
                id: 'grow',
                control: ControlType.NUMBER,
                controlOptions: { placeholder: '0' },
                valueToItem: (value) => ({ flex: { flexGrow: value } }),
                itemToValue: (item) => item?.flex.flexGrow ?? '',
            },
            {
                id: 'shrink',
                control: ControlType.NUMBER,
                controlOptions: { placeholder: '1' },
                valueToItem: (value) => ({ flex: { flexShrink: value } }),
                itemToValue: (item) => item?.flex.flexShrink ?? '',
            },
            {
                id: 'flexWrap',
                control: ControlType.RADIOBUTTONS,
                inputOptions: [
                    { value: FlexWrap.no_wrap, label: 'no-wrap' },
                    { value: FlexWrap.wrap, label: 'wrap' },
                    { value: FlexWrap.wrap_reverse, label: 'wrap-reverse' },
                ],
                valueToItem: (value) => ({ flex: { flexWrap: value } }),
                itemToValue: (item) => item?.flex.flexWrap ?? '',
            },
        ],
    },
    {
        id: 'alignment',
        types: allTypes,
        condition: (item) => item !== undefined && (item as any).flexEnabled,
        props: [
            {
                id: 'justifyContent',
                control: ControlType.SELECT,
                inputOptions: [
                    { value: JustifyContent.flex_start, label: 'flex start' },
                    { value: JustifyContent.center, label: 'center' },
                    { value: JustifyContent.flex_end, label: 'flex end' },
                    { value: JustifyContent.space_between, label: 'space between' },
                    { value: JustifyContent.space_around, label: 'space around' },
                    { value: JustifyContent.space_evenly, label: 'space evenly' },
                ],

                valueToItem: (value) => ({ flex: { justifyContent: value } }),
                itemToValue: (item) => item?.flex.justifyContent ?? '',
            },
            {
                id: 'alignItems',
                control: ControlType.SELECT,
                inputOptions: [
                    { value: Align.auto, label: 'auto' },
                    { value: Align.flex_start, label: 'flex start' },
                    { value: Align.center, label: 'center' },
                    { value: Align.flex_end, label: 'flex end' },
                    { value: Align.stretch, label: 'stretch' },
                    { value: Align.baseline, label: 'baseline' },
                    { value: Align.space_between, label: 'space between' },
                    { value: Align.space_around, label: 'space around' },
                ],

                valueToItem: (value) => ({ flex: { alignItems: value } }),
                itemToValue: (item) => item?.flex.alignItems ?? '',
            },
            {
                id: 'alignSelf',
                control: ControlType.SELECT,
                inputOptions: [
                    { value: Align.auto, label: 'auto' },
                    { value: Align.flex_start, label: 'flex start' },
                    { value: Align.center, label: 'center' },
                    { value: Align.flex_end, label: 'flex end' },
                    { value: Align.stretch, label: 'stretch' },
                    { value: Align.baseline, label: 'baseline' },
                    { value: Align.space_between, label: 'space between' },
                    { value: Align.space_around, label: 'space around' },
                ],

                valueToItem: (value) => ({ flex: { alignSelf: value } }),
                itemToValue: (item) => item?.flex.alignSelf ?? '',
            },
            {
                id: 'alignContent',
                control: ControlType.SELECT,
                inputOptions: [
                    { value: Align.auto, label: 'auto' },
                    { value: Align.flex_start, label: 'flex start' },
                    { value: Align.center, label: 'center' },
                    { value: Align.flex_end, label: 'flex end' },
                    { value: Align.stretch, label: 'stretch' },
                    { value: Align.baseline, label: 'baseline' },
                    { value: Align.space_between, label: 'space between' },
                    { value: Align.space_around, label: 'space around' },
                ],

                valueToItem: (value) => ({ flex: { alignContent: value } }),
                itemToValue: (item) => item?.flex.alignContent ?? '',
            },
        ],
    },
    {
        id: 'layout',
        types: allTypes,
        condition: (item) => item !== undefined && (item as any).flexEnabled,
        props: [
            {
                id: 'positionType',
                control: ControlType.RADIOBUTTONS,
                inputOptions: [
                    {
                        value: PositionType.relative,
                        label: 'relative',
                    },
                    {
                        value: PositionType.absolute,
                        label: 'absolute',
                    },
                ],

                valueToItem: (value) => ({ flex: { positionType: parseInt(value) as any } }),
                itemToValue: (item) => item?.flex.positionType ?? '',
            },
            {
                id: 'absolutePosition',
                condition: (item) => item?.flex.positionType === PositionType.absolute,
                control: ControlType.SIDES,
                controlOptions: {
                    allowEmpty: true,
                },
                valueToItem: (value) => ({
                    flex: {
                        top: value.top,
                        bottom: value.bottom,
                        left: value.left,
                        right: value.right,
                    },
                }),
                itemToValue: (item) => ({
                    top: item?.flex.top,
                    bottom: item?.flex.bottom,
                    left: item?.flex.left,
                    right: item?.flex.right,
                }),
            },
            {
                id: 'margin',
                control: ControlType.SIDES,

                valueToItem: (value) => ({
                    flex: {
                        marginLeft: value.left,
                        marginRight: value.right,
                        marginTop: value.top,
                        marginBottom: value.bottom,
                    },
                }),
                itemToValue: (item) => ({
                    top: item?.flex.marginTop,
                    bottom: item?.flex.marginBottom,
                    left: item?.flex.marginLeft,
                    right: item?.flex.marginRight,
                }),
            },
            {
                id: 'padding',
                control: ControlType.SIDES,

                valueToItem: (value) => ({
                    flex: {
                        paddingLeft: value.left,
                        paddingRight: value.right,
                        paddingTop: value.top,
                        paddingBottom: value.bottom,
                    },
                }),
                itemToValue: (item) => ({
                    top: item?.flex.paddingTop,
                    bottom: item?.flex.paddingBottom,
                    left: item?.flex.paddingLeft,
                    right: item?.flex.paddingRight,
                }),
            },
            {
                id: 'border',
                control: ControlType.SIDES,

                valueToItem: (value) => ({
                    flex: {
                        borderLeft: value.left,
                        borderRight: value.right,
                        borderTop: value.top,
                        borderBottom: value.bottom,
                    },
                }),
                itemToValue: (item) => ({
                    top: item?.flex.borderTop,
                    bottom: item?.flex.borderBottom,
                    left: item?.flex.borderLeft,
                    right: item?.flex.borderRight,
                }),
            },
            {
                id: 'aspectRatio',
                control: ControlType.NUMBER,
                controlOptions: { step: 0.1, placeholder: 'auto' },

                valueToItem: (value) => ({ flex: { aspectRatio: value } }),
                itemToValue: (item) => item?.flex.aspectRatio ?? '',
            },
            {
                id: 'size',
                control: ControlType.VECTOR2,
                controlOptions: {
                    allowEmpty: true,
                    placeholder: 'auto',
                },
                valueToItem: (value) => ({ flex: { width: value.x, height: value.y } }),
                itemToValue: (item) => ({
                    x: item?.flex.width,
                    y: item?.flex.height,
                }),
            },
            {
                id: 'maxSize',
                control: ControlType.VECTOR2,
                controlOptions: {
                    allowEmpty: true,
                    placeholder: 'none',
                },
                valueToItem: (value) => ({ flex: { maxWidth: value.x, maxHeight: value.y } }),
                itemToValue: (item) => ({
                    x: item?.flex.maxWidth,
                    y: item?.flex.maxHeight,
                }),
            },
            {
                id: 'minSize',
                control: ControlType.VECTOR2,
                controlOptions: {
                    allowEmpty: true,
                    placeholder: '0',
                },
                valueToItem: (value) => ({ flex: { minWidth: value.x, minHeight: value.y } }),
                itemToValue: (item) => ({
                    x: item?.flex.minWidth,
                    y: item?.flex.minHeight,
                }),
            },
        ],
    },
];
