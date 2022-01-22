import { dispatch} from 'State/State';
import { createItemAction, deleteItemsAction } from 'State/Actions';
import { PixiType } from 'State/PixiType';

export function getContextMenu(itemIDs: string[]) {
    const parent = itemIDs.length === 1 ? itemIDs[0] : null;

    return {
        create: {
            name: 'Create',
            icon: ' bi bi-plus-square',
            visible: () => itemIDs.length <= 1,
            items: {
                container: {
                    name: 'Container',
                    icon: ' bi bi-folder',
                    callback: () => {
                        dispatch(
                            createItemAction({
                                parent,
                                type: PixiType.CONTAINER,
                            })
                        );
                    },
                },
                sprite: {
                    name: 'Sprite',
                    icon: ' bi bi-image',
                    callback: () => {
                        dispatch(
                            createItemAction({
                                parent,
                                type: PixiType.SPRITE,
                            })
                        );
                    },
                },
                nineslice: {
                    name: 'Nine-Slice',
                    icon: ' bi bi-grid-3x3',
                    callback: () => {
                        dispatch(
                            createItemAction({
                                parent,
                                type: PixiType.NINE_SLICE,
                            })
                        );
                    },
                },
            },
        },
        separator1: { type: 'cm_separator', visible: () => showRemove(itemIDs) },
        // copy: {
        //     name: 'Copy',
        //     icon: 'bi bi-clipboard',
        // },
        // cut: {
        //     name: 'Cut',
        //     icon: 'bi bi-scissors',
        // },
        // paste: {
        //     name: 'Paste',
        //     icon: 'bi bi-clipboard-check',
        //     _disabled: () => false,
        //     separator_after: true,
        // },
        // rename: {
        //     name: 'Rename',
        //     icon: 'bi bi-pencil',
        //     callback: () => {
        //         $(tree).jstree(true).edit(node);
        //     },
        //     separator_after: true,
        // },
        remove: {
            name: 'Delete',
            icon: ' bi bi-trash',
            visible: () => showRemove(itemIDs),
            callback: () => {
                dispatch(deleteItemsAction(itemIDs));
            },
        },
    };
}

function showRemove(itemIDs: string[]) {
    return itemIDs.length > 0;
}
