import * as THREE from 'three';
import { TManager } from '../Base/TManager';
import { TEvent } from '../Decorators/TEvent';
import { ST } from '../type';

class TCamera extends TManager {
    constructor(ctx: ST.Context) {
        super(ctx);
    }

    public camera!: THREE.PerspectiveCamera;

    private dom!: HTMLElement;

    public Run(dom: HTMLElement) {
        this.dom = dom;
        this.CreateCamera();
    }

    private CreateCamera() {
        this.camera = new THREE.PerspectiveCamera(90, this.dom.offsetWidth / this.dom.offsetHeight, 0.1, 1000);
        this.camera.position.set(0, 2, 10);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.ctx.Renderer.scene.add(this.camera);
    }

    @TEvent.Listen(window, 'resize')
    private OnResize(e: UIEvent) {
        this.camera.aspect = this.dom.offsetWidth / this.dom.offsetHeight;
        this.camera.updateProjectionMatrix();
    }
}

export { TCamera };
