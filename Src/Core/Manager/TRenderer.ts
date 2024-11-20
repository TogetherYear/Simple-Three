import * as THREE from 'three';
import { TManager } from '../Base/TManager';
import { TEvent } from '../Decorators/TEvent';
import { TGame } from './TGame';
import { ST } from '../type';

class TRenderer extends TManager {
    constructor() {
        super();
    }

    public scene!: THREE.Scene;

    public renderer!: THREE.WebGLRenderer;

    private dom!: HTMLElement;

    public Run(dom: HTMLElement) {
        this.dom = dom;
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
        this.renderer.shadowMap.enabled = false;
        this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight);
        this.renderer.setClearColor(0x333333, 1.0);
        this.dom.appendChild(this.renderer.domElement);
    }

    @TEvent.Listen(window, 'resize')
    private OnResize(e: UIEvent) {
        this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight);
    }

    @TEvent.Listen(TGame, ST.Manager.TGame.Event.Update)
    private Update() {}
}

const TRendererInstance = new TRenderer();

export { TRendererInstance as TRenderer };
