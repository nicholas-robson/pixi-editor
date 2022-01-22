import { Control, getSelected } from 'Controls/Controls';
import { Prop, typeHasProp, typePropMap } from 'Views/PixiApp/InitApp';
import { createSelector } from 'reselect';
import { subscribe } from 'State/State';
import $ from "jquery";

export function getSeparatorControl(prop: Prop<string>): Control<void> {
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
