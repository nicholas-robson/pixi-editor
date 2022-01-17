import { dispatch } from 'State';
import { deleteAction, redoAction, undoAction } from 'Actions';

export function initKeyboard() {
    function KeyPress(e: any) {
        const evtobj = window.event ? event : e;
        if (evtobj.ctrlKey) {
            if (evtobj.keyCode === 90) {
                if (evtobj.shiftKey) {
                    dispatch(redoAction());
                } else {
                    dispatch(undoAction());
                }
            }
        }

        if (evtobj.keyCode === 46) {
            dispatch(deleteAction());
        }
    }

    document.onkeyup = KeyPress;
}
