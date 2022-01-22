import { PixiType } from 'State/PixiType';
import { typePropMap } from 'Views/Inspector/TypePropMap';
import { Prop } from 'Views/Inspector/Prop';

export function typeHasProp(type: PixiType, prop: Prop<any>) {
    return typePropMap[type].includes(prop);
}
