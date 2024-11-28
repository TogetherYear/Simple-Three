import * as THREE from 'three';
import { TActor } from '@/Core/Base';
import { Core } from '@/Core/type';

class TAmbientLight extends TActor {
    constructor(ctx: Core.Context, options: Core.Actor.IAmbientLight = {}) {
        super(ctx, options);
        this.Create();
    }

    public get O() {
        return this.options as Core.Actor.IAmbientLight;
    }

    private Create() {
        this.body = new THREE.AmbientLight(0xcccccc, 0.3);
        this.ctx.Game.Add(this);
    }
}

export { TAmbientLight };
