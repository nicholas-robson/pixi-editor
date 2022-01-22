import { EditorState } from 'State/EditorState';
import { Item } from 'State/Item';

export function copyItem(
    state: EditorState,
    id: string,
    parent: string,
    position: number | undefined,
    idMap: Record<string, string>,
): Item[] {
    const item = state.items.find((item) => item.id === id);
    if (item === undefined) return [];

    const newId = idMap[id];
    const children = state.items.filter((item) => item.parent === id);

    return [
        { ...item, id: newId, parent, childIndex: position !== undefined ? position : item.childIndex },
        ...children.flatMap((child) => copyItem(state, child.id, newId, position, idMap)),
    ];
}
