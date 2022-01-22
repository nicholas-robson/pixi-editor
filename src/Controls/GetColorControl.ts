import { getLabel } from 'Controls/GetLabel';
import { subscribe } from 'State/State';
import $ from 'jquery';
import { Control, getSelector, onChange } from 'Controls/Controls';
import { typeHasProp } from 'Views/Inspector/TypeHasProp';
import { Prop } from 'Views/Inspector/Prop';

export function getColorControl(prop: Prop<number>): Control {
    const element = $(`
<div id='control-${prop.id}' class='row'>
    <label for='${prop.id}' class='col-sm-4 col-form-label col-form-label-sm '>${getLabel(prop)}</label>
    <div class='col-sm-8'>
        <input type='color' class='form-control form-control-sm bg-transparent text-white' id='${
            prop.id
        }' placeholder='#563d7c'>
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
            $(`#${prop.id}`).val(`#${value?.toString(16)}` ?? '');
        }
    });

    subscribe(selector);

    return {
        element,
        onAttach: () => {
            $(`#${prop.id}`).on('change', () => {
                const value = $(`#${prop.id}`).val();
                const hex = (value as string).substring(1); // Exclude '#'.
                if (hex === '') return;
                onChange(prop, parseInt(hex, 16));
            });
        },
        selector,
    };
}
