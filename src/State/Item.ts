import { Vector2 } from 'Utility/Vector2';
import { PixiType } from 'State/PixiType';
import { TextStyle } from 'State/TextStyle';
import { Sides } from 'Utility/Sides';

export type Item = {
    id: string;
    parent: string | null;
    name: string;
    selected: boolean;
    opened: boolean;
    disabled: boolean;

    // Container
    position: Vector2;
    scale: Vector2;
    skew: Vector2;
    angle: number;
    pivot: Vector2;
    alpha: number;
    visible: boolean;
    interactive: boolean;
    buttonMode: boolean;
    //

    // Sprite
    tint: number;
    anchor: Vector2;
    texture: string | null;
    //

    // Nine Slice
    width: number;
    height: number;
    nineSliceSize: Sides;
    //

    // Text
    text: string;
    textStyle: TextStyle;
    //

    // Layout
    enableLayout: boolean;
    layout: Layout;
    //

    childIndex: number;

    type: PixiType;

    editorData: {
        inspectorScrollY: number;
        closeTabs: string[];
    };
};

export type Layout = {
    flex?: 'inherit' | 'ltr' | 'rtl';
    flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    basisAuto?: boolean;
    basis?: number;
    grow?: number;
    shrink?: number;
    flexWrap?: 'no-wrap' | 'wrap' | 'wrap-reverse';
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?:
        | 'auto'
        | 'flex-start'
        | 'center'
        | 'flex-end'
        | 'stretch'
        | 'baseline'
        | 'space-between'
        | 'space-around';
    alignSelf?:
        | 'auto'
        | 'flex-start'
        | 'center'
        | 'flex-end'
        | 'stretch'
        | 'baseline'
        | 'space-between'
        | 'space-around';
    alignContent?:
        | 'auto'
        | 'flex-start'
        | 'center'
        | 'flex-end'
        | 'stretch'
        | 'baseline'
        | 'space-between'
        | 'space-around';
    positionType?: 'relative' | 'absolute';
    absolutePosition?: Sides;
    margin?: Sides;
    padding?: Sides;
    border?: Sides;
    aspectRatioAuto?: number;
    aspectRatio?: number;
    size?: Vector2;
    maxSize?: Vector2;
    minSize?: Vector2;
};
