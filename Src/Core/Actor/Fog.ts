import * as THREE from 'three';
import { Actor } from '../Base';
import { Core } from '../type';

class Fog extends Actor {
    constructor(ctx: Core.Context, options: Core.Actor.IFog = {}) {
        super(ctx, options);
        this.Create();
    }

    public get O() {
        return this.options as Core.Actor.IFog;
    }

    private Create() {
        this.ctx.Renderer.scene.fog = new THREE.FogExp2(0x212121, 0.05);
        this.ctx.Game.Add(this);
    }

    public override Destroy(): void {
        super.Destroy();
        this.ctx.Renderer.scene.fog = null;
    }
}

export { Fog };
