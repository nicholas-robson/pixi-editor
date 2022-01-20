import { dispatch, EditorState, getState, Item, PixiType, subscribe } from 'State';
import {
    Application,
    Container,
    DisplayObject,
    Graphics,
    InteractionEvent,
    ParticleRenderer,
    Renderer,
    Sprite,
    Texture,
} from 'pixi.js';
import { InteractionManager } from '@pixi/interaction';
import { createSelector } from 'reselect';
import { Viewport } from 'pixi-viewport';
import { drawGrid } from 'Grid';
import $ from 'jquery';
import { getContextMenu } from 'ContextMenu';
import { deselectAllAction, selectItemsAction, updateItemsAction } from 'Actions';
import { Transformer } from '@pixi-essentials/transformer';

type PixiObject = Container & { id: string };



export function initApp(state: EditorState) {
    Renderer.registerPlugin('particle', ParticleRenderer);
    Renderer.registerPlugin('interaction', InteractionManager);

    const canvas = document.getElementById('canvas-container') as HTMLCanvasElement;
    if (canvas === null) throw new Error('Canvas not found!');

    $.contextMenu({
        selector: '#canvas-container, .jstree-node',
        build: ($trigger, e) => {
            const isTreeNode = $($trigger).hasClass('jstree-node');
            if (isTreeNode) {
                const id = $($trigger).attr('id') as string;
                dispatch(selectItemsAction([id], true));
            }

            const itemIDs = getState()
                .items.filter((item) => item.selected)
                .map((item) => item.id);

            return {
                items: getContextMenu(itemIDs),
            };
        },
        zIndex: 750,
    });

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

    window.addEventListener('resize', () => {
        Resize(viewport);
    });

    (window as any).app = app;

    let canvasWidth = 800;
    let canvasHeight = 600;

    const viewport = new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        worldWidth: window.innerWidth,
        worldHeight: window.innerHeight,

        interaction: app.renderer.plugins.interaction,
    });

    let spaceDown = false;
    let shiftDown = false;
    $(window).on('keydown', (e) => {
        if (e.code === 'Space' && !spaceDown) {
            spaceDown = true;
            viewport.drag({
                mouseButtons: 'left-middle',
            });
        }
        console.log(e.code);
        if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') && !shiftDown) {
            shiftDown = true;
        }
    });

    $(window).on('keyup', (e) => {
        if (e.code === 'Space' && spaceDown) {
            spaceDown = false;
            viewport.drag({
                mouseButtons: 'middle',
            });
        }
        if ((e.code === 'ShiftLeft' || e.code === 'ShiftLeft') && shiftDown) {
            shiftDown = false;
        }
    });

    viewport
        .drag({
            mouseButtons: 'middle',
        })
        .pinch({})
        .clampZoom({
            minScale: 0.1,
            maxScale: 8,
        })
        .wheel()
        .decelerate({
            friction: 0.8,
        })
        // .clamp({
        //     direction : "all",
        // })
        .on('zoomed', () => {
            DrawGrid(viewport, grid, background, debug, pixiObjects, canvasWidth, canvasHeight);
        })
        .on('moved', () => {
            DrawGrid(viewport, grid, background, debug, pixiObjects, canvasWidth, canvasHeight);
        });

    const grid = new Graphics();
    const background = new Graphics();
    const scene = new Container();
    const transformer = new Transformer({
        boundingBoxes: 'groupOnly',
        transientGroupTilt: false,
        handleStyle: {
            radius : 8,
            shape : "square"
        },
        wireframeStyle: {
            color : 0x3392e3
        }
    });

    transformer.on('transformcommit', () => {
        const items = pixiObjectToItems(getState(), transformer.group as PixiObject[]);
        dispatch(updateItemsAction(items));
    });

    // transformer.on("transformchange", () => {
    //     console.log("BANANA");
    // })

    const debug = new Graphics();

    viewport.addChild(scene);

    app.stage.addChild(grid);
    app.stage.addChild(background);
    app.stage.addChild(viewport);
    app.stage.addChild(transformer);
    app.stage.addChild(debug);

    // const screenWidth = document.getElementById('center-panel')?.clientWidth as number;
    // const screenHeight = document.getElementById('center-panel')?.clientHeight as number;

    // console.log(screenWidth, screenHeight);
    // console.log(canvasWidth, canvasHeight);

    //viewport.fitWorld(true);
    // viewport.fitWidth( screenHeight, false);
    // viewport.fitHeight( screenWidth, false);
    //viewport.fit(true, screenWidth, screenHeight);
    //viewport.moveCenter(+screenWidth * viewport.scale.x * 0.5, +canvasHeight * viewport.scale.x * 0.5);

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

    app.renderer.plugins.interaction.on('pointerdown', (e: InteractionEvent) => {
        // Return if not mouse left-click.
        if ((e.data.originalEvent as any).button !== 0) return;

        const result = app.renderer.plugins.interaction.hitTest(e.data.global);

        console.log(result);

        // If tapping transformer ignore.
        // const isTransformer = hasParent(result, transformer);
        // if (isTransformer) return;

        //console.log(result);
        if (result?.id !== undefined) {
            dispatch(selectItemsAction([result.id], !shiftDown));
            e.stopPropagation();
        } else if (result === viewport) {
            dispatch(deselectAllAction());
        }
    });

    //console.log(app.renderer.plugins.interaction);
    //app.renderer.plugins.interaction.hitTest();

    const pixiObjects: PixiObject[] = [];

    const appSelector = createSelector(
        (state: EditorState) => state,
        (state) => {
            const pixiIDs = pixiObjects.map((p) => p.id);
            const added = state.items.filter((item) => !pixiIDs.includes(item.id));

            added.forEach((item) => {
                const newPixiObject: PixiObject = createType(item.type) as unknown as PixiObject;
                newPixiObject.id = item.id;
                newPixiObject.interactive = true;

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

            state.items.forEach((item) => {
                const obj = pixiObjects.find((p) => p.id === item.id);
                if (obj === undefined) return;
                updatePixiObject(obj, item, pixiObjects);
            });

            const selected = state.items
                .filter((item) => item.selected)
                .map((item) => pixiObjects.find((obj) => obj.id === item.id))
                .filter((obj) => obj !== undefined);

            transformer.group = selected as any;

            DrawGrid(viewport, grid, background, debug, pixiObjects, canvasWidth, canvasHeight);
        }
    );

    subscribe(appSelector);

    appSelector(state);

    DrawGrid(viewport, grid, background, debug, pixiObjects, canvasWidth, canvasHeight);
}

function updatePixiObject(pixiObject: PixiObject, item: Item, pixiObjects: PixiObject[]) {
    if (item.parent !== null) {
        const parent = pixiObjects.find((p) => p.id === item.parent);
        if (parent === undefined) throw new Error('Parent pixi object not found!');
        parent.addChild(pixiObject);
    }

    pixiObject.position.set(item.position.x, item.position.y);
    pixiObject.scale.set(item.scale.x, item.scale.y);
    pixiObject.skew.set(item.skew.x, item.skew.y);
    pixiObject.angle = item.angle;
    pixiObject.alpha = item.alpha;
    pixiObject.visible = item.visible;

    if (pixiObject instanceof Sprite) {
        pixiObject.texture = Texture.WHITE;
    }
}

function pixiObjectToItems(state: EditorState, pixiObjects: PixiObject[]): Item[] {
    return pixiObjects.map((pixiObject) => ({
        ...(state.items.find((item) => item.id === pixiObject.id) as Item),
        position: { x: pixiObject.position.x, y: pixiObject.position.y },
        scale: { x: pixiObject.scale.x, y: pixiObject.scale.y },
        skew: { x: pixiObject.skew.x, y: pixiObject.skew.y },
        angle: pixiObject.angle,
    }));
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

function Resize(viewport: Viewport) {
    viewport.resize(window.innerWidth, window.innerHeight, window.innerWidth, window.innerHeight);
}

function DrawGrid(
    viewport: Viewport,
    grid: Graphics,
    background: Graphics,
    debug: Graphics,
    pixiObjects: PixiObject[],
    canvasWidth: number,
    canvasHeight: number
) {
    drawGrid(grid, {
        gridWidth: viewport.worldWidth,
        gridHeight: viewport.worldHeight,
        columnWidth: 100 * viewport.scale.x,
        rowHeight: 100 * viewport.scale.x,
        offsetX: -viewport.left * viewport.scale.x,
        offsetY: -viewport.top * viewport.scale.x,
        lineColor: 0x222222,
    });
    drawGrid(
        grid,
        {
            gridWidth: viewport.worldWidth,
            gridHeight: viewport.worldHeight,
            columnWidth: 500 * viewport.scale.x,
            rowHeight: 500 * viewport.scale.x,
            offsetX: -viewport.left * viewport.scale.x,
            offsetY: -viewport.top * viewport.scale.x,
            lineColor: 0x333333,
            lineWidth: 2,
            lineNative: false,
        },
        false
    );

    const x = -viewport.left * viewport.scale.x;
    const y = -viewport.top * viewport.scale.x;
    const w = canvasWidth * viewport.scale.x;
    const h = canvasHeight * viewport.scale.x;

    background.clear();
    //background.beginFill(0x14171a);
    background.lineStyle(2, 0xeeeeee, 1, 0.5, false);
    background.moveTo(x, y);
    background.lineTo(x + w, y);
    background.lineTo(x + w, y + h);
    background.lineTo(x, y + h);
    background.lineTo(x, y);

    //
    //
    // const state = getState();
    //
    // const selected = state.items
    //     .filter((item) => item.selected)
    //     .map((item) => pixiObjects.find((obj) => obj.id === item.id))
    //     .filter((obj) => obj !== undefined);
    //
    //
    // debug.clear();
    //
    // const rect = selected.reduce<Rectangle | null>((acc, obj) => {
    //     if (obj === undefined) return acc;
    //     if (acc === null) {
    //         acc = obj.getBounds();
    //         return acc;
    //     }
    //     acc.enlarge(obj.getBounds());
    //     return acc;
    // }, null);
    //
    // if (rect !== null) {
    //     debug.lineStyle(3, 0x3392e3, 1, 0, false);
    //     debug.moveTo(rect.x, rect.y);
    //     debug.lineTo(rect.x + rect.width, rect.y);
    //     debug.lineTo(rect.x + rect.width, rect.y + rect.height);
    //     debug.lineTo(rect.x, rect.y + rect.height);
    //     debug.lineTo(rect.x, rect.y);
    //     rect.pad(1, 1);
    //     debug.lineStyle(1, 0xFFFFFF, 1, 0, false);
    //     debug.moveTo(rect.x, rect.y);
    //     debug.lineTo(rect.x + rect.width, rect.y);
    //     debug.lineTo(rect.x + rect.width, rect.y + rect.height);
    //     debug.lineTo(rect.x, rect.y + rect.height);
    //     debug.lineTo(rect.x, rect.y);
    // }
}


function hasParent(displayObject: DisplayObject, target: DisplayObject) {
    let parent = displayObject;

    while (parent.parent !== null) {
        if (parent === target) return true;
        parent = parent.parent;
    }

    return false;
}
