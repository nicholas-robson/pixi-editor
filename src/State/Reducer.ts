import { Action } from 'redux';
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
} from 'State/Actions';
import { EditorState } from 'State/EditorState';
import { createItem } from 'State/Item/CreateItem';
import { duplicateItem } from 'State/Item/DuplicateItem';
import { deleteItems } from 'State/Item/DeleteItems';
import { normalizeIndexes } from 'State/Item/NormalizeIndexes';
import { moveItems } from 'State/Item/MoveItems';
import { renameItems } from 'State/Item/RenameItems';
import { popUndoState } from 'State/PopUndoState';
import { popRedoState } from 'State/PopRedoState';
import { pushUndoState } from 'State/PushUndoState';
import { selectItems } from 'State/Item/SelectItems';
import { deselectItems } from 'State/Item/DeselectItems';
import { updateItem } from 'State/Item/UpdateItem';

export function rootReducer(state: EditorState, action: Action): EditorState {
    if (moveItemsAction.match(action)) {
        state = pushUndoState(state);

        state = moveItems(state, action.payload);
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
                ...updateItem(acc, v.id, v),
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
        const result = createItem(state, action.payload.item);

        state = result.state;

        if (action.payload.select) {
            state = selectItems(state, [result.id], true);
        }

        return state;
    }

    return state;
}
