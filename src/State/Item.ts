import { Vector2 } from 'Utility/Vector2';
import { PixiType } from 'State/PixiType';

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
    texture: string;
    //

    // Nine Slice
    size: Vector2;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
    leftWidth: number;

    childIndex: number;

    type: PixiType;
};