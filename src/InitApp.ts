import { EditorState, Item, PixiType, subscribe } from 'State';
import { Application, Bounds, Container, Graphics, ParticleRenderer, Renderer, Sprite, Texture } from 'pixi.js';
import { InteractionManager } from '@pixi/interaction';
import { createSelector } from 'reselect';

type PixiObject = Container & { id: string };

export function initApp(state: EditorState) {
    Renderer.registerPlugin('particle', ParticleRenderer);
    Renderer.registerPlugin('interaction', InteractionManager);

    const canvas = document.getElementById('canvas-container') as HTMLCanvasElement;
    if (canvas === null) throw new Error('Canvas not found!');

    const app = new Application({
        view: canvas,
        autoStart: true,
        resizeTo: canvas.parentElement!,
        backgroundColor: 0x000000,
        sharedTicker: true,
    });

    //app.start()
    //app.renderer.plugins.interaction.moveWhenInside = true;
    // document.body.appendChild(app.view);

    window.addEventListener('resize', Resize);
    (window as any).app = app;

    function Resize() {
        //
    }

    const scene = new Container();
    const debug = new Graphics();
    app.stage.addChild(scene);
    app.stage.addChild(debug);

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
    pixiObject.rotation = item.rotation;
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
