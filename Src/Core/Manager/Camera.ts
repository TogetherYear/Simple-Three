import * as THREE from 'three';
import { Manager } from '../Base';
import { Core } from '../type';
import { TEvent } from '../Decorators';

class Camera extends Manager {
    constructor(ctx: Core.Context, options: Core.Manager.ICamera = {}) {
        super(ctx, options);
    }

    public get O() {
        return this.options as Core.Manager.ICamera;
    }

    public camera!: THREE.PerspectiveCamera;

    public cameraObject!: THREE.Object3D;

    public Run() {
        this.CreateCamera();
    }

    private CreateCamera() {
        this.cameraObject = new THREE.Object3D();
        this.camera = new THREE.PerspectiveCamera(90, this.ctx.dom.offsetWidth / this.ctx.dom.offsetHeight, 0.1, 1000);
        this.camera.position.set(0, 2, 10);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.cameraObject.add(this.camera);
        this.ctx.Renderer.scene.add(this.cameraObject);
    }

    @TEvent.Listen(window, 'resize')
    private OnResize(e: UIEvent) {
        this.camera.aspect = this.ctx.dom.offsetWidth / this.ctx.dom.offsetHeight;
        this.camera.updateProjectionMatrix();
    }

    public override Destroy(): void {
        super.Destroy();
    }
}

export { Camera };
