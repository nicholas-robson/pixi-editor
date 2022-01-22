import $ from 'jquery';
import 'bootstrap';
import { Control } from 'Controls/Controls';
import { Prop, typePropMap } from 'Views/PixiApp/InitApp';
import { getImageControl } from 'Controls/GetImageControl';
import { getColorControl } from 'Controls/GetColorControl';
import { getStringControl } from 'Controls/GetStringControl';
import { getNumberControl } from 'Controls/GetNumberControl';
import { getVector2Control } from 'Controls/GetVector2Control';
import { getBooleanControl } from 'Controls/GetBooleanControl';
import { getSeparatorControl } from 'Controls/GetSeparatorControl';
import { EditorState } from 'State/EditorState';

export function initInspector(state: EditorState) {
    const controls = Object.values(typePropMap)
        .reduce<Prop<any>[]>(
            (acc, v) => [...acc, ...v.filter((vv) => vv.key === undefined || !acc.map((p) => p.key).includes(vv.key))],
            []
        )
        .map((p) => controlTypeCreatorMap[p.control](p));

    controls.forEach((control) => {
        $('#right-panel').append(control.element);
        control.onAttach();
        control.selector(state);
    });
}

export enum ControlType {
    STRING = 'string',
    NUMBER = 'number',
    VECTOR2 = 'vector2',
    BOOLEAN = 'boolean',
    COLOR = 'color',
    TEXTURE = 'texture',
    SEPARATOR = 'separator',
}

const controlTypeCreatorMap: Record<ControlType, (prop: Prop<any>) => Control<any>> = {
    [ControlType.STRING]: getStringControl,
    [ControlType.NUMBER]: getNumberControl,
    [ControlType.VECTOR2]: getVector2Control,
    [ControlType.BOOLEAN]: getBooleanControl,
    [ControlType.COLOR]: getColorControl,
    [ControlType.TEXTURE]: getImageControl,
    [ControlType.SEPARATOR]: getSeparatorControl,
};
