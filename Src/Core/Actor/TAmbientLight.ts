import * as THREE from 'three';
import { TActor } from '../Base/TActor';
import { ST } from '../type';

class TAmbientLight extends TActor {
    constructor(ctx: ST.Context) {
        super(ctx);
        this.Create();
    }

    private Create() {
        this.body = new THREE.AmbientLight(0xcccccc, 0.3);
        this.ctx.Game.Add(this.body);
    }
}

export { TAmbientLight };
