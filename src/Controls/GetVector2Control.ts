import { getLabel } from 'Controls/GetLabel';
import $ from 'jquery';
import { Control, getSelector, isNumeric, onChange } from 'Controls/Controls';
import { Vector2 } from 'Utility/Vector2';
import { Prop } from 'Views/Inspector/Prop';
import { Item } from 'State/Item';

export function getVector2Control(prop: Prop<Vector2>): Control {
    const xID = `${prop.id}-x`;
    const yID = `${prop.id}-y`;

    const element = $(`
<div id='control-${prop.id}' class='row'>
    <label for='${xID}' class='col-sm-4 col-form-label col-form-label-sm '>${getLabel(prop)}</label>
    <div class='col-sm-8'>
    <div class='input-group input-group-sm'>
        <input type='number' class='form-control form-control-sm' id='${xID}'
            ${prop.controlOptions?.readonly ? 'readonly' : ''} step='${prop.controlOptions?.step ?? 1}'>
        <input type='number' class='form-control form-control-sm' id='${yID}' 
            ${prop.controlOptions?.readonly ? 'readonly' : ''} step='${prop.controlOptions?.step ?? 1}'>
    </div>
    </div>
</div>
    `);

    const selector = getSelector(prop, (item, value) => {
        $(`#${xID}`).prop('disabled', item === undefined);
        $(`#${yID}`).prop('disabled', item === undefined);

        if (item !== undefined) {
            $(`#${xID}`).val(((value as Vector2)?.x as number) ?? '');
            $(`#${yID}`).val(((value as Vector2)?.y as number) ?? '');
        }
    });

    return {
        element,
        onAttach: () => {
            $(`#${xID}`).on('change', () => {
                onVector2Input(prop, xID, yID);
            });

            $(`#${yID}`).on('change', () => {
                onVector2Input(prop, xID, yID);
            });
        },
        selector,
    };
}

function onVector2Input(prop: Prop<Vector2>, idX: any, idY: any) {
    const x = $(`#${idX}`).val() as Item['position']['x'];
    const y = $(`#${idY}`).val() as Item['position']['y'];

    if (!isNumeric(x) || !isNumeric(y)) return;

    onChange(prop, { x, y });
}
