import * as THREE from 'three';
import { TActor } from '@/Core/Base';
import { Core } from '@/Core/type';

class TSphere extends TActor {
    constructor(ctx: Core.Context, options: Core.Actor.ISphere = {}) {
        super(ctx, options);
        this.Create();
    }

    public get O() {
        return this.options as Core.Actor.ISphere;
    }

    private Create() {
        const geometry = new THREE.SphereGeometry(0.5, 32, 16);
        const material = new THREE.MeshStandardMaterial({ color: 0x212121, emissive: 0x000000, metalness: 0, roughness: 1 });
        this.body = new THREE.Mesh(geometry, material);
        this.body.castShadow = true;
        this.body.receiveShadow = true;
        this.ctx.Game.Add(this);
    }
}

export { TSphere };
