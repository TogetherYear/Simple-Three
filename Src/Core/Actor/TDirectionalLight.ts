import * as THREE from 'three';
import { TActor } from '../Base/TActor';
import { ST } from '../type';

class TDirectionalLight extends TActor {
    constructor(ctx: ST.Context) {
        super(ctx);
        this.Create();
    }

    private distance = 20;

    private Create() {
        const light = new THREE.DirectionalLight(0xffffff, 0.5);
        light.castShadow = true;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.left = -this.distance;
        light.shadow.camera.right = this.distance;
        light.shadow.camera.top = this.distance;
        light.shadow.camera.bottom = -this.distance;
        light.shadow.camera.far = 3 * this.distance;
        light.shadow.camera.near = this.distance;
        light.position.set(this.distance * 0.5, this.distance, this.distance * 0.5);
        this.body = light;
        this.ctx.Game.Add(this.body);
    }
}

export { TDirectionalLight };
