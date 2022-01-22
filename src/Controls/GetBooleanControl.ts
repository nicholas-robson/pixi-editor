import { Prop, typeHasProp } from 'Views/PixiApp/InitApp';
import { getLabel } from 'Controls/GetLabel';
import { subscribe } from 'State/State';
import $ from 'jquery';
import { Control, getSelector, onChange } from 'Controls/Controls';

export function getBooleanControl(prop: Prop<boolean>): Control<boolean> {
    const element = $(`
<div id='control-${prop.key}' class='row'>
  <label for='${prop.key}' class='col-sm-4 col-form-label col-form-label-sm '>${getLabel(prop)}</label>
  <div class='col-sm-8'>
    <div class='mt-1 form-check form-switch'>
      <input class='form-check-input' type='checkbox' role='switch' id='${prop.key}'>
    </div>
  </div>
</div>
    `);

    const selector = getSelector(prop.key, (item, value) => {
        const hasType = item !== undefined && typeHasProp(item.type, prop);

        if (!hasType) {
            element.hide();
        } else {
            element.show();
            // $(`#${prop.key}`).prop('disabled', item === undefined);
            $(`#${prop.key}`).prop('checked', value ?? false);
        }
    });

    subscribe(selector);

    return {
        element,
        onAttach: () => {
            $(`#${prop.key}`).on('change', () => {
                const value = $(`#${prop.key}`).is(':checked');
                onChange({ [prop.key]: value });
            });
        },
        selector,
    };
}
