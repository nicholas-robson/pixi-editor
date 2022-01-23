import { Vector2 } from 'Utility/Vector2';
import { PixiType } from 'State/PixiType';
import { TextStyle } from 'State/TextStyle';

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
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
    leftWidth: number;
    //

    // Text
    text: string;
    textStyle: TextStyle;
    //

    childIndex: number;

    type: PixiType;
};
