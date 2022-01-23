import { subscribe } from 'State/State';
import $ from 'jquery';
import { Control, getSelector, onChange } from 'Controls/Controls';
import { getLabel } from 'Controls/GetLabel';
import { typeHasProp } from 'Views/Inspector/TypeHasProp';
import { Prop } from 'Views/Inspector/Prop';

export function getImageControl(prop: Prop<string>): Control {
    const element = $(`
<div id='control-${prop.id}' class='row'>
    <label for='${prop.id}' class='col-sm-4 col-form-label col-form-label-sm '>${getLabel(prop)}</label>
    <div class='col-sm-8'>
        <img class='img-thumbnail d-block' width='64' height='64'  alt='image' id='image-${prop.id}'/>
        <input type='hidden' class='form-control form-control-sm' id='${prop.id}'>
    </div>
</div>
    `);

    const selector = getSelector(prop, (item, value) => {
        const hasType = item !== undefined && typeHasProp(item.type, prop);

        if (!hasType) {
            element.hide();
        } else {
            element.show();
            //$(`#${prop.id}`).prop('disabled', item === undefined);
            $(`#${prop.id}`).val(value ?? '');
            if (value) {
                $(`#image-${prop.id}`).attr("src", `resource/${value}`);
            } else {

            }
        }
    });

    subscribe(selector);

    return {
        element,
        onAttach: () => {
            $(`#${prop.id}`).on('change', () => {
                const value = $(`#${prop.id}`).val() as string;
                onChange(prop, value);
            });
        },
        selector,
    };
}
