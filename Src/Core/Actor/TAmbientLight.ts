import * as THREE from 'three';
import { TActor } from '../Base/TActor';
import { TGame } from '../Manager/TGame';

class TAmbientLight extends TActor {
    constructor() {
        super();
        this.Create();
    }

    private Create() {
        this.body = new THREE.AmbientLight(0xcccccc, 0.3);
        TGame.Add(this.body);
    }
}

export { TAmbientLight };
