import * as THREE from 'three';
import { TActor } from '../Base/TActor';
import { TGame } from '../Manager/TGame';

class TDirectionalLight extends TActor {
    constructor() {
        super();
        this.Create();
    }

    private distance = 20;

    private Create() {
        const light = new THREE.DirectionalLight(0xffffff, 0.75);
        light.castShadow = true;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.left = -this.distance;
        light.shadow.camera.right = this.distance;
        light.shadow.camera.top = this.distance;
        light.shadow.camera.bottom = -this.distance;
        light.shadow.camera.far = 3 * this.distance;
        light.shadow.camera.near = this.distance;
        light.position.set(this.distance, this.distance, this.distance);
        this.body = light;
        TGame.Add(this.body);
    }
}

export { TDirectionalLight };
