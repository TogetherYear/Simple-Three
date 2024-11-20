import * as THREE from 'three';
import { TActor } from '../Base/TActor';
import { TRenderer } from '../Manager/TRenderer';

class TFog extends TActor {
    constructor() {
        super();
        this.Create();
    }

    private Create() {
        TRenderer.scene.fog = new THREE.FogExp2(0x333333, 0.05);
    }

    public override Destroy(): void {
        super.Destroy();
        TRenderer.scene.fog = null;
    }
}

export { TFog };
