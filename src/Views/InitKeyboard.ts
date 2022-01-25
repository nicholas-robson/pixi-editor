import { dispatch } from 'State/State';
import { deleteAction, redoAction, translateAction, undoAction } from 'State/Actions';

export function initKeyboard() {
    document.onkeyup = (e) => {
        if (e.ctrlKey) {
            if (e.code === 'KeyZ') {
                if (e.shiftKey) {
                    dispatch(redoAction());
                } else {
                    dispatch(undoAction());
                }
            }
        }

        if (e.code === 'Delete') {
            dispatch(deleteAction());
        }
    };
    document.onkeydown = (e) => {
        if (e.code === 'ArrowUp') {
            dispatch(translateAction(0, e.shiftKey ? -10 : -1));
        }

        if (e.code === 'ArrowDown') {
            dispatch(translateAction(0, e.shiftKey ? 10 : 1));
        }

        if (e.code === 'ArrowLeft') {
            dispatch(translateAction(e.shiftKey ? -10 : -1, 0));
        }

        if (e.code === 'ArrowRight') {
            dispatch(translateAction(e.shiftKey ? 10 : 1, 0));
        }
    };
}
