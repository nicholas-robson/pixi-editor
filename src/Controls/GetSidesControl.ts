import { subscribe } from 'State/State';
import { getLabel } from 'Controls/GetLabel';
import $ from 'jquery';
import { Control, getSelector, isNumeric, onChange } from 'Controls/Controls';
import { typeHasProp } from 'Views/Inspector/TypeHasProp';
import { Prop } from 'Views/Inspector/Prop';

type Sides = {
    top: number;
    right: number;
    left: number;
    bottom: number;
};

export function getSidesControl(prop: Prop<Sides>): Control {
    const topID = `${prop.id}-top`;
    const rightID = `${prop.id}-right`;
    const leftID = `${prop.id}-left`;
    const bottomID = `${prop.id}-bottom`;

    const topInput =
        $(`<input type='number' class='form-control form-control-sm bg-transparent text-white' id='${topID}'
            ${prop.controlOptions?.readonly ? 'readonly' : ''} step='${prop.controlOptions?.step ?? 1}'>`);

    const rightInput =
        $(`<input type='number' class='form-control form-control-sm bg-transparent text-white' id='${rightID}'
            ${prop.controlOptions?.readonly ? 'readonly' : ''} step='${prop.controlOptions?.step ?? 1}'>`);

    const leftInput =
        $(`<input type='number' class='form-control form-control-sm bg-transparent text-white' id='${leftID}'
            ${prop.controlOptions?.readonly ? 'readonly' : ''} step='${prop.controlOptions?.step ?? 1}'>`);

    const bottomInput =
        $(`<input type='number' class='form-control form-control-sm bg-transparent text-white' id='${bottomID}'
            ${prop.controlOptions?.readonly ? 'readonly' : ''} step='${prop.controlOptions?.step ?? 1}'>`);

    const element = $(`
<div id='control-${prop.id}' class='row'>
    <label for='${topID}' class='col-sm-4 col-form-label col-form-label-sm '>${getLabel(prop)}</label>
    <div class='col-sm-8'>
        <div class='row justify-content-around'>
            <div class='w-50 input-group-sm'>${topInput.prop("outerHTML")}</div>
        </div>
        <div class='row justify-content-between'>
            <div class='w-50 input-group-sm'>${leftInput.prop("outerHTML")}</div>
            <div class='w-50 input-group-sm'>${rightInput.prop("outerHTML")}</div>
        </div>
        <div class='row justify-content-around'>
            <div class='w-50 input-group-sm'>${bottomInput.prop("outerHTML")}</div>
        </div>
    </div>
</div>
    `);

    const selector = getSelector(prop, (item, value) => {
        const hasType = item !== undefined && typeHasProp(item.type, prop);

        if (!hasType) {
            element.hide();
        } else {
            element.show();

            $(`#${topID}`).val(value?.top ?? '');
            $(`#${leftID}`).val(value?.left ?? '');
            $(`#${rightID}`).val(value?.right ?? '');
            $(`#${bottomID}`).val(value?.bottom ?? '');
        }
    });

    subscribe(selector);

    return {
        element,
        onAttach: () => {
            $(`#${topID}, #${rightID}, #${leftID}, #${bottomID}`).on('change', () => {
                onSidesInput(prop, topID, rightID, leftID, bottomID);
            });
        },
        selector,
    };
}

function onSidesInput(prop: Prop<Sides>, topID: any, rightID: any, leftID: any, bottomID: any) {
    const top = $(`#${topID}`).val();
    const right = $(`#${rightID}`).val();
    const left = $(`#${leftID}`).val();
    const bottom = $(`#${bottomID}`).val();

    if (!isNumeric(top) || !isNumeric(right) || !isNumeric(left) || !isNumeric(bottom)) return;

    onChange(prop, { top, right, left, bottom });
}
