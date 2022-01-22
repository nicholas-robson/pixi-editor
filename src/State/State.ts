import { Action } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { rootReducer } from 'State/Reducer';
import { EditorState } from 'State/EditorState';
import { preloadedState } from 'State/PreloadedState';

export type UndoState = Omit<EditorState, 'undo' | 'redo'>;

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
