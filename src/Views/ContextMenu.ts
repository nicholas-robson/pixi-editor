import { dispatch, getState } from 'State/State';
import { createItemAction, deleteItemsAction, selectItemsAction } from 'State/Actions';
import { PixiType } from 'State/PixiType';
import $ from 'jquery';
import { toLocal } from 'Views/PixiApp/InitApp';

let contextMenuPosition = { x: 0, y: 0 };

export function initContextMenu() {
    $.contextMenu({
        selector: '#canvas-container, .jstree-node',
        build: ($trigger, e: any) => {
            const isTreeNode = $($trigger).hasClass('jstree-node');
            if (isTreeNode) {
                const id = $($trigger).attr('id') as string;
                dispatch(selectItemsAction([id], true));
            }

            const itemIDs = getState()
                .items.filter((item) => item.selected)
                .map((item) => item.id);

            return {
                items: getContextMenu(itemIDs),
            };
        },
        position: (opt: any, x, y) => {
            opt.$menu.css({ top: y, left: x });

            // console.log(opt);
            // console.log(x, y);

            // var parentOffset = $(this).parent().offset();
            // //or $(this).offset(); if you really just want the current element's offset
            // var relX = e.pageX - parentOffset.left;
            // var relY = e.pageY - parentOffset.top;

            contextMenuPosition = { x, y };
        },
        zIndex: 750,
    });
}

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
                        const point = toLocal(contextMenuPosition.x, contextMenuPosition.y, parent);
                        dispatch(
                            createItemAction(
                                {
                                    parent,
                                    type: PixiType.CONTAINER,
                                    position: { x: point.x, y: point.y },
                                },
                                true
                            )
                        );
                    },
                },
                sprite: {
                    name: 'Sprite',
                    icon: ' bi bi-image',
                    callback: () => {
                        const point = toLocal(contextMenuPosition.x, contextMenuPosition.y, parent);
                        dispatch(
                            createItemAction(
                                {
                                    parent,
                                    type: PixiType.SPRITE,
                                    position: { x: point.x, y: point.y },
                                },
                                true
                            )
                        );
                    },
                },
                text: {
                    name: 'Text',
                    icon: ' bi bi-textarea-t',
                    callback: () => {
                        const point = toLocal(contextMenuPosition.x, contextMenuPosition.y, parent);
                        dispatch(
                            createItemAction(
                                {
                                    parent,
                                    type: PixiType.TEXT,
                                    position: { x: point.x, y: point.y },
                                },
                                true
                            )
                        );
                    },
                },
                nineslice: {
                    name: 'Nine-Slice',
                    icon: ' bi bi-grid-3x3',
                    callback: () => {
                        const point = toLocal(contextMenuPosition.x, contextMenuPosition.y, parent);
                        dispatch(
                            createItemAction(
                                {
                                    parent,
                                    type: PixiType.NINE_SLICE,
                                    position: { x: point.x, y: point.y },
                                },
                                true
                            )
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
