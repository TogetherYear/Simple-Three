import * as THREE from 'three';
import { TActor } from '../Base/TActor';
import { Water } from 'three/examples/jsm/objects/Water';
import normal from '@/Assets/Images/normal.jpg';
import { TEvent } from '../Decorators/TEvent';
import { ST } from '../type';

class TWater extends TActor {
    constructor(ctx: ST.Context) {
        super(ctx);
        this.Create();
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
        this.body.position.y = -3;
        this.ctx.Game.Add(this.body);
    }

    @TEvent.Listen<TWater>((instance) => instance.ctx.Game, ST.Manager.TGame.Event.Update)
    private Update() {
        (this.body as Water).material.uniforms['time'].value += 0.36 * this.ctx.Game.deltaTime;
    }
}

export { TWater };
