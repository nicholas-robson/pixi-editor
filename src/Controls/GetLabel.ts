import { Prop } from 'Views/PixiApp/InitApp';
import { camelCaseToTitle } from 'Controls/CamelCaseToTitle';

export function getLabel(prop: Prop<any>) {
    return prop.controlOptions?.label ?? camelCaseToTitle(prop.key);
}
