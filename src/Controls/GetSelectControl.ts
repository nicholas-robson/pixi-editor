import { getLabel } from 'Controls/GetLabel';
import { subscribe } from 'State/State';
import $ from 'jquery';
import { Control, getSelector, onChange } from 'Controls/Controls';
import { typeHasProp } from 'Views/Inspector/TypeHasProp';
import { Prop } from 'Views/Inspector/Prop';

export function getSelectControl(prop: Prop<string>): Control {
    const options = $('<div class="btn-group btn-group-sm" role="group"></div>');
    prop.inputOptions?.forEach((option) => {
        options.append(`<option value='${option.value}'>${option.value}</option>`);
    });

    const element = $(`
<div id='control-${prop.id}' class='row'>
    <label for='${prop.id}' class='col-sm-4 col-form-label col-form-label-sm'>${getLabel(prop)}</label>
    <div class='col-sm-8'>
        <select class='form-select form-select-sm' id='${prop.id}' ${prop.controlOptions?.readonly ? 'readonly' : ''}>
            ${options.prop('outerHTML')}
        </select>
    </div>
</div>
    `);

    const selector = getSelector(prop, (item, value) => {
        const hasType = item !== undefined && typeHasProp(item.type, prop);

        if (!hasType) {
            element.hide();
        } else {
            element.show();
            if (value !== undefined) {
                $(`#${prop.id}`).val(value);
            }
        }
    });

    subscribe(selector);

    return {
        element,
        onAttach: () => {
            $(`#${prop.id}`).on('change', () => {
                const value = $(`#${prop.id}`).val();
                onChange(prop, value);
            });
        },
        selector,
    };
}