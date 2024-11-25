import * as THREE from 'three';
import { TActor } from '../Base/TActor';
import { ST } from '../type';

class TPointLight extends TActor {
    constructor(ctx: ST.Context) {
        super(ctx);
        this.Create();
    }

    private Create() {
        const light = new THREE.PointLight(0xffffff, 14, 140);
        light.position.set(0, 2, 0);
        light.castShadow = true;
        this.body = light;
        this.ctx.Game.Add(this.body);
    }
}

export { TPointLight };
