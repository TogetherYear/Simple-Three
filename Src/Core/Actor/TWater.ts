import * as THREE from 'three';
import { TActor } from '@/Core/Base';
import { Water } from 'three/examples/jsm/objects/Water';
import normal from '@/Assets/Images/normal.jpg';
import { TEvent } from '@/Core/Decorators';
import { Core } from '@/Core/type';

class TWater extends TActor {
    constructor(ctx: Core.Context, options: Core.Actor.IWater = {}) {
        super(ctx, options);
        this.Create();
    }

    public get O() {
        return this.options as Core.Actor.IWater;
    }

    private Create() {
        const waterGeometry = new THREE.PlaneGeometry(1000, 1000);
        const texture = new THREE.TextureLoader().load(normal);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        this.body = new Water(waterGeometry, {
            textureWidth: 1024,
            textureHeight: 1024,
            waterNormals: texture,
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 0.6,
            fog: true
        });
        this.body.rotation.x = -Math.PI / 2;
        this.body.position.y = -1;
        this.ctx.Game.Add(this);
    }

    @TEvent.Listen<TWater>((instance) => instance.ctx.Game, Core.Manager.GameEvent.Update)
    private Update() {
        (this.body as Water).material.uniforms['time'].value += 0.36 * this.ctx.Game.deltaTime;
    }
}

export { TWater };
