import { subscribe } from 'State/State';
import { getLabel } from 'Controls/GetLabel';
import $ from 'jquery';
import { Control, getSelector, isNumeric, onChange } from 'Controls/Controls';
import { Prop } from 'Views/Inspector/Prop';

export function getNumberControl(prop: Prop<number>): Control {
    const element = $(`
<div id='control-${prop.id}' class='row'>
    <label for='${prop.id}' class='col-sm-4 col-form-label col-form-label-sm '>${getLabel(prop)}</label>
    <div class='col-sm-8'>
        <input type='number' class='form-control form-control-sm' id='${prop.id}'
            ${prop.controlOptions?.readonly ? 'readonly' : ''} step='${prop.controlOptions?.step ?? 1}'>
    </div>
</div>
    `);

    const selector = getSelector(prop, (item, value) => {
        $(`#${prop.id}`).prop('disabled', item === undefined);

        if (item !== undefined) {
            $(`#${prop.id}`).val(value ?? '');
        }
    });

    subscribe(selector);

    return {
        element,
        onAttach: () => {
            $(`#${prop.id}`).on('change', () => {
                const value = $(`#${prop.id}`).val() as string;

                if (!isNumeric(value)) return;

                onChange(prop, parseFloat(value));
            });
        },
        selector,
    };
}
