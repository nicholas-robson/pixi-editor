import { Prop, typeHasProp } from 'Views/PixiApp/InitApp';
import { subscribe } from 'State/State';
import { getLabel } from 'Controls/GetLabel';
import $ from 'jquery';
import { Control, getSelector, onVector2Input } from 'Controls/Controls';
import { Vector2 } from 'Utility/Vector2';

export function getVector2Control(prop: Prop<Vector2>): Control<Vector2> {
    const xID = `${prop.key}-x`;
    const yID = `${prop.key}-y`;

    const element = $(`
<div id='control-${prop.key}' class='row'>
    <label for='${xID}' class='col-sm-4 col-form-label col-form-label-sm '>${getLabel(prop)}</label>
    <div class='col-sm-8'>
    <div class='input-group input-group-sm'>
        <input type='number' class='form-control form-control-sm bg-transparent text-white' id='${xID}'
            ${prop.controlOptions?.readonly ? 'readonly' : ''} step='${prop.controlOptions?.step ?? 1}'>
        <input type='number' class='form-control form-control-sm bg-transparent text-white' id='${yID}' 
            ${prop.controlOptions?.readonly ? 'readonly' : ''} step='${prop.controlOptions?.step ?? 1}'>
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

            // $(`#${xID}`).prop('disabled', item === undefined);
            // $(`#${yID}`).prop('disabled', item === undefined);

            $(`#${xID}`).val(((value as Vector2)?.x as number) ?? '');
            $(`#${yID}`).val(((value as Vector2)?.y as number) ?? '');
        }
    });

    subscribe(selector);

    return {
        element,
        onAttach: () => {
            $(`#${xID}`).on('change', () => {
                onVector2Input(prop.key, xID, yID);
            });

            $(`#${yID}`).on('change', () => {
                onVector2Input(prop.key, xID, yID);
            });
        },
        selector,
    };
}
