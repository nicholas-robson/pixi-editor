import { getLabel } from 'Controls/GetLabel';
import { subscribe } from 'State/State';
import $ from 'jquery';
import { Control, getSelector, onChange } from 'Controls/Controls';
import { Prop } from 'Views/Inspector/Prop';

export function getBooleanControl(prop: Prop<boolean>): Control {
    const element = $(`
<div id='control-${prop.id}' class='row'>
  <label for='${prop.id}' class='col-sm-4 col-form-label col-form-label-sm'>${getLabel(prop)}</label>
  <div class='col-sm-8'>
    <div class='mt-1 form-check form-switch'>
      <input class='form-check-input' type='checkbox' role='switch' id='${prop.id}'>
    </div>
  </div>
</div>
    `);

    const selector = getSelector(prop, (item, value) => {
        $(`#${prop.id}`).prop('disabled', item === undefined);

        if (item !== undefined) {
            $(`#${prop.id}`).prop('checked', value ?? false);
        }
    });

    subscribe(selector);

    return {
        element,
        onAttach: () => {
            $(`#${prop.id}`).on('change', () => {
                const value = $(`#${prop.id}`).is(':checked');
                onChange(prop, value);
            });
        },
        selector,
    };
}
