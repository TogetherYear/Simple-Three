import { TManager } from '../Base/TManager';
import { TEvent } from '../Decorators/TEvent';
import { ST } from '../type';
import * as THREE from 'three';
import { TRenderer } from './TRenderer';
import { TCamera } from './TCamera';

@TEvent.Create([ST.Manager.TGame.Event.Update])
class TGame extends TManager {
    constructor() {
        super();
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

        TRenderer.renderer.render(TRenderer.scene, TCamera.camera);

        this.Emit(ST.Manager.TGame.Event.Update);
    }

    public Add(object: THREE.Object3D) {
        TRenderer.scene.add(object);
    }

    public Remove(object: THREE.Object3D) {
        TRenderer.scene.remove(object);
    }
}

const TGameInstance = new TGame();

export { TGameInstance as TGame };
