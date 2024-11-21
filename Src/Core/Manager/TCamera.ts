import * as THREE from 'three';
import { TManager } from '../Base/TManager';
import { TRenderer } from './TRenderer';
import { TEvent } from '../Decorators/TEvent';

class TCamera extends TManager {
    constructor() {
        super();
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
        TRenderer.scene.add(this.camera);
    }

    @TEvent.Listen(window, 'resize')
    private OnResize(e: UIEvent) {
        this.camera.aspect = this.dom.offsetWidth / this.dom.offsetHeight;
        this.camera.updateProjectionMatrix();
    }
}

const TCameraInstance = new TCamera();

export { TCameraInstance as TCamera };
