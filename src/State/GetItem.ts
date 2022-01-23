import { Item } from 'State/Item';
import { nanoid } from '@reduxjs/toolkit';
import { PixiType } from 'State/PixiType';

export function getItem(props: Partial<Item>): Item {
    props.id = props.id === undefined ? nanoid(10) : props.id;
    props.type = props.type === undefined ? PixiType.CONTAINER : props.type;
    props.name = props.name === undefined ? props.type + '_' + props.id : props.name;
    const item = {
        id: props.id,
        name: props.name,
        type: props.type,

        //
        parent: null,
        selected: false,
        opened: false,
        disabled: false,

        // Container
        position: { x: 0, y: 0 },
        scale: { x: 1, y: 1 },
        skew: { x: 0, y: 0 },
        angle: 0,
        pivot: { x: 0, y: 0 },
        visible: true,
        alpha: 1,
        interactive: false,
        buttonMode: false,
        //

        // Sprite
        anchor: { x: 0, y: 0 },
        texture: null,
        tint: 0xffffff,
        //

        // Nine Slice
        width: 100,
        height: 100,
        topHeight: 0,
        rightWidth: 0,
        bottomHeight: 0,
        leftWidth: 0,
        //

        // Text
        text: 'text',
        textStyle: {
            ...props.textStyle,
        },

        childIndex: 0,

        ...props,
    };

    return item;
}
