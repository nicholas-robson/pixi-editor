import { createAction, DeepPartial } from '@reduxjs/toolkit';
import { Item } from 'State/Item';

export const createItemAction = createAction('CREATE_ITEM', (item: Partial<Item>) => ({
    payload: item,
}));

export const updateItemAction = createAction('UPDATE_ITEM', (id:string, item: Partial<Item>) => ({
    payload: {id, item},
}));

export const updateItemsAction = createAction('UPDATE_ITEMS', (items: Item[]) => ({
    payload: items,
}));

export const moveItemsAction = createAction('MOVE_ITEMS', (ids: string[], position: number, parent: string | null) => ({
    payload: { ids, position, parent },
}));

export const renameItemAction = createAction('RENAME_ITEM', (id: string, name: string) => ({
    payload: { id, name },
}));

export const deleteItemsAction = createAction('DELETE_ITEMS', (ids: string[]) => ({
    payload: ids,
}));

export const duplicateItemAction = createAction(
    'DUPLICATE_ITEM',
    (id: string, position: number, parent: string, idMap: Record<string, string>) => ({
        payload: { id, position, parent, idMap },
    })
);

export const selectItemsAction = createAction('SELECT_ITEMS', (ids: string[], deselect: boolean) => ({
    payload: { ids, deselect },
}));

export const deselectItemsAction = createAction('DESELECT_ITEMS', (ids: string[]) => ({
    payload: ids,
}));

export const selectAllAction = createAction('SELECT_ALL');

export const deselectAllAction = createAction('DESELECT_ALL');

export const undoAction = createAction('UNDO');

export const redoAction = createAction('REDO');

export const deleteAction = createAction('DELETE');
