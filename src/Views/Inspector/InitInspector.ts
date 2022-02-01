import $ from 'jquery';
import 'bootstrap';
import { EditorState } from 'State/EditorState';
import { controlTypeCreatorMap } from 'Views/Inspector/ControlTypeCreatorMap';
import { allProps } from 'Views/Inspector/DefaultProps';
import { camelCaseToTitle } from 'Controls/CamelCaseToTitle';
import { dispatch, getState, subscribe } from 'State/State';
import { createSelector } from 'reselect';
import { getSelected } from 'Controls/Controls';
import { updateItemAction } from 'State/Actions';
import { Collapse } from 'bootstrap';

export function initInspector(state: EditorState) {
    const attachEmAll: (() => void)[] = [];
    const selectors: ((state: EditorState) => void)[] = [];

    const sectionsContainer = $(`<div>`);

    allProps.forEach((propGroup) => {
        const section = $('<div>');

        const header = $(`
            <button class='header-button' data-bs-toggle="collapse" data-bs-target="#collapse-${propGroup.id}">
              ${camelCaseToTitle(propGroup.id)}
            </button>`);

        const content = $(`<div class='collapse show controls container' id='collapse-${propGroup.id}'>`);

        propGroup.props.forEach((p) => {
            const control = controlTypeCreatorMap[p.control](p);

            const showSelector = createSelector(
                (state: EditorState) => {
                    const item = getSelected(state);
                    if (item === undefined) return false;

                    const condition = p.condition ?? (() => true);

                    return condition(item);
                },
                (show) => {
                    if (show) {
                        $(`#control-${p.id}`).slideDown(250);
                    } else {
                        $(`#control-${p.id}`).slideUp(250);
                    }
                }
            );

            selectors.push(showSelector);

            content.append(control.element);
            attachEmAll.push(control.onAttach);
            selectors.push(control.selector);
        });

        section.append(header);
        section.append(content);



        attachEmAll.push(() => {
            const controls = document.getElementById(`collapse-${propGroup.id}`)!;
            //const collapse = new Collapse(controls);

            const selector = createSelector(getSelected, item => {
                if (item === undefined) return;
                if (item.editorData.closeTabs.includes(propGroup.id)) {
                    $(controls).removeClass("show");
                    //collapse.hide();
                } else {
                    $(controls).addClass("show");
                    //collapse.show();
                }
            });

            subscribe(selector);
            selector(getState());

        });

        attachEmAll.push(() => {
            const controls = document.getElementById(`collapse-${propGroup.id}`)!;
            controls.addEventListener('shown.bs.collapse', () => {
                const item = getSelected(getState());
                if (item === undefined) return;
                dispatch(
                    updateItemAction(item.id, {
                        editorData: {
                            ...item.editorData,
                            closeTabs: item.editorData.closeTabs.filter((c) => c !== propGroup.id),
                        },
                    })
                );
            });
        });

        attachEmAll.push(() => {
            const controls = document.getElementById(`collapse-${propGroup.id}`)!;
            controls.addEventListener('hidden.bs.collapse', () => {
                const item = getSelected(getState());
                if (item === undefined) return;
                dispatch(
                    updateItemAction(item.id, {
                        editorData: {
                            ...item.editorData,
                            closeTabs: [...item.editorData.closeTabs, propGroup.id],
                        },
                    })
                );
            });
        });

        sectionsContainer.append(section);

        const selector = createSelector(
            (state: EditorState) => {
                if (propGroup.condition) {
                    return propGroup.condition(getSelected(state));
                }
                return true;
            },
            (state: EditorState) => getSelected(state)?.type,
            (conditionResult, type) => {
                if (type !== undefined && propGroup.types.includes(type) && conditionResult) {
                    $(section).show();
                } else {
                    $(section).hide();
                }
            }
        );

        selectors.push(selector);

        return;
    });

    $('#right-panel-content').append(sectionsContainer);

    //
    // Scroll state.
    //
    let scrollDebounce: any = null;
    $('#right-panel').on('scroll', (e) => {
        const item = getSelected(getState());
        if (item === undefined) return;
        clearTimeout(scrollDebounce);
        scrollDebounce = setTimeout(function () {
            dispatch(
                updateItemAction(item.id, {
                    editorData: {
                        ...item.editorData,
                        inspectorScrollY: $(e.currentTarget).scrollTop() as number,
                    },
                })
            );
        }, 250);
    });

    const inspectorScrollSelector = createSelector(getSelected, (item) => {
        if (item === undefined) return;
        $('#right-panel').scrollTop(item.editorData.inspectorScrollY);
    });
    //
    //

    selectors.push(inspectorScrollSelector);

    // TODO: Ugh... how to add listeners before attaching to dom...?
    attachEmAll.forEach((a) => a());

    // Call selectors with initial state.
    selectors.forEach((selector) => {
        subscribe(selector);
        selector(state);
    });
}
