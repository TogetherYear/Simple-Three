import * as THREE from 'three';
import { TActor } from '@/Core/Base';
import { Core } from '@/Core/type';

class TFog extends TActor {
    constructor(ctx: Core.Context, options: Core.Actor.IFog = {}) {
        super(ctx, options);
        this.Create();
    }

    public get O() {
        return this.options as Core.Actor.IFog;
    }

    private Create() {
        this.ctx.Renderer.scene.fog = new THREE.FogExp2(0x212121, 0.05);
    }

    public override Destroy(): void {
        super.Destroy();
        this.ctx.Renderer.scene.fog = null;
    }
}

export { TFog };
