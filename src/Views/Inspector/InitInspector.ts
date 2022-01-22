import $ from 'jquery';
import 'bootstrap';
import { EditorState } from 'State/EditorState';
import { typePropMap } from 'Views/Inspector/TypePropMap';
import { Prop } from 'Views/Inspector/Prop';
import { controlTypeCreatorMap } from 'Views/Inspector/ControlTypeCreatorMap';

export function initInspector(state: EditorState) {
    const controls = Object.values(typePropMap)
        .reduce<Prop<any>[]>(
            (acc, v) => [...acc, ...v.filter((vv) => vv.id === undefined || !acc.map((p) => p.id).includes(vv.id))],
            []
        )
        .map((p) => controlTypeCreatorMap[p.control](p));

    controls.forEach((control) => {
        $('#right-panel').append(control.element);
        control.onAttach();
        control.selector(state);
    });
}
