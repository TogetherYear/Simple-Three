import * as THREE from 'three';
import { Actor } from '@/Core/Base';
import { Core } from '@/Core/type';

class Box extends Actor {
    constructor(ctx: Core.Context, options: Core.Actor.IBox = {}) {
        super(ctx, options);
        this.Create();
    }

    public get O() {
        return this.options as Core.Actor.IBox;
    }

    private Create() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0x212121, emissive: 0x000000, metalness: 0, roughness: 1 });
        this.body = new THREE.Mesh(geometry, material);
        this.body.castShadow = true;
        this.body.receiveShadow = true;
        this.ctx.Game.Add(this);
    }
}

export { Box };
