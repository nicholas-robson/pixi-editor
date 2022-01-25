import $ from 'jquery';
import 'bootstrap';
import { EditorState } from 'State/EditorState';
import { controlTypeCreatorMap } from 'Views/Inspector/ControlTypeCreatorMap';
import { allProps } from 'Views/Inspector/DefaultProps';
import { camelCaseToTitle } from 'Controls/CamelCaseToTitle';
import { ControlType } from 'Views/Inspector/ControlType';
import { subscribe } from 'State/State';
import { createSelector } from 'reselect';
import { getSelected } from 'Controls/Controls';

export function initInspector(state: EditorState) {
    const attachEmAll: (() => void)[] = [];
    const selectors: ((state: EditorState) => void)[] = [];

    const topProps = [
        { id: 'type', control: ControlType.STRING, controlOptions: { readonly: true } },
        { id: 'id', control: ControlType.STRING, controlOptions: { readonly: true } },
        { id: 'name', control: ControlType.STRING },
    ];

    const topPropsContainer = $("<div class='container controls'></div>");

    topProps.forEach((p) => {
        const control = controlTypeCreatorMap[p.control](p);
        topPropsContainer.append(control.element);
        attachEmAll.push(control.onAttach);
        selectors.push(control.selector);
    });

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
            content.append(control.element);
            attachEmAll.push(control.onAttach);
            selectors.push(control.selector);
        });

        section.append(header);
        section.append(content);

        sectionsContainer.append(section);

        const selector = createSelector(
            (state: EditorState) => getSelected(state)?.type,
            (type) => {
                if (type !== undefined && propGroup.types.includes(type)) {
                    $(section).show();
                } else {
                    $(section).hide();
                }
            }
        );

        selectors.push(selector);

        return;
    });

    $('#right-panel-content').append(topPropsContainer);
    $('#right-panel-content').append(sectionsContainer);

    // TODO: Ugh... how to add listeners before attaching to dom...?
    attachEmAll.forEach((a) => a());

    // Call selectors with initial state.
    selectors.forEach((selector) => {
        subscribe(selector);
        selector(state);
    });
}
