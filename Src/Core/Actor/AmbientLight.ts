import * as THREE from 'three';
import { Actor } from '../Base';
import { Core } from '../type';

class AmbientLight extends Actor {
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

export { AmbientLight };
