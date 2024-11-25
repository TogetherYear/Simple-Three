import * as THREE from 'three';
import { TActor } from '../Base/TActor';
import { ST } from '../type';

class TAmbientLight extends TActor {
    constructor(ctx: ST.Context, options: ST.Actor.IAmbientLight = {}) {
        super(ctx, options);
        this.Create();
    }

    public get O() {
        return this.options as ST.Actor.IAmbientLight;
    }

    private Create() {
        this.body = new THREE.AmbientLight(0xcccccc, 0.3);
        this.ctx.Game.Add(this.body);
    }
}

export { TAmbientLight };
