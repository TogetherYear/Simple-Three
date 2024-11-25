import * as THREE from 'three';
import { TActor } from '../Base/TActor';
import { ST } from '../type';

class TSphere extends TActor {
    constructor(ctx: ST.Context) {
        super(ctx);
        this.Create();
    }

    private Create() {
        const geometry = new THREE.SphereGeometry(0.5, 32, 16);
        const material = new THREE.MeshStandardMaterial({ color: 0x212121, emissive: 0x000000, metalness: 0, roughness: 1 });
        this.body = new THREE.Mesh(geometry, material);
        this.body.castShadow = true;
        this.body.receiveShadow = true;
        this.ctx.Game.Add(this.body);
    }
}

export { TSphere };
