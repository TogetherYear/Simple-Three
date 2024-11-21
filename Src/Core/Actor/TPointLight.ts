import * as THREE from 'three';
import { TActor } from '../Base/TActor';
import { TGame } from '../Manager/TGame';

class TPointLight extends TActor {
    constructor() {
        super();
        this.Create();
    }

    private Create() {
        const light = new THREE.PointLight(0xffffff, 14, 140);
        light.position.set(0, 2, 0);
        light.castShadow = true;
        this.body = light;
        TGame.Add(this.body);
    }
}

export { TPointLight };
