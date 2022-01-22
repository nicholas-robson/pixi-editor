import { Prop } from 'Views/Inspector/Prop';
import { ControlType } from 'Views/Inspector/ControlType';

export const defaultProps: Prop<any>[] = [
    { id: 'type', control: ControlType.STRING, controlOptions: { readonly: true } },
    { id: 'id', control: ControlType.STRING, controlOptions: { readonly: true } },
    { id: 'name', control: ControlType.STRING },
    { id: 'position', control: ControlType.VECTOR2 },
    { id: 'scale', control: ControlType.VECTOR2 },
    { id: 'angle', control: ControlType.NUMBER },
    { id: 'skew', control: ControlType.VECTOR2, controlOptions: { step: 0.1 } },
    { id: 'pivot', control: ControlType.VECTOR2 },
    { id: 'visible', control: ControlType.BOOLEAN },
    { id: 'interactive', control: ControlType.BOOLEAN },
    { id: 'buttonMode', control: ControlType.BOOLEAN },
    { id: 'alpha', control: ControlType.NUMBER, controlOptions: { step: 0.1 } },
];
