import Split from 'split.js';

export function initSplit() {
    Split(['#left-panel', '#center-panel', '#right-panel'], {
        sizes: [20, 60, 25],
        gutterStyle: function(dimension, gutterSize) {
            return {
                'flex-basis': gutterSize + 'px',
            };
        },
        onDragEnd: function(sizes) {
            window.dispatchEvent(new Event('resize'));
        },
    });
}
