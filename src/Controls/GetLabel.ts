import { camelCaseToTitle } from 'Controls/CamelCaseToTitle';
import { Prop } from 'Views/Inspector/Prop';

export function getLabel(prop: Prop<any>) {
    return prop.controlOptions?.label ?? camelCaseToTitle(prop.id);
}
