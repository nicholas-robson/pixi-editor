import { createState, getState } from 'State/State';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'jquery-contextmenu/dist/jquery.contextMenu.css';
import 'jquery-contextmenu';
import 'Styles/Style.css';
import 'Styles/App.css';
import { initView } from 'Views/View';

createState();
const state = getState();

initView(state);
