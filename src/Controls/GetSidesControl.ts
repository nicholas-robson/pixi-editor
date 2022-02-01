import { getLabel } from 'Controls/GetLabel';
import $ from 'jquery';
import { Control, getSelector, isNumeric, onChange } from 'Controls/Controls';
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

    const topInput = $(`<input type='number' class='form-control form-control-sm' id='${topID}'
            ${prop.controlOptions?.readonly ? 'readonly' : ''} step='${prop.controlOptions?.step ?? 1}'>`);

    const rightInput = $(`<input type='number' class='form-control form-control-sm' id='${rightID}'
            ${prop.controlOptions?.readonly ? 'readonly' : ''} step='${prop.controlOptions?.step ?? 1}'>`);

    const leftInput = $(`<input type='number' class='form-control form-control-sm' id='${leftID}'
            ${prop.controlOptions?.readonly ? 'readonly' : ''} step='${prop.controlOptions?.step ?? 1}'>`);

    const bottomInput = $(`<input type='number' class='form-control form-control-sm' id='${bottomID}'
            ${prop.controlOptions?.readonly ? 'readonly' : ''} step='${prop.controlOptions?.step ?? 1}'>`);

    const element = $(`
<div id='control-${prop.id}' class='row'>
    <label for='${topID}' class='col-sm-4 col-form-label col-form-label-sm '>${getLabel(prop)}</label>
    <div class='col-sm-8'>
        <div class='row justify-content-around'>
            <div class='w-50 input-group-sm'>${topInput.prop('outerHTML')}</div>
        </div>
        <div class='row justify-content-between'>
            <div class='w-50 input-group-sm'>${leftInput.prop('outerHTML')}</div>
            <div class='w-50 input-group-sm'>${rightInput.prop('outerHTML')}</div>
        </div>
        <div class='row justify-content-around'>
            <div class='w-50 input-group-sm'>${bottomInput.prop('outerHTML')}</div>
        </div>
    </div>
</div>
    `);

    const selector = getSelector(prop, (item, value) => {
        $(`#${topID}`).prop('disabled', item === undefined);
        $(`#${leftID}`).prop('disabled', item === undefined);
        $(`#${rightID}`).prop('disabled', item === undefined);
        $(`#${bottomID}`).prop('disabled', item === undefined);

        if (item !== undefined) {
            $(`#${topID}`).val(value?.top ?? '');
            $(`#${leftID}`).val(value?.left ?? '');
            $(`#${rightID}`).val(value?.right ?? '');
            $(`#${bottomID}`).val(value?.bottom ?? '');
        }
    });

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
    let top = $(`#${topID}`).val();
    let right = $(`#${rightID}`).val();
    let left = $(`#${leftID}`).val();
    let bottom = $(`#${bottomID}`).val();

    const topIsValid = (prop.controlOptions?.allowEmpty && top === '') || isNumeric(top);
    const rightIsValid = (prop.controlOptions?.allowEmpty && right === '') || isNumeric(right);
    const leftIsValid = (prop.controlOptions?.allowEmpty && left === '') || isNumeric(left);
    const bottomIsValid = (prop.controlOptions?.allowEmpty && bottom === '') || isNumeric(bottom);

    if (!topIsValid || !rightIsValid || !leftIsValid || !bottomIsValid) return;

    if (top === '') top = undefined;
    if (right === '') right = undefined;
    if (left === '') left = undefined;
    if (bottom === '') bottom = undefined;

    onChange(prop, { top, right, left, bottom });
}
