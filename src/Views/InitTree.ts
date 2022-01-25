import { dispatch, subscribe } from 'State/State';
import $ from 'jquery';
import {
    duplicateItemAction,
    focusItemAction,
    moveItemsAction,
    renameItemAction,
    selectItemsAction,
} from 'State/Actions';
import { createSelector } from 'reselect';
import 'jstree';
import { Item } from 'State/Item';
import { EditorState } from 'State/EditorState';
import { canHaveChildren } from 'State/CanHaveChildren';
import { PixiType } from 'State/PixiType';

function getJSTreeData(items: Item[]) {
    return items
        .slice(0)
        .sort((a, b) => {
            return a.childIndex - b.childIndex;
        })
        .map((item) => {
            return {
                id: item.id,
                parent: item.parent === null ? '#' : item.parent,
                text: item.name,
                opened: item.opened,
                selected: item.selected,
                disabled: item.disabled,
                data: { type: item.type },
                type: item.type,
                position: item.childIndex,
            };
        });
}

export function initTree(state: EditorState) {
    const tree = $('#tree-container');
    tree.jstree({
        plugins: ['search', 'changed', 'conditionalselect', 'dnd', 'types', 'wholerow'], // contextmenu
        core: {
            //data: getJSTreeData(state.items),
            themes: { name: 'custom-theme', responsive: true, dots: false, icons: true, variant: 'large' },
            check_callback: function (operation: any, node: any, node_parent: any, node_position: any, more: any) {
                if (!node_parent) return true;

                if (operation === 'move_node') {
                    if (node_parent.id === '#') return true;

                    return canHaveChildren(node_parent.data?.type);
                }

                // operation can be 'create_node', 'rename_node', 'delete_node', 'move_node', 'copy_node' or 'edit'
                // in case of 'rename_node' node_position is filled with the new node name
                return true;
            },
        },

        dnd: {
            large_drag_target: true,
            large_drop_target: true,
            copy: false,
        },

        // contextmenu: {
        // select_node: false,
        // items: (node: any) => ({
        //     create: {
        //         label: 'Create',
        //         icon: 'bi bi-plus-square',
        //         submenu: {
        //             container: {
        //                 label: 'Container',
        //                 icon: 'bi bi-folder',
        //                 action: () => {
        //                     dispatch(
        //                         createItemAction({
        //                             parent: node.id,
        //                             type: PixiType.CONTAINER,
        //                         })
        //                     );
        //                 },
        //             },
        //             sprite: {
        //                 label: 'Sprite',
        //                 icon: 'bi bi-image',
        //                 action: () => {
        //                     dispatch(
        //                         createItemAction({
        //                             parent: node.id,
        //                             type: PixiType.SPRITE,
        //                         })
        //                     );
        //                 },
        //             },
        //         },
        //         separator_after: true,
        //     },
        //     // copy: {
        //     //     label: 'Copy',
        //     //     icon: 'bi bi-clipboard',
        //     // },
        //     // cut: {
        //     //     label: 'Cut',
        //     //     icon: 'bi bi-scissors',
        //     // },
        //     // paste: {
        //     //     label: 'Paste',
        //     //     icon: 'bi bi-clipboard-check',
        //     //     _disabled: () => false,
        //     //     separator_after: true,
        //     // },
        //     rename: {
        //         label: 'Rename',
        //         icon: 'bi bi-pencil',
        //         action: () => {
        //             $(tree).jstree(true).edit(node);
        //         },
        //         separator_after: true,
        //     },
        //     remove: {
        //         label: 'Delete',
        //         icon: 'bi bi-trash',
        //         action: () => {
        //             dispatch(deleteItemsAction([node.id]));
        //         },
        //     },
        // }),
        // },

        search: {
            show_only_matches: true,
            show_only_matches_children: true,
        },

        types: {
            [PixiType.CONTAINER]: {
                icon: 'bi bi-folder',
            },
            [PixiType.SPRITE]: {
                icon: 'bi bi-image',
            },
            [PixiType.NINE_SLICE]: {
                icon: 'bi bi-grid-3x3',
            },
            [PixiType.TEXT]: {
                icon: 'bi bi-textarea-t',
            },
        },
        conditionalselect: (node: any, event: any) => {
            return true;
        },
    })
        .on('changed.jstree', (e: any, data: any) => {})
        .on('move_node.jstree', (e: any, data: any) => {
            dispatch(moveItemsAction([data.node.id], data.position, data.parent === '#' ? null : data.parent));
        })
        .on('rename_node.jstree', (e: any, data: any) => {
            dispatch(renameItemAction(data.node.id, data.text));
        })
        .on('copy_node.jstree', (e: any, data: any) => {
            const idMap: Record<string, string> = {
                [data.original.id]: data.node.id,
                ...data.original.children_d.reduce(
                    (acc: Record<string, string>, id: string, index: number) => ({
                        ...acc,
                        [id]: data.node.children_d[index],
                    }),
                    {}
                ),
            };

            dispatch(
                duplicateItemAction(data.original.id, data.position, data.parent === '#' ? null : data.parent, idMap)
            );
        })
        .on('copy.jstree', (e: any, data: any) => {
            //console.log('copy', e, data);
        })
        .on('cut.jstree', (e: any, data: any) => {
            //console.log('cut', e, data);
        })
        .on('paste.jstree', (e: any, data: any) => {
            //console.log('paste', e, data);
        })
        .on('create_node.jstree', (e: any, data: any) => {
            //console.log('create_node', data);
            //dispatch(deleteItemsAction([data.node.id]));
        })
        .on('select_node.jstree', (e: any, data: any) => {
            if (data.event?.dispatch === false) return;
            dispatch(selectItemsAction(data.selected, true));
        })
        .on('deselect_node.jstree', (e: any, data: any) => {
            if (data.event?.dispatch === false) return;
            dispatch(selectItemsAction(data.selected, true));
        });

    $('#tree-search').on('keyup', () => {
        const searchValue = $('#tree-search').val() as string;
        $(tree).jstree(true).search(searchValue);
    });

    $('#tree-expand').on('click', () => {
        $(tree).jstree(true).open_all(null, 100);
    });

    $('#tree-collapse').on('click', () => {
        $(tree).jstree(true).close_all(null, 100);
    });

    const selector = createSelector(
        (state: EditorState) => state.items,
        (items) => {
            const nodes = $(tree).jstree(true).get_json(undefined, { flat: true });

            const added = getJSTreeData(items.filter((item) => !nodes.map((node: any) => node.id).includes(item.id)));

            const removed = nodes
                .filter((node: any) => !items.map((item) => item.id).includes(node.id))
                .map((node: any) => node.id);

            added.forEach((treeItem) => {
                $(tree).jstree(true).create_node(treeItem.parent, treeItem, treeItem.position);
            });

            removed.forEach((id: string) => {
                const node = $(tree).jstree(true).get_node(id);
                $(tree).jstree(true).delete_node(id);
            });

            // Select/deselect.
            items.forEach((item) => {
                const node = $(tree).jstree(true).get_node(item.id);

                if (node === false) return;

                if (item.selected && !node.state.selected) {
                    $(tree).jstree(true).select_node(item.id, false, false, { dispatch: false });
                } else if (!item.selected && node.state.selected) {
                    $(tree).jstree(true).deselect_node(item.id, false, { dispatch: false });
                }

                if (item.name !== node.text) {
                    node.text = item.name;
                    $(tree).jstree(true).redraw_node(node, false, false, false);

                    // Do not call `rename_node` or it will dispatch a rename action and disrupt undo stack.
                }
            });

            // Ugly but it works...
            $('.jstree-node')
                .off('dblclick')
                .on('dblclick', (e) => {
                    const itemID = $(e.currentTarget).attr('id');
                    if (typeof itemID !== 'string') return;
                    dispatch(focusItemAction(itemID));
                });
        }
    );

    subscribe(selector);

    selector(state);
}
