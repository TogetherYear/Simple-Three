import * as THREE from 'three';
import { TActor } from '@/Core/Base';
import { Core } from '@/Core/type';

class TPointLight extends TActor {
    constructor(ctx: Core.Context, options: Core.Actor.IPointLight = {}) {
        super(ctx, options);
        this.Create();
    }

    public get O() {
        return this.options as Core.Actor.IPointLight;
    }

    private Create() {
        const light = new THREE.PointLight(0xffffff, 14, 140);
        light.position.set(0, 2, 0);
        light.castShadow = true;
        this.body = light;
        this.ctx.Game.Add(this);
    }
}

export { TPointLight };
