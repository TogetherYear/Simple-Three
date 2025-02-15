import * as THREE from 'three';
import { Manager, Actor } from '../Base';
import { TEvent } from '../Decorators';
import { Core } from '../type';

class Renderer extends Manager {
    constructor(ctx: Core.Context, options: Core.Manager.IRenderer = {}) {
        super(ctx, options);
    }

    public get O() {
        return this.options as Core.Manager.IRenderer;
    }

    public scene!: THREE.Scene;

    public renderer!: THREE.WebGLRenderer;

    public actors: Array<Actor> = [];

    public Run() {
        this.CreateScene();
        this.CreateRenderer();
    }

    private CreateScene() {
        this.scene = new THREE.Scene();
    }

    private CreateRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.ctx.dom.offsetWidth, this.ctx.dom.offsetHeight);
        this.renderer.setClearColor(0x212121, 1.0);
        this.ctx.dom.appendChild(this.renderer.domElement);
    }

    @TEvent.Listen(window, 'resize')
    private OnResize() {
        this.renderer.setSize(this.ctx.dom.offsetWidth, this.ctx.dom.offsetHeight);
    }

    public override Destroy(): void {
        super.Destroy();
        for (let a of this.actors) {
            a.Destroy();
        }
        this.ctx.dom.removeChild(this.renderer.domElement);
        this.renderer.dispose();
    }
}

export { Renderer };
