import { EditorState, Item, PixiType, subscribe } from 'State';
import { Application, Bounds, Container, Graphics, ParticleRenderer, Renderer, Sprite, Texture } from 'pixi.js';
import { InteractionManager } from '@pixi/interaction';
import { createSelector } from 'reselect';
import { Viewport } from 'pixi-viewport';
import { drawGrid } from 'Grid';

type PixiObject = Container & { id: string };

export function initApp(state: EditorState) {
    Renderer.registerPlugin('particle', ParticleRenderer);
    Renderer.registerPlugin('interaction', InteractionManager);

    const canvas = document.getElementById('canvas-container') as HTMLCanvasElement;
    if (canvas === null) throw new Error('Canvas not found!');

    const app = new Application({
        view: canvas,
        autoStart: true,
        resizeTo: window,
        backgroundColor: 0x000000,
        sharedTicker: true,
    });

    //app.start()
    //app.renderer.plugins.interaction.moveWhenInside = true;
    // document.body.appendChild(app.view);

    window.addEventListener('resize', Resize);
    (window as any).app = app;

    function Resize() {
        viewport.resize(window.innerWidth, window.innerHeight, window.innerWidth, window.innerHeight);
    }

    function DrawGrid() {
        drawGrid(grid, {
            gridWidth: viewport.worldWidth,
            gridHeight: viewport.worldHeight,
            columnWidth: 100 * viewport.scale.x,
            rowHeight: 100 * viewport.scale.x,
            offsetX:-viewport.left * viewport.scale.x,
            offsetY:-viewport.top * viewport.scale.x,
            lineColor : 0x333333
        });
        drawGrid(grid, {
            gridWidth: viewport.worldWidth,
            gridHeight: viewport.worldHeight,
            columnWidth: 300 * viewport.scale.x,
            rowHeight: 300 * viewport.scale.x,
            offsetX:-viewport.left * viewport.scale.x,
            offsetY:-viewport.top * viewport.scale.x,
            lineColor : 0x666666,
            lineWidth : 3,
            lineNative: false
        }, false);
    }

    const viewport = new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        worldWidth: window.innerWidth,
        worldHeight: window.innerHeight,

        interaction: app.renderer.plugins.interaction,
    });

    viewport
        .drag()
        .pinch()
        .wheel()
        .decelerate()
        .on('zoomed', () => {
            DrawGrid();
        })
        .on('moved', () => {
            DrawGrid();
        });

    const grid = new Graphics();
    const scene = new Container();
    const debug = new Graphics();

    viewport.addChild(scene);

    app.stage.addChild(grid);
    app.stage.addChild(viewport);
    app.stage.addChild(debug);

    viewport.moveCenter(0, 0);
    DrawGrid();

    ///
    //     const width = viewport.worldWidth;
    //     const height = viewport.worldHeight;
    //
    //     console.log(width, height);
    //
    //     // grid shader
    //     const uniforms = {} as any;
    //     uniforms.vpw = width;
    //     uniforms.vph = height;
    //     uniforms.offset = { type: 'v2', value: { x: -0.0235, y: 0.9794 } };
    //     uniforms.pitch = { type: 'v2', value: { x: 50, y: 50 } };
    //     uniforms.resolution = { type: 'v2', value: { x: width, y: height } };
    //
    //     const shaderCode = `
    //         precision mediump float;
    //
    // uniform float vpw; // Width, in pixels
    // uniform float vph; // Height, in pixels
    //
    // uniform vec2 offset; // e.g. [-0.023500000000000434 0.9794000000000017], currently the same as the x/y offset in the mvMatrix
    // uniform vec2 pitch;  // e.g. [50 50]
    //
    // void main() {
    //   float lX = gl_FragCoord.x / vpw;
    //   float lY = gl_FragCoord.y / vph;
    //
    //   float scaleFactor = 10000.0;
    //
    //   float offX = (scaleFactor * offset[0]) + gl_FragCoord.x;
    //   float offY = (scaleFactor * offset[1]) + (1.0 - gl_FragCoord.y);
    //
    //   if (int(mod(offX, pitch[0])) == 0 ||
    //       int(mod(offY, pitch[1])) == 0) {
    //     gl_FragColor = vec4(0.0, 0.0, 0.0, 0.5);
    //   } else {
    //     gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    //   }
    // }`;
    //     const gridShader = new Filter('', shaderCode, uniforms);
    //     const rect = new Graphics().beginFill(0xFFFFFF).drawRect(0, 0, width, height);
    //     rect.filters = [gridShader];
    //     scene.addChild(rect);

    ///

    const pixiObjects: PixiObject[] = [];

    const appSelector = createSelector(
        (state: EditorState) => state,
        (state) => {
            const pixiIDs = pixiObjects.map((p) => p.id);
            const added = state.items.filter((item) => !pixiIDs.includes(item.id));

            added.forEach((item) => {
                const newPixiObject: PixiObject = createType(item.type) as unknown as PixiObject;
                newPixiObject.id = item.id;

                updatePixiObject(newPixiObject, item, pixiObjects);

                pixiObjects.push(newPixiObject);
                scene.addChild(newPixiObject);
            });

            const removed = pixiIDs.filter((id) => !state.items.map((item) => item.id).includes(id));

            removed.forEach((id) => {
                const obj = pixiObjects.find((obj) => obj.id === id);
                if (obj !== undefined) {
                    obj.destroy({ children: true });
                    pixiObjects.splice(pixiObjects.indexOf(obj), 1);
                }
            });

            const selected = state.items
                .filter((item) => item.selected)
                .map((item) => pixiObjects.find((obj) => obj.id === item.id))
                .filter((obj) => obj !== undefined);

            state.items.forEach((item) => {
                const obj = pixiObjects.find((p) => p.id === item.id);
                if (obj === undefined) return;
                updatePixiObject(obj, item, pixiObjects);
            });

            debug.clear();

            const bounds = selected.reduce((acc, obj) => {
                if (obj === undefined) return acc;
                acc.addBounds(obj._bounds);
                return acc;
            }, new Bounds());

            const rect = bounds.getRectangle();
            debug.beginFill(0x00ff00, 1);
            debug.drawRect(rect.x, rect.y, rect.width, rect.height);

            console.log(rect);
        }
    );

    subscribe(appSelector);

    appSelector(state);
}

function updatePixiObject(pixiObject: PixiObject, item: Item, pixiObjects: PixiObject[]) {
    if (item.parent !== null) {
        const parent = pixiObjects.find((p) => p.id === item.parent);
        if (parent === undefined) throw new Error('Parent pixi object not found!');
        parent.addChild(pixiObject);
    }

    pixiObject.position.set(item.position.x, item.position.y);
    pixiObject.scale.set(item.scale.x, item.scale.y);
    pixiObject.angle = item.angle;
    pixiObject.alpha = item.alpha;
    pixiObject.visible = item.visible;

    if (pixiObject instanceof Sprite) {
        pixiObject.texture = Texture.WHITE;
    }
}

function createType(type: PixiType) {
    switch (type) {
        case PixiType.CONTAINER:
            return new Container();
        case PixiType.SPRITE:
            return new Sprite(Texture.WHITE);
        case PixiType.DISPLAY_OBJECT:
            throw new Error('Cannot create display object.');
    }
}
