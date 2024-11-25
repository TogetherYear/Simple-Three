import { TManager } from '../Base/TManager';
import { TEvent } from '../Decorators/TEvent';
import { ST } from '../type';
import * as THREE from 'three';

@TEvent.Create([ST.Manager.TGame.Event.Update])
class TGame extends TManager {
    constructor(ctx: ST.Context) {
        super(ctx);
    }

    private clock!: THREE.Clock;

    public deltaTime: number = 0;

    public renderTime: number = 0;

    public Run() {
        this.CreateClock();
        this.Loop();
    }

    private CreateClock() {
        this.clock = new THREE.Clock();
    }

    private Loop() {
        window.requestAnimationFrame(() => {
            this.Loop();
        });
        this.Update();
    }

    private Update() {
        this.deltaTime = this.clock.getDelta();
        this.renderTime += this.deltaTime;

        this.ctx.Renderer.renderer.render(this.ctx.Renderer.scene, this.ctx.Camera.camera);

        this.Emit(ST.Manager.TGame.Event.Update);
    }

    public Add(object: THREE.Object3D) {
        this.ctx.Renderer.scene.add(object);
    }

    public Remove(object: THREE.Object3D) {
        this.ctx.Renderer.scene.remove(object);
    }
}

export { TGame };
