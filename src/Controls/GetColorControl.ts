import { Prop, typeHasProp } from 'Views/PixiApp/InitApp';
import { getLabel } from 'Controls/GetLabel';
import { subscribe } from 'State/State';
import $ from 'jquery';
import { Control, getSelector, onChange } from 'Controls/Controls';

export function getColorControl(prop: Prop<string>): Control<string> {
    const element = $(`
<div id='control-${prop.key}' class='row'>
    <label for='${prop.key}' class='col-sm-4 col-form-label col-form-label-sm '>${getLabel(prop)}</label>
    <div class='col-sm-8'>
        <input type='color' class='form-control form-control-sm bg-transparent text-white' id='${
            prop.key
        }' placeholder='#563d7c'>
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
            $(`#${prop.key}`).val(`#${(value as number)?.toString(16)}` ?? '');
        }
    });

    subscribe(selector);

    return {
        element,
        onAttach: () => {
            $(`#${prop.key}`).on('change', () => {
                const value = $(`#${prop.key}`).val();
                const hex = (value as string).substring(1); // Exclude '#'.
                if (hex === '') return;

                onChange({ [prop.key]: parseInt(hex, 16) });
            });
        },
        selector,
    };
}
