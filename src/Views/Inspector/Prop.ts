import { ControlOptions } from 'Controls/Controls';
import { ControlType } from 'Views/Inspector/ControlType';
import { Item } from 'State/Item';

export type Prop<T> = {
    id: string;
    itemToValue?: (item: Item | undefined) => T;
    valueToItem?: (value: T) => Partial<Item>;
    control: ControlType;
    controlOptions?: ControlOptions;
};
