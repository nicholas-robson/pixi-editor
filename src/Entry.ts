import { createState, getState } from 'State';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'theme/style.css';
import './App.css';
import { initTree } from 'InitTree';
import { initApp } from 'InitApp';
import { initKeyboard } from 'InitKeyboard';
import { initInspector } from 'InitInspector';

createState();
const state = getState();

initTree(state);
initApp(state);
initInspector(state);
initKeyboard();
