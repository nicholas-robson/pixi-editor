import { Vector2 } from 'Utility/Vector2';
import { PixiType } from 'State/PixiType';
import { TextStyle } from 'State/TextStyle';
import { Sides } from 'Utility/Sides';
import { Flex } from 'pixi-flex';
import { DeepPartial } from 'redux';

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
    flexEnabled: boolean;
    flex: DeepPartial<Flex>;
    //

    childIndex: number;

    type: PixiType;

    editorData: {
        inspectorScrollY: number;
        closeTabs: string[];
    };
};
