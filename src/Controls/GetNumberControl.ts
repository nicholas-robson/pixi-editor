import { subscribe } from 'State/State';
import { Prop, typeHasProp } from 'Views/PixiApp/InitApp';
import { getLabel } from 'Controls/GetLabel';
import $ from 'jquery';
import { Control, getSelector, onNumberInput } from 'Controls/Controls';
import { Item } from 'State/Item';

export function getNumberControl<T extends keyof Item>(prop: Prop<T>): Control<number> {
    const element = $(`
<div id='control-${prop.key}' class='row'>
    <label for='${prop.key}' class='col-sm-4 col-form-label col-form-label-sm '>${getLabel(prop)}</label>
    <div class='col-sm-8'>
        <input type='number' class='form-control form-control-sm bg-transparent text-white' id='${prop.key}'
            ${prop.controlOptions?.readonly ? 'readonly' : ''} step='${prop.controlOptions?.step ?? 1}'>
    </div>
</div>
    `);

    const selector = getSelector(prop.key, (item, value) => {
        const hasType = item !== undefined && typeHasProp(item.type, prop);

        if (!hasType) {
            element.hide();
        } else {
            element.show();
            //   $(`#${prop.key}`).prop('disabled', item === undefined);
            $(`#${prop.key}`).val((value as number) ?? '');
        }
    });

    subscribe(selector);

    return {
        element,
        onAttach: () => {
            $(`#${prop.key}`).on('change', () => {
                onNumberInput(prop.key);
            });
        },
        selector,
    };
}
