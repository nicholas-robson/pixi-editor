import { PixiType } from 'State/PixiType';

export function canHaveChildren(type: PixiType) {
    return [PixiType.CONTAINER, PixiType.SPRITE, PixiType.NINE_SLICE].includes(type);
}
