import { Action } from 'redux';
import { EditorState, getItem, Item, UndoState } from 'State';
import {
    createItemAction,
    deleteAction,
    deleteItemsAction,
    deselectAllAction,
    deselectItemsAction,
    duplicateItemAction,
    moveItemsAction,
    redoAction,
    renameItemAction,
    selectAllAction,
    selectItemsAction,
    undoAction,
    updateItemAction,
    updateItemsAction,
} from 'Actions';

export function rootReducer(state: EditorState, action: Action): EditorState {
    if (moveItemsAction.match(action)) {
        state = pushUndoState(state);

        state = moveItems(state, action.payload, true);
        return normalizeIndexes(state);
    }

    if (updateItemAction.match(action)) {
        state = pushUndoState(state);

        return updateItem(state, action.payload.id, action.payload.item);
    }

    if (updateItemsAction.match(action)) {
        state = pushUndoState(state);

        // TODO: A bit ugly.
        return action.payload.reduce(
            (acc, v) => ({
                ...acc,
                ...updateItem(state, v.id, v),
            }),
            state
        );
    }

    if (renameItemAction.match(action)) {
        state = pushUndoState(state);

        return renameItems(state, action.payload.id, action.payload.name);
    }

    if (deleteItemsAction.match(action)) {
        state = pushUndoState(state);

        state = deleteItems(state, action.payload);
        return normalizeIndexes(state);
    }

    if (deleteAction.match(action)) {
        const selectedItemIDs = state.items.filter((item) => item.selected).map((item) => item.id);

        if (selectedItemIDs.length === 0) {
            return state;
        }

        state = pushUndoState(state);

        state = deleteItems(state, selectedItemIDs);
        return normalizeIndexes(state);
    }

    if (duplicateItemAction.match(action)) {
        state = pushUndoState(state);

        state = duplicateItem(state, action.payload);
        return normalizeIndexes(state);
    }

    if (undoAction.match(action)) {
        return popUndoState(state);
    }

    if (redoAction.match(action)) {
        return popRedoState(state);
    }

    if (selectItemsAction.match(action)) {
        state = pushUndoState(state);
        return selectItems(state, action.payload.ids, action.payload.deselect);
    }

    if (deselectItemsAction.match(action)) {
        state = pushUndoState(state);
        return deselectItems(state, action.payload);
    }

    if (deselectAllAction.match(action)) {
        state = pushUndoState(state);
        return deselectItems(
            state,
            state.items.map((item) => item.id)
        );
    }

    if (selectAllAction.match(action)) {
        state = pushUndoState(state);
        return selectItems(
            state,
            state.items.map((item) => item.id),
            false
        );
    }

    if (createItemAction.match(action)) {
        return createItem(state, action.payload);
    }

    return state;
}

function createItem(state: EditorState, item: Partial<Item>): EditorState {
    return {
        ...state,
        items: [...state.items, getItem(item)],
    };
}

function updateItem(state: EditorState, id: string, partialItem: Partial<Item>): EditorState {
    return {
        ...state,
        items: state.items.map((item) => {
            if (item.id !== id) return item;

            return {
                ...item,
                ...partialItem,
            };
        }),
    };
}

function deselectItems(state: EditorState, ids: string[]) {
    return {
        ...state,
        items: state.items.map((item) => {
            if (!ids.includes(item.id)) return item;

            return {
                ...item,
                selected: false,
            };
        }),
    };
}

function selectItems(state: EditorState, ids: string[], deselect: boolean) {
    return {
        ...state,
        items: state.items.map((item) => {
            if (!ids.includes(item.id)) {
                if (deselect) {
                    return { ...item, selected: false };
                }
                return item;
            }

            return {
                ...item,
                selected: true,
            };
        }),
    };
}

function getUndoState(state: EditorState): UndoState {
    const undoState = { ...state } as Partial<EditorState>;
    delete undoState['undo'];
    delete undoState['redo'];

    return undoState as UndoState;
}

function pushUndoState(state: EditorState) {
    let undo = [...state.undo, getUndoState(state)];
    if (undo.length > 10) {
        undo.shift();
    }
    return {
        ...state,
        undo,
        redo: [],
    };
}

function popRedoState(state: EditorState): EditorState {
    const redo = [...state.redo];
    const nextState = redo.pop();

    if (nextState === undefined) return state;

    return { ...nextState, redo, undo: [...state.undo, getUndoState(state)] };
}

function popUndoState(state: EditorState): EditorState {
    const undo = [...state.undo];
    const previousState = undo.pop();

    if (previousState === undefined) return state;

    return { ...previousState, undo, redo: [...state.redo, getUndoState(state)] };
}

/**
 * TODO: Replace with `updateItem` or `updateItems`?
 * @param state
 * @param id
 * @param name
 */
function renameItems(state: EditorState, id: string, name: string) {
    return { ...state, items: state.items.map((item) => (item.id === id ? { ...item, name } : item)) };
}

function moveItems(
    state: EditorState,
    payload: { parent: string | null; ids: string[]; position: number },
    updateFromTree: boolean
) {
    return {
        ...state,
        updateFromTree,
        items: state.items.map((item) => {
            if (!payload.ids.includes(item.id)) {
                if (item.parent === payload.parent && item.childIndex >= payload.position) {
                    return {
                        ...item,
                        // Bump indexes.
                        childIndex: item.childIndex + payload.ids.length,
                    };
                }

                return item;
            }

            return {
                ...item,
                childIndex: payload.position + payload.ids.indexOf(item.id),
                parent: payload.parent,
            };
        }),
    };
}

/**
 * Adjust `childIndex`s so they start from 0 and increment by 1 for distinct `parent`s.
 * @param state
 */
function normalizeIndexes(state: EditorState) {
    return {
        ...state,
        items: [...state.items].map((item) => {
            return {
                ...item,
                childIndex: state.items
                    .filter((i) => i.parent === item.parent)
                    .sort((a, b) => a.childIndex - b.childIndex)
                    .indexOf(item),
            };
        }),
    };
}

function deleteItems(state: EditorState, ids: string[]): EditorState {
    // Unique deletion ids.
    const deleteIds = [...new Set(ids.flatMap((id) => getAllChildren(state, id))).values()];
    return {
        ...state,
        items: state.items.filter((item) => !deleteIds.includes(item.id)),
    };
}

function getAllChildren(state: EditorState, id: string): string[] {
    const children = state.items.filter((i) => i.parent === id);
    return [id, ...children.flatMap((child) => getAllChildren(state, child.id))];
}

function copyItem(
    state: EditorState,
    id: string,
    parent: string,
    position: number | undefined,
    idMap: Record<string, string>
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

function duplicateItem(
    state: EditorState,
    { id, position, parent, idMap }: { id: string; position: number; parent: string; idMap: Record<string, string> }
): EditorState {
    const newItems = copyItem(state, id, parent, position, idMap);

    return {
        ...state,
        items: [
            ...state.items.map((item) => {
                if (item.parent === parent && item.childIndex >= position) {
                    return {
                        ...item,
                        // Bump index.
                        childIndex: item.childIndex + 1,
                    };
                }
                return item;
            }),
            ...newItems,
        ],
    };
}
