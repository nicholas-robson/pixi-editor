import { Control, getSelected } from 'Controls/Controls';
import { createSelector } from 'reselect';
import { subscribe } from 'State/State';
import $ from 'jquery';
import { typeHasProp } from 'Views/Inspector/TypeHasProp';
import { Prop } from 'Views/Inspector/Prop';

export function getSeparatorControl(prop: Prop<string>): Control {
    const element = $('<hr />');

    const selector = createSelector(getSelected, (item) => {
        if (item === undefined || !typeHasProp(item.type, prop)) {
            element.hide();
        } else {
            element.show();
        }
    });

    subscribe(selector);

    return {
        element,
        onAttach: () => {},
        selector: selector,
    };
}
