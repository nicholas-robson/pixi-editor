import { Action } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
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
    position: { x: number; y: number };
    scale: { x: number; y: number };
    rotation: number;
    tint: number;

    childIndex: number;

    type: PixiType;
    visible: boolean;
    alpha: number;
};

export type UndoState = Omit<EditorState, 'undo' | 'redo'>;

export type EditorState = {
    undo: UndoState[];
    redo: UndoState[];
    items: Item[];
};

export const preloadedState: EditorState = {
    undo: [],
    redo: [],
    items: [
        {
            id: 'root_1',
            parent: null,
            name: 'root_1',
            selected: false,
            opened: true,
            disabled: false,
            type: PixiType.CONTAINER,
            position: { x: 0, y: 0 },
            scale: { x: 1, y: 1 },
            rotation: 0,
            tint:0,

            childIndex: 0,

            visible: true,
            alpha: 1,
        },
        {
            id: 'root_2',
            parent: null,
            name: 'root_2',
            selected: false,
            opened: true,
            disabled: false,
            type: PixiType.CONTAINER,
            position: { x: 100, y: 0 },
            scale: { x: 1, y: 1 },
            rotation: 0,
            tint:0,

            childIndex: 1,

            visible: true,
            alpha: 1,
        },
        {
            id: 'sprite_1',
            parent: 'root_1',
            name: 'sprite_1',
            selected: false,
            opened: true,
            disabled: false,
            type: PixiType.SPRITE,
            position: { x: 0, y: 0 },
            scale: { x: 1, y: 1 },
            rotation: 0,
            tint:0,

            childIndex: 0,

            visible: true,
            alpha: 1,
        },
        {
            id: 'sprite_2',
            parent: 'root_2',
            name: 'sprite_2',
            selected: false,
            opened: true,
            disabled: false,
            type: PixiType.SPRITE,
            position: { x: 0, y: 0 },
            scale: { x: 1, y: 1 },
            rotation: 0,
            tint:0,

            childIndex: 1,

            visible: true,
            alpha: 1,
        },
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
