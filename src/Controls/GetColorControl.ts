import { getLabel } from 'Controls/GetLabel';
import { subscribe } from 'State/State';
import $ from 'jquery';
import { Control, getSelector, onChange } from 'Controls/Controls';
import { Prop } from 'Views/Inspector/Prop';

export function getColorControl(prop: Prop<number>): Control {
    const element = $(`
<div id='control-${prop.id}' class='row'>
    <label for='${prop.id}' class='col-sm-4 col-form-label col-form-label-sm '>${getLabel(prop)}</label>
    <div class='col-sm-8'>
<!--        <label for='${prop.id}' class='float-start'><i class='bi bi-palette'></i></label>-->
        <input type='color' class='form-control form-control-sm' id='${
            prop.id
        }' placeholder='#563d7c' value='#563d7c'>
    </div>
</div>
    `);

    const selector = getSelector(prop, (item, value) => {
        $(`#${prop.id}`).prop('disabled', item === undefined);

        if (item !== undefined) {
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
