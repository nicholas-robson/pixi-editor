import { Action } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { configureStore, nanoid, ThunkAction } from '@reduxjs/toolkit';
import { rootReducer } from 'Reducer';

export enum PixiType {
    DISPLAY_OBJECT = 'DisplayObject',
    CONTAINER = 'Container',
    SPRITE = 'Sprite',
}

export function canHaveChildren(type: PixiType) {
    return [PixiType.CONTAINER, PixiType.SPRITE].includes(type);
}

export type Item = {
    id: string;
    parent: string | null;
    name: string;
    selected: boolean;
    opened: boolean;
    disabled: boolean;

    // Container
    position: { x: number; y: number };
    scale: { x: number; y: number };
    angle: number;
    tint: number;
    pivot: { x: number; y: number };
    visible: boolean;
    alpha: number;
    //

    // Sprite
    anchor: { x: number; y: number };
    texture: string;
    //

    childIndex: number;

    type: PixiType;
};

export type UndoState = Omit<EditorState, 'undo' | 'redo'>;

export type EditorState = {
    undo: UndoState[];
    redo: UndoState[];
    items: Item[];
};

export function getItem(props: Partial<Item>): Item {
    props.id = props.id === undefined ? nanoid(10) : props.id;
    props.type = props.type === undefined ? PixiType.CONTAINER : props.type;
    props.name = props.name === undefined ? props.type + '_' + props.id : props.name;
    return {
        id: props.id,
        name: props.name,
        type: props.type,

        //
        parent: null,
        selected: false,
        opened: false,
        disabled: false,

        // Container
        position: { x: 0, y: 0 },
        scale: { x: 1, y: 1 },
        angle: 0,
        tint: 0,
        pivot: { x: 0, y: 0 },
        visible: true,
        alpha: 1,
        //

        // Sprite
        anchor: { x: 0, y: 0 },
        texture: 'string',
        //

        childIndex: 0,

        ...props,
    };
}

export const preloadedState: EditorState = {
    undo: [],
    redo: [],
    items: [
        getItem({
            id: 'root_1',
        }),
        getItem({
            id: 'root_2',
            position: { x: 100, y: 0 },
        }),
        getItem({
            id: 'sprite_1',
            parent: 'root_1',
            type: PixiType.SPRITE,
        }),
        getItem({
            id: 'sprite_2',
            parent: 'root_2',
            type: PixiType.SPRITE,
        }),
    ],
};

export let store: ReturnType<typeof createState>;

export function createState() {
    const newStore = configureStore({
        reducer: rootReducer,
        preloadedState,
        devTools: true,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware),
    });

    store = newStore;

    return newStore;
}

export function getState(): EditorState {
    return store.getState();
}

export function subscribe(callback: (state: EditorState) => void) {
    return store.subscribe(() => {
        callback(store.getState());
    });
}

export function dispatch(action: Action | ThunkAction<any, any, any, any>) {
    store.dispatch(action);
}
