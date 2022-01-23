import { getLabel } from 'Controls/GetLabel';
import { subscribe } from 'State/State';
import $ from 'jquery';
import { Control, getSelector, onChange } from 'Controls/Controls';
import { typeHasProp } from 'Views/Inspector/TypeHasProp';
import { Prop } from 'Views/Inspector/Prop';

export function getRadioButtonsControl(prop: Prop<string>): Control {
    const inputs = $('<div class="btn-group btn-group-sm" role="group"></div>');
    prop.inputOptions?.forEach((option) => {
        inputs.append(`
            <input type="radio" class="btn-check" name="options-${prop.id}" id="option-${prop.id}-${option.value}" 
                autocomplete="off" value='${option.value}' ${prop.controlOptions?.readonly ? 'readonly' : ''}>
            <label class="btn btn-outline-light" for="option-${prop.id}-${option.value}"><i class='bi ${option.icon}'></i>${
            option.label ?? ''
        }</label>
        `);
    });

    const element = $(` 
<div id='control-${prop.id}' class='row'>
    <label for='${prop.id}' class='col-sm-4 col-form-label col-form-label-sm'>${getLabel(prop)}</label>
    <div class='col-sm-8'>
        ${inputs.prop('outerHTML')}
    </div>
</div>
    `);

    const selector = getSelector(prop, (item, value) => {
        const hasType = item !== undefined && typeHasProp(item.type, prop);

        if (!hasType) {
            element.hide();
        } else {
            element.show();
            //   $(`#${prop.id}`).prop('disabled', item === undefined);
            if (value !== undefined) {
                const id = `#option-${prop.id}-${value}`;
                $(id).prop("checked", true);
            }
        }
    });

    subscribe(selector);

    return {
        element,
        onAttach: () => {

            prop.inputOptions?.forEach((option) => {
                const id = `#option-${prop.id}-${option.value}`;
                $(id).on("change", () => {
                    const value = $(id).val();
                    onChange(prop, value);
                })
            });
        },
        selector,
    };
}
