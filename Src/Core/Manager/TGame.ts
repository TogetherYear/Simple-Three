import { TManager } from '../Base/TManager';
import { TEvent } from '../Decorators/TEvent';
import { Core } from '../type';
import * as THREE from 'three';

@TEvent.Create([Core.Manager.GameEvent.Update])
class TGame extends TManager {
    constructor(ctx: Core.Context, options: Core.Manager.IGame = {}) {
        super(ctx, options);
    }

    public get O() {
        return this.options as Core.Manager.IGame;
    }

    private clock!: THREE.Clock;

    public deltaTime: number = 0;

    public renderTime: number = 0;

    private updateCallback = -1;

    public Run() {
        this.CreateClock();
        this.Loop();
    }

    private CreateClock() {
        this.clock = new THREE.Clock();
    }

    private Loop() {
        this.updateCallback = window.requestAnimationFrame(() => {
            this.Update();
            this.Loop();
        });
    }

    private Update() {
        this.deltaTime = this.clock.getDelta();
        this.renderTime += this.deltaTime;

        this.ctx.Renderer.renderer.render(this.ctx.Renderer.scene, this.ctx.Camera.camera);

        this.Emit(Core.Manager.GameEvent.Update);
    }

    public Add(object: THREE.Object3D) {
        this.ctx.Renderer.scene.add(object);
    }

    public Remove(object: THREE.Object3D) {
        this.ctx.Renderer.scene.remove(object);
    }

    public override Destroy(): void {
        super.Destroy();
        window.cancelAnimationFrame(this.updateCallback);
    }
}

export { TGame };
