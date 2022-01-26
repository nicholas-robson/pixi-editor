import { Item } from 'State/Item';
import { nanoid } from '@reduxjs/toolkit';
import { PixiType } from 'State/PixiType';

export function getItem(props: Partial<Item>): Item {
    props.id = props.id === undefined ? nanoid(10) : props.id;
    props.type = props.type === undefined ? PixiType.CONTAINER : props.type;
    props.name = props.name === undefined ? props.type + '_' + props.id : props.name;
    const item: Item = {
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
        nineSliceSize: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        //

        // Text
        text: 'text',
        textStyle: {
            ...props.textStyle,
        },

        // Layout
        enableLayout: false,
        layout: {
            ...props.layout,
        },

        childIndex: 0,

        editorData: {
            inspectorScrollY: 0,
            closeTabs: [],
        },

        ...props,
    };

    return item;
}
