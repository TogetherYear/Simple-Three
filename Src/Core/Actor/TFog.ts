import * as THREE from 'three';
import { TActor } from '../Base/TActor';
import { TRenderer } from '../Manager/TRenderer';
import { ST } from '../type';

class TFog extends TActor {
    constructor(ctx: ST.Context) {
        super(ctx);
        this.Create();
    }

    private Create() {
        this.ctx.Renderer.scene.fog = new THREE.FogExp2(0x333333, 0.05);
    }

    public override Destroy(): void {
        super.Destroy();
        this.ctx.Renderer.scene.fog = null;
    }
}

export { TFog };
