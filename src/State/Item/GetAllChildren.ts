import { EditorState } from 'State/EditorState';

export function getAllChildren(state: EditorState, id: string): string[] {
    const children = state.items.filter((i) => i.parent === id);
    return [id, ...children.flatMap((child) => getAllChildren(state, child.id))];
}
