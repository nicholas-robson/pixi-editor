
import { FlexMixin } from 'pixi-flex';

export type PixiEditorObject = {
    id: string;
};

declare global {
    namespace GlobalMixins {
        interface DisplayObject extends PixiEditorObject, FlexMixin {}
    }
}
