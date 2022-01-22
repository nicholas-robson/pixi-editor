import { EditorState } from 'State/EditorState';
import { Item } from 'State/Item';
import { roundTo } from 'Utility/RoundTo';

export function updateItem(state: EditorState, id: string, partialItem: Partial<Item>): EditorState {
    return {
        ...state,
        items: state.items.map((item) => {
            if (item.id !== id) return item;

            item = {
                ...item,
                ...partialItem,
            };

            item.position = { x: roundTo(item.position.x, 3), y: roundTo(item.position.y, 3) };
            item.pivot = { x: roundTo(item.pivot.x, 3), y: roundTo(item.pivot.y, 3) };
            item.anchor = { x: roundTo(item.anchor.x, 3), y: roundTo(item.anchor.y, 3) };
            item.skew = { x: roundTo(item.skew.x, 3), y: roundTo(item.skew.y, 3) };
            item.scale = { x: roundTo(item.scale.x, 3), y: roundTo(item.scale.y, 3) };
            item.angle = roundTo(item.angle, 3);

            item.width = roundTo(item.width, 3);
            item.height = roundTo(item.height, 3);
            item.topHeight = roundTo(item.topHeight, 3);
            item.rightWidth = roundTo(item.rightWidth, 3);
            item.leftWidth = roundTo(item.leftWidth, 3);
            item.bottomHeight = roundTo(item.bottomHeight, 3);

            return item;
        }),
    };
}
