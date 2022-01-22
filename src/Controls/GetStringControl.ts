import { Prop, typeHasProp } from 'Views/PixiApp/InitApp';
import { getLabel } from 'Controls/GetLabel';
import { subscribe } from 'State/State';
import $ from 'jquery';
import { Control, getSelector, onChange } from 'Controls/Controls';
import { Item } from 'State/Item';

export function getStringControl(prop: Prop<string>): Control<string> {
    const element = $(` 
<div id='control-${prop.key}' class='row'>
    <label for='${prop.key}' class='col-sm-4 col-form-label col-form-label-sm'>${getLabel(prop)}</label>
    <div class='col-sm-8'>
        <input type='text' class='form-control form-control-sm bg-transparent text-white' id='${prop.key}'
            ${prop.controlOptions?.readonly ? 'readonly' : ''}>
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
                const value = $(`#${prop.key}`).val() as Item[typeof prop.key];
                onChange({ [prop.key]: value });
            });
        },
        selector,
    };
}
