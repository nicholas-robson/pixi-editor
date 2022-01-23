import { EditorState } from 'State/EditorState';
import { initTree } from 'Views/InitTree';
import { initApp } from 'Views/PixiApp/InitApp';
import { initInspector } from 'Views/Inspector/InitInspector';
import { initKeyboard } from 'Views/InitKeyboard';
import { initSplit } from 'Views/InitSplit';
import { initContextMenu } from 'Views/ContextMenu';

export function initView(state: EditorState) {
    initSplit();
    initTree(state);
    initContextMenu();
    initApp(state);
    initInspector(state);
    initKeyboard();
}
