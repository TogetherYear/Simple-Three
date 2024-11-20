import * as THREE from 'three';
import { TActor } from '../Base/TActor';
import { TGame } from '../Manager/TGame';

class TDirectionalLight extends TActor {
    constructor() {
        super();
        this.Create();
    }

    private Create() {
        this.body = new THREE.DirectionalLight(0xcccccc, 1);
        this.body.position.set(5, 2, 0);
        TGame.Add(this.body);
    }
}

export { TDirectionalLight };
