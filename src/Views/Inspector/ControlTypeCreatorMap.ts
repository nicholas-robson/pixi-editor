import { ControlType } from 'Views/Inspector/ControlType';
import { Prop } from 'Views/Inspector/Prop';
import { Control } from 'Controls/Controls';
import { getTextControl } from 'Controls/GetTextControl';
import { getNumberControl } from 'Controls/GetNumberControl';
import { getVector2Control } from 'Controls/GetVector2Control';
import { getBooleanControl } from 'Controls/GetBooleanControl';
import { getColorControl } from 'Controls/GetColorControl';
import { getImageControl } from 'Controls/GetImageControl';
import { getSeparatorControl } from 'Controls/GetSeparatorControl';
import { getSidesControl } from 'Controls/GetSidesControl';
import { getTextAreaControl } from 'Controls/GetTextAreaControl';
import { getRadioButtonsControl } from 'Controls/GetRadioButtonsControl';

export const controlTypeCreatorMap: Record<ControlType, (prop: Prop<any>) => Control> = {
    [ControlType.STRING]: getTextControl,
    [ControlType.NUMBER]: getNumberControl,
    [ControlType.VECTOR2]: getVector2Control,
    [ControlType.BOOLEAN]: getBooleanControl,
    [ControlType.COLOR]: getColorControl,
    [ControlType.TEXTURE]: getImageControl,
    [ControlType.SIDES]: getSidesControl,
    [ControlType.SEPARATOR]: getSeparatorControl,
    [ControlType.TEXTAREA]: getTextAreaControl,
    [ControlType.RADIOBUTTONS]: getRadioButtonsControl,
};
