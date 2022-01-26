import { ControlOptions } from 'Controls/Controls';
import { ControlType } from 'Views/Inspector/ControlType';
import { Item } from 'State/Item';
import { PixiType } from 'State/PixiType';

export type InputOption = {
    value: string | number;
    label?: string;
    icon?: string;
};

export type Prop<T> = {
    id: string;
    itemToValue?: (item: Item | undefined) => T;
    valueToItem?: (value: T) => Partial<Item>;
    control: ControlType;
    controlOptions?: ControlOptions;
    inputOptions?: InputOption[];
    condition?: (item?: Item) => boolean;
};

export type PropGroup = {
    id: string;
    types: PixiType[];
    props: Prop<any>[];
    condition?: (item?: Item) => boolean;
};
